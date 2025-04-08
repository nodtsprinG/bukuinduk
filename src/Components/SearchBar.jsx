import React from "react";

const SearchBar = ({ searchKey, setSearchKey, onToggleFilter }) => {
  return (
    <div className="grid grid-cols-10 gap-4 mt-6">
      <input
        type="search"
        placeholder="Cari..."
        className="border border-gray-400 rounded-sm col-span-9 p-2"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button
        onClick={onToggleFilter}
        className="border border-gray-400 rounded-sm text-black col-span-1 p-2 flex items-center justify-center hover:bg-gray-100 transition"
      >
        Filter
      </button>
    </div>
  );
};

export default SearchBar;
