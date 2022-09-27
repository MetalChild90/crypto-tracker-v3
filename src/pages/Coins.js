import { useContext, useEffect } from "react";
import { getCoins } from "../context/AppActions";
import AppContext from "../context/AppContext";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import "./Coins.css";

function AllCoins() {
  const { loading, coins, currentPage, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchCoins = async () => {
      dispatch({ type: "SET_LOADING" });
      const coins = await getCoins(currentPage);
      dispatch({ type: "GET_COINS", payload: coins });
    };
    fetchCoins();
  }, [currentPage, dispatch]);

  return (
    <div>
      <h2>Select coin from a list:</h2>
      {loading ? (
        "Is loading..."
      ) : (
        <div className="coins-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>ATH</th>
                <th>Select</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr
                  key={coin.id}
                  //   className={`coins-list-item
                  // ${watchedCoinIds.includes(coin) && "isWatched"}
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
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      )}
    </div>
  );
}

export default AllCoins;
