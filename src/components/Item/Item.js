import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import ItemIcons from "./itemIcons";
import ItemMenu from "./ItemMenu";
import ScoreSelect from "./ScoreSelect";

const Item = ({ item, date }) => {
  const [menuOpen, setMenuOpen] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e, itemId) => {
    setMenuOpen(itemId);
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen("");
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem
        sx={{
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          margin: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "primary.contrastText",
          padding: "0",
        }}
      >
        <IconButton
          onClick={(e) => handleMenuOpen(e, item._id)}
          sx={{ color: "background.paper" }}
        >
          <MoreVert sx={{ "&:hover": { color: "white" } }} />
        </IconButton>
        <ListItemAvatar>
          <Avatar
            sx={{
              backgroundColor: "background.paper",
              width: { xs: "35px", sm: "40px" },
              height: { xs: "35px", sm: "40px" },
            }}
          >
            {ItemIcons[item.icon]}
          </Avatar>
        </ListItemAvatar>
        <Link
          to={`/data/${item._id}`}
          style={{
            color: "inherit",
            textDecoration: "inherit",
            marginRight: "auto",
            width: "100%",
          }}
          state={{ item }}
        >
          <ListItemText
            primary={item.title}
            disableTypography
            sx={{
              fontSize: { xs: "12px", sm: "16px" },
              cursor: "pointer",
              "&:hover": {
                color: "white",
                fontSize: "18px",
              },
            }}
          />
        </Link>

        <ScoreSelect key={item._id} item={item} date={date} />
      </ListItem>
      <ItemMenu
        item={item}
        menuOpen={menuOpen}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
      />
      <Divider
        sx={{
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
          backgroundColor: "secondary.light",
        }}
      />
    </>
  );
};

export default React.memo(Item);
