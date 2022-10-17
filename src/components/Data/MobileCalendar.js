import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box } from "@mui/material";
import "./calendar.css";
import { fetchItems, getItems } from "../../slices/itemSlice";
import { getAverageScore } from "../../helpers";

const MobileCalendar = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();

  const items = useSelector(getItems);

  useEffect(() => {
    dispatch(fetchItems(localStorage.getItem("userId")));
  }, [dispatch]);

  const setTileColor = (date, view) => {
    if (view !== "month") {
      return "";
    }

    let scores = items.map((item) => item.scores);

    let scoresSortedByDate = scores.reduce((scores, item) => {
      let itemScores = Object.entries(item);
      itemScores.forEach((item) => {
        if (!scores[item[0]]) {
          scores[item[0]] = [];
        }
        scores[item[0]].push(item[1]);
      });
      return scores;
    }, {});

    for (let date in scoresSortedByDate) {
      scoresSortedByDate[date] = getAverageScore(
        scoresSortedByDate[date],
        "All Time"
      );
    }

    let tileScore =
      scoresSortedByDate[
        date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      ];
    let tileColors = [
      { val: 2.34, color: "green" },
      { val: 1.67, color: "yellow" },
      { val: 1, color: "red" },
    ];
    for (let tileColor of tileColors) {
      if (tileScore >= tileColor.val) {
        return tileColor.color;
      }
    }
    return "incomplete";
  };
  return (
    <Box
      id="test"
      sx={{
        margin: "2rem auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Calendar
        onChange={onChange}
        value={value}
        maxDate={new Date()}
        minDetail={"month"}
        tileClassName={({ activeStartDate, date, view }) =>
          setTileColor(date, view)
        }
        prev2Label={null}
        next2Label={null}
        prevLabel={<ArrowBack />}
        nextLabel={<ArrowForward />}
      />
    </Box>
  );
};
export default MobileCalendar;
