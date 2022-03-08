import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import NotesIcon from "@mui/icons-material/Notes";
import PaidIcon from "@mui/icons-material/Paid";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import StarIcon from "@mui/icons-material/Star";
import "./Sidebar.css";
import Home from "../views/home/ForexHome";
import Logo from "../assets/Logo.svg";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "#184D47",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: "#184D47",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [revealSideBar, setRevealSideBar] = React.useState("none");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRevealSideBar = () => {
    if (revealSideBar === "flex") setRevealSideBar("none");
    else setRevealSideBar("flex");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}></AppBar>
      <div style={{ position: "relative" }}>
        <button
          aria-label="reveal drawer"
          onClick={handleRevealSideBar}
          className="sideBar"
        >
          {revealSideBar === "none" ? (
            <NotesIcon sx={{ color: "#184D47" }} fontSize="large" />
          ) : (
            <ArrowCircleLeftIcon sx={{ color: "#184D47" }} fontSize="large" />
          )}
        </button>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ display: { xs: revealSideBar, sm: "flex" } }}
        >
          <Toolbar style={{ backgroundColor: "#0E312D", height: "70px" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
              style={{ color: "white" }}
            >
              <MenuIcon />
            </IconButton>
            <DrawerHeader>
              <Typography
                noWrap
                component="div"
                style={{
                  color: "white",
                  fontSize: "27px",
                  fontFamily: "Bree Serif",
                  paddingRight: "10px",
                  paddingLeft: "20px",
                }}
              >
                TREX
              </Typography>
              <img className="logo-component" src={Logo} />
              <IconButton
                onClick={handleDrawerClose}
                style={{ color: "white", paddingLeft: "40px" }}
              >
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
          </Toolbar>

          <Divider />
          <List
            style={{
              backgroundColor: "#184D47",
              paddingTop: "18px",
              paddingLeft: "5px",
            }}
          >
            {["Home", "Forex"].map((text, index) => (
              <ListItem
                style={{ color: "#CFF4D2", paddingTop: "15px" }}
                button
                key={text}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {index % 2 === 0 ? <HomeIcon /> : <CandlestickChartIcon />}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  style={{ color: "white", fontSize: "23px" }}
                  primary={text}
                />
              </ListItem>
            ))}
            {["Crypto", "Watchlist"].map((text, index) => (
              <ListItem
                style={{ color: "#CFF4D2", paddingTop: "15px" }}
                button
                key={text}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {index % 2 === 0 ? <PaidIcon /> : <StarIcon />}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  style={{ color: "white", fontSize: "23px" }}
                  primary={text}
                />
              </ListItem>
            ))}
            {["Login"].map((text, index) => (
              <ListItem
                style={{ color: "#CFF4D2", paddingTop: "15px" }}
                button
                key={text}
              >
                <ListItemIcon style={{ color: "white" }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  style={{ color: "white", fontSize: "23px" }}
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      </div>

      <Box component="main" sx={{ flexGrow: 1 }} style={{ overflow: "hidden" }}>
        {/* <Navbar /> */}
        <Home />
      </Box>
    </Box>
  );
}
