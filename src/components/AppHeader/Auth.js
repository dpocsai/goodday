import React, { useState } from "react";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { LogoutTwoTone } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";

const Auth = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const handleSignIn = async (response) => {
    try {
      let user = await jwt_decode(response.credential);

      localStorage.setItem("userId", user.sub);
      setUserId(user.sub);

      navigate("/");
      window.location.reload(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignOut = async () => {
    localStorage.setItem("userId", "");
    localStorage.setItem("items", JSON.stringify([]));
    setUserId("");

    navigate("/welcome");
    window.location.reload(true);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {!userId ? (
        <GoogleLogin
          onSuccess={handleSignIn}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <LogoutTwoTone
          sx={{ cursor: "pointer", color: "background.paper", margin: "1rem" }}
          onClick={handleSignOut}
        />
      )}
    </Box>
  );
};

export default Auth;
