import { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import PriceTargetForm from "./PriceTargetForm";

function DisplayWatchedCoins({ coin }) {
  const { deleteCoin } = useContext(AppContext);
  const [distancePercent, setDistancePercent] = useState(0);

  console.log(coin);

  //   useEffect(() => {
  //     setDistancePercent(calculatePercent(price, coin.priceTarget));
  //   }, [price, editMode, coin.priceTarget]);

  return (
    <tr>
      <td>{coin.name}</td>
      <td>{coin.price}</td>
      <td>{coin.priceTarget}</td>
      <td>`${distancePercent}%`</td>
      <td>
        <span>...</span>
      </td>
    </tr>
  );
}

export default DisplayWatchedCoins;
