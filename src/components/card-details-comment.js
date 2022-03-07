import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

export default function CardDetailsComment() {
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
