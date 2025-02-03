import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const CustomCard = ({
  title,
  children,
  headerActionContent,
  sxProps
}: {
  title: string;
  children: ReactNode;
  headerActionContent?: ReactNode;
  sxProps?: any;
}) => {
  return (
    <Stack sx={{ p: 0, backgroundColor: "#fff", borderRadius: '12px', ...sxProps }}>
      <Stack direction={"column"}>
        <Stack
          pt={4}
          pb={1}
          px={3}
          height={"45px"}
          direction={"row"}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderRadius={"20px 20px 0 0"}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#342394", fontFamily:"Poppins" }}>
            {title}
          </Typography>
          {headerActionContent}
        </Stack>
        <Stack direction={"column"}>{children}</Stack>
      </Stack>
    </Stack>
  );
};

export default CustomCard;
