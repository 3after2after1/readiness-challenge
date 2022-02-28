import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AccountCircle } from "@mui/icons-material";
import { AppBar, Divider, Tabs, Tab } from "@mui/material";
import Login from "./Login";
import GoogleButton from "react-google-button";
import Signup2 from "./Signup2";
import "./Auth.css";
import { GoogleAuthProvider, signOut, signInWithPopup } from "@firebase/auth";
import { auth } from "../../firebase";
import { UserState } from "../../UserContext";
import { useSearchParams } from "react-router-dom";

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
  const { user } = UserState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const linkvalue = searchParams.get("testval");
  const logOut = () => {
    signOut(auth);
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
      <h1>{user ? user.email : "no user"}</h1>
      <h1>{linkvalue ? linkvalue : "no urldata"}</h1>
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
