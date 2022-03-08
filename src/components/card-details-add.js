import * as React from "react";
import Button from "@mui/material/Button";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ChangeCircle, ConstructionRounded } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@material-ui/core/colors";
import axios from "axios";

export default function CardDetailsAdd({ symbol, market }) {
  const [btn, setBtn] = React.useState(true);

  const handleClick = async (e) => {
    console.log(e.target.baseURI);
    setBtn((btn) => {
      if (btn) {
        //unfollow
        // const response = axios.post(`http://localhost:5000/watchlist/add`, {
        //   id: 1,
        //   symbol,
        // });

        const userData = {
          id: 1,
          name: "bala",
        };

        axios
          .post("http://localhost:5000/watchlist/add", userData)
          .then((response) => {
            console.log(response.status);
            console.log(response.data);
          });

        //   const success = response.status === 201;
        //   if (success) {
        //   }
        // } else {
        //   //follow
        //   const response = axios.post(`http://localhost:5000/watchlist/remove`, {
        //     id: 1,
        //     symbol,
        //   });
      }
      return !btn;
    });
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            style={{
              borderRadius: 15,
              backgroundColor: "white",
              padding: "5px",
              // height: "80px"
            }}
            variant="contained"
            {...bindTrigger(popupState)}
          >
            <IconButton
              onClick={handleClick}
              style={{ color: "blue[500]" }}
              aria-label="add to watchlist"
              children={
                btn ? (
                  <StarBorderIcon />
                ) : (
                  <StarIcon sx={{ color: yellow[800] }} />
                )
              }
            ></IconButton>
          </Button>
        </React.Fragment>
      )}
    </PopupState>
  );
}
