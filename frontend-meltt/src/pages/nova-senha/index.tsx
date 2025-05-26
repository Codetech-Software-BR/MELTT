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
import * as Yup from "yup";
import { Toaster } from "react-hot-toast";
import NewPasswordImage from "../../assets/newPassword";
import { RiLockLine } from "react-icons/ri";

const NovaSenhaPage = () => {
  const [loading, setLoading] = React.useState(false);

  const onRecoverPassword = (values: any) => {
    setLoading(true);
    console.log("Recover password", values);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const validationSchema = Yup.object({
    senha: Yup.string().required("Senha é obrigatório"),
    novasenha: Yup.string().required("A nova senha é obrigatória"),
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
              senha: "",
              novasenha: "",
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
                    CRIAR NOVA SENHA
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                    fontWeight={200}
                    maxWidth={"370px"}
                    textAlign={"center"}
                    sx={{ color: "#525252" }}
                  >
                    Crie uma nova senha para acessar sua conta Eduflex.
                    Lembre-se de escolher uma senha segura e fácil de lembrar!
                  </Typography>
                </Stack>
                <Stack direction={"column"}>
                  <TextField
                    label=""
                    type="text"
                    placeholder="*********"
                    size="medium"
                    variant="outlined"
                    name="senha"
                    onChange={handleChange}
                    value={values.senha}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <RiLockLine size={26} />
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
                  {errors.senha && (
                    <small style={{ fontFamily:"Poppins", color: "#EB420E" }}>{errors.senha}</small>
                  )}
                </Stack>
                <Stack direction={"column"}>
                  <TextField
                    label=""
                    type="text"
                    placeholder="Confirmar nova senha"
                    size="medium"
                    variant="outlined"
                    name="novasenha"
                    onChange={handleChange}
                    value={values.novasenha}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <RiLockLine size={26} />
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
                  {errors.novasenha && (
                    <small style={{ fontFamily:"Poppins", color: "#EB420E" }}>
                      {errors.novasenha}
                    </small>
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
            <NewPasswordImage />
          </Stack>
        </Stack>
      </Box>
      <Toaster />
    </Stack>
  );
};

export default NovaSenhaPage;
