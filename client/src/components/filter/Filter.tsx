import { IoMdClose } from 'react-icons/io';
import { FilterProps } from '../../types/filterProps';
import CountriesPrefs from './preferences/CountriesPrefs';
import SexPrefs from './preferences/SexPrefs';
import AgePrefs from './preferences/AgePrefs';
import HeightPrefs from './preferences/HeightPrefs';
import LifestylePrefs from './preferences/LifestylePrefs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FilterForm } from '../../types/filterForm';

const Filter: React.FC<FilterProps> = ({ setShowFilters }) => {
  const [filters, setFilters] = useState<FilterForm>({
    nationalities: [],
    male: false,
    female: false,
    other: false,
    age_from: 18,
    age_to: 18, // will start at age_from later
    height_from_ft: undefined,
    height_from_in: undefined,
    height_to_ft: undefined,
    height_to_in: undefined,
    smoke: false,
    drink: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    switch (type) {
      case 'checkbox':
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: (e.target as HTMLInputElement).checked,
        }));
        break;
      case 'number':
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value !== '' ? parseInt(value, 10) : undefined,
        }));
        break;
      case 'select-multiple':
        const selectedOptions = Array.from(
          (e.target as HTMLSelectElement).options,
        )
          .filter((option) => option.selected)
          .map((option) => option.value);
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: selectedOptions,
        }));
        break;
      default:
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
    }
  };

  const saveFilters = (e: FormEvent<HTMLFormElement>) => {
    // save filters to database in
    // user model
    e.preventDefault();

    console.log(filters);
  };
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-20"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal close btn --> */}
          <div className="w-full flex items-end pr-2 pt-2">
            <button
              type="button"
              className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md h-8 ms-auto inline-flex justify-center items-center w-8"
              onClick={() => setShowFilters(false)}
            >
              <IoMdClose />
            </button>
          </div>

          {/* <!-- Modal header --> */}
          <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b-4 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Filter Users
            </h3>
          </div>

          {/* <!-- Modal body --> */}
          <form
            className="flex flex-col justify-center gap-4 w-full  items-start"
            onSubmit={saveFilters}
          >
            {/* nationality preferences */}
            <CountriesPrefs
              handleChange={handleChange}
              filters={filters}
              setFilters={setFilters}
            />

            {/* sex preferences */}
            <SexPrefs filters={filters} handleChange={handleChange} />

            {/* age preferences */}
            <AgePrefs filters={filters} handleChange={handleChange} />

            {/* height preferences */}
            <HeightPrefs filters={filters} handleChange={handleChange} />

            {/* lifestyle preferences */}
            <LifestylePrefs filters={filters} handleChange={handleChange} />

            {/* <!-- Modal footer --> */}
            <div className="flex w-full items-center justify-end p-4 md:p-5 border-t-4 border-gray-200 rounded-b">
              <button
                type="submit"
                className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save
              </button>
              <button
                onClick={() => setShowFilters(false)}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;
