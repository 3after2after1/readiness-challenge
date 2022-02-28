import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import "./Auth.css";
import { signInWithEmailAndPassword } from "@firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = () => {};
  return (
    <Box
      className="loginresize"
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        className="textfield"
        required
        id="outlined-required"
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        required
        id="outlined-required"
        label="Password"
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        className="labelsection"
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   justifyContent: "center",
        }}
      >
        <FormControlLabel
          style={{ color: "#999" }}
          control={<Checkbox />}
          label="Remember Me"
        />
        <Box
          className="labelsection2"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            lineHeight: 2.5,
          }}
        >
          <a href="/forgotpswd" style={{ color: "#999" }}>
            Forgot Password?
          </a>
        </Box>
      </Box>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#4ab66e" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
