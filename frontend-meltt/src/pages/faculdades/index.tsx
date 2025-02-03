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
import { useNavigate } from "react-router-dom";
import { apiDeleteData, apiGetData } from "../../services/api";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import NoTableData from "../../components/noData";
import LoadingTable from "../../components/loadingTable";
import { faculdadesColumns } from "./table/columns";
import { format } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { useFaculdadeContext } from "../../providers/faculdadeContext";

interface Faculdade {
  id: number;
  nome: string;
  endereco: string;
  telefone: string;
  criado_em: any;
}

const FaculdadesPage = () => {
  const navigate = useNavigate();
  const { dispatchFaculdade } = useFaculdadeContext();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [faculdades, setFaculdades] = useState([]);
  const [onLoad, setOnLoad] = useState(false);

  const fetchFaculdades = async () => {
    setLoading(true);
    try {
      const response = await apiGetData("academic", "/faculdades");
      setFaculdades(response);
    } catch (error) {
      toast.error("Erro ao buscar alunos");
    }

    setLoading(false);
  };

  const onClickRow = (row: any) => {
    dispatchFaculdade({ type: "SET_FACULDADE_SELECIONADA", payload: row });
    navigate(`/faculdades/edit/${row.id}`);
  };

  const onClickDelete = async (row: Faculdade) => {
    setLoadingDelete(true);
    try {
      const response = await apiDeleteData("academic", `/faculdades/${row.id}`);
      if (response.id) {
        fetchFaculdades();
        toast.success("Faculdade excluída com sucesso");
      }
      console.log("response", response);
    } catch (error) {
      toast.error("Erro ao excluir faculdade");
    }
    setLoadingDelete(false);
  };

  const dataRow = (row: Faculdade) => {
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
        <TableCell align="left">{row.endereco}</TableCell>
        <TableCell align="left">{row.telefone}</TableCell>
        <TableCell align="left">
          {row.criado_em ? format(row.criado_em, "dd/MM/yyyy") : "N/As"}
        </TableCell>
        <TableCell align="left">
          <Stack direction={"row"}>
            <Tooltip title="Editar Faculdade" arrow>
              <IconButton onClick={() => onClickRow(row)}>
                <MdModeEdit color="#2d1c63" size={22} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Deletar Faculdade" arrow>
              <IconButton onClick={() => onClickDelete(row)}>
                {loadingDelete ? (
                  <CircularProgress color="secondary" size={12} />
                ) : (
                  <FaTrashAlt size={20} className="text-red-600" />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    fetchFaculdades();
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
            dispatchFaculdade({
              type: "SET_FACULDADE_SELECIONADA",
              payload: null,
            });
            navigate("/faculdades/edit");
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
            ) : faculdades.length > 0 ? (
              <BasicTable
                columns={faculdadesColumns}
                rows={faculdades}
                loading={loading}
                dataRow={dataRow}
              />
            ) : (
              <NoTableData
                pronoum={"he"}
                pageName="faculdade"
                disabledButton={false}
                onClickAction={() => navigate("/faculdades/edit")}
              />
            )}
          </Paper>
        </Paper>
      </Slide>
    </Stack>
  );
};

export default FaculdadesPage;
