import React, { useContext } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router";
import { myContext } from "../context/Context";
import axios from "../axios";
import "./styles.css";
import { AppBar } from "@material-ui/core";
import { Box } from "@mui/system";
import { Toolbar, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // title: {
  //   [theme.breakpoints.down("xs")]: {
  //     flexGrow: 1,
  //   },
  // },
  // headerOptions: {
  //   display: "flex",
  //   flex: 1,
  //   justifyContent: "space-evenly",
  // },
}));

const MobileNav = () => {
  const { user, userName } = useContext(myContext);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "Sign In",
      pageURL: "/signin",
    },
    {
      menuTitle: "Sign Up",
      pageURL: "/signup",
    },
  ];

  const logout = async () => {
    await axios
      .post("/logout", {})
      .then((response) => {
        console.log(response);
        if (response.status == 200) window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mobileNav">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            background: "#002f4b",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRYPTOBASE
            </Typography>
            {user ? (
              <h4>
                {`Hi ${
                  userName.split(" ")[0].charAt(0).toUpperCase() +
                  userName.split(" ")[0].slice(1)
                }!
                `}
              </h4>
            ) : null}
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {user ? (
          <>
            <MenuItem onClick={() => handleMenuClick("/")}>Home</MenuItem>
            <MenuItem onClick={() => handleMenuClick("/Dashboard")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => handleMenuClick("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => logout()}>Log Out</MenuItem>
          </>
        ) : (
          menuItems.map((menuItem) => {
            const { menuTitle, pageURL } = menuItem;
            return (
              <MenuItem onClick={() => handleMenuClick(pageURL)}>
                {menuTitle}
              </MenuItem>
            );
          })
        )}
      </Menu>
    </div>
  );
};

export default MobileNav;
