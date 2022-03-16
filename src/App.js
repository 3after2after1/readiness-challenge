import React from "react";
// import CryptoPage from "./views/CryptoPage";
import WatchList from "./views/WatchList/Watchlist";
import Favourite from "./views/Favourite/Favourite";
import Navbar2 from "./component/Navbar/Navbar2";
import Footer2 from "./component/Footer/Footer2";
import { Box } from "@mui/material";
import ForexHome from "./views/Forex/ForexHome3";

const App = () => {
  return (
    <div>
      <Box style={{}}>
        <Navbar2 />
        <ForexHome />
        <Footer2 />
      </Box>
    </div>
  );
};

export default App;
