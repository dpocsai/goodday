import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getItems, createItem, fetchItems } from "../../slices/itemSlice";
import ItemForm from "./ItemForm";
import { getTitleErrors } from "../../helpers";

const NewItemForm = () => {
  const navigate = useNavigate();
  const items = useSelector(getItems);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [itemData, setItemData] = useState({
    title: "",
    userId: localStorage.getItem("userId"),
    icon: "AssignmentTurnedIn",
    rules: { bad: "", ok: "", good: "" },
    scores: {},
    dateCreated: new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
  });

  useEffect(() => {
    dispatch(fetchItems(localStorage.getItem("userId")));
  }, [dispatch]);

  const handleSubmit = async () => {
    let error = getTitleErrors(
      itemData.title,
      items.map((item) => item.title)
    );
    if (error) {
      setErrorMsg(error);
      return;
    }

    dispatch(createItem(itemData));
    navigate("/");
  };

  const formConfig = {
    itemData,
    setItemData,
    handleSubmit,
    errorMsg,
    btnText: "Create",
    titleText: "Create Item",
  };

  return <ItemForm formConfig={formConfig} />;
};

export default NewItemForm;
