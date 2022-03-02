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
  Avatar,
} from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "./LoginPage.css";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "../../services/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      console.log("Login Success");
      console.log(result);
    } catch (error) {}
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("Google Provider Login Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      className="loginresize"
      p={5}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        minWidth: "150px",
        maxWidth: "400px",
        backgroundColor: "#f5f6f7",
        borderRadius: "10px",
        boxShadow: "4px 6px 0px 0px #ECECEC",
      }}
    >
      <Box
        style={{
          justifyContent: "center",
          display: "flex",
          paddingBottom: "10px",
        }}
      >
        <Avatar sx={{ bgcolor: "green", height: "80px", width: "80px" }}>
          Logo
        </Avatar>
      </Box>
      <TextField
        className="textfield"
        required
        id="outlined-required"
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ backgroundColor: "white" }}
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
        style={{ backgroundColor: "white" }}
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
        className="boxrememberforgot"
        style={{
          display: "flex",
          flexDirection: "column",
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
          className="labelforgotpassword"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
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
        style={{
          backgroundColor: "#7BE495",
          color: "black",
          fontWeight: "bold",
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Divider
        style={{
          color: "#999",
          paddingBottom: 10,
          paddingTop: 10,
          fontSize: 20,
        }}
      >
        or
      </Divider>
      <Box
        style={{
          paddingRight: 50,
          paddingLeft: 50,
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GoogleButton
            style={{ minWidth: 50, outline: "none", width: "100%" }}
            onClick={signInWithGoogle}
          />
        </Box>
      </Box>
      <Box>
        <p
          className="noaccountsignup"
          style={{
            color: "#999",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          If account is not yet created,&nbsp;
          <a href="/signuppage" style={{ color: "#2666CF" }}>
            click here
          </a>
          &nbsp;to sign up.
        </p>
      </Box>
    </Box>
  );
};

export default LoginPage;
