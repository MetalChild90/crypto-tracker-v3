import React from "react";
import "./DisplayCoins.css";

function DisplayCoins({ coins, watchedCoinNames, loading, addCoin }) {
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <ul className="coins-list">
            {coins.map((coin, index) => (
              <li
                key={index}
                className={`coins-list-item ${
                  watchedCoinNames.includes(coin) && "isWatched"
                }`}
              >
                {coin}
                {!watchedCoinNames.includes(coin) && (
                  <button
                    className="list-item-button"
                    onClick={() => addCoin({ name: coin })}
                  >
                    Add
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default DisplayCoins;