import React from 'react';
import { SettingsProps } from '../../types/settingsProps';

const Lifestyle: React.FC<SettingsProps> = ({ handleChange, formData }) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Lifestyle
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Let them know a bit more about your habits
      </p>

      <div className="mt-10 space-y-10">
        <fieldset>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            I...
          </legend>
          <div className="mt-6 space-y-6">
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="smoke"
                  name="smoke"
                  checked={formData.smoke}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleChange}
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="smoke" className="font-medium text-gray-900">
                  Smoke
                </label>
              </div>
            </div>
            <div className="relative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  id="drink"
                  name="drink"
                  checked={formData.drink}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
        </fieldset>
      </div>
    </div>
  );
};

export default Lifestyle;
