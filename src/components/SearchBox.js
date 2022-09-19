import { useState } from "react";
import "./SearchBox.css";

function SearchBox({ addCoin, coinNames, selectedCoin, watchedCoinNames }) {
  const [coin, setCoin] = useState({ name: "" });
  const [textNotification, setTextNotification] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setCoin((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  }

  function validateToken(token) {
    if (coin.name === "") {
      setTextNotification("Please, enter name of the coin");
    } else if (watchedCoinNames.includes(token.name)) {
      setTextNotification(
        "You already have this token in your watchlist, choose another one"
      );
    } else if (selectedCoin) {
      setTextNotification(
        "Save or discard previously selected coin to choose another one."
      );
    } else if (coinNames.includes(token.name)) {
      addCoin(coin);
      setCoin({ name: "" });
      setTextNotification("");
    } else {
      setTextNotification("Token not found");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      validateToken(coin);
    }
  }

  function handleClose() {
    setCoin({ name: "" });
    setTextNotification("");
  }

  function handleFocus() {
    setTextNotification("");
  }

  return (
    <div className="SearchBox">
      <div className="input-wrapper">
        <input
          name="name"
          type="text"
          value={coin.name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="search-input"
          placeholder="Write correct token name"
        />
        <span onClick={handleClose} className="clear-input">
          &times;
        </span>
        <span
          className="button search-button"
          onClick={() => validateToken(coin)}
        >
          Search
        </span>
      </div>
      <p className={`search-box-info ${textNotification && "active"}`}>
        <span>{textNotification}</span>
        <span className="closeTextNotification" onClick={handleClose}>
          &times;
        </span>
      </p>
    </div>
  );
}

export default SearchBox;
