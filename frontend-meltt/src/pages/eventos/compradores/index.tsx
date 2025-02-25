import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import BasicTable from "../../../components/table";
import LoadingTable from "../../../components/loadingTable";
import { eventsColumns } from "../table/columns";
import { apiGetData } from "../../../services/api";

const EventosCompradoresPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [eventos, setEventos] = useState([]);

  const [onLoad, setOnLoad] = useState(false);


  const fetchEventos = async (page:number) => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", `/uniticket/buyers?access_token=${id}`);
      // setTotalPages(response.totalPages);
      console.log('response', response)
      setEventos(response);
    } catch (error) {
      toast.error("Erro ao buscar eventos");
    }
    setLoading(false);
  };

  const handleChangePagination = (_: React.ChangeEvent<unknown>, value: number) => {
    try {
      fetchEventos(value);
    } catch (error) {
      toast.error("Erro ao buscar Turmas");
    }
    setPage(value);
  };

  const onClickRowView = (row: any) => {
    navigate(`/eventos/view/${row.id}`);
  };

  const dataRow = (row: any) => {
    return (
      <TableRow
        key={row.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" gap={2}>
            <Avatar src={"https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="foto evento" sizes="32px"/>
            <Link
              color="primary"
              underline="always"
              onClick={() => onClickRowView(row)}
              sx={{ fontFamily: "Poppins" }}
            >
              {row.nome}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.turma_id}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          <IconButton size="small" onClick={() => onClickRowView(row)}>
            <FaEye color="#2d1c63" size={22} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetchEventos(1);
    setOnLoad(true);
  }, []);

  return (
    <Stack width={"calc(100% - 28px)"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        my={2}
      >
        <h2 className="text-2xl text-default font-extrabold"></h2>
      </Stack>
      <Slide direction="right" in={onLoad} mountOnEnter>
        <Paper
          elevation={0}
          sx={{
            p: 1,
            flexGrow: 1,
            width: "100%",
            height: "calc(100vh - 170px)",
            borderRadius: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "12px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ddd",
                borderRadius: "12px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#EFEFEF",
              },
            }}
          >
            {loading ? (
              <LoadingTable />
            ) : eventos.length > 0 ? (
              <BasicTable 
                columns={eventsColumns}
                rows={eventos}
                loading={loading}
                dataRow={dataRow}
                page={page}
                totalPages={totalPages}
                handleChangePagination={handleChangePagination}
              />
            ) : (
              <Stack width={'100%'} height={'100%'} alignItems={'center'}>
                <h2 className="font-light">Não há eventos cadastrados</h2>
              </Stack>
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default EventosCompradoresPage;
