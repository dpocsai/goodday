import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const databaseURL = "https://dpocsai-good-day.herokuapp.com";
// "http://localhost:5000";
// "https://dpocsai-good-day.herokuapp.com"

const initialState = { items: [], loading: false };

export const fetchItems = createAsyncThunk("items/getItems", async (userId) => {
  const { data } = await axios.get(`${databaseURL}/items/${userId}`);
  return data;
});

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async ({ itemId, updatedItem }) => {
    const { data } = await axios.patch(
      `${databaseURL}/items/${itemId}`,
      updatedItem
    );
    return data;
  }
);

export const createItem = createAsyncThunk(
  "item/createItem",
  async (newItem) => {
    const { data } = await axios.post(`${databaseURL}/items`, newItem);
    return data;
  }
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (itemId) => {
    const { data } = await axios.delete(`${databaseURL}/items/${itemId}`);
    return data;
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.loading = true;
    },
    [fetchItems.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [fetchItems.rejected]: (state) => {
      state.loading = false;
    },
    [updateItem.pending]: (state) => {
      state.loading = true;
    },
    [updateItem.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.items.map((item) => (item._id === payload._id ? payload : item));
    },
    [updateItem.rejected]: (state) => {
      state.loading = false;
    },
    [createItem.pending]: (state) => {
      state.loading = true;
    },
    [createItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items.push(payload);
    },
    [createItem.rejected]: (state) => {
      state.loading = false;
    },
    [deleteItem.pending]: (state) => {
      state.loading = true;
    },
    [deleteItem.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items.filter((item) => item._id !== payload._id);
    },
    [deleteItem.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const getItemById = (state, itemId) =>
  state.items.items.find((item) => item._id === itemId);

export const getItems = (state) => state.items.items;

export const { _createItem, _deleteItem, _updateItem } = itemSlice.actions;
export default itemSlice.reducer;
