import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";

export const server = "http://localhost:5000/api/v1";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [pizzas, setPizzas] = useState([]);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        pizzas,
        setPizzas,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
