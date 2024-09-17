import React, { useRef, useState } from "react";

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

import ItemIcons from "../Item/itemIcons";
import { cleanInputValue } from "../../helpers";

const ItemForm = ({
  formConfig: {
    itemData,
    setItemData,
    handleSubmit,
    btnText,
    titleText,
    errorMsg,
  },
}) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [icon, setIcon] = useState(ItemIcons[itemData.icon]);

  const handleIconChange = (event) => {
    const selectedIcon = event.target.value;
    setIcon(selectedIcon);
    setItemData((prevData) => ({
      ...prevData,
      icon: Object.keys(ItemIcons).find(
        (key) => ItemIcons[key] === selectedIcon
      ),
    }));
  };

  const renderIconOptions = () => {
    return Object.values(ItemIcons).map((ItemIcon, idx) => {
      return (
        <MenuItem key={idx} sx={{ justifyContent: "center" }} value={ItemIcon}>
          {ItemIcon}
        </MenuItem>
      );
    });
  };
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.7rem",
        width: { xs: "90%", sm: "80%", md: "60%", lg: "40%" },
        padding: "1rem",
        margin: "1rem auto",
      }}
      ref={modalRef}
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
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
      >
        {titleText}
      </Typography>
      <TextField
        spellCheck="false"
        autoCorrect="false"
        autoComplete="off"
        required
        inputProps={{ maxLength: 30 }}
        placeholder="ex. Sleep Duration"
        autoFocus
        size="small"
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
          size="small"
          value={icon}
          label="Icon"
          onChange={handleIconChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
        >
          {renderIconOptions()}
        </Select>
      </FormControl>

      <Typography variant="caption" sx={{ textAlign: "center" }}>
        Create rules or standards (optional)
      </Typography>
      <TextField
        size="small"
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
        size="small"
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
        size="small"
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
        {btnText}
      </Button>
    </Paper>
  );
};

export default ItemForm;
