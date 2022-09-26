const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_COINS":
      return { ...state, coins: action.payload, loading: false };
    case "GET_ALL_COINS":
      return { ...state, allCoins: action.payload, loading: false };
    case "SET_SELECTED_COIN":
      return { ...state, selectedCoin: action.payload, loading: false };
    case "ADD_TO_WATCHED_LIST":
      return {
        ...state,
        watchedCoins: [...state.watchedCoins, action.payload],
      };
    case "ADD_PRICE_TARGET":
      return { ...state, priceTarget: action.payload };
    case "DELETE_PRICE_TARGET":
      return { ...state, priceTarget: 0 };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "CANCEL_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default AppReducer;
