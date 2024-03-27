import React from 'react';
import { FilterData } from '../../../types/filterData';

const LifestylePrefs: React.FC<FilterData> = ({ handleChange, filters }) => {
  return (
    <div className="flex flex-col p-4 w-full  items-center justify-center">
      <div>
        <h6 className="mb-3 text-sm font-medium text-gray-900">LIFESTYLE</h6>

        <div className="flex flex-row gap-3">
          <div className="relative flex gap-x-2">
            <div className="flex h-6 items-center">
              <input
                id="smoke"
                name="smoke"
                type="checkbox"
                checked={filters.smoke}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600 focus:ring-2"
                onChange={handleChange}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="smoke" className="font-medium text-gray-900">
                Smoke
              </label>
            </div>
          </div>
          <div className="relative flex gap-x-2">
            <div className="flex h-6 items-center">
              <input
                id="drink"
                name="drink"
                type="checkbox"
                checked={filters.drink}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600 focus:ring-2"
                onChange={handleChange}
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="drink" className="font-medium text-gray-900">
                Drink
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestylePrefs;
