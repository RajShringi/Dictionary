import { useContext, useEffect } from "react";
import Header from "./Header/Header";
import Search from "./Search/Search";
import { WordContext } from "./context/wordContext";
import WordInfo from "./WordInfo/WordInfo";
import { ThemeContext } from "./context/themeContext";
import NoWordFound from "./NoWordFound/NoWordFound";

function App() {
  const { wordInfo, resError } = useContext(WordContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = `hsl(0, 0%, 98%)`;
      document.body.style.color = "#2a2d38";
    } else {
      document.body.style.backgroundColor = `rgb(22 24 26)`;
      document.body.style.color = "white";
    }
  }, [theme]);

  return (
    <div className="container">
      <Header />
      <Search />
      {wordInfo ? <WordInfo /> : ""}
      {resError ? <NoWordFound /> : ""}
    </div>
  );
}

export default App;
