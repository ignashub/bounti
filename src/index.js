import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import store from './state/store';

const theme = createTheme({
  type: "default",
  theme: {
    colors: {
      gradient:
        "linear-gradient(90deg, rgba(131,83,127,1) 0%, rgba(211,118,136,1) 100%)",
      // you can also create your own color
      myColor: "#ff4ecd",
      testy: "#999999",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NextUIProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </NextUIProvider>
  </BrowserRouter>
);
