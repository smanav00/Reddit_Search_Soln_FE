import React from "react";

const PaginationControls = ({
  currentPage,
  handleNextPage,
  handlePreviousPage,
  after,
  loading,
  before,
}) => {
  return (
    <div className="pagination-controls">
      <button
        onClick={handlePreviousPage}
        disabled={!before || currentPage === 1 || loading}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage} disabled={!after || loading}>
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
