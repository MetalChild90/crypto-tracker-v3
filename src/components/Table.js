import DisplaySelectedCoin from "./DisplaySelectedCoin";
import DisplayWatchedCoins from "./DisplayWatchedCoins";
import DisplayAllCoins from "./DisplayAllCoins";

function Table({ type, toDisplay }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>{type === "allCoins" ? "ATH" : "Price Target"}</th>
          <th>
            {type === "allCoins"
              ? "Select"
              : type === "selectedCoin"
              ? "Add to watched list"
              : "Distance"}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {type === "allCoins" &&
          toDisplay.map((coin) => {
            return <DisplayAllCoins key={coin.id} coin={coin} />;
          })}
        {type === "watchedCoins" &&
          toDisplay.map((coin) => {
            return <DisplayWatchedCoins key={coin.id} coin={coin} />;
          })}
        {type === "selectedCoin" && <DisplaySelectedCoin />}
      </tbody>
    </table>
  );
}

export default Table;
