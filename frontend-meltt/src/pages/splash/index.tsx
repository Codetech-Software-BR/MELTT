import { Box, CircularProgress, Slide, Stack, Typography } from "@mui/material";
import MelttLogo from "../../assets/logo/melttLogo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulsingMovingSVG } from "../../animations";
import { apiPostData } from "../../services/api";
import { getToken } from "../../utils/token";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../components/customDrawer";
import toast from "react-hot-toast";
import { redirectToBlingAuth } from "../../utils/functions";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const token = getToken();
  const decoded = token ? jwtDecode<CustomJwtPayload>(token) : null;

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      if(decoded?.tipo === 'ASSOCIACAO') {
        navigate("/contratos");
      } else {
        navigate("/turmas");
      }
    }, 2000);
  }, []);


  useEffect(() => {
    if (decoded?.tipo === "ADMIN") {
      toast.error("Faça Login no Bling primeiro para acessar a plataforma");
      setTimeout(() => {
        redirectToBlingAuth();
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        console.log('CODE', code)

        if (code) {
          apiPostData("academic", "/external/bling/oauth", { code })
            .then((response) => {
              console.log("Tokens recebidos:", response.data);
            })
            .catch((error) => {
              console.error("Erro ao enviar código para o backend:", error);
            });
        }
      }, 1000);
    }
  }, [window.location.search]);

  return (
    <Stack
      width={"calc(100% - 28px)"}
      height={"calc(100vh - 28px)"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Slide direction="up" in={show} mountOnEnter unmountOnExit timeout={1000}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <PulsingMovingSVG>
            <MelttLogo />
          </PulsingMovingSVG>
          <Stack direction={"column"} alignItems={"center"} mt={3}>
            <Typography
              color="textSecondary"
              fontWeight={"light"}
              variant="subtitle2"
              fontFamily={"Poppins"}
            >
              <b>Gestão de Formaturas</b>, de maneira simples e eficiente.
            </Typography>
            <CircularProgress color="secondary" size={24} sx={{ mt: 1 }} />
          </Stack>
        </Box>
      </Slide>
    </Stack>
  );
};

export default SplashScreen;
