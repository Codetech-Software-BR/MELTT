import {
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import BasicTable from "../../../components/table";
import { apiGetData } from "../../../services/api";
import { format } from "date-fns";
import { dashboardActivitiesColumns, dashboarStudentsColumns } from "./columns";
import LoadingTable from "../../../components/loadingTable";
import BoxDashboardValues from "../../../components/box/dashboardValues";
import CustomLineChart from "../../../components/charts/line";

const DashboardFornecedoresPage = () => {
  const [onLoad, setOnLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listFornecedores, setListFornecedores] = useState<any[]>([]);
  const [listAtividades, setListAtividades] = useState<any[]>([]);

  const dataRowActivities = (row: any) => {
    return (
      <TableRow
        key={row.name}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="body1" color="primary" fontWeight={600}>
              {row.objetivo}
            </Typography>
            <Stack direction={"row"} gap={1}>
              <HiOutlineClipboardDocument className="text-gray-400" />
              <Typography fontSize={10} color="textSecondary">
                {format(row.data_atividade, "dd/MM/yyyy")}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>
        <TableCell align="left">{row.aluno_nome}</TableCell>
        <TableCell align="left">{row.materia}</TableCell>
      </TableRow>
    );
  };

  const dataRowFornecedores = (row: any) => {
    return (
      <TableRow
        key={row.name}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          " &:hover": { bgcolor: "#F7F7F7", cursor: "pointer" },
        }}
      >
        <TableCell component="th" scope="row">
          <Stack direction={"column"} gap={0.5}>
            <Typography variant="body2" color="primary" fontWeight={600}>
              {row.nome}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">{row.tipo_servico}</TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    setLoading(false);
    // apiGetData("academic", "/atividades/getAll").then((res) =>
    //   setListAtividades(res.slice(0, 5))
    // );
    apiGetData("academic", `/fornecedores`).then((res) =>
      setListFornecedores(res.slice(0, 5))
    );

    setOnLoad(true);
  }, []);

  return (
    <Stack width={"calc(100% - 28px)"} height={"100%"}>
      <Stack
        direction={"column"}
        height={"calc(100vh - 100px)"}
        overflow={"auto"}
        gap={4}
        sx={{
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
        <Slide
          direction="right"
          in={onLoad}
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <BoxDashboardValues title="Valor recebido" />
            <BoxDashboardValues title="Valor a receber" />
            <BoxDashboardValues title="Total inadimplente" />
          </Stack>
        </Slide>
        <Slide direction="right" in={onLoad} mountOnEnter>
          <Stack direction={"column"}>
            <CustomLineChart
              data={[
                {
                  data_valor: "2021-01-01",
                  valor_pago: 500,
                },
                {
                  data_valor: "2021-02-01",
                  valor_pago: 2000,
                },
                {
                  data_valor: "2021-03-01",
                  valor_pago: 1500,
                },
                {
                  data_valor: "2021-04-01",
                  valor_pago: 3000,
                },
              ]}
            />
            <Stack direction={"row"} gap={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  flexGrow: 1,
                  width: "100%",
                  height: "calc(100vh - 200px)",
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
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                      color="primary"
                      variant="body1"
                      fontWeight={600}
                    >
                      Detalhamentos dos pagamentos
                    </Typography>
                    {/* <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    sx={{mr: 2}}
                  >
                    total de atividades: {listAtividades?.length}
                  </Typography> */}
                  </Stack>
                  {loading ? (
                    <LoadingTable />
                  ) : listAtividades.length > 0 ? (
                    <BasicTable
                      columns={dashboardActivitiesColumns}
                      rows={listAtividades}
                      loading={false}
                      dataRow={dataRowActivities}
                    />
                  ) : (
                    <Stack
                      height={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Typography
                        textAlign={"center"}
                        color="textSecondary"
                        variant="subtitle2"
                      >
                        Desculpe, nenhuma informação encontrada 🙈
                      </Typography>
                    </Stack>
                  )}
                </Paper>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  flexGrow: 1,
                  width: "100%",
                  height: "calc(100vh - 200px)",
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
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mb={2}
                  >
                    <Typography
                      color="primary"
                      variant="body1"
                      fontWeight={600}
                    >
                      Fornecedores Cadastrados
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{ mr: 2 }}
                    >
                      total de fornecedores: {listFornecedores?.length}
                    </Typography>
                  </Stack>
                  {loading ? (
                    <LoadingTable />
                  ) : listFornecedores.length > 0 ? (
                    <BasicTable
                      columns={dashboarStudentsColumns}
                      rows={listFornecedores}
                      loading={false}
                      dataRow={dataRowFornecedores}
                    />
                  ) : (
                    <Stack
                      height={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Typography
                        textAlign={"center"}
                        color="textSecondary"
                        variant="subtitle2"
                      >
                        Desculpe, nenhum aluno encontrado 🙈
                      </Typography>
                    </Stack>
                  )}
                </Paper>
              </Paper>
            </Stack>
          </Stack>
        </Slide>
      </Stack>
    </Stack>
  );
};

export default DashboardFornecedoresPage;
