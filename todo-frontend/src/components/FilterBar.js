import React from 'react';

function FilterBar({ filter, setFilter, counts }) {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>
        All ({counts.all})
      </button>
      <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>
        Pending ({counts.pending})
      </button>
      <button onClick={() => setFilter("done")} className={filter === "done" ? "active" : ""}>
        Done ({counts.done})
      </button>
    </div>
  );
}

export default FilterBar;
