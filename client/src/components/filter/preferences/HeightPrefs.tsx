import React from 'react';
import { FilterData } from '../../../types/filterData';

const HeightPrefs: React.FC<FilterData> = ({ handleChange, filters }) => {
  return (
    <div className="flex flex-col p-4 w-full border-b border-gray-100 items-center justify-center">
      <div>
        <h6 className="mb-3 text-sm font-medium text-gray-900">HEIGHT RANGE</h6>
        <div className="flex gap-10">
          <div className="sm:col-span-2">
            <label
              htmlFor="height_from"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              From
            </label>
            <div className="mt-2 flex items-center gap-1 ">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="height_from_ft"
                  id="height_from_ft"
                  value={filters.height_from_ft || ''}
                  min="1"
                  max="12"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
                <span>ft</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="height_from_in"
                  id="height_from_in"
                  value={filters.height_from_in || ''}
                  min="0"
                  max="12"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
                <span>in</span>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="height_to"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              To
            </label>
            <div className="mt-2 flex items-center gap-1 ">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="height_to_ft"
                  id="height_to_ft"
                  value={filters.height_to_ft || ''}
                  min={filters.height_from_ft}
                  max="12"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
                <span>ft</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="height_to_in"
                  id="height_to_in"
                  value={filters.height_to_in || ''}
                  min={filters.height_from_in}
                  max="12"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
                <span>in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightPrefs;
