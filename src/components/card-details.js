import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import WaterfallChartIcon from "@mui/icons-material/WaterfallChart";
import Chart from "./Chart";

export default function CardDetails() {
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
      <Chart symbol="R_50" market="forex" />
    </Card>
  );
}
