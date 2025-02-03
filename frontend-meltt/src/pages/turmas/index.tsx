import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import BasicTable from "../../components/table";
import { useEffect, useState } from "react";
import { useTurmaContext } from "../../providers/turmaContext";
import { useNavigate } from "react-router-dom";
import { apiDeleteData, apiGetData } from "../../services/api";
import { IoMdAdd } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../utils/token";
import { CustomJwtPayload } from "../../components/customDrawer";
import toast from "react-hot-toast";
import NoTableData from "../../components/noData";
import LoadingTable from "../../components/loadingTable";
import { turmasColumns } from "./table/columns";
import { format } from "date-fns";
import { FaEye } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

interface Turma {
  id: number;
  nome: string;
  ano_formatura: any;
  criado_em: any;
}

const TurmasPage = () => {
  const navigate = useNavigate();
  const { dispatchTurma } = useTurmaContext();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  const token = getToken();
  const decoded = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const fetchTurmas = async () => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", "/turmas");
      setTurmas(response);
    } catch (error) {
      toast.error("Erro ao buscar alunos");
    }

    setLoading(false);
  };

  const onClickDelete = async (row: Turma) => {
    setLoadingDelete(true);
    try {
      const response = await apiDeleteData("academic", `/turmas/${row.id}`);
      if (response.message.includes("deletado")) {
        fetchTurmas();
        toast.success("Turma excluída com sucesso");
      }
      console.log("response", response);
    } catch (error) {
      toast.error("Erro ao excluir turma");
    }
    setLoadingDelete(false);
  };

  const dataRowAdmin = (row: Turma) => {
    return (
      <TableRow
        key={row.nome}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {row.nome}
          </Stack>
        </TableCell>
        <TableCell align="left">{row.ano_formatura}</TableCell>
        <TableCell align="left">
          {row.criado_em ? format(row.criado_em, "dd/MM/yyyy") : "N/As"}
        </TableCell>
        <TableCell align="left">
          <Stack direction={"row"}>
            {decoded?.tipo === "ADMIN" && (
              <Tooltip title="Editar Turma" arrow>
                <IconButton onClick={() => navigate(`/turmas/edit/${row.id}`)}>
                  {loadingDelete ? (
                    <CircularProgress color="secondary" size={12} />
                  ) : (
                    <MdModeEdit color="#2d1c63" size={22} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Visualizar Turma" arrow>
              <IconButton
                onClick={() => navigate(`/turmas/view/${row.id}/pagina-turma`)}
              >
                <FaEye color="#2d1c63" size={22} />
              </IconButton>
            </Tooltip>
            {decoded?.tipo === "ADMIN" && (
              <Tooltip title="Deletar Turma" arrow>
                <IconButton onClick={() => onClickDelete(row)}>
                  <FaTrashAlt size={20} className="text-red-600" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </TableCell>
      </TableRow>
    );
  };

  const dataRowStudent = (row: Turma) => {
    return (
      <TableRow
        key={row.nome}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            {row.nome}
          </Stack>
        </TableCell>
        <TableCell align="left">{row.ano_formatura}</TableCell>
        <TableCell align="left">
          {row.criado_em ? format(row.criado_em, "dd/MM/yyyy") : "N/As"}
        </TableCell>
        <TableCell align="left">
          <Tooltip title="Ver página da turma" arrow>
            <IconButton
              onClick={() => navigate(`/turmas/view/${row.id}/pagina-turma`)}
            >
              <FaEye color="#2d1c63" size={22} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetchTurmas();
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
            dispatchTurma({ type: "SET_TURMA_SELECIONADA", payload: null });
            navigate("/turmas/new");
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
            ) : turmas.length > 0 ? (
              <BasicTable
                columns={turmasColumns}
                rows={turmas}
                loading={loading}
                dataRow={
                  decoded?.tipo === "ADMIN" ? dataRowAdmin : dataRowStudent
                }
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="aluno"
                disabledButton={false}
                onClickAction={() => navigate("/turmas/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default TurmasPage;
