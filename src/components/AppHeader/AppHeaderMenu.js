import React from "react";
import { Link } from "react-router-dom";

import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  List,
  Menu,
} from "@mui/material";
import { AutoGraph, Home } from "@mui/icons-material";

const AppHeaderMenu = ({ anchorEl, open, setOpen }) => {
  return (
    <Menu
      onClose={() => setOpen(false)}
      open={open}
      anchorEl={anchorEl}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "background.paper",
        },
      }}
    >
      <List>
        <Link style={{ color: "inherit", textDecoration: "inherit" }} to={`/`}>
          <ListItem
            button
            onClick={() => {
              setOpen(false);
            }}
          >
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.paper",
                  width: "30px",
                  height: "30px",
                }}
              >
                <Home fontSize="30px" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/data`}
        >
          <ListItem
            button
            onClick={() => {
              setOpen(false);
            }}
          >
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.paper",
                  width: "30px",
                  height: "30px",
                }}
              >
                <AutoGraph fontSize="30px" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Data" />
          </ListItem>
        </Link>
      </List>
    </Menu>
  );
};
export default AppHeaderMenu;
