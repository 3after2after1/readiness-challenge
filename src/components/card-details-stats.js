import * as React from "react";
import Box from "@mui/material/Box";
import DetailsStatsContent from "./details-stats-details";
import "./card-details-stats.css"

export default function DetailsStats() {
  
  return (
      <Box id="top-container-stats" gap="20px">
       <div 
      id="stats-box"
      style={{
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        margin: "0",
       
    }}>
        <Box
        id="stats-box-top"
        bgcolor={"white"}
          sx={{
            marginTop:"0.9em",
            padding: "0.6em",
            height: 560,
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
        <Box
        id="stats-contents-box"
        bgcolor={"white"}
          sx={{
            marginTop:"1em",
            height: 560,
            padding:"0.6em",
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
        </div>
      </Box>
    );
}