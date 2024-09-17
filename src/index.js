import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import itemReducer from "./slices/itemSlice";

const store = configureStore({ reducer: { items: itemReducer } });
console.log(process.env.REACT_APP_GOOGLE_CLIENTID, "!!!");
createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
