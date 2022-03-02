import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

export default function ComboBox() {
  const data = require("../symbolMapper.json");
  const options = Object.keys(data);
  let navigate = useNavigate();
  console.log(data);
  return (
    <Autocomplete
      disablePortal
      onChange={(event, value) => {
        if (value !== null) {
          console.log(data[value]);
          navigate(`/symbols/${data[value]}`);
        }
      }}
      id="combo-box-demo"
      options={options}
      sx={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}
