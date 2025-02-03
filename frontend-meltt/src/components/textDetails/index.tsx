import { Stack, Typography } from "@mui/material";

const TextDetails = ({ text, details }: { text: string; details: string | undefined }) => {
  return (
    <Stack direction={"column"}>
      <Typography variant="body2" fontFamily={"Poppins"}>
        {text}
      </Typography>
      <Typography variant="caption" fontFamily={"Poppins"} fontWeight={600}>
        {details}
      </Typography>
    </Stack>
  );
};

export default TextDetails;
