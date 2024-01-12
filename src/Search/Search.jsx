import { PiMagnifyingGlassBold } from "react-icons/pi";
import "./Search.scss";
import { useContext, useEffect, useState } from "react";
import { WordContext } from "../context/wordContext";
import { ThemeContext } from "../context/themeContext";
function Search() {
  const { word, error, handleSearch, handleSubmit } = useContext(WordContext);
  const { theme } = useContext(ThemeContext);

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        placeholder="search for any word..."
        value={word}
        onChange={handleSearch}
        className={`${theme === "light" ? "search" : "search dark-search"}`}
      />
      <PiMagnifyingGlassBold className="search-icon" onClick={handleSubmit} />
      <p className="error">{error}</p>
    </form>
  );
}
export default Search;
