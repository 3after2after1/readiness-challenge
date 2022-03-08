import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForexHome from "./views/home/ForexHome";
import ForexPage from "./views/home/ForexPage";
// import CryptoPage from "./views/home/CryptoPage";
import MiniDrawer from "./components/Sidebar";
import NewsSlider from "./components/news-slider";
import Details from "./views/home/Details";
import Watchlist from "./views/home/Watchlist";
import TableCrypto from "./components/TableCrypto";
import WatchList from "./views/home/Watchlist";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/forex" element={<ForexPage />} />
          <Route path="/design" element={<MiniDrawer />} />
          {/* <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/coins/:id" element={<CoinStats />} /> */}
          <Route path="/forex/:symbol" element={<Details />} />
          <Route path="/table" element={<TableCrypto />} />
          <Route path="/news" element={<NewsSlider />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
