import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";

import { getAverageScore } from "../helpers";
import { fetchItems, getItems } from "../slices/itemSlice";

const DataGridTable = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(getItems);

  useEffect(() => {
    const _fetchItems = async () => {
      await dispatch(fetchItems(localStorage.getItem("userId")));
      setLoading(false);
    };
    _fetchItems();
  }, [dispatch]);

  const customSort = (a, b) => {
    if (a === "-") {
      return 1;
    }
    if (b === "-") {
      return -1;
    }
    if (+a >= +b) {
      return -1;
    }
    return 1;
  };
  const columns = [
    { field: "id", headerName: "ID", hide: true },
    { field: "item", headerName: "Item", flex: 1.1, headerAlign: "center" },
    {
      field: "avg",
      type: "number",
      headerName: "Avg",
      flex: 0.7,
      headerAlign: "center",
      align: "left",
      sortComparator: customSort,
    },
    {
      field: "3",
      type: "number",
      flex: 0.6,
      headerAlign: "center",
      align: "left",
      sortComparator: customSort,
      renderHeader: (params) => (
        <SentimentSatisfiedAlt sx={{ color: "#519259" }} />
      ),
    },

    {
      field: "1",
      type: "number",
      headerAlign: "center",
      align: "left",
      flex: 0.6,
      sortComparator: customSort,
      renderHeader: (params) => (
        <SentimentVeryDissatisfied color="red" sx={{ color: "#b54832" }} />
      ),
    },
  ];

  const getAvgScore = (itemScores) => {
    let score = getAverageScore(itemScores, "All Time");

    return formatScore(score);
  };

  const formatScore = (score) => {
    if (!score) {
      return "-";
    }
    if (String(score).length === 1) {
      return score + ".00";
    }
    if (String(score).length === 3) {
      return score + "0";
    }
    return String(score);
  };

  const getDayScoreWhen = (itemScores, targetScore) => {
    const dates = [];
    Object.entries(itemScores)
      .filter((item) => item[1] === targetScore)
      .forEach((item) => {
        if (!dates.includes(item[0])) {
          dates.push(item[0]);
        }
      });

    let scores = {};
    items.forEach((item) => {
      Object.entries(item.scores).forEach((entry) => {
        let date = entry[0];
        let score = entry[1];
        if (dates.includes(date)) {
          if (!scores[date]) {
            scores[date] = [];
          }
          scores[date].push(score);
        }
      });
    });

    let dateScores = Object.entries(scores)
      .map((item) => item[1])
      .flat();
    if (!dateScores.length) {
      return "-";
    }
    return (
      Math.round(
        (dateScores.reduce((sum, score) => sum + score, 0) / dateScores.length +
          Number.EPSILON) *
          100
      ) / 100
    );
  };

  const rows = items.map((item, idx) => {
    return {
      id: idx + 1,
      item: item.title,
      avg: getAvgScore(item.scores),
      3: getDayScoreWhen(item.scores, 3),
      1: getDayScoreWhen(item.scores, 1),
    };
  });

  if (loading) {
    return (
      <Box
        sx={{
          width: "50%",
          margin: "2rem auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "background.paper" }} />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "60vh",
        width: { xs: "100%", sm: "90%", md: "50%" },
        margin: "auto",
        padding: "0.5rem",
      }}
    >
      <DataGrid
        sx={{
          color: "background.paper",
          backgroundColor: "primary.dark",

          border: "1px sold white",
          "& .MuiDataGrid-columnHeader": {
            color: "background.paper",
          },
          "& .MuiDataGrid-iconSeparator": {
            color: "background.paper",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "background.paper",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "background.paper",
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "avg", sort: "asc" }],
          },
        }}
        sortingOrder={["asc", "desc"]}
        autoHeight={true}
        rows={rows}
        columns={columns}
        disableColumnFilter
        pagination={false}
        hideFooterPagination={true}
        hideFooter={true}
        disableColumnMenu
        disableColumnSelector
        disableExtendRowFullWidth
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={[
          {
            groupId: "Avg Daily Score When",
            children: [{ field: "3" }, { field: "2" }, { field: "1" }],
            renderHeaderGroup: (params) => <Box>Avg Day Score</Box>,
            headerAlign: "center",
          },
        ]}
        getRowHeight={() => "auto"}
        pageSizeOptions={[]}
        pageSize={rows.length}
      />
    </Box>
  );
};
export default DataGridTable;
