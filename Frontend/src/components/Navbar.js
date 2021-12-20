import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/system";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import axios from "../axios";
import "./styles.css";
import { myContext } from "../context/Context";
import { useTheme } from "@material-ui/core/styles";
import MobileNav from "./MobileNav";

const Navbar = ({ auth }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { user, userName } = useContext(myContext);

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

  // Styles
  const linkStyle = {
    textDecoration: "none",
    fontWeight: "600",
    color: "white",
  };
  return (
    <>
      {isMobile ? (
        <MobileNav />
      ) : (
        <div className="navbar">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar
              position="static"
              style={{
                background: "#002f4b",
                // backgroundImage: "linear-gradient(to bottom, #002f4b, #361e1a)",
              }}
            >
              <Toolbar>
                <Button variant="outlined" color="inherit">
                  <Link to="/" style={linkStyle}>
                    Home
                  </Link>
                </Button>
                {user ? (
                  <Button
                    style={{ margin: "0 15px" }}
                    variant="outlined"
                    color="inherit"
                  >
                    <Link to="/dashboard" style={linkStyle}>
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  ""
                )}
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  style={{
                    textAlign: "start",
                    color: "lightgreen",
                    fontWeight: "700",
                    paddingLeft: "10px",
                  }}
                >
                  <p>CRYPTOBASE</p>
                </Typography>
                {!user ? (
                  <div className="nav_buttons">
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="inherit">
                        <Link to="/signin" style={linkStyle}>
                          Sign In
                        </Link>
                      </Button>
                      <Button variant="outlined" color="inherit">
                        <Link to="/signup" style={linkStyle}>
                          Sign Up
                        </Link>
                      </Button>
                    </Stack>
                  </div>
                ) : (
                  <h3 style={{ paddingRight: "10px" }}>
                    {`Hi ${
                      userName?.split(" ")[0].charAt(0).toUpperCase() +
                      userName?.split(" ")[0].slice(1)
                    }!
                `}
                  </h3>
                )}
                {user ? (
                  <div>
                    <Stack direction="row" spacing={2}>
                      <Button variant="outlined" color="inherit">
                        <Link to="/userProfile" style={linkStyle}>
                          Profile
                        </Link>
                      </Button>
                      <Button variant="outlined" color="inherit">
                        <Link to="/" onClick={logout} style={linkStyle}>
                          Log out
                        </Link>
                      </Button>
                    </Stack>
                  </div>
                ) : (
                  ""
                )}
              </Toolbar>
            </AppBar>
          </Box>
        </div>
      )}
    </>
  );
};

export default Navbar;
