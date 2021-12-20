import React, { useEffect, useState } from "react";
import axiosDefault from "axios";
import axios from "../axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import "./styles.css";

const TickerSelection = () => {
  const [tickers, setTickers] = useState([]);
  const [checked, setChecked] = useState([]);
  // const [coinData, setCoinData] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    axios
      .get("/cryptoUserDetails/get")
      .then((res) => {
        const temp = JSON.parse(res.data.message.crypto_ticker);
        console.log(temp);
        setFavourites(temp);
      })
      .catch((err) => console.log(err));

    axiosDefault
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res) => {
        setTickers(res.data.slice(0, 40));
        // console.log(tickers);
      })
      .catch((err) => console.log(err.response));

    // axios.get().then().catch() GET FAVOURITES ON COMPONENT LOAD then setFavourites
  }, []);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    // console.log(checked);
  };

  const handleSubmit = () => {
    const temp = [];
    // console.log(favourites);
    checked.map((coin) => {
      const newCoin = { name: coin.name, id: coin.id, symbol: coin.symbol };
      if (!favourites.some((item) => item.name === coin.name))
        temp.push(newCoin);
    });
    setFavourites([...favourites, ...temp]);
    setChecked([]);
    const temp2 = JSON.stringify([...favourites, ...temp]);
    // console.log(favourites, temp2);

    axios
      .post("/cryptoUserDetails/set", { tickers: temp2 })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };

  const resetFavourites = () => {
    setFavourites([]);
    axios
      .post("/cryptoUserDetails/set", { tickers: "NA" })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="tickers">
      <h1>Select your favourite Crypto Currencies!</h1>
      <ThemeProvider theme={theme}>
        <div className="tickers_lists">
          <div className="tickers_all_container">
            <div className="tickers_all">
              <h3>Coins by market cap:</h3>
              <List
                dense
                sx={{
                  padding: 1,
                  width: "100%",
                  maxWidth: 360,
                  // bgcolor: "background.paper",
                  bgcolor: "rgba(0,0,0,0)",
                  // border: "1px solid grey",
                }}
              >
                {tickers?.map((coin) => {
                  const labelId = `checkbox-list-secondary-label-${coin.id}`;
                  return (
                    <ListItem
                      style={{ marginBottom: "10px" }}
                      key={coin.id}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          onChange={() => handleToggle(coin)}
                          checked={checked.indexOf(coin) !== -1}
                          inputProps={{ "aria-labelledby": coin.id }}
                        />
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${coin.id + 1}`}
                            src={coin.image}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={coin.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add to favourites!
            </Button>
          </div>
          <div className="tickers_favorites">
            <h3>Your favourites:</h3>
            {favourites?.map((coin) => (
              <h4>{coin.name}</h4>
            ))}
            <Button
              onClick={resetFavourites}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // style={{ color: "white" }}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default TickerSelection;
