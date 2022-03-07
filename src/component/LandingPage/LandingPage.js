import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FinalLandingPage from "../FinalLandingPage/FinalLandingPage";
// import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <Box style={{ minWidth: "300px" }}>
        <Box>
          <Navbar />
        </Box>
        <FinalLandingPage />
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage;
