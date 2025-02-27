import {
  Avatar,
  Button,
  IconButton,
  Link,
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingTable from "../../components/loadingTable";
import BasicTable from "../../components/table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiGetData } from "../../services/api";
import { FaMoneyBillWave, FaPeopleGroup } from "react-icons/fa6";
import { eventsColumns } from "./table/columns";
import { IoAdd, IoTicket } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

const EventosPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [eventos, setEventos] = useState([]);

  const [onLoad, setOnLoad] = useState(false);


  const fetchEventos = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", `/eventos?page=${page}`);
      setTotalPages(response.totalPages);
      setEventos(response.data);
    } catch (error) {
      toast.error("Nenhuma informação encontrada para eventos");
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

  const onClickRowView = (row: any, route: string) => {
    navigate(`/eventos/${route}/${row.token}`);
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
            <Avatar src={"https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="foto evento" sizes="32px" />
            <Link
              color="primary"
              underline="always"
              onClick={() => onClickRowView(row, 'compradores')}
              sx={{ fontFamily: "Poppins" }}
            >
              {row.nome}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.data_formatura ?? 'data não informada'} 
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          <Stack direction={'row'} gap={1}>
            <Tooltip title="Ver compradores" arrow>
              <IconButton size="small" onClick={() => onClickRowView(row, 'compradores')}>
                <FaMoneyBillWave color="#2d1c63" size={22} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver Tickets" arrow>
              <IconButton size="small" onClick={() => onClickRowView(row, 'tickets')}>
                <IoTicket color="#2d1c63" size={22} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver Participantes" arrow>
              <IconButton size="small" onClick={() => onClickRowView(row, 'participantes')}>
                <FaPeopleGroup color="#2d1c63" size={22} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver Checkins" arrow>
              <IconButton size="small" onClick={() => onClickRowView(row, 'checkins')}>
                <FaCheckCircle color="#2d1c63" size={22} />
              </IconButton>
            </Tooltip>
          </Stack>
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
          variant="contained"
          color="secondary"
          endIcon={<IoAdd />}
          onClick={() => navigate('/eventos/new')}
          >
          Novo Evento
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
