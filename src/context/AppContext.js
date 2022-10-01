import { createContext, useReducer, useEffect } from "react";
import { getAllCoins } from "./AppActions";
import AppReducer from "./AppReducer";

const AppContext = createContext();

export const Provider = ({ children }) => {
  const initialState = {
    selectedCoin: null,
    priceTarget: 0,
    editMode: false,
    coins: [],
    allCoins: [],
    watchedCoins: [],
    loading: true,
    coinsPerPage: 100,
    currentPage: 1,
    openModal: false,
    errorPriceNotification: "",
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchAllCoins = async () => {
      dispatch({ type: "SET_LOADING" });
      const allCoins = await getAllCoins();
      dispatch({ type: "GET_ALL_COINS", payload: allCoins });
    };
    fetchAllCoins();
  }, []);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("watchedCoins"));
    dispatch({
      type: "RETRIVE_WATCHED_LIST_FROM_STORAGE",
      payload: storedNotes,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("watchedCoins", JSON.stringify(state.watchedCoins));
  }, [state.watchedCoins]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
