import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-center mt-4 gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Kembali
      </button>
      <span className="px-4 py-2">
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default Pagination;
