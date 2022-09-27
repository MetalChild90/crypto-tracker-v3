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
    coinNamesNotification: "", ///????
    loading: true,
    coinsPerPage: 100,
    currentPage: 1,
    openModal: false,
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

  // const [selectedCoin, setSelectedCoin] = useState(null);
  // const [priceTarget, setPriceTarget] = useState(0);
  // const [editMode, setEditMode] = useState(false);
  // const [coins, setCoins] = useState([]);
  // const [allCoins, setAllCoins] = useState([]);
  // const [showSetItem, setShowSetItem] = useState(false);
  // const [showCoinNames, setShowCoinNames] = useState(false);
  // const [watchedCoins, setWatchedCoins] = useState([]);
  // const [watchedCoinNames, setWatchedCoinNames] = useState([]);
  // const [coinNamesNotification, setCoinNamesNotification] = useState("");
  // const [targetNotification, setTargetNotification] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [coinsPerPage] = useState(100);

  // function handleClickMainButton() {
  //   setShowCoinNames(!showCoinNames);
  //   setSelectedCoin(null);
  //   setShowSetItem(false);
  // }

  // function addToWatchedList(id, price, name) {
  //   setWatchedCoins((prevState) => {
  //     return [...prevState, { id, priceTarget, price, name }];
  //   });
  //   setSelectedCoin(null);
  //   setPriceTarget(0);
  // }

  // function deleteItem(id) {
  //   setWatchedCoins((prevState) => {
  //     return prevState.filter((coin) => {
  //       return coin.id !== id;
  //     });
  //   });
  // }

  // function editItem(id, target) {
  //   let updatedState = watchedCoins.map((coin) => {
  //     if (coin.id === id) {
  //       return { ...coin, priceTarget: target };
  //     }
  //     return coin;
  //   });
  //   setWatchedCoins(updatedState);
  // }

  // function closeSetItem() {
  //   setSelectedCoin(null);
  //   setShowSetItem(false);
  // }

  // function handleKeyDownTarget(e) {
  //   if (e.key === "Enter") {
  //     validateTarget(priceTarget);
  //   }
  // }

  // function validateTarget() {
  //   if (priceTarget <= 0 || isNaN(priceTarget)) {
  //     setTargetNotification("Set correct target");
  //   } else {
  //     console.log("jest super");
  //     //   if (editMode) {
  //     //     editCoin(coin.id, validationTarget);
  //     //     setEditMode(false);
  //     //     setTargetNotification("");
  //     //   } else {
  //     //     addCoin(coin, validationTarget);
  //     //     setTargetNotification("");
  //     //   }
  //   }
  // }

  return (
    <AppContext.Provider
      value={{
        ...state,
        // handleClickMainButton,
        // addToWatchedList,
        // deleteItem,
        // editItem,
        // closeSetItem,
        // paginate,
        // handleKeyDownTarget,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
