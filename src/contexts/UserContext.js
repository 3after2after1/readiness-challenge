import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import axios from "axios";

const UserAccount = React.createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userRocketChatToken, setUserRocketChatToken] = React.useState(null);

  const rocketGetAuth = () => {
    axios
      .post("http://192.168.100.164:3032/rocket_auth_get", null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data.loginToken) {
          setUserRocketChatToken(response.data.loginToken);
        } else {
          setUserRocketChatToken(null);
        }
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("auth state change");
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  React.useEffect(() => {
    setUserRocketChatToken(rocketGetAuth());
  }, []);

  React.useEffect(() => {
    console.log("User Context Update");
    console.log(user);
    if (user !== null && user.uid) {
      console.log(user.uid);
    }
  }, [user]);

  React.useEffect(() => {
    console.log("User Context Rocket Token Update");
    console.log(userRocketChatToken);
  }, [userRocketChatToken]);

  // const experimentdelete = () => {
  //   setUserRocketChatToken(null);
  // };

  return (
    <UserAccount.Provider
      value={{
        user,
        userRocketChatToken,
      }}
    >
      {children}
    </UserAccount.Provider>
  );
};

export default UserContext;

export const UserState = () => {
  return React.useContext(UserAccount);
};
