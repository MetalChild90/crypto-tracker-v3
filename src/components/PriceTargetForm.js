import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

function PriceTargetForm({ type }) {
  const { dispatch, selectedCoin, watchedCoins, editMode } =
    useContext(AppContext);
  const [priceTarget, setPriceTarget] = useState(0);
  const [priceTargetErrorNotification, setPriceTargetErrorNotification] =
    useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPriceTarget(e.target.value);
  };

  useEffect(() => {
    setPriceTarget(selectedCoin?.priceTarget);
  }, [editMode, selectedCoin?.priceTarget]);

  const handleSave = (e) => {
    e.preventDefault();
    if (priceTarget <= 0 || isNaN(priceTarget)) {
      setPriceTargetErrorNotification("Price target can't be 0");
      return;
    } else {
      if (editMode) {
        const updatedWatchedCoins = watchedCoins.map((coin) =>
          coin.id === selectedCoin.id ? { ...selectedCoin, priceTarget } : coin
        );
        dispatch({ type: "SAVE_EDITION", payload: updatedWatchedCoins });
      } else {
        const newWatchedCoin = {
          id: selectedCoin.id,
          priceTarget: parseFloat(priceTarget),
        };
        dispatch({ type: "ADD_TO_WATCHED_LIST", payload: newWatchedCoin });
        navigate("/watched-coins");
      }
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  return (
    <div className="price-target-form">
      <form
        // style={{ flexDirection: !editMode ? "row" : "column" }}
        onSubmit={handleSave}
      >
        <input
          maxLength="12"
          onInput={maxLengthCheck}
          type="number"
          value={priceTarget || ""}
          onChange={handleChange}
          className="target-input"
        />

        {type === "selected" && !editMode && (
          <button type="submit" className="btn ml">
            Watch
          </button>
        )}
        {editMode && (
          <div>
            <button type="submit" className="btn btn-save mt ml">
              Save
            </button>
            <button
              className="btn btn-discard ml"
              onClick={() => dispatch({ type: "DISCARD_EDITION" })}
            >
              Discard
            </button>
          </div>
        )}
      </form>
      {priceTargetErrorNotification && (
        <p className="notification">{priceTargetErrorNotification}</p>
      )}
    </div>
  );
}

export default PriceTargetForm;
