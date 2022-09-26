import PropTypes from "prop-types";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import "./Pagination.css";

const Pagination = () => {
  const { coinsPerPage, allCoins, currentPage, dispatch } =
    useContext(AppContext);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCoins.length / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  function paginate(pageNumber) {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  }

  return (
    <nav>
      <ul className="pagination-list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-list-item ${
              number === currentPage && "activePage"
            }`}
          >
            <span className="pagination-link">{number}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  coinsPerPage: PropTypes.number,
  totalCoins: PropTypes.number,
  paginate: PropTypes.func,
  currentPage: PropTypes.number,
};

export default Pagination;
