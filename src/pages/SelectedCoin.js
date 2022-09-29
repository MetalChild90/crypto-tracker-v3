import { useContext, useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import AppContext from "../context/AppContext";
import PriceTargetForm from "../components/PriceTargetForm";
import { getCoin } from "../context/AppActions";
import { useParams, Link, useNavigate } from "react-router-dom";

function SelectedCoin() {
  const { loading, selectedCoin, dispatch, priceTarget } =
    useContext(AppContext);
  const [successNotification, setSuccessNotification] = useState(false);
  const [errorPriceNotification, setErrorPriceNotification] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoin = async () => {
      dispatch({ type: "SET_LOADING" });
      const coin = await getCoin(params.id);
      dispatch({ type: "SET_SELECTED_COIN", payload: coin });
    };

    fetchCoin();
  }, [params.id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_SELECTED_COIN" });
    };
  }, [dispatch]);

  const handleClick = () => {
    if (priceTarget <= 0 || isNaN(priceTarget)) {
      setErrorPriceNotification("Price target can't be 0");
      return;
    } else {
      const newWatchedCoin = {
        id: selectedCoin.id,
        priceTarget,
        name: selectedCoin.name,
      };
      dispatch({ type: "ADD_TO_WATCHED_LIST", payload: newWatchedCoin });
      setErrorPriceNotification("");
      setSuccessNotification(true);
    }
  };

  const closeSelectedCoin = () => {
    dispatch({ type: "REMOVE_SELECTED_COIN" });
    navigate("/");
  };

  if (loading) {
    return "Is loading...";
  }

  return (
    <div>
      {successNotification ? (
        <div>
          <h2>Coin is now watched!!</h2>
          <Link to="/watched-coins">
            See watched coins <HiArrowRight />
          </Link>
          <Link to="/coins">
            Choose another coin <HiArrowRight />
          </Link>
        </div>
      ) : (
        <>
          <h2 className="title">Add coin to watched list:</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Price Target</th>
                <th>Add to watched list</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCoin?.name}</td>
                <td>{selectedCoin?.market_data?.current_price?.usd}$</td>
                <td>
                  <PriceTargetForm />
                  {errorPriceNotification && <p>{errorPriceNotification}</p>}
                </td>
                <td>
                  <button className="list-item-button" onClick={handleClick}>
                    Add
                  </button>
                </td>
                <td>
                  <button onClick={closeSelectedCoin}>&times;</button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default SelectedCoin;
