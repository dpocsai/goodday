import React from "react";
import Chart from "react-google-charts";

import { getDateDaysAgo } from "../../helpers";

const PieChart = ({ item, range }) => {
  const getScoreCount = (score) => {
    let items = Object.entries(item.scores)
      .filter(
        (i) =>
          new Date(i[0]) >= new Date(getDateDaysAgo(range)) ||
          range === "All Time"
      )
      .map((item) => item[1]);

    return items.reduce((count, curScore) => {
      if (curScore === score) {
        count++;
      }
      return count;
    }, 0);
  };
  const data = [
    ["Score", "Score"],
    ["1", +`${getScoreCount(1)}`],
    ["2", +`${getScoreCount(2)}`],
    ["3", +`${getScoreCount(3)}`],
  ];

  const options = {
    colors: ["#b54832", "#eba83a", "#519259"],
    backgroundColor: { fill: "#dcd7c9" },
    chartArea: { backgroundColor: "#dcd7c9", width: "100%", height: "100%" },
    enableInteractivity: false,
    fontName: "Rubik",
    legend: {
      alignment: "center",
      position: "none",
    },
    pieSliceBorderColor: "#dcd7c9",
    pieSliceTextStyle: { fontName: "Rubik", fontSize: 12 },
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"175px"}
      height={"175px"}
    />
  );
};

export default PieChart;
