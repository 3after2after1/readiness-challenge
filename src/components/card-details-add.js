import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { makeStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@mui/icons-material/AddBox";
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function CardDetailsAdd() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            style={{
              borderRadius: 15,
              backgroundColor: "white",
              padding: "10px 15px",
              // height: "80px"
            }}
            variant="contained"
            {...bindTrigger(popupState)}
          >
            <IconButton
              style={{ color: "blue[500]" }}
              aria-label="add to watchlist"
            >
              <StarBorderIcon />
            </IconButton>
          </Button>
        </React.Fragment>
      )}
    </PopupState>
  );
}
