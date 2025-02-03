import { Box, Stack, Typography } from "@mui/material";

const BoxDashboardValues = ({ title }: { title: string }) => {
  return (
    <Stack direction={"column"} flex={1} alignItems={"center"} my={2}>
      <Typography
        color="primary"
        variant="body1"
        fontWeight={600}
        fontFamily={"Poppins"}
      >
        {title}
      </Typography>
      <Box borderRadius={"20px"} color={"white"}>
        <Typography color="secondary" variant="h5" fontWeight={600} fontFamily={'Poppins'}>
          R$0,00
        </Typography>
      </Box>
    </Stack>
  );
};

export default BoxDashboardValues;
