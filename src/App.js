import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForexHome from "./views/home/ForexHome";
import ForexPage from "./views/home/ForexPage";
import MiniDrawer from "./components/sidebar";
import Details from "./views/home/Details";
import Watchlist from "./views/home/Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/forex" element={<ForexPage />} />
          <Route path="/design" element={<ForexHome />} />
          {/* <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/coins/:id" element={<CoinStats />} /> */}
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
