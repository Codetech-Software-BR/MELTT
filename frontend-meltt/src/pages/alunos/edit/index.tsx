import {
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

import { validateStudentSchema } from "../../../utils/validationSchemas";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import "dayjs/locale/pt-br";
import LoadingBackdrop from "../../../components/loadingBackdrop";
import { apiGetData, apiPostData, apiPutData } from "../../../services/api";
import { LoadingButton } from "@mui/lab";
import { BiSave } from "react-icons/bi";
import { useAlunoContext } from "../../../providers/alunoContext";
import { initialValuesAluno } from "../../../initialValues";

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

const AlunosPageEdit = () => {
  const navigate = useNavigate();
  const { stateAluno } = useAlunoContext();

  const { id } = useParams();

  const [faculdades, setFaculdades] = useState([]);
  const [turmas, setTurmas] = useState([]);

  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);
  const [loadingAluno, setLoadingAluno] = useState(false);
  const [loadingFaculdades, setLoadingFaculdades] = useState(false);
  const [loadingTurmas, setLoadingTurmas] = useState(false);

  const getAlunosInitialValue = Object.keys(initialValuesAluno).reduce(
    (acc, key) => {
      const typedKey = key as keyof typeof initialValuesAluno;
      acc[typedKey] = id
        ? stateAluno.alunoSelecionado?.[typedKey]
        : initialValuesAluno[typedKey];
      return acc;
    },
    {} as any
  );

  const fetchFaculdades = async () => {
    setLoadingFaculdades(true);
    await apiGetData("academic", `/faculdades`).then((data) =>
      setFaculdades(data)
    );
    setLoadingFaculdades(false);
  };

  const fetchTurmas = async () => {
    setLoadingTurmas(true);
    await apiGetData("academic", `/turmas`).then((data) => setTurmas(data));
    setLoadingTurmas(false);
  };

  const onSubmitAluno = async (values: any) => {
    setLoadingAluno(true);
    try {
      if (id) {
        const response = await apiPutData("academic", `/alunos/${id}`, values);
        console.log("response edit", response);
        if (response.value?.id) {
          toast.success("Aluno atualizado com sucesso");
          navigate("/alunos");
        }
      } else {
        const response = await apiPostData("academic", "/alunos", values);

        if (response.id) {
          toast.success("Aluno salvo com sucesso");
          navigate("/alunos");
        }
      }
    } catch (error) {
      toast.error("Erro ao salvar aluno");
    }
    setLoadingAluno(false);
  };

  useEffect(() => {
    fetchFaculdades();
    fetchTurmas();
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
              ...getAlunosInitialValue,
            }}
            validationSchema={validateStudentSchema}
            onSubmit={(values: any) => onSubmitAluno(values)}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form
                className="h-[100%] flex flex-col justify-between"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              >
                <Stack padding={2} gap={2} width={"100%"}>
                  <Stack direction={"column"}>
                    <Typography fontFamily={"Poppins"} fontWeight={600}>
                      Dados do Aluno
                    </Typography>
                    <Typography
                      fontFamily={"Poppins"}
                      variant="caption"
                      color="textSecondary"
                    >
                      preencha com as informações básicas do aluno, selecionando
                      faculdade e turma a qual ele é vinculado.
                    </Typography>
                  </Stack>
                  <Stack width={"100%"} direction={"row"} gap={2}>
                    <TextField
                      fullWidth
                      focused
                      label="Nome"
                      name="nome"
                      placeholder="nome completo do aluno"
                      size="small"
                      value={values.nome}
                      error={Boolean(errors.nome)}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      focused
                      label="E-mail"
                      name="email"
                      placeholder="fulanodetal@gmail.com"
                      size="small"
                      value={values.email}
                      error={Boolean(errors.email)}
                      onChange={handleChange}
                    />
                  </Stack>
                  <Stack width={"100%"} direction={"row"} gap={2}>
                    <TextField
                      focused
                      label="Telefone Celular"
                      name="telefone"
                      placeholder="(XX) XXXXX-XXXX"
                      size="small"
                      value={values.telefone}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      focused
                      label="Plano da Formatura"
                      name="plano"
                      placeholder="ex: Básico, Completo"
                      size="small"
                      value={values.plano}
                      error={Boolean(errors.plano)}
                      onChange={handleChange}
                    />
                  </Stack>
                  <Stack width={"100%"} direction={"row"} gap={2}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ p: 0.5, bgcolor: "#fff" }}>Faculdade</InputLabel>
                      <Select
                        fullWidth
                        name="faculdade"
                        disabled={loadingFaculdades}
                        size="small"
                        value={values.faculdade}
                        onChange={handleChange}
                      >
                        {faculdades.map((faculdade: any) => (
                          <MenuItem value={faculdade.id}>
                            {faculdade.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel sx={{ p: 0.5, bgcolor: "#fff" }}>Turma</InputLabel>
                      <Select
                        fullWidth
                        name="turma_id"
                        size="small"
                        value={values.turma}
                        disabled={loadingTurmas}
                        onChange={handleChange}
                      >
                        {turmas.map((turma: any) => (
                          <MenuItem value={turma.id}>{turma.nome}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack width={"40%"}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ p: 0.5, bgcolor: "#fff" }}>Formatura foi paga integralmente?</InputLabel>
                      <Select
                        fullWidth
                        name="formatura_paga"
                        size="small"
                        value={values.formatura_paga}
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Sim, já foi paga</MenuItem>
                        <MenuItem value={0}>Não foi paga</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
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
                    onClick={() => navigate("/alunos")}
                    sx={{ width: 120, borderRadius: 2, fontFamily: "Poppins" }}
                  >
                    Voltar
                  </Button>
                  <LoadingButton
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="small"
                    loading={loadingAluno}
                    endIcon={<BiSave />}
                    sx={{ width: 120, borderRadius: 2, fontFamily: "Poppins" }}
                  >
                    Salvar
                  </LoadingButton>
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

export default AlunosPageEdit;
