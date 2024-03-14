import React from 'react';
import Countries from './Countries';

function CountriesPrefs() {
  return (
    <div className="border-b border-gray-100 flex flex-col p-4 w-full items-center">
      <div className="flex items-center gap-3 text-sm w-fit flex-wrap py-4">
        <p className="px-2 bg-neutral-300 text-gray-800 font-semibold rounded-sm py-0.5">
          Japan
          <span className="pl-2 text-gray-400 cursor-pointer">x</span>
        </p>
        <p className="px-2 bg-neutral-300 text-gray-800 font-semibold rounded-sm py-0.5">
          Brazil
          <span className="pl-2 text-gray-400 cursor-pointer">x</span>
        </p>
        <p className="px-2 bg-neutral-300 text-gray-800 font-semibold rounded-sm py-0.5">
          Nepal
          <span className="pl-2 text-gray-400 cursor-pointer">x</span>
        </p>
      </div>
      <Countries />
    </div>
  );
}

export default CountriesPrefs;
