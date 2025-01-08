import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AltHome from "./components/AltHome";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Pizzas from "./components/Pizzas";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import OrderPlaced from "./components/OrderPlaced";

import { Toaster } from "react-hot-toast";
import axios from "axios";
import { server, Context } from "./main";
import { useState, useContext, useEffect } from "react";

function App() {
  const { isAuthenticated, user, setUser, setIsAuthenticated } =
    useContext(Context);
  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        if (res.data.user !== undefined) {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={isAuthenticated ? <AltHome /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Login />}
          />
          <Route path="/orderPlaced" element={<OrderPlaced />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
