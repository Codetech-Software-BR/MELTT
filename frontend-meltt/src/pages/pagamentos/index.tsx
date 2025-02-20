import {
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
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
import { FaEye } from "react-icons/fa6";
import { pagamentosColumns } from "./table/columns";
import { format } from "date-fns";
import { BiSearch } from "react-icons/bi";

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
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);

  const [onLoad, setOnLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [filterSituation, setFilterSituation] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const fetchPagamentos = async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      params.append("pagina", page.toString());
      if (filterSituation) {
        params.append("situacoes", filterSituation);
      }
      if (filterDate) {
        params.append("dataInicial", filterDate);
      }
  
      const response = await apiGetData("academic", `/bling/contas/receber?${params.toString()}`);
      setPayments(response.data);
    } catch (error) {
      toast.error("Erro ao buscar Pagamento");
    }
    setLoading(false);
  };
  
  const fetchWithFilters = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
  
      if (filterSituation) {
        params.append("situacoes", filterSituation);
      }
      if (filterDate) params.append("dataInicial", filterDate);
  
      const response = await apiGetData("academic", `/bling/contas/receber?${params.toString()}`);
      setPayments(response.data);
    } catch (error) {
      toast.error("Erro ao aplicar filtro");
    }
    setLoading(false);

  }


  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    try {
      fetchPagamentos(value);
    } catch (error) {
      toast.error("Erro ao buscar Pagamentos");
    }
    setPage(value);
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
    fetchPagamentos(1);
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
          <Stack direction={'row'} alignItems={'center'} gap={2} p={2}>
            <FormControl sx={{ width: '20%' }}>
              <InputLabel sx={{ p: 0.3, bgcolor: '#fff' }}>filtrar por Status</InputLabel>
              <Select
                value={filterSituation}
                label="status"
                onChange={(e) => setFilterSituation(e.target.value)}
              >
                <MenuItem value={2}>Pago</MenuItem>
                <MenuItem value={1}>Em Aberto</MenuItem>
                <MenuItem value={5}>Cancelado</MenuItem>
              </Select>
            </FormControl>
            <Button color="primary" size="small" startIcon={<BiSearch />} onClick={fetchWithFilters}>
              Buscar
            </Button>
          </Stack>
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
                page={page}
                handleChangePagination={handleChangePagination}
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
