import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Typography,
  Box,
  Paper,
  Divider,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";

import { fetchItems, getItems } from "../../slices/itemSlice";

import { getDateDaysAgo } from "../../helpers";
import OverallPieChart from "./OverallPieChart";

const OverallData = () => {
  const items = useSelector(getItems);
  const dispatch = useDispatch();
  const [range, setRange] = useState("All Time");

  useEffect(() => {
    dispatch(fetchItems(localStorage.getItem("userId")));
  }, [dispatch, range]);

  const getScoresSortedByDate = () => {
    let scores = {};
    items.forEach((item) => {
      Object.entries(item.scores).forEach((entry) => {
        let date = entry[0];
        let score = entry[1];
        if (!scores[date]) {
          scores[date] = [];
        }
        scores[date].push(score);
      });
    });

    return scores;
  };

  let scoresSortedByDate = getScoresSortedByDate();

  const getAverageScore = () => {
    if (!items.length) {
      return 0;
    }
    let scores = Object.entries(scoresSortedByDate)
      .filter(
        (i) =>
          new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
          range === "All Time"
      )
      .map((item) => item[1])
      .flat();

    return (
      Math.round(
        (scores.reduce((sum, score) => sum + score, 0) / scores.length +
          Number.EPSILON) *
          100
      ) / 100
    );
  };
  const getBestAndWorstDay = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let scores = {};
    if (!items.length) {
      return [
        ["", 0],
        ["", 0],
      ];
    }
    items.forEach((item) => {
      Object.entries(item.scores)
        .filter(
          (i) =>
            new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
            range === "All Time"
        )
        .forEach((entry) => {
          let dayOfWeek = weekday[new Date(entry[0]).getDay()];

          let score = entry[1];
          if (!scores[dayOfWeek]) {
            scores[dayOfWeek] = [];
          }
          scores[dayOfWeek].push(score);
        });
    });

    let avgScoresByDay = Object.entries(scores)
      .map((entry) => {
        let avgScore =
          Math.round(
            (entry[1].reduce((sum, score) => sum + score, 0) / entry[1].length +
              Number.EPSILON) *
              100
          ) / 100;
        return [entry[0], avgScore];
      })
      .sort((a, b) => a[1] - b[1]);
    let worst = avgScoresByDay[0];
    let best = avgScoresByDay[avgScoresByDay.length - 1];

    return [worst, best];
  };

  const getBestAndWorstItem = () => {
    const scores = {};
    if (!items.length) {
      return [
        ["", 0],
        ["", 0],
      ];
    }
    items.forEach((item) => {
      Object.entries(item.scores)
        .filter(
          (i) =>
            new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
            range === "All Time"
        )
        .forEach((entry) => {
          let score = entry[1];
          if (!scores[item.title]) {
            scores[item.title] = [];
          }
          scores[item.title].push(score);
        });
    });

    let avgScoresByItem = Object.entries(scores)
      .map((entry) => {
        let avgScore =
          Math.round(
            (entry[1].reduce((sum, score) => sum + score, 0) / entry[1].length +
              Number.EPSILON) *
              100
          ) / 100;
        return [entry[0], avgScore];
      })
      .sort((a, b) => a[1] - b[1]);
    let worst = avgScoresByItem[0];
    let best = avgScoresByItem[avgScoresByItem.length - 1];
    return [worst, best];
  };

  const getScoreIcon = () => {
    let score = getAverageScore();

    if (score > 2.33) {
      return (
        <SentimentSatisfiedAlt color="success" sx={{ fontSize: "30px" }} />
      );
    }
    if (score > 1.66) {
      return <SentimentNeutral color="warning" sx={{ fontSize: "30px" }} />;
    }

    return (
      <SentimentVeryDissatisfied color="error" sx={{ fontSize: "30px" }} />
    );
  };

  const rangeOptions = [
    { value: 7, label: "1 Week" },
    { value: 30, label: "1 Month" },
    { value: 365, label: "1 Year" },
    { value: "All Time", label: "All Time" },
  ];

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "40%" },
        padding: "2rem 0 1rem 0",
        margin: "1rem auto 3rem auto",
      }}
    >
      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Time Range</InputLabel>
        <Select
          size="small"
          value={range}
          label="Time Range"
          onChange={(e) => setRange(e.target.value)}
          defaultValue="All Time"
        >
          {rangeOptions.map((option, idx) => {
            return (
              <MenuItem
                key={idx}
                value={option.value}
                sx={{ justifyContent: "center" }}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ lineHeight: "1.2", fontWeight: "bold", fontSize: "16px" }}
        >
          Average Score
        </Typography>
        {getScoreIcon()}
        <Typography sx={{ lineHeight: "1.2", fontWeight: "bold" }}>
          {getAverageScore()}
        </Typography>
      </Box>
      <Divider
        sx={{
          width: { xs: "70%", sm: "60%", md: "50%", lg: "40%" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ lineHeight: "1.2", fontWeight: "bold", fontSize: "14px" }}
        >
          Best & Worst Day
        </Typography>
        <Typography sx={{ lineHeight: "1.2", fontSize: "14px" }}>{`${
          getBestAndWorstDay()[1][0]
        }: ${getBestAndWorstDay()[1][1]}`}</Typography>
        <Typography sx={{ lineHeight: "1.2", fontSize: "14px" }}>{`${
          getBestAndWorstDay()[0][0]
        }: ${getBestAndWorstDay()[0][1]}`}</Typography>
      </Box>
      <Divider
        sx={{
          width: { xs: "70%", sm: "60%", md: "50%", lg: "40%" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ lineHeight: "1.2", fontWeight: "bold", fontSize: "14px" }}
        >
          Best & Worst Item
        </Typography>
        <Typography sx={{ lineHeight: "1.2", fontSize: "14px" }}>{`${
          getBestAndWorstItem()[1][0]
        }: ${getBestAndWorstItem()[1][1]}`}</Typography>
        <Typography sx={{ lineHeight: "1.2", fontSize: "14px" }}>{`${
          getBestAndWorstItem()[0][0]
        }: ${getBestAndWorstItem()[0][1]}`}</Typography>
      </Box>
      <Divider
        sx={{
          width: { xs: "70%", sm: "60%", md: "50%", lg: "40%" },
        }}
      />
      <Typography
        sx={{ lineHeight: "1.2", fontWeight: "bold", fontSize: "14px" }}
      >
        Average Daily Scores
      </Typography>
      <OverallPieChart scores={scoresSortedByDate} range={range} />
    </Paper>
  );
};

export default OverallData;
