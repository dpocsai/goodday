import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  TextField,
  Box,
  Button,
  Fab,
  CircularProgress,
} from "@mui/material";
import { ArrowBack, ArrowForward, Add } from "@mui/icons-material";
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import {
  getPrevDateString,
  getNextDateString,
  getSelectedDateString,
} from "../helpers";
import { fetchItems, getItems } from "../slices/itemSlice";
import Item from "./Item/Item";

const Items = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  );
  new Date().toLocaleDateString();
  const [calcScore, setCalcScore] = useState(false);

  const items = useSelector(getItems).filter(
    (item) => new Date(item.dateCreated) <= new Date(date)
  );

  useEffect(() => {
    const _fetchItems = async () => {
      await dispatch(fetchItems(localStorage.getItem("userId")));
      setLoading(false);
    };
    _fetchItems();
  }, [date, calcScore, dispatch]);

  const renderItems = () => {
    return items.map((item) => <Item key={item._id} item={item} date={date} />);
  };

  const getDayScore = () => {
    if (!items.every((item) => item.scores[date])) {
      return null;
    }
    let sum = items.reduce((sum, item) => {
      sum += item.scores[date] || 0;
      return sum;
    }, 0);
    let score = Math.round((sum / items.length + Number.EPSILON) * 100) / 100;
    return Number.isNaN(score) ? null : score;
  };

  const getDayIcon = () => {
    if (
      !items.every((item) => {
        return item.scores[date];
      }) ||
      !items.length
    ) {
      return;
    }
    let score = getDayScore();

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

  if (!items.length) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          width: { xs: "95%", sm: "80%", md: "65%", lg: "50%" },
          padding: "1rem",
          margin: "0 auto 1rem auto",
        }}
      >
        <Typography
          sx={{
            color: "primary.contrastText",
            textAlign: "center",
          }}
          variant="h6"
        >
          You have no tracked items
        </Typography>
        <Link to="/new" style={{ color: "inherit", textDecoration: "inherit" }}>
          <Fab
            size="small"
            sx={{
              backgroundColor: "background.paper",
              color: "background.default",
              "&:hover": {
                backgroundColor: "white",
                color: "primary.dark",
              },
            }}
          >
            <Add />
          </Fab>
        </Link>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        width: { xs: "95%", sm: "80%", md: "65%", lg: "50%" },
        padding: "1rem",
        margin: "0 auto 1rem auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          width: "90%",
          margin: "1rem auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowBack
          sx={{
            color: "background.paper",
            cursor: "pointer",
            "&:hover": { color: "white" },
          }}
          onClick={() => {
            if (
              items.every(
                (item) =>
                  new Date(getPrevDateString(date)) < new Date(item.dateCreated)
              )
            )
              return;

            setDate(getPrevDateString(date));
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            sx={{
              color: "background.default",
            }}
            value={date}
            onChange={(date) => {
              if (
                items.every(
                  (item) => new Date(date) < new Date(item.dateCreated)
                ) ||
                new Date(date) > new Date()
              ) {
                return;
              }
              setDate(getSelectedDateString(date));
            }}
            closeOnSelect
            renderInput={(params) => (
              <TextField
                sx={{
                  input: {
                    textAlign: "center",
                    color: "background.paper",
                    cursor: "pointer",
                    padding: "0.5rem 0",
                    "&:hover": { color: "white" },
                  },
                  "& fieldset": { border: "none" },
                  backgroundColor: "primary.dark",
                  borderRadius: "5px",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <ArrowForward
          sx={{
            color: "background.paper",
            cursor: "pointer",
            "&:hover": { color: "white" },
          }}
          onClick={() => {
            if (new Date(getNextDateString(date)) > new Date()) {
              return;
            }
            setDate(getNextDateString(date));
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          margin: "1rem 0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "40px", height: "40px", marginRight: "auto" }}></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            width: "65px",
            height: "65px",
            padding: "0.6rem",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.dark",
          }}
        >
          {getDayIcon()}
          <Typography variant="button" sx={{ color: "background.paper" }}>
            {getDayScore()}
          </Typography>
        </Box>
        <Link
          to="/new"
          style={{
            color: "inherit",
            textDecoration: "inherit",
            marginLeft: "auto",
          }}
        >
          <Fab
            size="small"
            sx={{
              backgroundColor: "background.paper",
              color: "background.default",
              "&:hover": {
                backgroundColor: "white",
                color: "primary.dark",
              },
            }}
          >
            <Add />
          </Fab>
        </Link>
      </Box>

      {renderItems()}
      <Button
        variant="contained"
        onClick={() => {
          setCalcScore(!calcScore);
        }}
        sx={{
          margin: "1rem 0",
          backgroundColor: "primary.dark",
          color: "background.paper",
          width: "9rem",
          "&:hover": { color: "white" },
        }}
      >
        Get Score
      </Button>
    </Box>
  );
};

export default Items;
