import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import { validateFaculdadeSchema } from "../../../utils/validationSchemas";
import toast from "react-hot-toast";
import { useState } from "react";
import "dayjs/locale/pt-br";
import LoadingBackdrop from "../../../components/loadingBackdrop";
import { apiPostData, apiPutData } from "../../../services/api";
import { LoadingButton } from "@mui/lab";
import { BiSave } from "react-icons/bi";

import {
  useFaculdadeContext,
} from "../../../providers/faculdadeContext";
import { initialValuesFaculdade } from "../../../initialValues";

const FaculdadesPageEdit = () => {
  const navigate = useNavigate();
  const { stateFaculdade } = useFaculdadeContext();

  const { id } = useParams();

  const [openLoadingBackdrop, setOpenLoadingBackdrop] = useState(false);
  const [loadingFaculdade, setLoadingFaculdade] = useState(false);

  const getFaculdadeInitialValue = Object.keys(initialValuesFaculdade).reduce(
    (acc, key) => {
      (acc as any)[key] = id
        ? stateFaculdade.faculdadeSelecionada?.[key as keyof typeof initialValuesFaculdade]
        : initialValuesFaculdade[key as keyof typeof initialValuesFaculdade];
      return acc;
    },
    {} as typeof initialValuesFaculdade 
  );

  const onSubmitFaculdade = async (values: any) => {
    setLoadingFaculdade(true);
    try {
      if (id) {
        const response = await apiPutData(
          "academic",
          `/faculdades/${id}`,
          values
        );
        console.log("response edit", response);
        if (response.result?.nome) {
          toast.success("Faculdade atualizada com sucesso");
          navigate("/faculdades");
        }
      } else {
        const response = await apiPostData("academic", "/faculdades", values);
        console.log("response create", response);

        if (response.id) {
          toast.success("Faculdade salvo com sucesso");
          navigate("/faculdades");
        }
      }
    } catch (error) {
      toast.error("Erro ao salvar aluno");
    }
    setLoadingFaculdade(false);
  };

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
              ...getFaculdadeInitialValue,
            }}
            validationSchema={validateFaculdadeSchema}
            onSubmit={(values: any) => onSubmitFaculdade(values)}
          >
            {({
              values,
              handleChange,
              handleSubmit,
            }) => (
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
                    <Typography fontWeight={600}>
                      Dados da Faculdade
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >
                      preencha com as informações necessárias da faculdade
                    </Typography>
                  </Stack>
                  <Stack width={"100%"} direction={"row"} gap={2}>
                    <TextField
                      fullWidth
                      label="Nome"
                      name="nome"
                      placeholder="nome da faculdade"
                      value={values.nome}
                      onChange={handleChange}
                    />
                    <TextField
                      fullWidth
                      label="Endereço"
                      name="endereco"
                      placeholder="ex: logradouro, bairro"
                      value={values.endereco}
                      onChange={handleChange}
                    />
                  </Stack>
                  <Stack width={"50%"} direction={"row"}>
                    <TextField
                      label="Telefone para contato"
                      name="telefone"
                      placeholder="(XX) XXXXX-XXXX"
                      value={values.telefone}
                      onChange={handleChange}
                    />
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
                    onClick={() => navigate("/faculdades")}
                    sx={{ width: 120, borderRadius: 2, fontFamily: "Poppins" }}
                  >
                    Voltar
                  </Button>
                  <LoadingButton
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="small"
                    loading={loadingFaculdade}
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

export default FaculdadesPageEdit;
