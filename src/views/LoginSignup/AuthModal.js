import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Divider, Tabs, Tab, TextField } from "@mui/material";
import Login from "./Login";
import GoogleButton from "react-google-button";
import Signup2 from "./Signup2";
import "./Auth.css";
import { GoogleAuthProvider, signOut, signInWithPopup } from "@firebase/auth";
import { auth } from "../../services/firebase";
import { UserState } from "../../contexts/UserContext";
import { passwordVerify } from "../../utils/PasswordChecker";
import axios from "axios";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 10,
  color: "white",
  boxShadow: 24,
  p: 2,
};

const AuthModal = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user } = UserState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [reloadFrame, setReloadFrame] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logOut = () => {
    signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        //console.log("Google Provider Login Success");
      })
      .catch((error) => {});
  };

  const rocketChatSSO = () => {
    const data = {
      username: username,
      email: user.email,
      pass: password,
      displayname: username,
    };

    axios
      .post("http://192.168.100.164:3032/rocket_sso", data, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  };

  const resetIframe = () => {
    setReloadFrame(reloadFrame + 1);
  };

  const rocketGetAuth = async () => {
    await axios
      .post("http://192.168.100.164:3032/rocket_auth_get", null, {
        withCredentials: true,
      })
      .then((response) => {
        return response.data.loginToken;
      })
      .catch((error) => {});

    resetIframe();
  };

  const onMyFrameLoad = async () => {
    const chatbox = document.getElementById("rocket");
    const usertoken = await axios
      .post("http://192.168.100.164:3032/rocket_auth_get", null, {
        withCredentials: true,
      })
      .then((response) => response.data.loginToken)
      .catch((error) => {});

    chatbox.contentWindow.postMessage(
      {
        event: "login-with-token",
        loginToken: usertoken,
      },
      "http://192.168.100.164:3005/"
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AccountCircle />}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Button
        variant="contained"
        startIcon={<AccountCircle />}
        onClick={logOut}
      >
        Log Out
      </Button>
      <Button
        variant="contained"
        startIcon={<AccountCircle />}
        onClick={rocketChatSSO}
      >
        Log in rocket chat
      </Button>
      <Button
        variant="contained"
        startIcon={<AccountCircle />}
        onClick={rocketGetAuth}
      >
        Get Auth
      </Button>
      <TextField
        className="textfield"
        required
        id="outlined-required"
        label="Username"
        placeholder="Username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        className="textfield"
        required
        id="outlined-required"
        label="Password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <h1>{user ? user.email : "no user"}</h1>
      <h1>{user ? auth.currentUser.emailVerified.toString() : "no user"}</h1>
      <h1>placeholder</h1>
      <div style={{ height: "400px", width: "400px" }}>
        <iframe
          id="rocket"
          key={reloadFrame}
          style={{ width: "100%", height: "100%" }}
          src="http://192.168.100.164:3005/channel/general/?layout=embedded"
          title="myframe"
          onLoad={onMyFrameLoad}
        ></iframe>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className="resize" sx={style}>
            <Box
              position="static"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                // style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup2 handleClose={handleClose} />}
            <Box
              style={{
                padding: 24,
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Divider style={{ color: "#999", paddingBottom: 24 }}>OR</Divider>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleButton
                  style={{ minWidth: 64, outline: "none" }}
                  onClick={signInWithGoogle}
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
