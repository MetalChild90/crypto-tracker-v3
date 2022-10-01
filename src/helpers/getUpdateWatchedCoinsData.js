import { getCoin } from "../context/AppActions";
import calculatePercent from "./calculatePercent";

const getUpdateWatchedCoinsData = (watchedCoins) => {
  const fetchedCoins = Promise.all(
    watchedCoins.map(async (coin) => {
      const fetchedCoin = await getCoin(coin.id);
      return fetchedCoin;
    })
  );

  // calculatePercent(price, coin.priceTarget)

  return;
};

export default getUpdateWatchedCoinsData;
