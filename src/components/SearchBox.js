import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import capitalizeToken from "../helpers/capitalizeToken";
import isTokenWatched from "../helpers/isTokenWatched";
import AppContext from "../context/AppContext";
import PropTypes from "prop-types";

function SearchBox() {
  const { allCoins, watchedCoins } = useContext(AppContext);
  const [typedCoin, setTypedCoin] = useState("");
  const [hints, setHints] = useState([]);
  const [textNotification, setTextNotification] = useState("");

  const navigate = useNavigate();

  const lookForSimilar = (typedName) => {
    let foundCoins = allCoins.filter((coin) =>
      coin.name.toLowerCase().startsWith(typedName.toLowerCase()) ? coin : ""
    );
    foundCoins = foundCoins.slice(0, 10);
    setHints(foundCoins);
  };

  function handleChange(e) {
    setTypedCoin(e.target.value);
    lookForSimilar(e.target.value);
    if (e.target.value === "") {
      setHints([]);
    }
  }

  function validateToken(token) {
    setHints([]);

    const capitalizedToken = capitalizeToken(token);

    const isTokenExist = allCoins.filter(
      (coin) => coin.name === capitalizedToken
    );
    console.log(isTokenExist);
    const tokenId = isTokenExist[0]?.id;
    console.log(tokenId);

    const isWatched = isTokenWatched(watchedCoins, tokenId);
    console.log(isWatched);
    if (typedCoin === "") {
      setTextNotification("Please, enter name of the coin");
    } else if (isWatched) {
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
    setHints([]);
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
            onFocus={() => setTextNotification("")}
            className="search-input"
            placeholder="Write correct token name"
          />
          <span onClick={handleClose} className="clear-input">
            &times;
          </span>
        </div>
        <span
          className="btn search-button"
          onClick={() => validateToken(typedCoin)}
        >
          Search
        </span>
        {hints.length > 0 && (
          <div className="hints-box">
            {hints.map((hint, i) => (
              <p
                className="hint"
                onClick={() => validateToken(hint.name)}
                key={i}
              >
                {hint.name}
              </p>
            ))}
          </div>
        )}
      </div>
      {textNotification && (
        <p className="notification">
          <span>{textNotification}</span>
          <span className="closeTextNotification" onClick={handleClose}>
            &times;
          </span>
        </p>
      )}
    </div>
  );
}

SearchBox.propTypes = {
  addCoin: PropTypes.func,
  selectedCoin: PropTypes.object,
  watchedCoinIds: PropTypes.array,
};

export default SearchBox;
