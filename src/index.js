import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserContext from "./contexts/UserContext";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ForgotPswd from "./views/ForgetPass/ForgotPswd";
import CheckEmail from "./views/ForgetPass/CheckEmail";
import SetNewPswd from "./views/ForgetPass/SetNewPswd";
import SuccessPswd from "./views/ForgetPass/SuccessPswd";
import AuthRoute from "./views/AuthenticationRoute/AuthRoute";
import EmailVerify from "./views/AuthenticationRoute/EmailVerify";
import LoginPage from "./views/LoginSignup/LoginPage";
import SignUpPage from "./views/LoginSignup/SignUpPage";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserContext>
              <App />
            </UserContext>
          }
        ></Route>
        <Route path="/forgotpswd" element={<ForgotPswd />}></Route>
        <Route path="/checkemail" element={<CheckEmail />}></Route>
        <Route path="/resetpswd" element={<SetNewPswd />}></Route>
        <Route path="/successful" element={<SuccessPswd />}></Route>
        <Route path="/emailverify" element={<EmailVerify />}></Route>
        <Route path="/authroute" element={<AuthRoute />}></Route>
        <Route path="/loginpage" element={<LoginPage />}></Route>
        <Route path="/signuppage" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
