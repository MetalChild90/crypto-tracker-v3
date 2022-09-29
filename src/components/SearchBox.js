import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function SearchBox() {
  const { allCoins, watchedCoins } = useContext(AppContext);
  const [typedCoin, setTypedCoin] = useState("");
  const [textNotification, setTextNotification] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setTypedCoin(e.target.value);
  }

  function validateToken(token) {
    const capitalizedToken =
      token.charAt(0).toUpperCase() + token.toLowerCase().slice(1);

    const isInWatchedCoins = watchedCoins.filter(
      (coin) => coin.name === capitalizedToken
    );
    const isTokenExist = allCoins.filter(
      (coin) => coin.name === capitalizedToken
    );
    const tokenId = isTokenExist[0]?.id;

    if (typedCoin === "") {
      setTextNotification("Please, enter name of the coin");
    } else if (isInWatchedCoins.length > 0) {
      setTextNotification(
        "You already have this token in your watchlist, choose another one"
      );
    } else if (isTokenExist.length > 0) {
      setTypedCoin("");
      setTextNotification("");
      navigate(`/selected-coin/${tokenId}`);
    } else {
      setTextNotification("Token not found");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      validateToken(typedCoin);
    }
  }

  function handleClose() {
    setTypedCoin("");
    setTextNotification("");
  }

  function handleFocus() {
    setTextNotification("");
  }

  return (
    <div className="search-box">
      <div className="input-wrapper">
        <div>
          <input
            name="name"
            type="text"
            value={typedCoin}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            className="search-input"
            placeholder="Write correct token name"
          />
          <span onClick={handleClose} className="clear-input">
            &times;
          </span>
        </div>
        <span
          className="button search-button"
          onClick={() => validateToken(typedCoin)}
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

SearchBox.propTypes = {
  addCoin: PropTypes.func,
  selectedCoin: PropTypes.object,
  watchedCoinIds: PropTypes.array,
};

export default SearchBox;
