import React from "react";
// import CryptoPage from "./views/CryptoPage";
import WatchList from "./views/WatchList/Watchlist";
import Favourite from "./views/Favourite/Favourite";
import Navbar2 from "./component/Navbar/Navbar2";
import Footer2 from "./component/Footer/Footer2";
import { Box } from "@mui/material";

const App = () => {
  return (
    <div>
      <Box style={{}}>
        <Navbar2 />
        <Favourite />
        <Footer2 />
      </Box>
    </div>
  );
};

export default App;
