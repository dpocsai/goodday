import React from "react";
import Chart from "react-google-charts";

import { getDateDaysAgo } from "../../helpers";

const OverallPieChart = ({ scores, range }) => {
  scores = Object.entries(scores)
    .filter(
      (i) =>
        new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
        range === "All Time"
    )
    .map((entry) => {
      let avgScore =
        Math.round(
          (entry[1].reduce((sum, score) => sum + score, 0) / entry[1].length +
            Number.EPSILON) *
            100
        ) / 100;
      return avgScore;
    });

  const getScoreCount = (score) => {
    console.log(scores);
    if (!scores.length) {
      return 0;
    }
    if (score === 1) {
      return scores.filter((s) => s >= 1 && s < 1.67).length;
    }
    if (score === 2) {
      return scores.filter((s) => s >= 1.67 && s < 2.34).length;
    }
    if (score === 3) {
      return scores.filter((s) => s >= 2.34 && s <= 3).length;
    }
  };
  const data = [
    ["ScoreLabel", "Score"],
    ["1 - 1.66", getScoreCount(1)],
    ["1.67 - 2.33", getScoreCount(2)],
    ["2.34 - 3", getScoreCount(3)],
  ];

  const options = {
    colors: ["#b54832", "#eba83a", "#519259"],
    backgroundColor: { fill: "#dcd7c9" },
    chartArea: { backgroundColor: "#dcd7c9", width: "100%", height: "100%" },

    fontName: "Rubik",
    legend: {
      alignment: "center",
    },
    pieSliceBorderColor: "#dcd7c9",
    pieSliceTextStyle: { fontName: "Rubik", fontSize: 12 },
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"300px"}
      height={"200px"}
    />
  );
};

export default OverallPieChart;
