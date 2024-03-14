import React from 'react';

function HeightPrefs() {
  return (
    <div className="flex flex-col p-4 w-full border-b border-gray-100 items-center justify-center">
      <div>
        <h6 className="mb-3 text-sm font-medium text-gray-900">HEIGHT RANGE</h6>
        <div className="flex gap-3">
          <div className="sm:col-span-2">
            <label
              htmlFor="height_from"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              From
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="height_from"
                id="height_from"
                placeholder="e.g. 5 ft 10 in"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="height_to"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              To
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="height_to"
                id="height_to"
                placeholder="e.g. 5 ft 10 in"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                // onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeightPrefs;
