import { useState, useEffect } from "react";
import { getCoin } from "../context/AppActions";
import calculatePercent from "../helpers/calculatePercent";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { FiMoreHorizontal } from "react-icons/fi";

function WatchedCoin({ coin }) {
  const { editMode, dispatch, watchedCoins, selectedCoin, priceTarget } =
    useContext(AppContext);
  const [distancePercent, setDistancePercent] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const fetchCoin = () => {
      getCoin(coin.id)
        .then((data) => setPrice(data.market_data.current_price.usd))
        .then(setLoading(false));
    };

    fetchCoin();

    const interval = setInterval(() => {
      fetchCoin();
    }, 1000);

    return () => clearInterval(interval);
  }, [coin.id]);

  useEffect(() => {
    setDistancePercent(calculatePercent(price, coin.priceTarget));
  }, [price, editMode, coin.priceTarget]);

  const handleClick = () => {
    dispatch({ type: "OPEN_MODAL", payload: coin });
  };

  return (
    <tr
      className={`item ${
        distancePercent >= 0
          ? "target-hitted"
          : distancePercent >= -10
          ? "alert-zone"
          : ""
      }`}
      key={coin.id}
    >
      <td>{coin.name}</td>
      <td>{!loading ? `${price}$` : "Is loading..."}</td>
      <td>{coin.priceTarget}$</td>
      <td>{distancePercent}%</td>
      <td>
        <span>
          <FiMoreHorizontal className="cursor" onClick={handleClick} />
        </span>
      </td>
    </tr>
  );
}

export default WatchedCoin;
