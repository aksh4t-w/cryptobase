import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { mediastack } from "../axios";
import "./styles.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  backgroundColor: "rgba(0,0,0,0.3) !important",
  color: "lightgrey !important",
  height: "150px",
}));

// author: null
// category: "general"
// country: "us"
// description: "(marketscreener.com) Aker BioMarine, a global biotech innovator and world-leading supplier of krill, announces two new talents on the Human Nutrition team. Katina Handeland, PhD., and Yunpeng Ding, PhD. have both joined Aker BioMarine as Directors for Research & Development . They will be responsible for research within the company's human health and...https://www.marketscreener.com/quote/stock/AKER-BIOMARINE-AS-109403077/news/Aker-BioMarine-nbsp-Hires-Two-Top-Scientists-to-Strengthen-its-R-D-Initiatives-35864498/?utm_medium=RSS&utm_content=20210715"
// image: null
// language: "en"
// published_at: "2021-07-15T08:35:06+00:00"
// source: "4-traders"
// title: "Aker BioMarine&nbsp;: Hires Two Top Scientists to Strengthen its R&D Initiatives"
// url: "https://www.marketscreener.com/quote/stock

function HomePage() {
  const [homeNews, setHomeNews] = useState(null);

  useEffect(() => {
    mediastack
      .get("keywords=crypto&countries=us")
      .then((res) => {
        console.log(res);
        setHomeNews(res.data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <div className="homepage_newsBlocks">
        <div class="newsContainer">
          <Grid container spacing={2}>
            {homeNews?.map((item) => (
              <Grid item xs={6} md={4} lg={3}>
                <Item>{item.title}</Item>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
