import { useContext } from "react";
import AppContext from "../context/AppContext";

function PriceTargetForm() {
  const {
    priceTarget,
    dispatch,
    handleKeyDownTarget,
    targetNotification,
    setTargetNotification,
  } = useContext(AppContext);

  const handleChange = (e) => {
    const priceTarget = e.target.value;
    dispatch({ type: "ADD_PRICE_TARGET", payload: priceTarget });
  };

  return (
    <>
      <input
        type="number"
        value={priceTarget}
        onChange={handleChange}
        onKeyDown={handleKeyDownTarget}
        onFocus={() => setTargetNotification("")}
        className="target-input"
      />
      {targetNotification && (
        <p className="targetNotification">{targetNotification}</p>
      )}
    </>
  );
}

export default PriceTargetForm;
