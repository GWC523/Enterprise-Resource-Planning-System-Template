import React, { createContext, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./Components/FontAwesomeIcons";
import { Toaster } from "react-hot-toast";

/** PAGES **/
import Login from "Pages/Login";
import { getUser } from "Helpers/Utils/Common";
import Dashboard from "Pages/Dashboard";
import Users from "Pages/Manage/Users/Users";
import AddUsers from "Pages/Manage/Users/AddUsers";
import Customers from "Pages/Manage/Customers/Customers";
import AddCustomers from "Pages/Manage/Customers/AddCustomers";
import EditCustomers from "Pages/Manage/Customers/EditCustomers";

interface IThemeContext {
  theme: any;
  method: any;
}

export const ThemeContext = React.createContext<IThemeContext>({
  theme: null,
  method: null,
});

function App() {
  //Authenticate
  const [isAuthenticated, setIsAuthenticated] = useState(getUser());

  //Set light mode or dark mode
  const [theme, setTheme] = useState("light");
  const [isChecked, setIsChecked] = useState(false);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  React.useEffect(() => {
    toggleTheme();
  }, [isChecked]);

  return (
    <ThemeContext.Provider value={{ theme: theme, method: toggleTheme }}>
      <div className="App" id={theme}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Dashboard
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Dashboard
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/users"
              element={
                isAuthenticated ? (
                  <Users setIsChecked={setIsChecked} isChecked={isChecked} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/add-user"
              element={
                isAuthenticated ? (
                  <AddUsers setIsChecked={setIsChecked} isChecked={isChecked} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/customers"
              element={
                isAuthenticated ? (
                  <Customers
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/add-customer"
              element={
                isAuthenticated ? (
                  <AddCustomers
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/edit-customer/:id"
              element={
                isAuthenticated ? (
                  <EditCustomers
                    setIsChecked={setIsChecked}
                    isChecked={isChecked}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
