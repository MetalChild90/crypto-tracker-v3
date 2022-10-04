import { getCoin } from "../context/AppActions";
import calculatePercent from "./calculatePercent";

const getUpdateWatchedCoinsData = async (watchedCoins) => {
  return await Promise.all(
    watchedCoins.map(async (coin) => {
      const fetchedCoin = await getCoin(coin.id);
      const distancePercent = calculatePercent(
        fetchedCoin.market_data.current_price.usd,
        coin.priceTarget
      );
      return { ...coin, ...fetchedCoin, distancePercent };
    })
  );
};

export default getUpdateWatchedCoinsData;
