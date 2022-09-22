import PropTypes from "prop-types";
import React from "react";
import "./DisplayCoins.css";

function DisplayCoins({ coins, watchedCoinNames, loading, addCoin }) {
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="coins-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>ATH</th>
                <th>Add to watched list</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => (
                <tr
                  key={index}
                  //   className={`coins-list-item
                  // ${watchedCoinNames.includes(coin) && "isWatched"}
                  // `}
                >
                  <td>{coin.name}</td>
                  <td>{coin.current_price}</td>
                  <td>{coin.ath}</td>
                  {!watchedCoinNames.includes(coin) && (
                    <td>
                      <button
                        className="list-item-button"
                        onClick={() => addCoin({ name: coin })}
                      >
                        Watch
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="coins-list"></ul>
        </div>
      )}
    </div>
  );
}

DisplayCoins.propTypes = {
  coins: PropTypes.array,
  watchedCoinNames: PropTypes.array,
  loading: PropTypes.bool,
  addCoin: PropTypes.func,
};

export default DisplayCoins;
