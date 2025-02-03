import { CircularProgress, Stack, Typography } from "@mui/material";
import SearchingData from "../../assets/searchingData";
import {  PulsingSVG } from "../../animations";



const LoadingTable = () => {
  return (
    <Stack
      height={"100%"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <PulsingSVG>
        <SearchingData />
      </PulsingSVG>
      <Stack direction={"row"} gap={1} alignItems={"baseline"}>
        <Typography color="textSecondary" variant="subtitle2" mt={3}>
          Buscando dados
        </Typography>
        <CircularProgress size={12} color="primary" />
      </Stack>
    </Stack>
  );
};

export default LoadingTable;
