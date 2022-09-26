import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCoins = async (currentPage) => {
  try {
    // setLoading(true);
    const res =
      await axios.get(`${BASE_URL}/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=${currentPage}&sparkline=false
            `);

    return res.data;

    //   setCoins(coins);
    //   setLoading(false);
  } catch (err) {
    console.log(err);
    //   setCoinNamesNotification(
    //     "Something went wrong. Please, refresh or try again later."
    //   );
  }
};

export const getAllCoins = async () => {
  try {
    // setLoading(true);
    const res = await axios.get(`${BASE_URL}/coins/list`);

    return res.data;

    //   setAllCoins(coins);
    //   setLoading(false);
  } catch (err) {
    console.log(err);
    //   setCoinNamesNotification(
    //     "Something went wrong. Please, refresh or try again later."
    //   );
  }
};

export const getCoin = async (id) => {
  try {
    // setLoading(true);
    const res = await fetch(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    const coin = await res.json();
    return coin;

    // setSelectedCoin(coin);
    // setLoading(false);
  } catch (err) {
    console.log(err);
    // setCoinNamesNotification(
    //   "Something went wrong. Please, refresh or try again later."
    // );
  }
};
