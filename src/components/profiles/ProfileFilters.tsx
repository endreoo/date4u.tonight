import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ProfileFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export function ProfileFilters({ onSearch, onFilterChange }: ProfileFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name or bio..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
        
        <select 
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          onChange={(e) => onFilterChange({ dateType: e.target.value })}
        >
          <option value="">All Date Types</option>
          <option value="coffee">Coffee Dates</option>
          <option value="dinner">Dinner Dates</option>
          <option value="vip">VIP Only</option>
        </select>

        <select 
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          onChange={(e) => onFilterChange({ availability: e.target.value })}
        >
          <option value="">Any Day</option>
          <option value="today">Available Today</option>
          <option value="weekend">Weekend</option>
        </select>
      </div>
    </div>
  );
}