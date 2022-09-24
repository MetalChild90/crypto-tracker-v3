import { useContext } from "react";
import DisplayCoins from "./DisplayCoins";
import AppContext from "../context/AppContext";

function SelectedCoin() {
  const { selectedCoin, loading } = useContext(AppContext);
  return (
    <div>
      <h3 className="title new-token-title">Add new token</h3>
      {!loading && <DisplayCoins type="selectedCoin" />}
    </div>
  );
}

export default SelectedCoin;
