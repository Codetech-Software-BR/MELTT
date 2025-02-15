import {
  Box,
  Button,
  CircularProgress,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { PulsingMovingSVG } from "../../../animations";
import MelttLogo from "../../../assets/logo/melttLogo";
import { useEffect, useState } from "react";
import { apiPostData } from "../../../services/api";
import toast from "react-hot-toast";
import { redirectToBlingAuth } from "../../../utils/functions";
import {
  setBlingAccessToken,
  setBlingRefreshToken,
} from "../../../utils/token";
import { useNavigate } from "react-router-dom";
import { SlReload } from "react-icons/sl";

const SplashGetBlingInfo = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");

  const authenticateInBling = async () => {
    try {
      const response = await apiPostData(
        "authentication",
        `external/bling/oauth?code=${code}`,
        {}
      );
      setBlingAccessToken(response.access_token);
      setBlingRefreshToken(response.refresh_token);
      if (response.access_token) {
        navigate('/turmas')
      }
    } catch (error) {
      setShowTryAgain(true);
      toast.error("Erro ao autenticar via Bling, Tente novamente.");
    }
  };

  const tryAgainBlingAuthenticate = () => {
    redirectToBlingAuth();
  };

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    authenticateInBling();
  }, [code]);

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
            >
              <b>
                {showTryAgain
                  ? "Erro ao buscar informações no BLING"
                  : "Trazendo informações do BLING, e autenticando via API..."}
              </b>
            </Typography>
            {showTryAgain ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={tryAgainBlingAuthenticate}
                endIcon={<SlReload/> }
                sx={{ fontFamily: "Poppins", textTransform: "none", mt: 1 }}
              >
                Tentar Novamente
              </Button>
            ) : (
              <CircularProgress color="primary" size={24} sx={{ mt: 1 }} />
            )}
          </Stack>
        </Box>
      </Slide>
    </Stack>
  );
};

export default SplashGetBlingInfo;
