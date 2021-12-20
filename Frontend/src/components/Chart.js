import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "kaktana-react-lightweight-charts"; // Might need --force install
import "./styles.css";
import SwitchChart from "./SwitchChart";

const CryptoChart = (props) => {
  const [marketData, setMarketData] = useState(null);
  const [currentCoinName, setCurrentCoinName] = useState(
    props.location.state.coinId
  );

  console.log(currentCoinName);

  const state = {
    options: {
      alignLabels: true,
      timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: "#fff000",
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    },
  };
  // console.log(currentCoinName);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${currentCoinName}/market_chart?vs_currency=usd&days=500&interval=daily`
      )
      .then((response) => {
        const data = [];
        response.data.prices.map((item) => {
          const date = new Date(item[0]).toLocaleDateString("en-US").split("/");
          // date = '8/26/2021'
          const a = date[2] + "-" + date[0] + "-" + date[1];
          data.push({ time: a, value: item[1] });
        });
        setMarketData([{ data: data }]);
      })
      .catch((err) => console.log(err.response));
  }, [currentCoinName]);

  return (
    <div>
      <h1>
        {currentCoinName?.charAt(0).toUpperCase() + currentCoinName?.slice(1)}{" "}
        Chart
      </h1>
      <div className="chart">
        {marketData !== null ? (
          <Chart
            options={state.options}
            areaSeries={marketData}
            autoWidth
            margin="auto"
            // width={800}
            height={400}
            darkTheme={true}
          />
        ) : (
          <h3>Loading chart...</h3>
        )}
        <SwitchChart
          setCoin={(c) => setCurrentCoinName(c)}
          favourites={props.location.state.favorites}
        />
      </div>
    </div>
  );
};

export default CryptoChart;
