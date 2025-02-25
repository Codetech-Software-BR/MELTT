import {
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
import BasicTable from "../../components/table";
import { Key, useEffect, useState } from "react";
import { studentsColumns } from "./table/columns";
import { useNavigate } from "react-router-dom";
import { apiDeleteData, apiGetData } from "../../services/api";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import NoTableData from "../../components/noData";
import LoadingTable from "../../components/loadingTable";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useAlunoContext } from "../../providers/alunoContext";
import { FaEye } from "react-icons/fa6";

interface Student {
  id: number;
  name: Key | null | undefined;
  nome: string;
  telefone: string;
  documento: string;
  turma_id: number;
}

const AlunosPage = () => {
  const navigate = useNavigate();
  const { dispatchAluno } = useAlunoContext();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [loadingTurmas, setLoadingTurmas] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [students, setStudents] = useState([]);

  const [onLoad, setOnLoad] = useState(false);

  const fetchTurmas = async () => {
    setLoadingTurmas(true);
    await apiGetData("academic", `/turmas`).then((response) => setTurmas(response.data));
    setLoadingTurmas(false);
  };

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", "/alunos");
      setTotalPages(response.totalPages);
      setStudents(response.data);
    } catch (error) {
      toast.error("Erro ao buscar alunos");
    }

    setLoading(false);
  };

  const onClickRowView = (row: any) => {
    dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/alunos/view/${row.id}`);
  };

  const onClickRowEdit = (row: any) => {
    dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/alunos/edit/${row.id}`);
  };

  const onClickDelete = async (id: number) => {
    setLoadingDelete(true);
    try {
      const response = await apiDeleteData("academic", `/alunos/${id}`);
      if (response.id) {
        fetchAlunos();
        toast.success("Aluno excluído com sucesso");
      }
      console.log("response", response);
    } catch (error) {
      toast.error("Erro ao excluir aluno");
    }
    setLoadingDelete(false);
  };

  const dataRow = (row: Student) => {
    return (
      <TableRow
        key={row.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          <Link
            color="primary"
            underline="always"
            onClick={() => onClickRowView(row)}
            sx={{ fontFamily: "Poppins" }}
          >
            {row.nome}
          </Link>
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.documento}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.telefone}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {turmas.find((turma: any) => turma.id === row.turma_id)?.nome}
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
    fetchTurmas();
    console.log(turmas)
    fetchAlunos();
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
            navigate("/alunos/edit");
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
            ) : students.length > 0 ? (
              <BasicTable
                totalPages={totalPages}
                columns={studentsColumns}
                rows={students}
                loading={loading}
                dataRow={dataRow}
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="aluno"
                disabledButton={false}
                onClickAction={() => navigate("/alunos/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default AlunosPage;
