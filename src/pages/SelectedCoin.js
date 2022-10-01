import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCoin } from "../context/AppActions";
import AppContext from "../context/AppContext";
import CoinCard from "../components/CoinCard";
import { HiArrowRight } from "react-icons/hi";

function SelectedCoin() {
  const { loading, selectedCoin, dispatch, priceTarget, editMode } =
    useContext(AppContext);
  const [successNotification, setSuccessNotification] = useState(false);

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

  const addToWatchList = () => {
    console.log("work");
    if (priceTarget <= 0 || isNaN(priceTarget)) {
      dispatch({
        type: "SET_ERROR_PRICE_NOTIFICATION",
        payload: "Price target can't be 0",
      });
      return;
    } else {
      const newWatchedCoin = {
        id: selectedCoin.id,
        priceTarget,
      };
      dispatch({ type: "ADD_TO_WATCHED_LIST", payload: newWatchedCoin });
      navigate("/watched-coins");
      // setSuccessNotification(true);
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
    <div className="selected-coin-box">
      {/* {successNotification ? (
        <div>
          <h2>Coin is now watched!!</h2>
          <Link to="/watched-coins">
            See watched coins <HiArrowRight />
          </Link>
          <Link to="/coins">
            Choose another coin <HiArrowRight />
          </Link>
        </div>
      ) : ( */}
      <>
        <h2 className="title">
          {!editMode ? "Add coin to watched list" : "Edit coin"}
        </h2>
        <CoinCard
          coin={selectedCoin}
          type="selected"
          handleClose={closeSelectedCoin}
          addToWatchList={addToWatchList}
        />
      </>
      {/* )} */}
    </div>
  );
}

export default SelectedCoin;
