import { TextField } from "@mui/material";
import React from "react";
import ReactInputMask from "react-input-mask";

const MaskedTextField = React.forwardRef<HTMLInputElement, any>(
  (props, ref) => (
    <ReactInputMask {...props} inputRef={ref}>
      {(inputProps: any) => <TextField {...inputProps} />}
    </ReactInputMask>
  )
);

export default MaskedTextField;
