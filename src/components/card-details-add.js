import * as React from "react";
import Button from "@mui/material/Button";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ChangeCircle, ConstructionRounded } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@material-ui/core/colors";
export default function CardDetailsAdd() {
  const [btn, setBtn] = React.useState(true);

  const handleClick = () => {
    setBtn(!btn);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
       
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
          
        </React.Fragment>
      )}
    </PopupState>
  );
}
