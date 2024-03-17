import React from 'react';
import { FilterData } from '../../../types/filterData';

const SexPrefs: React.FC<FilterData> = ({ handleChange, filters }) => {
  return (
    <div className="border-b border-gray-100 w-full flex items-center justify-center p-4">
      <div>
        <h6 className="mb-3 text-sm font-medium text-gray-900">SEX</h6>
        <ul className="text-sm flex items-center justify-center gap-3">
          <li className="flex items-center">
            <input
              id="male"
              type="checkbox"
              name="male"
              value={filters.male}
              onChange={handleChange}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600 focus:ring-2"
            />

            <label
              htmlFor="male"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Male
            </label>
          </li>

          <li className="flex items-center">
            <input
              id="female"
              type="checkbox"
              name="female"
              value={filters.female}
              onChange={handleChange}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600 focus:ring-2"
            />

            <label
              htmlFor="female"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Female
            </label>
          </li>
          <li className="flex items-center">
            <input
              id="other"
              type="checkbox"
              name="other"
              onChange={handleChange}
              value={filters.other}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600 focus:ring-2"
            />

            <label
              htmlFor="other"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Other
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SexPrefs;
