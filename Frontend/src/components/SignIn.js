import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import axios from "../axios";

const SignIn = () => {
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/login", {
        emailId: data.get("email"),
        password: data.get("password"),
      })
      .then(function (response) {
        console.log(response);
        // history.push("/dashboard");
        window.location.href = "/dashboard";
      })
      .catch(function (error) {
        console.log(error.response);
        setError(true);
      });
  };

  return (
    <div className="SigninForm">
      <h1>Login</h1>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            border: "1px solid grey",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          {error ? (
            <p style={{ color: "red" }}>Incorrect email or password!</p>
          ) : (
            ""
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            <Grid item style={{ margin: "auto" }}>
              <Link to="/signup" variant="body2" style={{ color: "#8888e5" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default SignIn;
