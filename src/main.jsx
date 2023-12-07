import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.scss";
import WordProvider from "./context/wordContext.jsx";
import ThemeProvider from "./context/themeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <WordProvider>
        <App />
      </WordProvider>
    </ThemeProvider>
  </React.StrictMode>
);
