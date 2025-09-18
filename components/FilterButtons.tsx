import React from 'react';
import type { DietaryFilter } from '../types';

interface FilterButtonsProps {
  filters: DietaryFilter[];
  activeFilter: DietaryFilter;
  onFilterChange: (filter: DietaryFilter) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 my-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;