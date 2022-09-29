import { useContext, useEffect } from "react";
import { getCoins } from "../context/AppActions";
import AppContext from "../context/AppContext";
import Pagination from "../components/Pagination";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Coin from "../components/Coin";

function AllCoins() {
  const { loading, coins, currentPage, dispatch } = useContext(AppContext);
  const { width } = useWindowDimensions();

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
          {width > 768 ? (
            <table className="coins-table">
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
                  <Coin key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          ) : (
            coins.map((coin) => (
              <div className="coin-box">
                <div className="info-box">
                  <p className="feature-title">Name</p>
                  <span className="feature-value">{coin.name}</span>
                  <p className="feature-title">Price</p>
                  <span className="feature-value">{coin.current_price}</span>
                  <p className="feature-title">ATH</p>
                  <span className="feature-value">{coin.ath}</span>
                </div>
                <div>
                  <button className="button">Select</button>
                </div>
              </div>
            ))
          )}

          <Pagination />
        </div>
      )}
    </div>
  );
}

export default AllCoins;
