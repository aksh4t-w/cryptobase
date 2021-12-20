import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { myContext } from "../context/Context";
import axios from "../axios";
import "./styles.css";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Profile = () => {
  const [user, setUser] = useState(null);
  const { setUserName } = useContext(myContext);

  const [newName, setNewName] = useState(null);
  const [updateResponse, setUpdateResponse] = useState(null);
  const history = useHistory();

  // Thu Nov 04 2021 22:56:14 GMT-0500 (Central Daylight Time)

  useEffect(() => {
    // axios
    //   .get("/cryptoUserDetails/get")
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    axios
      .get("/dashboard")
      .then(function (response) {
        console.log(response);
        const temp = response.data.dob.split(" ");
        response.data.dateTime = response.data.dob;
        response.data.dob = temp[1] + " " + temp[2] + " " + temp[3];

        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }, []);

  const deleteProfile = () => {
    axios
      .post("/deleteUser", { emailId: user.emailId })
      .then(function (response) {
        console.log(response);
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  const editProfile = () => {
    axios
      .post("/updateUser", {
        username: newName,
        emailId: user.emailId,
        dob: user.dateTime,
      })
      .then(function (response) {
        console.log(response);
        history.push("/userProfile");
        setUpdateResponse(true);
        user.username = newName;
        setUserName(newName);
        setNewName("");
        // window.location.href = "/userProfile";
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  return (
    <div className="profile">
      <ThemeProvider theme={theme}>
        <Link to="/tickers" style={{ textDecoration: "none" }}>
          <Button color="primary" variant="outlined">
            Set Favourite Cryptos
          </Button>
        </Link>
        <h3>User Info:</h3>
        {updateResponse ? (
          <h4 style={{ color: "#339b30" }}>Name updated!</h4>
        ) : (
          ""
        )}
        <p>
          <b>Name:</b> {user?.username}
        </p>
        <p>
          <b>Email:</b> {user?.emailId}
        </p>
        <p>
          <b>Date of birth:</b> {user?.dob}
        </p>
        <TextField
          fullWidth
          label="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          id="fullWidth"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={editProfile}
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
        <Button
          type="submit"
          fullWidth
          onClick={deleteProfile}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Delete Profile
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default Profile;
