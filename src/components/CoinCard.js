import { Link } from "react-router-dom";
import { useContext } from "react";
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
  const {
    watchedCoins,
    errorPriceNotification,
    editMode,
    dispatch,
    selectedCoin,
  } = useContext(AppContext);

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
    } ${
        coin?.distancePercent >= 0
          ? "target-hitted"
          : coin?.distancePercent >= -10
          ? "alert-zone"
          : ""
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
            : editMode
            ? "Set new price target"
            : ""}
        </p>
        <span className="feature-value">
          {type === "allcoins" ? (
            coin?.ath
          ) : type === "selected" ||
            (editMode && selectedCoin?.id === coin.id) ? (
            <PriceTargetForm type={type} coin={coin} />
          ) : type === "watched" ? (
            coin?.priceTarget
          ) : (
            ""
          )}
        </span>
        {type === "watched" && (
          <>
            <p className="feature-title">Distance</p>
            <span className="feature-value">{coin?.distancePercent}%</span>
          </>
        )}
      </div>
      <div>
        {type === "allcoins" &&
          (isTokenWatched(watchedCoins, coin.id) ? (
            "Already on the list"
          ) : (
            <Link to={`/selected-coin/${coin?.id}`}>
              <button className="btn list-item-button">Select</button>
            </Link>
          ))}
        {type === "watched" && !editMode && (
          <button onClick={handleMoreCoinInfo} className="btn">
            More
          </button>
        )}
      </div>
    </div>
  );
}

export default CoinCard;
