import { MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { UFList } from "../../../utils/arrays";

type FormDataSchoolAddressTypes = {
  values: any;
  handleChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  errors: any;
};

const FormDataSchoolAddress = ({
  values,
  handleChange,
  errors,
}: FormDataSchoolAddressTypes) => {
  return (
    <Stack component={"form"} p={2} gap={2}>
      <Stack direction={"row"} gap={2}>
        <Stack flex={0.5} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            CEP*
          </Typography>
          <TextField
            size="small"
            label=""
            name="cep"
            value={values.cep}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.cep && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.cep}</small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Endereço*
          </Typography>
          <TextField
            size="small"
            label=""
            name="endereco"
            value={values.endereco}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.endereco && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.endereco}</small>
          )}
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Número*
          </Typography>
          <TextField
            size="small"
            label=""
            name="numero"
            value={values.numero}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.numero && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.numero}</small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Complemento*
          </Typography>
          <TextField
            size="small"
            label=""
            name="complemento"
            value={values.complemento}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.complemento && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.complemento}</small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Bairro*
          </Typography>
          <TextField
            size="small"
            label=""
            name="bairro"
            value={values.bairro}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.bairro && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.bairro}</small>
          )}
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            Cidade*
          </Typography>
          <TextField
            size="small"
            label=""
            name="cidade"
            value={values.cidade}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          />
          {errors?.cidade && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.cidade}</small>
          )}
        </Stack>
        <Stack flex={0.5} direction={"column"} gap={1}>
          <Typography fontWeight={400} fontSize={14}>
            UF*
          </Typography>
          <Select
            size="small"
            label=""
            name="uf"
            value={values.uf}
            onChange={(event) =>
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              )
            }
          >
            {UFList.map((uf) => (
              <MenuItem key={uf.key} value={uf.value}>
                {uf.label}
              </MenuItem>
            ))}
          </Select>
          {errors?.uf && (
            <small style={{ fontFamily: 'Poppins', color: "#EB420E" }}>{errors?.uf}</small>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FormDataSchoolAddress;
