import { Avatar, Stack, Typography } from "@mui/material";
import StudentHeaderCover from "../../assets/cover";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { AlunoState } from "../../providers/alunoContext";

const StudentHeaderInfo = ({ state }: { state: AlunoState }) => {
  return (
    <Stack direction={"column"}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        bgcolor={"#342394"}
        borderRadius={"20px 20px 0 0"}
        position={"relative"}
      >
        <StudentHeaderCover />
        <Avatar
          src=""
          sx={{
            position: "absolute",
            left: 32,
            top: "50%",
            width: 105,
            height: 105,
          }}
        />
      </Stack>
      <Stack
        direction={"column"}
        bgcolor={"#fff"}
        height={160}
        borderRadius={"0 0 32px 32px"}
      >
        <Stack ml={4} mt={8}>
          <Typography color="primary" fontWeight={900} fontSize={18}>
            {state.alunoSelecionado?.nome}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} gap={4} mt={1}>
            <Stack direction={"column"}>
              <label className="text-xs" htmlFor="">
                Telefone da mãe
              </label>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <FaPhoneSquareAlt className="text-orange-700" />
                <Typography variant="body2">
                  {state.alunoSelecionado?.whatsapp_mae}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction={"column"}>
              <label className="text-xs" htmlFor="">
                Turma
              </label>
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <FaPhoneSquareAlt className="text-orange-700" />
                <Typography variant="body2">
                  {state.alunoSelecionado?.turma}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default StudentHeaderInfo;
