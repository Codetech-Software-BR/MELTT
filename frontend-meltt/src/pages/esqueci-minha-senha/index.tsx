import { LoadingButton } from "@mui/lab";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { FiUser } from "react-icons/fi";
import RecoverPasswordImage from "../../assets/recoverPassword";
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";

const EsqueciMinhaSenhaPage = () => {
  const [loading, setLoading] = React.useState(false);

  const onRecoverPassword = (values: any) => {
    setLoading(true);
    console.log("Recover password", values);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório"),
  });

  return (
    <Stack
      width={"100%"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        height={600}
        bgcolor={"#ffff"}
        borderRadius={"32px"}
      >
        <Stack
          width={500}
          justifyContent={"center"}
          bgcolor={"#fff"}
          borderRadius={"12px 0 0 12px"}
          px={6}
        >
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onRecoverPassword(values);
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <Stack
                gap={3}
                component={"form"}
                direction={"column"}
                onSubmit={handleSubmit}
              >
                <Stack direction={"column"} alignItems={"center"} gap={2}>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{ color: "#342394" }}
                  >
                    ESQUECI MINHA SENHA
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    fontWeight={200}
                    maxWidth={"370px"}
                    textAlign={'center'}
                    sx={{ color: "#525252" }}
                  >
                    Esqueceu sua senha? Não se preocupe! Insira seu e-mail para
                    receber as instruções de redefinição e recuperar o acesso à
                    sua conta na Eduflex.
                  </Typography>
                </Stack>
                <Stack direction={"column"}>
                  <TextField
                    label=""
                    type="text"
                    placeholder="E-mail"
                    size="medium"
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiUser size={26} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        bgcolor: "#F3F4FF"
                      },
                    }}
                  />
                  {errors.email && (
                    <small style={{ color: "#EB420E" }}>{errors.email}</small>
                  )}
                </Stack>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  size="large"
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#342394",
                    fontWeight: 700,
                    borderRadius: "16px",
                    height: "50px",
                    fontFamily: "Mulish",
                    textTransform: "none",
                  }}
                >
                  Recuperar minha senha
                </LoadingButton>
              </Stack>
            )}
          </Formik>
        </Stack>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          width={500}
          borderRadius={"0 32px 32px 0 "}
        >
          <Stack ml={6}>
            <RecoverPasswordImage />
          </Stack>
        </Stack>
      </Box>
      <Toaster />
    </Stack>
  );
};

export default EsqueciMinhaSenhaPage;
