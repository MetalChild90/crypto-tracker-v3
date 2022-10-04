import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import isTokenWatched from "../helpers/isTokenWatched";

function Coin({ coin }) {
  const { watchedCoins } = useContext(AppContext);

  return (
    <tr
      key={coin.id}
      className={`coins-list-item
      ${isTokenWatched(watchedCoins, coin.id) && "isWatched"}
      `}
    >
      <td>{coin.name}</td>
      <td>{coin.current_price}</td>
      <td>{coin.ath}</td>
      <td>
        {isTokenWatched(watchedCoins, coin.id) ? (
          "Already on the list"
        ) : (
          <Link to={`/selected-coin/${coin.id}`}>
            <button className="btn list-item-button">Select</button>
          </Link>
        )}
      </td>
      <td></td>
    </tr>
  );
}

export default Coin;
