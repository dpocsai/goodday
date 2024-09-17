import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
  CloseRounded,
} from "@mui/icons-material";

import ItemIcons from "../itemIcons";
import { cleanInputValue } from "../helpers";
import { getItems, createItem, fetchItems } from "../itemSlice";

const NewItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(getItems);

  const [itemData, setItemData] = useState({
    title: "",
    userId: localStorage.getItem("userId"),
    icon: "AssignmentTurnedIn",
    rules: { bad: "", ok: "", good: "" },
    scores: [],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [icon, setIcon] = useState(ItemIcons[itemData.icon]);

  useEffect(() => {
    dispatch(fetchItems(localStorage.getItem("userId")));
  }, []);

  const renderIconOptions = () => {
    return Object.values(ItemIcons).map((ItemIcon, idx) => {
      return (
        <MenuItem key={idx} sx={{ justifyContent: "center" }} value={ItemIcon}>
          {ItemIcon}
        </MenuItem>
      );
    });
  };

  const handleIconChange = (e) => {
    setIcon(e.target.value);
    setItemData({ ...itemData, icon: e.target.value.props.id });
  };

  const getTitleErrors = () => {
    let existingTitles = items.map((item) => item.title);
    if (existingTitles.includes(itemData.title)) {
      return "Title must be unique";
    } else if (!itemData.title) {
      return "Title cannot be blank";
    } else {
      return "";
    }
  };

  const handleSubmit = async () => {
    let error = getTitleErrors();
    if (error) {
      setErrorMsg(error);
      return;
    }

    dispatch(createItem(itemData));
    window.location.reload(true);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "40%" },
        padding: "1rem",
        margin: "1rem auto",
      }}
    >
      <IconButton
        onClick={() => {
          navigate("/");
        }}
        sx={{ alignSelf: "flex-start" }}
      >
        <CloseRounded
          sx={{
            cursor: "pointer",
            color: "text",
            fontSize: "30px",
          }}
        />
      </IconButton>

      <TextField
        spellCheck="false"
        autoCorrect="false"
        autoComplete="off"
        required
        inputProps={{ maxLength: 30 }}
        placeholder="ex. Sleep Duration"
        autoFocus
        sx={{
          width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" },
        }}
        error={!!errorMsg}
        helperText={errorMsg}
        label="Title"
        value={itemData.title}
        onChange={(e) =>
          setItemData({ ...itemData, title: cleanInputValue(e.target.value) })
        }
      />
      <FormControl sx={{ width: "150px" }}>
        <InputLabel>Icon</InputLabel>
        <Select
          value={icon}
          label="Icon"
          onChange={handleIconChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
        >
          {renderIconOptions()}
        </Select>
      </FormControl>

      <Typography variant="caption">
        Create rules or requirements for each level:
      </Typography>
      <TextField
        spellCheck="false"
        autoCorrect="false"
        autoComplete="off"
        inputProps={{ maxLength: 40 }}
        placeholder="ex. Slept more than 7 hours"
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
        }}
        variant="standard"
        label={<SentimentSatisfiedAlt sx={{ color: "success.main" }} />}
        value={itemData.rules.good}
        onChange={(e) =>
          setItemData({
            ...itemData,
            rules: { ...itemData.rules, good: e.target.value },
          })
        }
      />
      <TextField
        spellCheck="false"
        autoCorrect="false"
        autoComplete="off"
        inputProps={{ maxLength: 40 }}
        placeholder="ex. Slept between 5 and 7 hours"
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
        }}
        variant="standard"
        label={<SentimentNeutral sx={{ color: "warning.main" }} />}
        value={itemData.rules.ok}
        onChange={(e) =>
          setItemData({
            ...itemData,
            rules: { ...itemData.rules, ok: e.target.value },
          })
        }
      />
      <TextField
        spellCheck="false"
        autoCorrect="false"
        autoComplete="off"
        inputProps={{ maxLength: 40 }}
        placeholder="ex. Slept less than 5 hours"
        sx={{
          width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
        }}
        variant="standard"
        label={<SentimentVeryDissatisfied sx={{ color: "error.main" }} />}
        value={itemData.rules.bad}
        onChange={(e) =>
          setItemData({
            ...itemData,
            rules: { ...itemData.rules, bad: e.target.value },
          })
        }
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ margin: "1rem 0" }}
      >
        Create
      </Button>
    </Paper>
  );
};

export default NewItemForm;
