import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import PriceTargetForm from "../components/PriceTargetForm";

function SelectedCoin() {
  const { loading, watchedCoins } = useContext(AppContext);
  const [distancePercent, setDistancePercent] = useState(0);

  //   useEffect(() => {
  //     setDistancePercent(calculatePercent(price, coin.priceTarget));
  //   }, [price, editMode, coin.priceTarget]);

  return (
    <div>
      <h3 className="title watched-coins-title">Watched tokens</h3>

      {watchedCoins.length === 0 ? (
        <p className="no-coins-info">No watched coins yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Price Target</th>
              <th>Distance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? "Is loading"
              : watchedCoins.map((coin) => (
                  <tr key={coin.id}>
                    <td>{coin.name}</td>
                    <td>{coin.price}</td>
                    <td>{coin.priceTarget}</td>
                    <td>`${distancePercent}%`</td>
                    <td>
                      <span>...</span>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SelectedCoin;
