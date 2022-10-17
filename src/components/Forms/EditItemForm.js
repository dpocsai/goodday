import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { getItems, updateItem, fetchItems } from "../../slices/itemSlice";
import ItemForm from "./ItemForm";
import { getTitleErrors } from "../../helpers";

const EditItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(getItems);
  const location = useLocation();
  const { item } = location.state;

  const [itemData, setItemData] = useState(item);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    dispatch(fetchItems(localStorage.getItem("userId")));
  }, [dispatch]);

  const handleSubmit = async () => {
    let error = getTitleErrors(
      itemData.title,
      items.map((item) => item.title).filter((title) => title !== item.title)
    );
    if (error) {
      setErrorMsg(error);
      return;
    }

    const updatedItem = {
      ...itemData,
      title: itemData.title.trim(),
    };

    await dispatch(updateItem({ itemId: item._id, updatedItem }));
    navigate("/");
  };

  const formConfig = {
    itemData,
    setItemData,
    handleSubmit,
    errorMsg,
    titleText: "Update Item",
    btnText: "Update",
  };

  return <ItemForm formConfig={formConfig} />;
};

export default EditItemForm;
