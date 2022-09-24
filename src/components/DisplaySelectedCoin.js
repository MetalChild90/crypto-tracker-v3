import { useContext, useEffect, useCallback, useState } from "react";
import AppContext from "../context/AppContext";
import PriceTargetForm from "./PriceTargetForm";
import { useParams } from "react-router-dom";
import { getCoin } from "../context/AppActions";

function DisplaySelectedCoin() {
  const { loading, selectedCoin, priceTarget, dispatch } =
    useContext(AppContext);

  const params = useParams();

  const fetchCoin = useCallback(async () => {
    dispatch({ type: "SET_LOADING" });
    const fetchedCoin = await getCoin(params.id);
    dispatch({ type: "SET_SELECTED_COIN", payload: fetchedCoin });
  }, [dispatch, params.id]);

  useEffect(() => {
    fetchCoin();
  }, [fetchCoin]);

  const handleClick = () => {
    const newWatchedCoin = {
      id: selectedCoin.id,
      priceTarget,
    };
    dispatch({ type: "ADD_TO_WATCHED_LIST", payload: newWatchedCoin });
    dispatch({ type: "DELETE_PRICE_TARGET" }); //usun
  };

  console.log(selectedCoin);
  console.log(selectedCoin.name);
  console.log(selectedCoin.market_data);

  if (loading) {
    return "Is loading";
  }

  if (!loading) {
    return (
      <tr>
        <td>{selectedCoin.name}</td>
        <td>{selectedCoin.market_data.current_price.usd}</td>
        <td>
          <PriceTargetForm />
        </td>
        <td>
          <button className="list-item-button" onClick={() => handleClick}>
            Add
          </button>
        </td>
        <td>
          <button>&times;</button>
        </td>
      </tr>
    );
  }
}

export default DisplaySelectedCoin;
