import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slide,
  Stack,
  TableCell,
  TableRow,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import BasicTable from "../../components/table";
import { Key, useEffect, useState } from "react";
import { studentsColumns } from "./table/columns";
import { useNavigate } from "react-router-dom";
import { apiGetData, apiPutData } from "../../services/api";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import NoTableData from "../../components/noData";
import LoadingTable from "../../components/loadingTable";
import { FaTrashAlt } from "react-icons/fa";
import { useAlunoContext } from "../../providers/alunoContext";
import { FaRegEye } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";

interface Student {
  id: number;
  name: Key | null | undefined;
  nome: string;
  email: string;
  ativo: boolean | number;
  telefone: string;
  documento: string;
  turma_id: number;
}

const UsuariosPage = () => {
  const navigate = useNavigate();
  const { dispatchAluno } = useAlunoContext();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState(1);

  const [nome, setNome] = useState("");
  const [nomeDebounced, setNomeDebounced] = useState(nome);

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  function handleOpen(id: number) {
    console.log(id)
    setSelectedRowId(id);
    setOpen(true)
  };

  function handleClose() {
    setSelectedRowId(null);
    setOpen(false)
  };

  const handleDelete = () => {
    onClickDelete(selectedRowId);
    handleClose();
  };

  const handleChangeStatus = (event: SelectChangeEvent<number>) => {
    setStatus(event.target.value as number);
  };

  const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNome(event.target.value as string);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNomeDebounced(nome);
    }, 500); // 500ms de delay

    return () => clearTimeout(timeoutId);
  }, [nome]);

  const [students, setStudents] = useState([]);

  const [onLoad, setOnLoad] = useState(false);

  const fetchUsuarios = async (page:number) => {
    setLoading(true);
    try {
      let response;
      if (status === 2) {
        response = await apiGetData("academic", `/usuarios?nome=${nome}&page=${page ?? 1}`);
      } else {
        response = await apiGetData("academic", `/usuarios?ativo=${status}&nome=${nome}&page=${page ?? 1}`);
      }
      setTotalPages(response.totalPages);
      setStudents(response.data);
    } catch (error) {
      toast.error("Erro ao buscar alunos");
    }

    setLoading(false);
  };

  const onClickRowView = (row: any) => {
    dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/usuarios/view/${row.id}`);
  };

  const onClickRowEdit = (row: any) => {
    dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/usuarios/edit/${row.id}`);
  };

  const onClickDelete = async (id: number | null) => {
    setLoadingDelete(true);
    if (id === null) {
      toast.error("Erro ao desativar aluno");
      return;
    }
    try {
      const response = await apiPutData("academic", `/usuarios/${id}/inativar`);
      if (response.id) {
        fetchUsuarios(page);
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
          backgroundColor: row.id === selectedRowId ? "#eeeeee" : "inherit",
          transition: "background-color 0.3s",
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7" },
        }}
      >
        <TableCell component="th" scope="row">
          {row.nome}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.email}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.telefone}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.documento}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins", color: `${row.ativo ? "green" : "grey"}` }}>
          {row.ativo ? "Sim" : "Não"}
        </TableCell>
        <TableCell align="center" sx={{ fontFamily: "Poppins" }}>
          <IconButton size="small" onClick={() => onClickRowView(row)}>
            <FaRegEye color="#2d1c63" size={22} />
          </IconButton>
          <IconButton size="small" onClick={() => onClickRowEdit(row)}>
            <BiEdit color="#2d1c63" size={22} />
          </IconButton>
          {row.ativo === 1 && (
            <>
              <IconButton size="small" onClick={() => handleOpen(row.id)}>
                {loadingDelete
                  ? <CircularProgress color="secondary" size={10} />
                  : <FaTrashAlt color="red" />
                }
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}
                PaperProps={{ sx: { boxShadow: "none" } }}
              >
                <DialogTitle>Confirmar desativação?</DialogTitle>
                <DialogContent>Tem certeza que deseja desativar este usuário?</DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">Cancelar</Button>
                  <Button onClick={() => handleDelete()} color="error" autoFocus>Desativar</Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetchUsuarios(1);
    setOnLoad(true);
  }, [nomeDebounced, status]);

  return (
    <Stack width={"calc(100% - 64px)"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        my={2}
      >
        <Stack direction={'row'} alignItems={'center'} gap={2} py={1} width={'100%'}>
          <FormControl sx={{ width: '15%' }}>
            <InputLabel sx={{ bgcolor: 'secondary' }}>Status</InputLabel>
            <Select
              size="small"
              value={status ?? 1}
              label="status"
              onChange={handleChangeStatus}
            >
              <MenuItem value={1}>Ativos</MenuItem>
              <MenuItem value={0}>Inativos</MenuItem>
              <MenuItem value={2}>Todos</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: '30%' }}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              placeholder="Filtrar por nome"
              size="small"
              value={nome ?? ""}
              onChange={handleChangeNome}
            />
          </FormControl>
        </Stack>
        <Button
          color="secondary"
          variant="contained"
          endIcon={<IoMdAdd />}
          onClick={() => {
            navigate("/usuarios/edit");
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
            height: "calc(80vh - 20px)",
            flexGrow: 1,
            width: "100%",
          }}
        >

          <Paper
            elevation={0}
            sx={{
              height: "100%",
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
                page={page}
                totalPages={totalPages}
                columns={studentsColumns}
                rows={students}
                loading={loading}
                dataRow={dataRow}
                handleChangePagination={async (_, value) => {
                  await fetchUsuarios(value)
                  setPage(value)
                }}
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="aluno"
                disabledButton={false}
                onClickAction={() => navigate("/usuarios/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default UsuariosPage;
