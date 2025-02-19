import {
  Chip,
  IconButton,
  Link,
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import BasicTable from "../../components/table";
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetData } from "../../services/api";
import { EnumStudentBasicEducation } from "../../utils/enums";
import toast from "react-hot-toast";
import NoTableData from "../../components/noData";
import LoadingTable from "../../components/loadingTable";
import { MdOutlinePayments } from "react-icons/md";
import { useAlunoContext } from "../../providers/alunoContext";
import { FaEye } from "react-icons/fa6";
import { pagamentosColumns } from "./table/columns";
import { format } from "date-fns";

interface Student {
  id: number;
  name: Key | null | undefined;
  contato: {
    nome: string;
    numeroDocumento: string;
  };
  valor: string;
  vencimento: string;
  situacao: number;
  plano: string;
  linkBoleto: string;
  educacao_basica: keyof typeof EnumStudentBasicEducation;
  formatura_paga: boolean;
  turma: string;
}

const PagamentosPage = () => {
  const navigate = useNavigate();
  const { dispatchAluno } = useAlunoContext();
  const [loading, setLoading] = useState(false);

  const [payments, setPayments] = useState([]);

  const [onLoad, setOnLoad] = useState(false);

  const fetchPagamentos = async () => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", "/bling/contas/receber");
      setPayments(response.data);
    } catch (error) {
      toast.error("Erro ao buscar Pagamento");
    }

    setLoading(false);
  };

  const onClickRowView = (row: any) => {
    dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
    navigate(`/alunos/view/${row.id}`);
  };

  // const onClickRowEdit = (row: any) => {
  //   dispatchAluno({ type: "SET_ALUNO_SELECIONADO", payload: row });
  //   navigate(`/alunos/edit/${row.id}`);
  // };

  // const onClickDelete = async (id: number) => {
  //   setLoadingDelete(true);
  //   try {
  //     const response = await apiDeleteData("academic", `/alunos/${id}`);
  //     if (response.id) {
  //       fetchPagamentos();
  //       toast.success("Aluno excluído com sucesso");
  //     }
  //     console.log("response", response);
  //   } catch (error) {
  //     toast.error("Erro ao excluir aluno");
  //   }
  //   setLoadingDelete(false);
  // };

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
            {row.contato.nome}
          </Link>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.contato.numeroDocumento}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          R$ {row.valor}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          {row.vencimento ? format(new Date(row.vencimento), "dd/MM/yyyy") : ""}
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          <Chip
            label={row.situacao === 2 ? "Pago" : row.situacao === 1 ? 'Em Aberto' : 'Cancelado'}
            color={row.situacao === 2 ? "success" : row.situacao === 1 ? "warning" : "error"}
            variant="filled"
            icon={<MdOutlinePayments />}
            sx={{ padding: 1 }}
          />
        </TableCell>
        <TableCell align="left" sx={{ fontFamily: "Poppins" }}>
          <Tooltip title="Visualizar Boleto">
            <IconButton size="small" onClick={() => window.location.href = row.linkBoleto}>
              <FaEye color="#2d1c63" size={22} />
            </IconButton>
          </Tooltip>
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
            ) : payments.length > 0 ? (
              <BasicTable
                columns={pagamentosColumns}
                rows={payments}
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

export default PagamentosPage;
