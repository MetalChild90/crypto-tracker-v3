import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCoins = async (currentPage) => {
  try {
    const res =
      await axios.get(`${BASE_URL}/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=${currentPage}&sparkline=false
            `);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCoins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/coins/list`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCoin = async (id) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
