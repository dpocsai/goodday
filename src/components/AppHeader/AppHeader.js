import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

import AppHeaderMenu from "./AppHeaderMenu";
import Auth from "./Auth";

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setOpen(true);
              }}
            >
              <Menu />
            </IconButton>
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "inherit",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ letterSpacing: "0.2rem", fontWeight: "700" }}
              >
                GOOD DAY
              </Typography>
            </Link>

            <Auth />
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <AppHeaderMenu open={open} setOpen={setOpen} anchorEl={anchorEl} />
    </>
  );
};

export default AppHeader;
