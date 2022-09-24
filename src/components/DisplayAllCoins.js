import { Link } from "react-router-dom";
import { useContext, useCallback, useEffect } from "react";
import AppContext from "../context/AppContext";
import { getCoin } from "../context/AppActions";

function DisplayAllCoins({ coin }) {
  const { dispatch } = useContext(AppContext);

  return (
    <tr
    //   className={`coins-list-item
    // ${watchedCoinNames.includes(coin) && "isWatched"}
    // `}
    >
      <td>{coin.name}</td>
      <td>{coin.current_price}</td>
      <td>{coin.ath}</td>
      <td>
        <Link to={`/selected-coin/${coin.id}`}>
          <button className="list-item-button">Select</button>
        </Link>
      </td>
      <td></td>
    </tr>
  );
}

export default DisplayAllCoins;
