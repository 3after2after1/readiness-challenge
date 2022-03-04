import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core/styles";
import AddCommentIcon from "@mui/icons-material/AddComment";

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

export default function DetailsStatsContent({ statsData }) {
  React.useEffect(() => {
    console.log("stats ", statsData);
    if (statsData) {
      statsData.pivot.forEach((item) => console.log(item.pivot));
    } else console.log("null");
  }, [statsData]);
  return (
    <Card sx={{ minWidth: 200 }}>
      {/* <CardMedia
        component="img"
        height="100"
        image="/static/images/cards/paella.jpg"
        alt="Details stats content"
      /> */}
      <div>
        <h5>Pivot points</h5>
        {statsData ? (
          statsData.pivot.map((item) => {
            return (
              <div>
                <p>
                  {item.pivot} {item.point}
                </p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
        <h5>Support</h5>
        {statsData ? (
          statsData.support.map((item) => {
            return (
              <div>
                <p>
                  {item.s} {item.value} {item.strength}
                </p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
        <h5>Resistance</h5>
        {statsData ? (
          statsData.resist.map((item) => {
            return (
              <div>
                <p>
                  {item.r} {item.value} {item.strength}
                </p>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
    </Card>
  );
}
