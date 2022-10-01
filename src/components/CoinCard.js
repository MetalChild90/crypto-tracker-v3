import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import PriceTargetForm from "../components/PriceTargetForm";
import isTokenWatched from "../helpers/isTokenWatched";

function CoinCard({
  coin,
  type,
  handleClose,
  addToWatchList,
  handleSaveChanges,
}) {
  const { watchedCoins, errorPriceNotification, editMode, dispatch } =
    useContext(AppContext);

  useEffect(() => {
    return () => {
      dispatch({ type: "DISCARD_EDITION" });
    };
  }, []);

  const handleMoreCoinInfo = () => {
    dispatch({ type: "OPEN_MODAL", payload: coin });
  };

  return (
    <div
      className={`coin-box
    ${
      isTokenWatched(watchedCoins, coin?.id) &&
      type === "allcoins" &&
      "isWatched"
    }
    `}
    >
      <div className="info-box">
        <span onClick={handleClose} className="close-selected-box">
          &times;
        </span>
        <p className="feature-title">Name</p>
        <span className="feature-value">{coin?.name}</span>
        <p className="feature-title">Price</p>
        <span className="feature-value">
          {type === "allcoins"
            ? coin?.current_price
            : coin?.market_data?.current_price.usd}
        </span>
        <p className="feature-title">
          {type === "allcoins"
            ? "ATH"
            : type === "watched"
            ? "Price Target"
            : type === "selected"
            ? "Set price target"
            : type === "selected" && editMode
            ? "Set new price target"
            : ""}
        </p>
        <span className="feature-value">
          {type === "allcoins" ? (
            coin?.ath
          ) : type === "watched" ? (
            coin?.priceTarget
          ) : (
            <>
              <PriceTargetForm />
              {errorPriceNotification && (
                <p className="notification">{errorPriceNotification}</p>
              )}
            </>
          )}
        </span>
        {type === "watched" && (
          <>
            <p className="feature-title">Distance</p>
            {/* <span className="feature-value">{distancePercent}%</span> */}
          </>
        )}
      </div>
      <div>
        {type === "allcoins" &&
          (isTokenWatched(watchedCoins, coin.id) ? (
            "Already on the list"
          ) : (
            <Link to={`/selected-coin/${coin?.id}`}>
              <button className="button list-item-button">Select</button>
            </Link>
          ))}
        {type === "selected" && !editMode && (
          <button onClick={addToWatchList} className="button">
            Watch
          </button>
        )}
        {type === "watched" && (
          <button onClick={handleMoreCoinInfo} className="button">
            More
          </button>
        )}
        {editMode && (
          <div>
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={() => dispatch({ type: "DISCARD_EDITION" })}>
              Discard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoinCard;
