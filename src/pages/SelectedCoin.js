import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import PriceTargetForm from "../components/PriceTargetForm";
import { getCoin } from "../context/AppActions";
import { useParams } from "react-router-dom";

function SelectedCoin() {
  const { loading, selectedCoin, dispatch } = useContext(AppContext);

  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      dispatch({ type: "SET_LOADING" });
      const coin = await getCoin(params.id);
      dispatch({ type: "SET_SELECTED_COIN", payload: coin });
    };

    fetchCoin();
  }, [params.id, dispatch]);

  const handleClick = () => {
    // const newWatchedCoin = {
    //   id: selectedCoin.id,
    //   priceTarget,
    // };
    // dispatch({ type: "ADD_TO_WATCHED_LIST", payload: newWatchedCoin });
    // dispatch({ type: "DELETE_PRICE_TARGET" }); //usun
  };

  return (
    <div>
      {loading ? (
        "is Loading"
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Price Target</th>
              <th>"Add to watched list"</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedCoin.name}</td>
              <td>{selectedCoin.market_data.current_price.usd}</td>
              <td>
                <PriceTargetForm />
              </td>
              <td>
                <button
                  className="list-item-button"
                  onClick={() => handleClick}
                >
                  Add
                </button>
              </td>
              <td>
                <button>&times;</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SelectedCoin;
