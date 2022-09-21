import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ coinsPerPage, totalCoins, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
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
