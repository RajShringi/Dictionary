import { createContext, useEffect, useState } from "react";

export const WordContext = createContext();

const WordProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [wordInfo, setWordInfo] = useState("");
  const [font, setFont] = useState(
    JSON.parse(localStorage.getItem("font")) || "sans-serif"
  );
  const [resError, setResError] = useState("");

  useEffect(() => {
    document.body.style.fontFamily = font;
  }, [font]);

  const fetchWordDefination = async (word) => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      if (res.status === 404) {
        setResError(data);
        setWordInfo("");
      } else {
        setWordInfo(data[0]);
        setResError("");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleSearch = (e) => {
    setWord(e.target.value);
    if (e.target.value === "") {
      setError("Whoops, can't be empty");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word === "") {
      setError("Whoops, can't be empty");
      return;
    }
    fetchWordDefination(word);
  };

  return (
    <WordContext.Provider
      value={{
        word,
        error,
        wordInfo,
        handleSearch,
        handleSubmit,
        font,
        setFont,
        resError,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export default WordProvider;
