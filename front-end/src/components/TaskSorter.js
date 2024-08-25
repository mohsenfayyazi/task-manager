import React from 'react';

const TaskSorter = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="mb-3">
      <fieldset className="d-flex flex-wrap align-items-center">
        <legend className="me-3">Sort by:</legend>
        <div className="form-check me-2">
          <input
            type="radio"
            id="sortDateAsc"
            name="sortOption"
            value="dateAsc"
            className="form-check-input"
            onChange={handleSortChange}
            defaultChecked
          />
          <label htmlFor="sortDateAsc" className="form-check-label">
            Date (Asc)
          </label>
        </div>
        <div className="form-check me-2">
          <input
            type="radio"
            id="sortDateDesc"
            name="sortOption"
            value="dateDesc"
            className="form-check-input"
            onChange={handleSortChange}
          />
          <label htmlFor="sortDateDesc" className="form-check-label">
            Date (Desc)
          </label>
        </div>
        <div className="form-check me-2">
          <input
            type="radio"
            id="sortPriority"
            name="sortOption"
            value="priority"
            className="form-check-input"
            onChange={handleSortChange}
          />
          <label htmlFor="sortPriority" className="form-check-label">
            Priority
          </label>
        </div>
        <div className="form-check me-2">
          <input
            type="radio"
            id="sortTitle"
            name="sortOption"
            value="title"
            className="form-check-input"
            onChange={handleSortChange}
          />
          <label htmlFor="sortTitle" className="form-check-label">
            Title
          </label>
        </div>
      </fieldset>
    </div>
  );
};

export default TaskSorter;
