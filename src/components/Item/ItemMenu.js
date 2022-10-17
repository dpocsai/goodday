import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  List,
  Menu,
} from "@mui/material";
import { Delete, Edit, AutoGraph } from "@mui/icons-material";

import { deleteItem } from "../../slices/itemSlice";

const ItemMenu = ({ item, handleMenuClose, menuOpen, anchorEl }) => {
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    handleMenuClose();
    confirm({
      description: `"${item.title}" and all its data will be deleted`,
      confirmationButtonProps: { autoFocus: true },
    }).then(async () => {
      await dispatch(deleteItem(item._id));
      window.location.reload(true);
    });
  };

  return (
    <Menu
      onClose={handleMenuClose}
      open={menuOpen === item._id}
      anchorEl={anchorEl}
    >
      <List>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/data/${item._id}`}
          state={{ item }}
        >
          <ListItem button>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.paper",
                  width: "30px",
                  height: "30px",
                }}
              >
                <AutoGraph fontSize="20px" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Data" />
          </ListItem>
        </Link>
        <Link
          style={{ color: "inherit", textDecoration: "inherit" }}
          to={`/edit/${item._id}`}
          state={{ item }}
        >
          <ListItem button>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.paper",
                  width: "30px",
                  height: "30px",
                }}
              >
                <Edit fontSize="20px" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Edit" />
          </ListItem>
        </Link>
        <ListItem button onClick={handleDeleteItem}>
          <ListItemAvatar sx={{ minWidth: "40px" }}>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                color: "background.paper",
                width: "30px",
                height: "30px",
              }}
            >
              <Delete fontSize="20px" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Delete" />
        </ListItem>
      </List>
    </Menu>
  );
};
export default ItemMenu;
