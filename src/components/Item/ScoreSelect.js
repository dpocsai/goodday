import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import {
  SentimentSatisfiedAlt,
  SentimentNeutral,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";

import { updateItem } from "../../slices/itemSlice";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.text.disabled,
  },
}));

const ratingIcons = {
  1: {
    icon: <SentimentVeryDissatisfied color="error" />,
    label: "1",
  },
  2: {
    icon: <SentimentNeutral color="warning" />,
    label: "2",
  },
  3: {
    icon: <SentimentSatisfiedAlt color="success" />,
    label: "3",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{ratingIcons[value].icon}</span>;
}

export default function ScoreSelect({ item, date }) {
  const [value, setValue] = useState(0);
  const [curItem, setCurItem] = useState(item);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue(curItem?.scores?.[date] || 0);
  }, [date, curItem]);

  const handleUpdateItem = (itemId, updatedItem) => {
    dispatch(updateItem({ itemId, updatedItem }));
  };
  return (
    <StyledRating
      max={3}
      name="score"
      defaultValue={curItem?.scores?.[date] || 0}
      value={value}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => ratingIcons[value].label}
      highlightSelectedOnly
      defaultChecked={false}
      onChange={(e) => {
        const selectedScore = +e.target.value === value ? 0 : +e.target.value;
        let updatedItem = {
          ...curItem,
          scores: {
            ...curItem?.scores,
            [date]: selectedScore,
          },
        };
        if (updatedItem.scores[date] === 0) {
          delete updatedItem.scores[date];
        }
        handleUpdateItem(curItem._id, updatedItem);

        setValue(selectedScore);
        setCurItem(updatedItem);
      }}
    />
  );
}
