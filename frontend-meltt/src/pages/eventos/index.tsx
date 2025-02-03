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
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [eventos, setEventos] = useState([]);

  const [onLoad, setOnLoad] = useState(false);


  const fetchEventos = async () => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", "/eventos");
      setEventos(response);
    } catch (error) {
      toast.error("Erro ao buscar eventos");
    }
    setLoading(false);
  };

  const onClickRowView = (row: any) => {
    // dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/eventos/view/${row.id}`);
  };

  const onClickRowEdit = (row: any) => {
    // dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/eventos/edit/${row.id}`);
  };

  const onClickDelete = async (id: number) => {
    setLoadingDelete(true);
    try {
      const response = await apiDeleteData("academic", `/eventos/${id}`);
      if (response.id) {
        fetchEventos();
        toast.success("Evento excluído com sucesso");
      }
      console.log("response", response);
    } catch (error) {
      toast.error("Erro ao excluir evento");
    }
    setLoadingDelete(false);
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
          <Stack direction="row" alignItems="center">
            <Avatar src={row?.foto_evento} alt="foto evento"/>
            <Link
              color="primary"
              underline="always"
              onClick={() => onClickRowView(row)}
              sx={{ fontFamily: "Poppins" }}
            >
              {row.nome_evento}
            </Link>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.descricao_evento}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          R${row.valor_ingresso}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          <IconButton size="small" onClick={() => onClickRowView(row)}>
            <FaEye color="#2d1c63" size={22} />
          </IconButton>
          <IconButton size="small" onClick={() => onClickRowEdit(row)}>
            <MdModeEdit color="#2d1c63" size={22} />
          </IconButton>
          <IconButton size="small" onClick={() => onClickDelete(row.id)}>
            {loadingDelete ? (
              <CircularProgress color="secondary" size={10} />
            ) : (
              <FaTrashAlt color="red" />
            )}
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetchEventos();
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
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="evento"
                disabledButton={false}
                onClickAction={() => navigate("/eventos/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default EventosPage;
