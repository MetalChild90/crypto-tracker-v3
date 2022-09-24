import { useContext, useEffect, useCallback } from "react";
import { getCoins } from "../context/AppActions";
import AppContext from "../context/AppContext";
import Pagination from "./Pagination";
import DisplayCoins from "./DisplayCoins";

function AllCoins() {
  const { coins, currentPage, dispatch } = useContext(AppContext);

  const fetchCoins = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    const coins = await getCoins(currentPage);
    dispatch({ type: "GET_COINS", payload: coins });
  }, [currentPage, dispatch]);

  useEffect(() => {
    fetchCoins();
  }, [currentPage, fetchCoins]);

  return (
    <div className="all-coins-wrapper">
      <h3>Select coin from a list:</h3>
      <DisplayCoins type="allCoins" toDisplay={coins} />
      <Pagination />
    </div>
  );
}

export default AllCoins;
