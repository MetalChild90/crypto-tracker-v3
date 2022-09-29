import { useContext } from "react";
import AppContext from "../context/AppContext";

function PriceTargetForm() {
  const { priceTarget, dispatch } = useContext(AppContext);

  const handleChange = (e) => {
    const priceTarget = parseFloat(e.target.value) || 0;
    dispatch({ type: "ADD_PRICE_TARGET", payload: priceTarget });
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
    <>
      <input
        maxLength="12"
        onInput={maxLengthCheck}
        type="number"
        value={priceTarget}
        onChange={handleChange}
        className="target-input"
      />
    </>
  );
}

export default PriceTargetForm;
