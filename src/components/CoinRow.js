import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function Coin({ coin }) {
  const { watchedCoins } = useContext(AppContext);

  const isInWatchedCoins = watchedCoins.filter(
    (watchedCoin) => watchedCoin.name === coin.name
  );

  return (
    <tr
      key={coin.id}
      className={`coins-list-item
      ${isInWatchedCoins.length >= 1 && "isWatched"}
      `}
    >
      <td>{coin.name}</td>
      <td>{coin.current_price}</td>
      <td>{coin.ath}</td>
      <td>
        {isInWatchedCoins.length >= 1 ? (
          "Already on the list"
        ) : (
          <Link to={`/selected-coin/${coin.id}`}>
            <button className="button list-item-button">Select</button>
          </Link>
        )}
      </td>
      <td></td>
    </tr>
  );
}

export default Coin;
