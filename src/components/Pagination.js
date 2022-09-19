import React from "react";
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

export default Pagination;
