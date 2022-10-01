import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function ActionsModal() {
  const { dispatch, watchedCoins, selectedCoin } = useContext(AppContext);

  const navigate = useNavigate();

  const closeModalHandler = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handleEditClick = () => {
    dispatch({ type: "OPEN_EDIT_MODE", payload: selectedCoin.priceTarget });
    navigate(`/selected-coin/${selectedCoin?.id}`);
  };

  const handleDeleteClick = () => {
    const newWatchedCoins = watchedCoins.filter(
      (coin) => coin.id !== selectedCoin.id
    );
    dispatch({ type: "DELETE_COIN", payload: newWatchedCoins });
  };

  return (
    <div className="modal">
      <div className="modal-wrapper" onClick={closeModalHandler}>
        <div className="action-button-box">
          <button
            className="button button-full-width"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="button button-delete button-full-width"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActionsModal;
