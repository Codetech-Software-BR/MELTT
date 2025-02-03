import {
  Button,
  Chip,
  IconButton,
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
} from "@mui/material";
import BasicTable from "../../components/table";
import { useEffect, useState } from "react";
import { useTurmaContext } from "../../providers/turmaContext";
import { useNavigate } from "react-router-dom";
import { apiGetData } from "../../services/api";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import NoTableData from "../../components/noData";
import LoadingTable from "../../components/loadingTable";
import { pagamentosColumns } from "./table/columns";
import { FaEye } from "react-icons/fa6";

interface Pagamento {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  formatura_paga: string;
}

const PagamentosPage = () => {
  const navigate = useNavigate();
  const { dispatchTurma } = useTurmaContext();
  const [loading, setLoading] = useState(false);
  const [pagamentos, setPagamentos] = useState([]);
  const [onLoad, setOnLoad] = useState(false);

  const fetchPagamentos = async () => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", "/alunos");
      setPagamentos(response);
    } catch (error) {
      toast.error("Erro ao buscar pagamentos");
    }
    setLoading(false);
  };

  const dataRow = (row: Pagamento) => {
    return (
      <TableRow
        key={row.nome}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          {row.nome}
        </TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.telefone}</TableCell>
        <TableCell align="left">
          <Chip
            variant="filled"
            color={row.formatura_paga ? "success" : "error"}
            label={row.formatura_paga ? "Fatura paga" : "Fatura não paga"}
          />
        </TableCell>
        <TableCell align="left">
          <IconButton onClick={() => navigate(`/pagamentos/view/${row.id}`)}>
            <FaEye color="#2d1c63" size={22} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetchPagamentos();
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
            navigate("/pagamentos/edit");
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
            ) : pagamentos.length > 0 ? (
              <BasicTable
                columns={pagamentosColumns}
                rows={pagamentos}
                loading={loading}
                dataRow={dataRow}
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="pagamento"
                disabledButton={false}
                onClickAction={() => navigate("/pagamentos/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default PagamentosPage;
