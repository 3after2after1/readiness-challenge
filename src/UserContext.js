import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

const UserAccount = React.createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("auth state change");
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  React.useEffect(() => {
    console.log("User Context Update");
    console.log(user);
  }, [user]);

  return (
    <UserAccount.Provider
      value={{
        user,
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
