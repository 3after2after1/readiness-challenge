import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";

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

export default function DetailsStats({ description }) {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardMedia
        component="img"
        height="100"
        image="/static/images/cards/paella.jpg"
        alt="Insert stats details"
      />
      <p>{description ? description : "loading..."}</p>
    </Card>
  );
}
