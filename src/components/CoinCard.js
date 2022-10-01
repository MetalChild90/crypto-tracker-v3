import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import PriceTargetForm from "../components/PriceTargetForm";

function CoinCard({
  coin,
  type,
  handleClose,
  addToWatchList,
  handleSaveChanges,
}) {
  const { watchedCoins, errorPriceNotification, editMode, dispatch } =
    useContext(AppContext);

  const isInWatchedCoins = watchedCoins.filter(
    (watchedCoin) => watchedCoin.name === coin?.name
  );

  console.log(isInWatchedCoins);
  return (
    <div
      className={`coin-box
    ${isInWatchedCoins.length >= 1 && "isWatched"}
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
            : "Set price target"}
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
          (isInWatchedCoins.length >= 1 ? (
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
        {type === "watched" && <button className="button">More</button>}
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
