import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

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
    <MoralisProvider 
      serverUrl="https://xzvd8khndlwr.usemoralis.com:2053/server"
      appId="RroBltxvWPIk9uULjfRhOPt2OZu46MSW5pXBlJk7">
      <NextUIProvider theme={theme}>
        <App />
      </NextUIProvider>
    </MoralisProvider>
  </BrowserRouter>
);
