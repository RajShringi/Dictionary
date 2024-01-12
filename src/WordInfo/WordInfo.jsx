import { useContext, useEffect, useRef, useState } from "react";
import { WordContext } from "../context/wordContext";
import "./WordInfo.scss";
import { ThemeContext } from "../context/themeContext";
import { FiExternalLink } from "react-icons/fi";

function WordInfo() {
  const { wordInfo } = useContext(WordContext);
  const { theme } = useContext(ThemeContext);
  const playRef = useRef("");
  const [play, setPlay] = useState(false);
  const audioFile =
    (wordInfo && wordInfo.phonetics.filter((audio) => audio.audio !== "")[0]) ||
    "";

  useEffect(() => {
    if (audioFile.audio) {
      playRef.current.src = audioFile.audio;
    }
  }, [wordInfo]);

  const playAudio = () => {
    if (playRef.current.paused) {
      playRef.current.play();
      setPlay(true);
    } else {
      playRef.current.pause();
      setPlay(false);
    }
  };

  const handleAudioEnd = () => {
    setPlay(false);
  };

  return (
    <div>
      <div className="flex flex-ai-c flex-jc-sb flex-wrap">
        <div className="word-container">
          <p className="word">{wordInfo.word}</p>
          <p className="phonetic">{wordInfo.phonetic}</p>
        </div>
        {audioFile.audio && (
          <div>
            <div onClick={playAudio} className="play-button">
              <div className="circle">
                {play ? (
                  <div className="pause"></div>
                ) : (
                  <div className="play"></div>
                )}
              </div>
            </div>
            <audio onEnded={handleAudioEnd} ref={playRef}>
              <source src={`${audioFile.audio}`}></source>
            </audio>
          </div>
        )}
      </div>
      {wordInfo?.meanings?.map((info, index) => {
        return (
          <div className="info" key={index}>
            <div className="flex flex-ai-c">
              <h5>{info.partOfSpeech}</h5>
              <div
                className={theme === "dark" ? "dark-border border" : "border"}
              ></div>
            </div>
            <div className="meaning">Meaning</div>
            <ul className="examples">
              {info.definitions.map((def, index) => {
                return (
                  <li key={index} className="def">
                    <span className="definition">{def.definition}</span>
                    <span className="example">
                      {`${def.example ? `"${def.example}"` : ""}`}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div>
              {info.synonyms.length === 0 ? (
                ""
              ) : (
                <div style={{ paddingTop: "3rem" }}>
                  <span style={{ fontSize: "1.2rem", color: "#757575" }}>
                    Synonyms:{" "}
                  </span>
                  <span className="synonym">{info.synonyms.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className={theme === "dark" ? "dark-source source" : "source"}>
        <span className={theme === "dark" ? "dark-text text" : "text"}>
          Source{" "}
        </span>
        <a
          className={theme === "dark" ? "dark-link link" : "link"}
          target="_blank"
          href={`${wordInfo.sourceUrls[0]}`}
        >
          <span>{wordInfo.sourceUrls[0]}</span> <FiExternalLink />
        </a>
      </div>
    </div>
  );
}
export default WordInfo;
