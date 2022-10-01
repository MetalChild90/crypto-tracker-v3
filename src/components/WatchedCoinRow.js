import { useContext } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import AppContext from "../context/AppContext";

function WatchedCoin({ coin }) {
  const { dispatch } = useContext(AppContext);

  const handleClick = () => {
    dispatch({ type: "OPEN_MODAL", payload: coin });
  };

  return (
    <tr
      className={`item ${
        coin.distancePercent >= 0
          ? "target-hitted"
          : coin.distancePercent >= -10
          ? "alert-zone"
          : ""
      }`}
      key={coin.id}
    >
      <td>{coin.name}</td>
      <td>{coin.price}</td>
      <td>{coin.priceTarget}$</td>
      <td>{coin.distancePercent}%</td>
      <td>
        <span>
          <FiMoreHorizontal className="cursor" onClick={handleClick} />
        </span>
      </td>
    </tr>
  );
}

export default WatchedCoin;
