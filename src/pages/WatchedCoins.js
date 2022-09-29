import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import WatchedCoin from "../components/WatchedCoin";
import ActionsModal from "../components/ActionsModal";

function WatchedCoins() {
  const { watchedCoins, openModal, dispatch } = useContext(AppContext);

  useEffect(() => {
    return () => {
      dispatch({ type: "DISCARD_EDITION" });
    };
  }, [dispatch]);

  return (
    <div>
      <h2 className="title watched-coins-title">Watched tokens</h2>

      {watchedCoins.length === 0 ? (
        <p className="no-coins-info">No watched coins yet</p>
      ) : (
        <div className="watched-coins-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Price Target</th>
                <th>Distance</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {watchedCoins.map((coin) => (
                <WatchedCoin key={coin.id} coin={coin} />
              ))}
            </tbody>
          </table>
          {openModal && <ActionsModal />}
        </div>
      )}
    </div>
  );
}

export default WatchedCoins;
