import { useContext } from "react";
import AppContext from "../context/AppContext";
import DisplayCoins from "./DisplayCoins";

function SelectedCoin() {
  const { watchedCoins } = useContext(AppContext);
  return (
    <div>
      <h3 className="title watched-coins-title">Watched tokens</h3>

      {watchedCoins.length === 0 ? (
        <p className="no-coins-info">No watched coins yet</p>
      ) : (
        <DisplayCoins type="watchedCoins" toDisplay={watchedCoins} />
      )}
    </div>
  );
}

export default SelectedCoin;
