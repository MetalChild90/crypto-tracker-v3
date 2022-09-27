import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import $ from "jquery";

function PriceTargetForm() {
  const { priceTarget, dispatch, handleKeyDownTarget } = useContext(AppContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (e) => {
    const priceTarget = parseFloat(e.target.value);
    dispatch({ type: "ADD_PRICE_TARGET", payload: priceTarget });
  };

  $("input").on("keypress", function () {
    if ($(this).val().length > 12) {
      setIsDisabled(true);
    }
  });

  return (
    <>
      <input
        type="number"
        value={priceTarget}
        onChange={handleChange}
        onKeyDown={handleKeyDownTarget}
        className="target-input"
        disabled={isDisabled}
      />
    </>
  );
}

export default PriceTargetForm;
