import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import { store } from "store";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
