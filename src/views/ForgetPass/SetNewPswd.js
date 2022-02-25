import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  ArrowBackSharp,
  LockResetOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const SetNewPswd = () => {
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
  const handleSubmit = () => {};
  return (
    <>
      <Box
        p={3}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#F3F8FF",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#DEECFF",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
          >
            <LockResetOutlined fontSize="large" style={{ color: "#051367" }} />
          </Box>
        </Box>
        <Box
          width={400}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Set new password</h2>
          <span style={{ color: "#6a6a6a", textAlign: "center", width: "80%" }}>
            Your new password must be different to previous passwords
          </span>
        </Box>
        <Box width={400} style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem" }}>
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
        </Box>
        <Box
          width={400}
          style={{ padding: "0 0.5rem 0.5rem 0.5rem", fontSize: "0.8rem" }}
        >
          <span style={{ color: "#999" }}>Minimum of 6 characters</span>
        </Box>
        <Box width={400} p={2}>
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
        </Box>
        <Box width={400} style={{ padding: "8px 24px 0 24px" }}>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#0d47a1", fontWeight: "bold" }}
            onClick={handleSubmit}
            href="/successful"
            fullWidth
          >
            Reset Password
          </Button>
        </Box>
        <Box p={3}>
          <Button
            variant="text"
            href="/"
            startIcon={<ArrowBackSharp />}
            style={{
              color: "#999",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SetNewPswd;
