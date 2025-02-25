import {
  Avatar,
  Button,
  Chip,
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
import { useNavigate, useParams } from "react-router-dom";
// import LoadingTable from "../../components/loadingTable";
// import BasicTable from "../../components/table";
// import NoTableData from "../../components/noData";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { apiDeleteData, apiGetData } from "../../services/api";
import { FaEye } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import BasicTable from "../../../components/table";
import LoadingTable from "../../../components/loadingTable";
import { eventsColumns } from "../table/columns";
import { apiGetData } from "../../../services/api";
import { eventTicketsColumns } from "../table/columns/tickets";
import { BiArrowBack } from "react-icons/bi";
// import { eventsColumns } from "./table/columns";

const EventosTicketsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [eventTickets, setEventTickets] = useState([]);

  const [onLoad, setOnLoad] = useState(false);


  const fetchEventos = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", `/uniticket/tickets?access_token=${id}`);
      setEventTickets(response.data);
    } catch (error) {
      toast.error("Erro ao buscar eventos");
    }
    setLoading(false);
  };

  const handleChangePagination = (_: React.ChangeEvent<unknown>, value: number) => {
    //   try {
    //     fetchEventos(value);
    //   } catch (error) {
    //     toast.error("Erro ao buscar Turmas");
    //   }
    //   setPage(value);
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
            <Link
              color="primary"
              underline="always"
              sx={{ fontFamily: "Poppins" }}
            >
              {row.name} {row.lastname}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.gender}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.lot_name}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.ticket_type}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.ticket_code}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.email}
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
        <Stack direction={'row'} gap={1}>
          <IconButton size="small" onClick={() => navigate(-1)}>
            <BiArrowBack />
          </IconButton>
          <h2 className="text-lg text-default font-bold">{eventTickets[0]?.event_name}</h2>
        </Stack>
          <Chip label={`quantidade de tickets: ${eventTickets.length}`}/>
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
            ) : eventTickets.length > 0 ? (
              <BasicTable
                columns={eventTicketsColumns}
                rows={eventTickets}
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

export default EventosTicketsPage;
