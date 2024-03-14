import { IoMdClose } from 'react-icons/io';
import { FilterProps } from '../../types/filterProps';
import CountriesPrefs from './preferences/CountriesPrefs';
import SexPrefs from './preferences/SexPrefs';
import AgePrefs from './preferences/AgePrefs';
import HeightPrefs from './preferences/HeightPrefs';
import LifestylePrefs from './preferences/LifestylePrefs';

const Filter: React.FC<FilterProps> = ({ setShowFilters }) => {
  const saveFilters = () => {
    // save filters to database in
    // user model
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
          <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Filter Users
            </h3>
          </div>

          {/* <!-- Modal body --> */}
          <form className="flex flex-col justify-center gap-4 w-full border items-start px-8 md:px-14">
            {/* nationality preferences */}
            <CountriesPrefs />

            {/* sex preferences */}
            <SexPrefs />

            {/* age preferences */}
            <AgePrefs />

            {/* height preferences */}
            <HeightPrefs />

            {/* lifestyle preferences */}
            <LifestylePrefs />
          </form>

          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
