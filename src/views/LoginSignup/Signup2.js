import {
  Password,
  RestaurantOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "@firebase/auth";
import { auth } from "../../services/firebase";
import { passwordVerify } from "../../utils/PasswordChecker";

const Signup2 = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [errorMsg, setErrorMsg] = useState({ message: "" });

  React.useEffect(() => {
    console.log(errorMsg.message);
  }, [errorMsg]);

  const handleSubmit = async () => {
    try {
      if (password != confirmPassword) {
        throw { message: "Password Mismatch" };
      }

      if (!passwordVerify(password)) {
        throw {
          message:
            "Please ensure your password contains both Letter and Number",
        };
      }

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result.user.emailVerified === false) {
        sendEmailVerification(result.user);
      }

      console.log("Sign Up Success");
    } catch (error) {
      if (!!String(error.message).match("^Firebase:.*")) {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message.replace("Firebase: ", ""),
        }));
      } else {
        setErrorMsg((previousError) => ({
          ...previousError,
          message: error.message,
        }));
      }

      return;
    }
  };
  return (
    <Box
      className="signupresize"
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
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
      <TextField
        required
        id="outlined-required"
        label="Confirm Password"
        placeholder="Confirm your password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        style={{ color: "#999" }}
        control={<Checkbox />}
        label="I agree to the terms & conditions."
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#4ab66e" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup2;
