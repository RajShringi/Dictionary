import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { WordContext } from "../context/wordContext";
import "./NoWordFound.scss";
import { BsEmojiFrown } from "react-icons/bs";

function NoWordFound() {
  const { theme } = useContext(ThemeContext);
  const { resError } = useContext(WordContext);

  return (
    <div className="noWordFound-container">
      <div>
        <BsEmojiFrown className="frown" />
      </div>
      <h2>{resError.title}</h2>
      <p>{resError.message}</p>
      <p>{resError.resolution}</p>
    </div>
  );
}

export default NoWordFound;
