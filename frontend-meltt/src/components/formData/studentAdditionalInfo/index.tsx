import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import FormControlCheckbox from "../../formControl/checkbox";
import { schoolMateriasList, selectOptionsEducacaoBasic, selectOptionsTurno } from "../../../utils/arrays";

type FormDataSchoolAdditionalInfoTypes = {
  values: any;
  handleChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  setFieldValue: any;
  errors: any;
};

const FormDataAdditionalInfo = ({
  values,
  setFieldValue,
}: FormDataSchoolAdditionalInfoTypes) => {
  return (
    <Stack component={"form"} p={2} gap={2}>
      <Stack flex={1}>
        <Typography fontWeight={400} fontSize={14}>
          Matérias*
        </Typography>
        <Autocomplete
          multiple
          color="primary"
          id="tags-standard"
          value={values.materias}
          options={schoolMateriasList}
          getOptionLabel={(option) => option.title}
          defaultValue={[schoolMateriasList[1]]}
          onChange={(_, newValue) => setFieldValue("materias", newValue)}
          renderInput={(params) => (
            <TextField {...params} size="small" label="" />
          )}
        />
      </Stack>
      <Stack direction={"row"} gap={2}>
        <Stack flex={1}>
          <FormControlCheckbox
            label="Etapa Educação*"
            name="educacao_basica"
            value={values.educacao_basica}
            onChange={(newValue: string[]) => {
              setFieldValue("educacao_basica", newValue)
            }}
            options={selectOptionsEducacaoBasic}
          />
        </Stack>
        <Stack flex={1}>
          <FormControlCheckbox
            label="Turno"
            name="turno"
            value={values.turno}
            onChange={(newValue: string[]) => setFieldValue("turno", newValue)}
            options={selectOptionsTurno}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FormDataAdditionalInfo;
