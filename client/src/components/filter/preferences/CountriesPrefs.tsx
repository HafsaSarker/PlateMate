import React from 'react';
import Countries from './Countries';
import { CountriesFilterData } from '../../../types/filterData';

const CountriesPrefs: React.FC<CountriesFilterData> = ({
  handleChange,
  filters,
  setFilters,
}) => {
  return (
    <div className="border-b border-gray-100 flex flex-col p-4 w-full items-center">
      <div className="px-12 flex items-center gap-3 text-sm w-fit flex-wrap py-4">
        {filters.nationalities &&
          filters.nationalities.map((nationality, index) => (
            <p
              key={index}
              className="px-2 bg-neutral-300 text-gray-800 font-semibold rounded-sm py-0.5"
            >
              {nationality}
              <span
                className="pl-2 text-gray-400 cursor-pointer"
                onClick={() => {
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    nationalities: prevFilters.nationalities?.filter(
                      (item) => item !== nationality,
                    ),
                  }));
                }}
              >
                x
              </span>
            </p>
          ))}
      </div>
      <Countries handleChange={handleChange} filters={filters} />
    </div>
  );
};

export default CountriesPrefs;
