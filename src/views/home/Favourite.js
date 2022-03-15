import React from "react";
import "./Favourite.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

// const useStyles = makeStyles({
//     root: {
//       minWidth: 300,
//       borderRadius: 300,
//     },
//     bullet: {
//       display: "inline-block",
//       margin: "0 2px",
//       transform: "scale(0.8)",
//     },
//     title: {
//       fontSize: 20,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   });

function Favourite() {
  return (
    <div className="watchlist-page">
     <div 
     id="fav-box"
     style={{
         display: "flex",
         flexDirection:"column",
         alignItems:"center",
         justifyContent:"center",
     }}>
         
        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>


        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>

        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>

        <Card id="w-card-box" sx={{ 
            width: 300,
            marginTop: "10px"
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>


        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>

        <Card id="w-card-box" sx={{ 
            width: 300,
            marginTop: "10px"
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>


        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>

        <Card id="w-card-box" sx={{ 
            width: 300,
            marginTop: "10px"
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>


        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>

        <Card id="w-card-box" sx={{ 
            width: 300,
            marginTop: "10px"
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>


        <Card id="w-card-box" sx={{ 
            width: 300,
            margin: "10px 0 0 0 ",
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>

        <Card id="w-card-box" sx={{ 
            width: 300,
            marginTop: "10px"
             }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="Logo">
                L
              </Avatar>
            }
            action={
              <IconButton aria-label="add to watchlist">
                <PlaylistRemoveIcon />
              </IconButton>
            }
            title="What forex"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Insert chart"
          />
        </Card>
        
        
        </div>
      </div>
    
  );
}

export default Favourite;
