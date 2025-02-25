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
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LoadingTable from "../../components/loadingTable";
import BasicTable from "../../components/table";
import NoTableData from "../../components/noData";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiDeleteData, apiGetData } from "../../services/api";
import { FaEye } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { eventsColumns } from "./table/columns";

const EventosPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [eventos, setEventos] = useState([]);

  const [onLoad, setOnLoad] = useState(false);


  const fetchEventos = async (page:number) => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", `/eventos?page=${page}`);
      setTotalPages(response.totalPages);
      setEventos(response.data);
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
    // dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
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
        <Button
          color="secondary"
          variant="contained"
          endIcon={<IoMdAdd />}
          onClick={() => {
            navigate("/eventos/edit");
          }}
          sx={{ borderRadius: 2 }}
        >
          Adicionar
        </Button>
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

export default EventosPage;
