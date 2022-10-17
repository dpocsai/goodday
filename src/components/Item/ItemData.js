import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Typography,
  Box,
  Paper,
  IconButton,
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
  CloseRounded,
} from "@mui/icons-material";

import {
  getAverageScore,
  getLongestScoreStreak,
  getDaysTracked,
} from "../../helpers";
import PieChart from "./PieChart";

const ItemData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { item } = location.state;
  const [range, setRange] = useState("All Time");

  const getScoreIcon = () => {
    let score = getAverageScore(item.scores, range);

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
        padding: "1rem",
        margin: "2rem auto",
      }}
    >
      <IconButton
        onClick={() => {
          navigate("/");
        }}
        sx={{ alignSelf: "flex-start" }}
      >
        <CloseRounded
          sx={{ cursor: "pointer", color: "text", fontSize: "30px" }}
        />
      </IconButton>

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        {item.title}
      </Typography>

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
          sx={{ lineHeight: "1.2", fontWeight: "bold", fontSize: "14px" }}
        >
          Average Score
        </Typography>
        {getScoreIcon()}
        <Typography sx={{ lineHeight: "1.2", fontWeight: "bold" }}>
          {getAverageScore(item.scores, range)}
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
          gap: "0.3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ lineHeight: "1.2", fontWeight: "bold", fontSize: "14px" }}
        >
          Longest Streaks
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <SentimentSatisfiedAlt color="success" sx={{ fontSize: "20px" }} />
            <Typography sx={{ fontWeight: "bold" }}>
              {getLongestScoreStreak(3, item, range)}
            </Typography>
          </Box>
          <Typography sx={{ color: "text.disabled", fontWeight: "light" }}>
            |
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <SentimentNeutral color="warning" sx={{ fontSize: "20px" }} />
            <Typography sx={{ fontWeight: "bold" }}>
              {getLongestScoreStreak(2, item, range)}
            </Typography>
          </Box>
          <Typography sx={{ color: "text.disabled", fontWeight: "light" }}>
            |
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <SentimentVeryDissatisfied
              color="error"
              sx={{ fontSize: "20px" }}
            />
            <Typography sx={{ fontWeight: "bold" }}>
              {getLongestScoreStreak(1, item, range)}
            </Typography>
          </Box>
        </Box>
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
          Score Distribution
        </Typography>
        <PieChart item={item} range={range} />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
          Created on: {item.dateCreated}
        </Typography>

        <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
          Days tracked: {getDaysTracked(item)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ItemData;
