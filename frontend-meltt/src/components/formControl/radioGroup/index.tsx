import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";

type FormControlRadioButtonProps = {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { label: string; value: string | number }[];
};

const FormControlRadioButton = ({
  label,
  name,
  value,
  onChange,
  options,
}: FormControlRadioButtonProps) => (
  <FormControl>
    <FormLabel
      style={{
        color: "#000",
        fontWeight: 400,
        fontSize: "14px",
      }}
    >
      {label}
    </FormLabel>
    <RadioGroup row name={name} value={value} onChange={onChange}>
      {options.map((option: { label: string; value: number | string }) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={
            <Radio
              checkedIcon={<BiCheckboxSquare size={26} />}
              icon={<BiCheckbox size={26} />}
              size="small"
            />
          }
          label={option.label}
          slotProps={{
            typography: { fontSize: "12px" },
          }}
        />
      ))}
    </RadioGroup>
  </FormControl>
);

export default FormControlRadioButton;
