import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#23c9d7",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#23c9d7",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#23c9d7",
    },
  },
});

export default CustomTextField;