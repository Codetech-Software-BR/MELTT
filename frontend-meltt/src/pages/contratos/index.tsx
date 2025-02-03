import { LoadingButton } from "@mui/lab";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { FaSignature } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ContratosPage = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"calc(100% - 28px)"}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1,
          flexGrow: 1,
          width: "100%",
          height: "calc(100vh - 100px)",
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
            height={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
            p={2}
          >
            <Typography
              color="textSecondary"
              variant={"body2"}
              fontFamily={"Poppins"}
            >
              Leia o Contrato e estando de acordo, <b>assine clicando no botão abaixo</b>:
            </Typography>
            <iframe
              src="https://drive.google.com/file/d/1f2a4P6JX7Z7uQ4g3Z6JwHvQ1b7Nk6z9x/preview"
              width="100%"
              height="100%"
            ></iframe>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"end"}
              gap={2}
            >
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{ fontFamily: "Poppins" }}
              >
                Voltar
              </Button>
              <LoadingButton
                variant="contained"
                color="primary"
                endIcon={<FaSignature/> }
                sx={{ fontFamily: "Poppins", width: 150 }}
              >
                Assinar
              </LoadingButton>
            </Stack>
          </Stack>
        </Paper>
      </Paper>
    </Stack>
  );
};

export default ContratosPage;
