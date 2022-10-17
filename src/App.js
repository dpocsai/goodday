import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import theme from "./theme";
import AppHeader from "./components/AppHeader/AppHeader";
import NewItemForm from "./components/Forms/NewItemForm";
import EditItemForm from "./components/Forms/EditItemForm";
import ItemData from "./components/Item/ItemData";
import Items from "./components/Items";
import Welcome from "./components/Welcome";
import Data from "./components/Data/Data";

const App = () => {
  const loggedIn = localStorage.getItem("userId");

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <Router>
          <CssBaseline />
          <AppHeader />
          <Routes>
            <Route
              exact
              path="/"
              element={loggedIn ? <Items /> : <Navigate to="/welcome" />}
            />
            <Route
              exact
              path="/welcome"
              element={!loggedIn ? <Welcome /> : <Items />}
            />
            <Route
              exact
              path="/data"
              element={loggedIn ? <Data /> : <Navigate to="/welcome" />}
            />
            <Route
              exact
              path="/new"
              element={loggedIn ? <NewItemForm /> : <Navigate to="/welcome" />}
            />
            <Route
              exact
              path="/edit/:itemId"
              element={loggedIn ? <EditItemForm /> : <Navigate to="/welcome" />}
            />
            <Route
              exact
              path="/data/:itemId"
              element={loggedIn ? <ItemData /> : <Navigate to="/welcome" />}
            />
          </Routes>
        </Router>
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default App;
