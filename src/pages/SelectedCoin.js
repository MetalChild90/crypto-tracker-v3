import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoin } from "../context/AppActions";
import AppContext from "../context/AppContext";
import CoinCard from "../components/CoinCard";
import Spinner from "../components/Spinner";

function SelectedCoin() {
  const { loading, selectedCoin, dispatch } = useContext(AppContext);

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

  const closeSelectedCoin = () => {
    dispatch({ type: "REMOVE_SELECTED_COIN" });
    navigate("/");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="selected-coin-box">
      <h2 className="title">Add coin to watched list</h2>
      <CoinCard
        coin={selectedCoin}
        type="selected"
        handleClose={closeSelectedCoin}
      />
    </div>
  );
}

export default SelectedCoin;
