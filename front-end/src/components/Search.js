import React from 'react';

const Search = ({ searchQuery, onQueryChange, startDate, onStartDateChange, endDate, onEndDateChange, searchPriority, onPriorityChange }) => {
  return (
    <div className="mb-3">
      <div className="d-flex flex-column flex-sm-row align-items-start">
        <div className="me-3 mb-2 mb-sm-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <div className="me-3 mb-2 mb-sm-0">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            placeholder="Start Date"
          />
        </div>
        <div className="me-3 mb-2 mb-sm-0">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            placeholder="End Date"
          />
        </div>
        <div>
          <select
            className="form-select"
            value={searchPriority}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
