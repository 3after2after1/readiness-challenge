import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Chart from "./Chart";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    borderRadius: 300,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function DetailsPage() {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardHeader
        action={
          <IconButton aria-label="add to watchlist">
            <WaterfallChartIcon />
          </IconButton>
        }
      />

      {/* [forex] symbol: R_50, market: forex */}
      {/* [crypto] symbol: BTC, market: crypto */}
      <Chart symbol="frxUSDSEK" market="forex" />
    </Card>
  );
}
