import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Countries from './Countries';

import React from 'react';
import { SettingsProps } from '../../types/settingsProps';

const PersonalInfo: React.FC<SettingsProps> = ({ handleChange, formData }) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div className="col-span-full">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Let potential matches get to know you
        </p>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="profileImg"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Photo
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <UserCircleIcon
            className="h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <input
            type="file"
            id="profileImg"
            name="profileImg"
            className="text-sm font-semibold text-indigo-600 relative block w-full min-w-0 flex-auto rounded-lg border-solid bg-transparent border bg-clip-padding px-3 py-[0.32rem] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-gray-4 file:border-solid file:border-inherit file:bg-gray-4 file:cursor-pointer file:px-3 file:py-[0.32rem] file:font-normal file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-3 focus: focus:outline-none"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Cover photo
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="coverImg"
                className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="coverImg"
                  name="coverImg"
                  type="file"
                  className="sr-only"
                  onChange={handleChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          About
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="about"
            value={formData.about}
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Write a few sentences about yourself.
        </p>
      </div>

      <Countries handleChange={handleChange} formData={formData} />

      <div className="sm:col-span-2 sm:col-start-1">
        <label
          htmlFor="sex"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Sex
        </label>
        <div className="mt-2">
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 capitalize"
            onChange={handleChange}
          >
            <option value="null">Select an option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="height"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Height
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="height"
            id="height"
            value={formData.height}
            placeholder="e.g. 5 ft 10 in"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="age"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Age
        </label>
        {formData.age ? (
          <div className="mt-2">
            <input
              type="number"
              name="age"
              value={formData.age}
              id="age"
              min="18"
              max="90"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
          </div>
        ) : (
          <div className="mt-2">
            <input
              type="number"
              name="age"
              id="age"
              min="18"
              max="90"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
