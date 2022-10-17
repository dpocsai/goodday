import React from "react";
import { Typography, Box, Paper, Divider } from "@mui/material";
import {
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentNeutral,
} from "@mui/icons-material";

const Welcome = () => {
  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        backgroundColor: "background.default",
        width: { xs: "95%", sm: "80%", md: "65%", lg: "50%" },
        padding: "2rem",
        margin: "2rem auto 1rem auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "secondary.light",
          fontSize: "22px",
          letterSpacing: "0.2rem",
        }}
      >
        WELCOME TO
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <SentimentSatisfiedAlt
          sx={{ color: "success.main", fontSize: "30px" }}
        />
        <SentimentNeutral color="warning" sx={{ fontSize: "30px" }} />
        <SentimentVeryDissatisfied color="error" sx={{ fontSize: "30px" }} />
      </Box>
      <Typography
        variant="h3"
        sx={{
          color: "background.paper",
          letterSpacing: "0.2rem",
          fontWeight: "700",
        }}
      >
        GOOD DAY
      </Typography>
      <Divider
        sx={{
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          backgroundColor: "secondary.light",
        }}
      />
      <Typography
        sx={{
          margin: "1rem auto",
          color: "secondary.light",
          textAlign: "center",
          fontSize: "20px",
          width: { xs: "90%", md: "60%" },
        }}
      >
        An easy-to-use lifestyle tracker where you set the standards and define
        your own success
      </Typography>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "0.5rem",
          backgroundColor: "background.default",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        <Typography
          sx={{
            color: "background.paper",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Typography sx={{ color: "secondary.light" }}>1. </Typography> Create
          lifestyle items to track
        </Typography>
        <Typography
          sx={{
            color: "background.paper",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <Typography sx={{ color: "secondary.light" }}>2. </Typography>
          Set standards for each item
        </Typography>
        <Typography
          sx={{ color: "background.paper", display: "flex", gap: "0.5rem" }}
        >
          <Typography sx={{ color: "secondary.light" }}>3. </Typography>
          Score each item daily on 3 tier scale
        </Typography>
        <Typography
          sx={{ color: "background.paper", display: "flex", gap: "0.5rem" }}
        >
          <Typography sx={{ color: "secondary.light" }}>4. </Typography>
          Track data with automatically generated charts
        </Typography>
      </Paper>

      <Typography
        sx={{
          color: "background.paper",
          textAlign: "center",
          fontSize: "20px",
          marginTop: "1.5rem",
          width: "50%",
          fontWeight: "700",
        }}
      >
        Sign in to begin
      </Typography>
    </Paper>
  );
};
export default Welcome;
