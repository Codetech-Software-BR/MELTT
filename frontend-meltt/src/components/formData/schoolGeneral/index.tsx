import { Stack, TextField, Typography } from "@mui/material";

type FormDataSchoolGeneralTypes = {
  values: any;
  handleChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  errors: any;
};

const FormDataSchoolGeneral = ({
  values,
  handleChange,
  errors,
}: FormDataSchoolGeneralTypes) => {
  return (
    <Stack component={"form"} p={2} gap={2}>
      <Stack flex={1} direction={"column"} gap={1}>
        <Typography fontWeight={400} fontSize={14}>
          Nome da escola*
        </Typography>
        <TextField
          size="small"
          label=""
          name="nome"
          value={values.nome}
          onChange={(event) =>
            handleChange(
              event as React.ChangeEvent<{ name?: string; value: unknown }>
            )
          }
        />
        {errors?.nome && (
          <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.nome}</small>
        )}
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            CNPJ*
          </Typography>
          <TextField
            size="small"
            label=""
            name="cnpj"
            value={values.cnpj}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{
                  name?: string;
                  value: unknown;
                }>
              )
            }
          />
          {errors?.cnpj && (
            <small style={{ fontFamily:"Poppins", color: "#EB420E" }}>{errors?.cnpj}</small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Telefone*
          </Typography>
          <TextField
            size="small"
            label=""
            name="telefone"
            value={values.telefone}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.telefone && (
            <small style={{ fontFamily:"Poppins", color: "#EB420E" }}>{errors?.telefone}</small>
          )}
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Responsável*
          </Typography>
          <TextField
            size="small"
            label=""
            name="responsavel"
            value={values.responsavel}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.responsavel && (
            <small style={{ fontFamily:"Poppins", color: "#EB420E" }}>{errors?.responsavel}</small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            E-mail*
          </Typography>
          <TextField
            size="small"
            label=""
            name="email"
            value={values.email}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.email && (
            <small style={{ fontFamily:"Poppins", color: "#EB420E" }}>{errors?.email}</small>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FormDataSchoolGeneral;
