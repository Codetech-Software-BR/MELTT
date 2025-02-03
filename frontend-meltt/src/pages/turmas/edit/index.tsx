import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { validateStudentSchema } from "../../../utils/validationSchemas";
import { useState } from "react";
import "dayjs/locale/pt-br";
import LoadingBackdrop from "../../../components/loadingBackdrop";
import { BiSave } from "react-icons/bi";

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

const TurmasPageEdit = () => {
  const navigate = useNavigate();

  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);

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
              faculdade: null,
              nome: "",
              ano_formatura: "",
            }}
            validationSchema={validateStudentSchema}
            onSubmit={() => {
              () => {};
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              >
                <Box p={2}>
                  {/* <Autocomplete
                    value={values.nome}
                    onChange={handleChange}
                    options={faculdades}
                    renderInput={(params) => (
                      <TextField focused {...params} label="Faculdade" />
                    )}
                    sx={{ width: "50%" }}
                  /> */}
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <TextField
                      variant="outlined"
                      focused
                      label="Nome da Turma"
                      value={values.nome}
                      onChange={handleChange}
                      placeholder="Qual o nome da sua turma ?"
                      sx={{ width: "50%" }}
                    />
                    <TextField
                      variant="outlined"
                      focused
                      type="date"
                      label="Data de Formatura da Turma"
                      value={values.ano_formatura}
                      onChange={handleChange}
                      sx={{ width: "50%" }}
                    />
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
                    onClick={() => navigate(-1)}
                    sx={{ width: 120, borderRadius: 2 }}
                  >
                    Voltar
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    endIcon={<BiSave />}
                    onClick={() => {}}
                    sx={{ width: 120, borderRadius: 2 }}
                  >
                    Salvar
                  </Button>
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

export default TurmasPageEdit;
