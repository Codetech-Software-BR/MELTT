import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { validateTurmaSchema } from "../../../utils/validationSchemas";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import "dayjs/locale/pt-br";
import LoadingBackdrop from "../../../components/loadingBackdrop";
import { apiGetData, apiPostData, apiPutData } from "../../../services/api";

import { BiSave } from "react-icons/bi";
import { LoadingButton } from "@mui/lab";
import { initialValuesTurma } from "../../../initialValues";

export type StudentInfo = {
  educacao_basica: string | undefined;
  deficit_geral: string | undefined;
  tipo_aprendizagem: string | undefined;
};

export type StudentInitialValuesFn = (
  id: string | undefined,
  stateAluno: any,
  initialStudentValues: Record<string, any>
) => typeof initialStudentValues;

const TurmasPageNew = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [faculdades, setFaculdades] = useState([]);

  const [loadingSave, setLoadingSave] = useState(false);
  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);

  const fetchFaculdades = async () => {
    await apiGetData("academic", `/faculdades`).then((data) =>
      setFaculdades(data)
    );
  };

  const onSubmitTurma = async (values: any) => {
    setLoadingSave(true);

    console.log("values", values);
    let dataObj = {
      ...values,
      faculdade_id: 1,
    };

    try {
      if (id) {
        const response = await apiPutData("academic", `/turmas/${id}`, dataObj);
        if (response.result.nome) {
          toast.success("Turma editada com sucesso");
          navigate(-1);
        }
      } else {
        const response = await apiPostData("academic", "/turmas", dataObj);
        if (response.id) {
          toast.success("Turma salvo com sucesso");
          navigate(-1);
        }
      }
    } catch (error) {
      toast.error("Erro ao salvar turma");
    }
    setLoadingSave(false);
  };

  useEffect(() => {
    fetchFaculdades();
  }, []);

  return (
    <Stack width={"100%"} height={"100%"} gap={10}>
      <Stack width={"calc(100% - 28px)"} direction={"column"}>
        <Typography
          color="primary"
          variant="h5"
          fontWeight={700}
          ml={4}
          mb={2}
        ></Typography>
        <Paper
          elevation={0}
          style={{
            fontFamily: "Poppins",
            position: "relative",
            padding: "12px",
            height: "calc(100vh - 132px)",
            overflow: "auto",
            borderRadius: "24px",
            backgroundColor: "#fff",
          }}
        >
          <Formik
            initialValues={{
              ...initialValuesTurma,
            }}
            validationSchema={validateTurmaSchema}
            onSubmit={(values: any) => onSubmitTurma(values)}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form
                className="h-[100%]"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                    () => {};
                  }
                }}
              >
                <Stack height={"100%"} justifyContent={"space-between"}>
                  <Box
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                    p={2}
                  >
                    <Stack direction={"column"}>
                      <Typography
                        color="primary"
                        fontFamily={"Poppins"}
                        fontWeight={600}
                      >
                        Cadastrar Nova Turma
                      </Typography>
                      <Typography
                        variant="caption"
                        color="primary"
                        fontFamily={"Poppins"}
                      >
                        preencha as informações abaixo, como nome da faculdade,
                        nome da turma e data de formatura.
                      </Typography>
                    </Stack>
                    <FormControl fullWidth>
                      <InputLabel id="faculdade">Faculdade</InputLabel>
                      <Select
                        name="faculdade"
                        color="primary"
                        value={values.faculdade}
                        onChange={handleChange}
                        sx={{ width: "49%" }}
                      >
                        {faculdades.map((option: any) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <TextField
                        fullWidth
                        name="nome"
                        variant="outlined"
                        focused
                        label="Nome da Turma"
                        value={values.nome}
                        onChange={handleChange}
                        placeholder="Qual o nome da sua turma ?"
                      />
                      <FormControl fullWidth>
                        <InputLabel id="ano_formatura">
                          Ano de Formatura
                        </InputLabel>
                        <Select
                          name="ano_formatura"
                          variant="outlined"
                          label="Data de Formatura da Turma"
                          value={values.ano_formatura}
                          error={errors.ano_formatura ? true : false}
                          onChange={handleChange}
                        >
                          <MenuItem value="2025">2025</MenuItem>
                          <MenuItem value="2026">2026</MenuItem>
                          <MenuItem value="2027">2027</MenuItem>
                          <MenuItem value="2028">2028</MenuItem>
                          <MenuItem value="2029">2029</MenuItem>
                          <MenuItem value="2030">2030</MenuItem>
                          <MenuItem value="2031">2031</MenuItem>
                          <MenuItem value="2032">2032</MenuItem>
                          <MenuItem value="2033">2033</MenuItem>
                          <MenuItem value="2034">2034</MenuItem>
                          <MenuItem value="2035">2035</MenuItem>
                          <MenuItem value="2036">2036</MenuItem>
                          <MenuItem value="2037">2037</MenuItem>
                          <MenuItem value="2038">2038</MenuItem>
                          <MenuItem value="2039">2039</MenuItem>
                          <MenuItem value="2040">2040</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Box>
                  <Stack
                    width={"100%"}
                    justifyContent={"flex-end"}
                    direction={"row"}
                    gap={2}
                    px={2}
                    mt={1}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => navigate("/turmas")}
                      sx={{ width: 120, borderRadius: 2 }}
                    >
                      Voltar
                    </Button>
                    <LoadingButton
                      type="submit"
                      color="secondary"
                      variant="contained"
                      size="small"
                      endIcon={<BiSave />}
                      loading={loadingSave}
                      sx={{ width: 120, borderRadius: 2 }}
                    >
                      Salvar
                    </LoadingButton>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
      <LoadingBackdrop
        open={openLoadingBackdrop}
        handleClose={() => setOpenLoadingBackdrop(false)}
      />
    </Stack>
  );
};

export default TurmasPageNew;
