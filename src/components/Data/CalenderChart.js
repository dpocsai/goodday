import React, { useEffect } from "react";
import Chart from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

import { fetchItems, getItems } from "../../slices/itemSlice";
import { getAverageScore, getAvg } from "../../helpers";

const CalenderChart = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);

  useEffect(() => {
    dispatch(fetchItems(localStorage.getItem("userId")));
  }, [dispatch]);

  const minScore = 1;
  const maxScore = 3;

  const scrollPositions = {
    0: 0,
    1: 0,
    2: 100,
    3: 200,
    4: 300,
    5: 400,
    6: 450,
    7: 550,
    8: 650,
    9: 700,
    10: 800,
    11: 800,
  };
  const getChartData = () => {
    let allScores = items.map((item) => item.scores);

    let sortedScoresByDate = allScores.reduce((scores, item) => {
      let itemScores = Object.entries(item);
      itemScores.forEach((item) => {
        if (!scores[item[0]]) {
          scores[item[0]] = [];
        }
        scores[item[0]].push(item[1]);
      });
      return scores;
    }, {});

    let chartData = Object.entries(sortedScoresByDate).map((day) => {
      let date = new Date(day[0]);
      let avgScore = getAverageScore(day[1], "All Time");

      return [date, avgScore];
    });

    return chartData;
  };
  const data = [
    [
      {
        type: "date",
        id: "Date",
      },
      {
        type: "number",
        id: "score",
      },
    ],
    ...getChartData(),
  ];

  const options = {
    calendar: {
      cellColor: {
        stroke: "#dcd7c9",
        strokeOpacity: 0.2,
        strokeWidth: 0.2,
      },
      cellSize: 20,
      dayOfWeekLabel: {
        fontName: "Rubik",
        fontSize: 14,
        color: "#dcd7c9",
      },
      dayOfWeekRightSpace: 8,
      focusedCellColor: {
        stroke: "white",
        strokeOpacity: 1,
        strokeWidth: 2,
      },
      monthLabel: {
        fontName: "Rubik",
        fontSize: 16,
        color: "#dcd7c9",
      },
      yearLabel: {
        color: "#dcd7c9",
        fontSize: 36,
      },

      monthOutlineColor: {
        stroke: "#dcd7c9",
        strokeOpacity: 0.8,
        strokeWidth: 1,
      },
      unusedMonthOutlineColor: {
        stroke: "#dcd7c9",
        strokeOpacity: 0.8,
        strokeWidth: 1,
      },

      underMonthSpace: 12,
      legend: "none",
    },
    colorAxis: {
      values: [minScore, getAvg(minScore, maxScore), maxScore],
      colors: ["#b54832", "#eba83a", "#519259"],
    },
    noDataPattern: {
      backgroundColor: "#1e2527",
      color: "#1e2527",
    },
    width: 1200,

    fontName: "Rubik",
    legend: { position: "none" },
  };

  return (
    <Box
      id="chartContainer"
      sx={{
        width: "100%",
        overflow: "scroll",
        margin: "1rem auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Chart
        chartType="Calendar"
        height={220}
        data={data}
        options={options}
        chartEvents={[
          {
            eventName: "ready",
            callback: () => {
              if (
                document.getElementById("chartContainer").scrollLeft !==
                scrollPositions[new Date().getMonth()]
              ) {
                document.getElementById("chartContainer").scrollLeft +=
                  scrollPositions[new Date().getMonth()];
              }
            },
          },
        ]}
      />
    </Box>
  );
};

export default CalenderChart;
