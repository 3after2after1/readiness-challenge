import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForexHome from "./views/home/ForexHome2";
import ForexPage from "./views/home/ForexPage";
// import CryptoPage from "./views/home/CryptoPage";
import MiniDrawer from "./components/Sidebar";
import NewsSlider from "./components/news-slider";
import Details from "./views/home/Details";
import Watchlist from "./views/home/Watchlist";
import TableCrypto from "./components/TableCrypto";
import WatchList from "./views/home/Watchlist";
import Favourite from "./views/home/Favourite";
import TestChart from "./components/TestChart";
import TestSparkline from "./components/TestSparkline";
import Test from "./views/Forex/ForexHome3";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/main" element={<ForexHome />} />
          <Route path="forex/" element={<ForexPage />} />
          <Route path="/design" element={<MiniDrawer />} />
          {/* <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/coins/:id" element={<CoinStats />} /> */}
          <Route path="/forex/:symbol" element={<Details />} />
          <Route path="/table" element={<TableCrypto />} />
          <Route path="/news" element={<NewsSlider />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/" element={<TestChart />} />
          <Route path="/spark" element={<TestSparkline />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
