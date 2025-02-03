import { LoadingButton } from "@mui/lab";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import NewPasswordImage from "../../assets/newPassword";

const SenhaAlteradaSucessoPage = () => {
  const [loading, setLoading] = React.useState(false);

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

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
          <Stack
            gap={3}
            component={"form"}
            direction={"column"}
            onSubmit={onSubmit}
          >
            <Stack direction={"column"} alignItems={"center"} gap={2}>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ color: "#342394" }}
              >
                SENHA ALTERADA COM SUCESSO
              </Typography>
              <Typography
                color="textPrimary"
                variant="body2"
                fontWeight={200}
                maxWidth={"370px"}
                textAlign={"center"}
                sx={{ color: "#525252" }}
              >
                Sua senha foi alterada com sucesso! Agora você pode acessar sua
                conta Eduflex com a nova senha.
              </Typography>
            </Stack>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              size="small"
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
              Voltar
            </LoadingButton>
          </Stack>
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

export default SenhaAlteradaSucessoPage;
