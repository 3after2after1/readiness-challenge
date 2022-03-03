import MiniDrawer from "../../components/sidebar";
import cryptotable from "../../components/table-crypto";
import ForexHome from "./ForexHome";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CryptoTable from "../../components/table-crypto";


const Home = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="cryptotable" element={<CryptoTable />} />
        </Switch>
      </BrowserRouter>
      <MiniDrawer />
      {/* <ForexHome /> */}
    </>
  );
};
export default Home;