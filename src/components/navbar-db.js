import * as React from "react";
import { AppBar, makeStyles } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ListItemButton } from "@mui/material";
import "./navbar-db.css";
import SearchBar from "./searchbar";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material";
import Logo from "../assets/Logo.svg";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import StarIcon from "@mui/icons-material/Star";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Navbar = () => {
  const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      style={{ backgroundColor: "#184D47" }}
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <DrawerHeader style={{ backgroundColor: "#184D47" }}>
        <IconButton
          style={{ color: "white" }}
          onClick={toggleDrawer("left", false)}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List style={{ backgroundColor: "#184D47" }}>
        <ListItem>
          <ListItemButton style={{ color: "white" }}>
            <HomeIcon />
            <ListItemText
              sx={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
              disableTypography
              primary="Home"
            />
          </ListItemButton>
        </ListItem>
        {/* <Divider /> */}
        <ListItem>
          <ListItemButton style={{ color: "white" }}>
            <CandlestickChartIcon />
            <ListItemText
              sx={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
              disableTypography
              primary="Forex"
            />
          </ListItemButton>
        </ListItem>
        {/* <Divider /> */}
        <ListItem>
          <ListItemButton style={{ color: "white" }}>
            <PaidIcon />
            <ListItemText
              sx={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
              disableTypography
              primary="Crypto"
            />
          </ListItemButton>
        </ListItem>
        {/* <Divider /> */}
        <ListItem>
          <ListItemButton style={{ color: "white" }}>
            <StarIcon />
            <ListItemText
              sx={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
              disableTypography
              primary="Watchlist"
            />
          </ListItemButton>
        </ListItem>
        {/* <Divider /> */}
        <ListItem>
          <ListItemButton style={{ color: "white" }}>
            <AccountCircleIcon />
            <ListItemText
              sx={{ fontSize: "20px", color: "white", paddingLeft: "15px" }}
              disableTypography
              primary="Login"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          backgroundColor: "#F9F7F7",
          position: "inherit",
        }}
      >
        <Toolbar id="toolbar">
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton
                  id="menuIcon"
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(anchor, true)}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon style={{ color: "black" }} />
                </IconButton>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
          <Box id="trybox" style={{ width: "100%", alignItems: "center" }}>
            <Box id="titleBox">
              <Typography
                id="title"
                variant="h4"
                style={{
                  fontFamily: "Bree Serif",
                  paddingLeft: "5px",
                  color: "#184D47",
                }}
              >
                TREX
              </Typography>
              <img className="logo-component" src={Logo} />
            </Box>
            <Box id="searchBox">
              <SearchBar />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
