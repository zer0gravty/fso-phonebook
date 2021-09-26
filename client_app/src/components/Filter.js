import React from 'react'

const Filter = ({ filterBy, handleFilter }) => {
    return (
      <label htmlFor="filter">
        Filter shown with:
        <input
          id="filter"
          type="text"
          value={filterBy}
          onChange={handleFilter}
        />
      </label>
    );
}

export default Filter
