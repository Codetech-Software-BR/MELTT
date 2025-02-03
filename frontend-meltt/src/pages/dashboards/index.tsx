import {
  Paper,
  Slide,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { getToken } from "../../utils/token";
import { CustomJwtPayload } from "../../components/customDrawer";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import BasicTable from "../../components/table";
import { apiGetData } from "../../services/api";
import { format } from "date-fns";
import { dashboardActivitiesColumns, dashboarStudentsColumns } from "./columns";
import LoadingTable from "../../components/loadingTable";
import BoxDashboardValues from "../../components/box/dashboardValues";
import CustomLineChart from "../../components/charts/line";

const DashboardAlunosPage = () => {
  const token = getToken();
  const decoded = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const [loading, setLoading] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  const [listStudents, setStudents] = useState<any[]>([]);
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

  const dataRowStudents = (row: any) => {
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
        <TableCell align="left">{row.telefone}</TableCell>
      </TableRow>
    );
  };

  useEffect(() => {
    setLoading(false);
    if (decoded?.tipo == "PROFESSOR") {
      apiGetData("academic", `/atividades/professor/${decoded?.id}`).then(
        (res) => setListAtividades(res.slice(0, 5))
      );
      apiGetData(
        "academic",
        `/alunos/professor/${encodeURIComponent(decoded?.nome || "")}`
      ).then((res) => setStudents(res.slice(0, 5)));
    } else {
      // apiGetData("academic", "/atividades/getAll").then((res) =>
      //   setListAtividades(res.slice(0, 5))
      // );
      apiGetData("academic", `/alunos`).then((res) =>
        setStudents(res.slice(0, 5))
      );
    }
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
                      fontFamily={"Poppins"}
                    >
                      Detalhamento dos pagamentos
                    </Typography>
                    {/* <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontFamily={"Poppins"}
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
                    justifyContent={"space-between"}
                    mb={2}
                  >
                    <Typography
                      color="primary"
                      variant="body1"
                      fontWeight={600}
                      fontFamily={"Poppins"}
                    >
                      Alunos Cadastrados
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontFamily={"Poppins"}
                      sx={{ mr: 2 }}
                    >
                      total de alunos: {listStudents?.length}
                    </Typography>
                  </Stack>
                  {loading ? (
                    <LoadingTable />
                  ) : listStudents.length > 0 ? (
                    <BasicTable
                      columns={dashboarStudentsColumns}
                      rows={listStudents}
                      loading={false}
                      dataRow={dataRowStudents}
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

export default DashboardAlunosPage;
