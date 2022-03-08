import * as React from "react";
import Box from "@mui/material/Box";
import DetailsStatsContent from "./details-stats-details";
import "./card-details-stats.css";

export default function DetailsStats() {
  return (
    <Box id="top-container-stats" gap="20px">
      <Box
        id="stats-box"
        bgcolor={"white"}
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
        }}
      >
        lllll
      </Box>
      <Box
        id="stats-contents-box"
        bgcolor={"white"}
        sx={{
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
        }}
      >
        <DetailsStatsContent />
      </Box>
    </Box>
  );
}
