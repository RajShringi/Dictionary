import { useContext, useEffect, useRef, useState } from "react";
import { PiBookThin, PiCaretDownBold, PiMoonBold } from "react-icons/pi";
import "./Header.scss";
import { ThemeContext } from "../context/themeContext";
import { WordContext } from "../context/wordContext";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const { font, setFont } = useContext(WordContext);
  const fontRef = useRef("");

  const selectFont = (font) => {
    if (font) {
      setFont(font);
      localStorage.setItem("font", JSON.stringify(font));
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (fontRef.current.contains(e.target)) {
        selectFont(e.target.dataset.font);
        setIsDropdownOpen(!isDropdownOpen);

        return;
      }
      setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleThemeChange = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="header">
      <PiBookThin className="book-icon" />

      <div className="right-col">
        <div ref={fontRef} className="dropdown-container">
          <div>
            <p className="current-font">
              {font === "sans-serif"
                ? "Sans Serif"
                : font === "serif"
                ? "Serif"
                : "Mono"}
            </p>
            <PiCaretDownBold className="chevron-btn" />
          </div>

          <ul
            className={`${
              theme === "dark" ? "dark-font-names font-names" : "font-names"
            } ${isDropdownOpen ? "active" : ""}`}
          >
            <li data-font="sans-serif" className="sans-serif">
              Sans Serif
            </li>
            <li data-font="serif" className="serif">
              Serif
            </li>
            <li data-font="monospace" className="mono">
              Mono
            </li>
          </ul>
        </div>
        <div className="vertical-seprator"></div>
        <div className="theme-switcher">
          <div>
            <input
              type="checkbox"
              id="theme"
              className="toggle"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <label htmlFor="theme" className="theme-label"></label>
          </div>
          <PiMoonBold className="moon" />
        </div>
      </div>
    </div>
  );
}

export default Header;
