import { useEffect, useState } from "react";
import { CoinList } from "../config/cryptoApi";
import axios from "axios";
import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import RankingTable2 from "./RankingTable3";

const formatPrice = (price) => {
  return `$${price.toFixed(5)}`;
};

const formatPercentageChange = (change) => {
  return `${change > 0 ? "+ " : " "}${change.toFixed(5)} %`;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [topGainLose, setTopGainLose] = useState([]);

  const fetchCoins = async () => {
    // setLoading(true);
    const { data } = await axios.get(CoinList());
    setCoins(data);
    setLoading(false);
  };

  const initiateTopGainLose = () => {
    if (coins.length > 0) {
      setTopGainLose([
        [...coins].sort(dynamicSort("desc", "24h")).slice(0, 5),
        [...coins].sort(dynamicSort("asc", "24h")).slice(0, 5),
      ]);
    }
  };

  const dynamicSort = (order, interval) => {
    let property = `price_change_percentage_${interval}_in_currency`;
    let sortOrder = order === "desc" ? -1 : 1;

    return function (a, b) {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    initiateTopGainLose();
  }, [coins]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "rgb(247, 247, 247)",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#EAEAEA" },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        backgroundColor: "gold",
        color: "black",
      },
      "& .Mui-selected": {
        color: "black",
        fontWeight: "bold",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div>
        <RankingTable2 loading={loading} list={topGainLose} />
      </div>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "League Spartan",
            fontWeight: "bold",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a coin"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead
                style={{
                  background: "#184D47",
                }}
              >
                <TableRow>
                  {["COIN", "PRICE", "24H CHANGE", "MARKET CAP"].map((head) => (
                    <TableCell
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "League Spartan",
                        fontSize: "1.2rem",
                      }}
                      key={head}
                      align={head === "Coin" ? "Left" : "center"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1 - 5) * 6, (page - 1) * 6 + 6)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow className={classes.row} key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 0,
                            margin: 0,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: 10,
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                fontFamily: "Bree Serif",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "black",
                                fontFamily: "Bree Serif",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontWeight: "500",
                            fontSize: "1.2rem",
                            fontFamily: "Bree Serif",
                          }}
                        >
                          ${numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: profit > 0 ? "#4E9F3D" : "red",
                            fontWeight: "500",
                            fontSize: "1.2rem",
                            fontFamily: "Bree Serif",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontWeight: "500",
                            fontSize: "1.2rem",
                            fontFamily: "Bree Serif",
                          }}
                        >
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 8,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          // count={(handleSearch()?.length / 6).toFixed(0)}
          count={Math.floor(handleSearch()?.length / 6)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 0);
          }}
        />
      </Container>
    </div>
  );
};

export default CoinTable;
