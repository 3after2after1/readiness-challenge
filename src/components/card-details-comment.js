import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core/styles";
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentIcon from '@mui/icons-material/Comment';

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

export default function DetailsComment() {
  
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardHeader
        action={
          <IconButton aria-label="add comments">
            <CommentIcon />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        height="400"
        image="/static/images/cards/paella.jpg"
        alt="Insert comment"
      />
    </Card>
  );
}