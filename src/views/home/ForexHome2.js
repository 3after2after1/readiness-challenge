import React from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
// import StarButton from "../../components/star-btn";
import CardFilter from "../../components/card-filter";
// import News from "../../components/news-slider";
import ForexSearchBar from "../../components/ForexSearchBar";

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

function Home() {
  const classes = useStyles();

  return (
    <div className="main-container">
      <div className="content">
        <div className="content-title">
          <div className="content-title left">
            <ForexSearchBar />
          </div>
          <div className="content-title right">
            <CardFilter />
          </div>
        </div>

        <div className="card-content">
          <div
            id="forex-box"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              id="forex-card-box"
              sx={{
                width: 300,
                height: 500,
                margin: "10px 0 0 0 ",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                    L
                  </Avatar>
                }
                action={
                  <IconButton aria-label="add to watchlist">
                    {/* <StarButton /> */}
                  </IconButton>
                }
                title="What forex"
              />
              <CardMedia
                id="card-media"
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Insert chart"
              />
            </Card>
            <Card
              id="forex-card-box"
              sx={{
                width: 300,
                height: 500,
                margin: "10px 0 0 0 ",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                    L
                  </Avatar>
                }
                action={
                  <IconButton aria-label="add to watchlist">
                    {/* <StarButton /> */}
                  </IconButton>
                }
                title="What forex"
              />
              <CardMedia
                id="card-media"
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Insert chart"
              />
            </Card>
            <Card
              id="forex-card-box"
              sx={{
                width: 300,
                height: 500,
                margin: "10px 0 0 0 ",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                    L
                  </Avatar>
                }
                action={
                  <IconButton aria-label="add to watchlist">
                    {/* <StarButton /> */}
                  </IconButton>
                }
                title="What forex"
              />
              <CardMedia
                id="card-media"
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Insert chart"
              />
            </Card>
            <div style={{ height: "400px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
