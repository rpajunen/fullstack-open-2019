import React from "react";

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      rajaa naytettavia <input value={filter} onChange={handleFilterChange}></input>
    </div>
  );
};

export default Filter;