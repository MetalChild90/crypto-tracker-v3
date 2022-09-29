const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_COINS":
      return { ...state, coins: action.payload, loading: false };
    case "GET_ALL_COINS":
      return { ...state, allCoins: action.payload, loading: false };
    case "SET_SELECTED_COIN":
      return { ...state, selectedCoin: action.payload, loading: false };
    case "REMOVE_SELECTED_COIN":
      return { ...state, selectedCoin: null, priceTarget: 0 };
    case "ADD_TO_WATCHED_LIST":
      return {
        ...state,
        watchedCoins: [...state.watchedCoins, action.payload],
        priceTarget: 0,
        selectedCoin: null,
      };
    case "ADD_PRICE_TARGET":
      return { ...state, priceTarget: action.payload };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "OPEN_MODAL":
      return {
        ...state,
        openModal: !state.openModal,
        selectedCoin: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        openModal: !state.openModal,
      };
    case "DELETE_COIN":
      return { ...state, watchedCoins: action.payload, selectedCoin: null };
    case "OPEN_EDIT_MODE":
      return { ...state, editMode: true, priceTarget: action.payload };
    case "DISCARD_EDITION":
      return { ...state, editMode: false, selectedCoin: null, priceTarget: 0 };
    case "SAVE_EDITION":
      return {
        ...state,
        watchedCoins: action.payload,
        editMode: false,
        selectedCoin: null,
        priceTarget: 0,
      };

    default:
      return state;
  }
};

export default AppReducer;
