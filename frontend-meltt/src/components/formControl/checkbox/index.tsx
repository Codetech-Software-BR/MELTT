import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";


interface FormControlCheckboxProps {
  label: string;
  name: string;
  value: string[];
  onChange: (newValue: string[]) => void;
  options: { label: string; value: string | number }[];
}

const FormControlCheckbox: React.FC<FormControlCheckboxProps> = ({
  label,
  value = [],
  onChange,
  options,
}: FormControlCheckboxProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: checkboxValue, checked } = event.target;

    if (checked) {
      onChange([...value, checkboxValue]);
    } else {
      onChange(value.filter((v: string | number) => v !== checkboxValue));
    }
  };

  return (
    <FormControl>
      <FormLabel
        style={{
          color: "#000",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        {label}
      </FormLabel>
      <div style={{ flexDirection: "column" }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={value?.includes(String(option.value))}
                onChange={handleCheckboxChange}
                value={option.value}
                checkedIcon={<BiCheckboxSquare size={26} />}
                icon={<BiCheckbox size={26} />}
                size="small"
              />
            }
            label={option.label}
          />
        ))}
      </div>
    </FormControl>
  );
};

export default FormControlCheckbox;
