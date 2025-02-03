import {
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FormikErrors, FormikValues } from "formik";
import { FormikStudentsInitialValues } from "../../../pages/alunos/formInitialValues";
import { selectOptionsEducacaoBasic } from "../../../utils/arrays";
import { IoAdd } from "react-icons/io5";

type TypeFormDataStudentCadastroProps = {
  id: string | undefined;
  values: FormikValues;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: FormikErrors<FormikStudentsInitialValues>;
  escolas: any[];
  loading: boolean;
  professores: any[];
  setFieldValue: any;
  setHiddenStudentProfile: any;
  handleOpenModalRegisterTeacher: () => void;
};

const FormDataStudentCadastro = ({
  id,
  values,
  handleChange,
  errors,
  escolas,
  loading,
  professores,
  setFieldValue,
  setHiddenStudentProfile,
  handleOpenModalRegisterTeacher,
}: TypeFormDataStudentCadastroProps) => {

  return (
    <Stack component={"form"} gap={2}>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ fontFamily: "Poppins" }}
          >
            Nome Completo*
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
            <small
              style={{ fontSize: 10, color: "#EB420E", fontFamily: "Poppins" }}
            >
              {errors?.nome}
            </small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ fontFamily: "Poppins" }}
          >
            Data de nascimento*
          </Typography>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DatePicker
              name="data_aniversario"
              value={dayjs(values.data_aniversario)}
              onChange={(value) => setFieldValue("data_aniversario", value)}
              label=""
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ fontFamily: "Poppins" }}
          >
            Escola*
          </Typography>
          <Select
            name="escola"
            size="small"
            value={values.escola}
            label=""
            onChange={(event) => handleChange(event as React.ChangeEvent<any>)}
          >
            {escolas?.map((item) => (
              <MenuItem value={item?.nome}>{item?.nome}</MenuItem>
            ))}
          </Select>
          {errors?.escola && (
            <small
              style={{ fontSize: 10, color: "#EB420E", fontFamily: "Poppins" }}
            >
              {errors?.escola}
            </small>
          )}
        </Stack>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ fontFamily: "Poppins" }}
          >
            Etapa Educação*
          </Typography>
          <Select
            name="educacao_basica"
            size="small"
            value={values.educacao_basica}
            label=""
            onChange={(event) => {
              handleChange(
                event as React.ChangeEvent<{ name?: string; value: unknown }>
              );
              if (id !== undefined) {
                setHiddenStudentProfile(true);
              }
            }}
          >
            {escolas.length > 0
              ? escolas[0]?.educacao_basica?.map((item: any, index: number) => {
                  const selectedEducation = selectOptionsEducacaoBasic.find((option) => option.value === item);

                  return (
                    <MenuItem key={index} value={selectedEducation?.value}>
                      {selectedEducation?.label}
                    </MenuItem>
                  );
                })
              : selectOptionsEducacaoBasic.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
          </Select>
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1} direction={"column"} gap={1}>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ fontFamily: "Poppins" }}
          >
            Professor*
          </Typography>
          <Select
            name="professor"
            size="small"
            value={values.professor}
            label=""
            disabled={loading}
            endAdornment={loading && <CircularProgress size={20} />}
            onChange={(event) => handleChange(event as React.ChangeEvent<any>)}
          >
            {professores.length > 0 ? (
              professores?.map((professor) => (
                <MenuItem value={professor?.nome}>{professor?.nome}</MenuItem>
              ))
            ) : (
              <MenuItem onClick={() => handleOpenModalRegisterTeacher()}>
                <IoAdd className="mr-2 text-primary" />
                <Typography fontFamily={"Poppins"}>
                  Adicionar Professor
                </Typography>
              </MenuItem>
            )}
          </Select>
          {errors?.professor && (
            <small
              style={{ fontSize: 10, color: "#EB420E", fontFamily: "Poppins" }}
            >
              {errors?.professor}
            </small>
          )}
        </Stack>
        <Stack width={"183px"} direction={"column"} gap={1}>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ fontFamily: "Poppins" }}
          >
            Turma*
          </Typography>
          <TextField
            size="small"
            label=""
            placeholder="3B"
            name="turma"
            value={values.turma}
            onChange={handleChange}
          />
          {errors?.turma && (
            <small
              style={{ fontSize: 10, color: "#EB420E", fontFamily: "Poppins" }}
            >
              {errors?.turma}
            </small>
          )}
        </Stack>
      </Stack>
      <Stack direction={"column"} gap={2}>
        <Stack direction={"row"} gap={2}>
          <Stack flex={2} direction={"column"} gap={1}>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ fontFamily: "Poppins" }}
            >
              Nome do Pai
            </Typography>
            <TextField
              size="small"
              label=""
              placeholder=""
              name="nome_pai"
              value={values.nome_pai}
              onChange={handleChange}
            />
            {errors.nome_pai && (
              <small style={{ fontSize: 10, color: "#EB420E" }}>
                {errors.nome_pai}
              </small>
            )}
          </Stack>
          <Stack flex={1} direction={"column"} gap={1}>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ fontFamily: "Poppins" }}
            >
              Whatsapp pai
            </Typography>
            <TextField
              size="small"
              label=""
              placeholder=""
              name="whatsapp_pai"
              value={values.whatsapp_pai}
              onChange={handleChange}
            />
            {errors.whatsapp_pai && (
              <small style={{ fontSize: 10, color: "#EB420E" }}>
                {errors.whatsapp_pai}
              </small>
            )}
          </Stack>
        </Stack>
        <Stack direction={"row"} gap={2}>
          <Stack flex={2} direction={"column"} gap={1}>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ fontFamily: "Poppins" }}
            >
              Nome da Mãe
            </Typography>
            <TextField
              size="small"
              label=""
              placeholder=""
              name="nome_mae"
              value={values.nome_mae}
              onChange={handleChange}
            />
            {errors.nome_mae && (
              <small style={{ fontSize: 10, color: "#EB420E" }}>
                {errors.nome_mae}
              </small>
            )}
          </Stack>
          <Stack flex={1} direction={"column"} gap={1}>
            <Typography
              fontWeight={400}
              fontSize={14}
              sx={{ fontFamily: "Poppins" }}
            >
              Whatsapp mãe
            </Typography>
            <TextField
              size="small"
              label=""
              placeholder=""
              name="whatsapp_mae"
              value={values?.whatsapp_mae}
              onChange={handleChange}
            />
            {errors.whatsapp_mae && (
              <small style={{ fontSize: 10, color: "#EB420E" }}>
                {errors.whatsapp_mae}
              </small>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FormDataStudentCadastro;
