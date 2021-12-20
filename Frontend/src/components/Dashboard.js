import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "./styles.css";
import NewsModal from "./NewsModal";
import defaultAxios from "axios";
import Likes from "./Likes";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "rgba(0,0,0,0.3) !important",
  color: "lightgrey !important",
  // color: theme.palette.text.primary,
  minHeight: "150px",
}));

// If user got no favourites, redirect to select favourites page
function Dashboard() {
  const history = useHistory();
  const [favNews, setFavNews] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    axios
      .get("/cryptoUserDetails/get")
      .then((res) => {
        setFavourites(JSON.parse(res.data.message.crypto_ticker));

        const urls = [];
        const tempFavs = JSON.parse(res.data.message.crypto_ticker);

        tempFavs?.map((fav) => {
          // console.log(fav);
          urls.push(
            defaultAxios.get(
              `http://api.mediastack.com/v1/news?access_key=ae0baf702b65b31c4bc116657c2d6a17&keywords=${fav.name}&limit=6&countries=us`
            )
          );
        });
        // console.log(urls);

        defaultAxios
          .all(urls)
          .then(
            defaultAxios.spread((...allData) => {
              let i = 0;
              allData.map((item) => {
                const temp = favNews;
                allData[i].coinName = tempFavs[i].name;
                allData[i].coinId = tempFavs[i].id;
                i++;
              });
              setFavNews(allData);
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const redirectToTickers = () => {
    window.location.href = "/tickers";
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {favNews.length !== 0 ? (
        <div className="dashboard_newsBlocks">
          <Box sx={{ flexGrow: 0.8 }}>
            {favNews?.map((item) => (
              <div className="dashboard_newsBlocks_grid">
                <Link
                  to={{
                    pathname: "/chart",
                    state: {
                      coinName: item?.coinName,
                      coinId: item?.coinId,
                      favorites: favourites,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <h3 style={{ color: "#fff" }}>
                    {item?.coinName.toUpperCase()}{" "}
                    <span style={{ fontSize: "12px" }}>(View Chart)</span>
                  </h3>
                </Link>
                <Grid container spacing={2}>
                  {item?.data.data.map((news) => (
                    <Grid item xs={12} md={4}>
                      <Item>
                        <h3>
                          {news?.title.length > 50
                            ? news.title.slice(0, 50) + "..."
                            : news.title}
                        </h3>
                        <p style={{ margin: 0, fontSize: "14px" }}>
                          Published on: {news?.published_at.slice(0, 10)}
                        </p>
                        <a
                          href={news?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "#4ba449" }}
                        >
                          Click for more!
                        </a>
                        <div className="card_options">
                          <Likes newsURL={news?.url} />
                          <NewsModal
                            newsURL={news?.url}
                            coinId={item?.coinId}
                          />
                        </div>
                      </Item>
                    </Grid>
                  ))}

                  {/* <Grid item xs={6} md={4}>
              <Item>News 2</Item>
              </Grid>
              <Grid item xs={6} md={4}>
              <Item>News 3</Item>
              </Grid>
              <Grid item xs={6} md={4}>
              <Item>News 4</Item>
            </Grid> */}
                </Grid>
              </div>
            ))}
          </Box>
        </div>
      ) : (
        <div>
          <h3 className="select_crypto_message">
            You do not have any favourite cryptos selected. Click on the button
            below to get started!
          </h3>
          <Button
            variant="contained"
            color="secondary"
            onClick={redirectToTickers}
            style={{ marginTop: "15px" }}
          >
            Select Cryptos!
          </Button>
        </div>
      )}
    </div>
  );

  // return <div>{user ? <h1>Dashboard</h1> : history.push("/")}</div>;
}

export default Dashboard;
