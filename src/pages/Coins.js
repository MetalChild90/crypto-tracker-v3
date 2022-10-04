import { useContext, useEffect } from "react";
import { getCoins } from "../context/AppActions";
import AppContext from "../context/AppContext";
import Pagination from "../components/Pagination";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CoinRow from "../components/CoinRow";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";

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
        <Spinner />
      ) : (
        <div className="coins-list">
          {width > 992 ? (
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
                  <CoinRow key={coin.id} coin={coin} />
                ))}
              </tbody>
            </table>
          ) : (
            coins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} type="allcoins" />
            ))
          )}

          <Pagination />
        </div>
      )}
    </div>
  );
}

export default AllCoins;
