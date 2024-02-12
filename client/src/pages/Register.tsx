import PersonalInfo from '../components/register/PersonalInfo';
import Lifestyle from '../components/register/Lifestyle';
import FoodPreferences from '../components/register/FoodPreferences';
import { FormData } from '../types/formData';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImg: '',
    coverImg: '',
    about: '',
    nationality: '',
    sex: '',
    height: '',
    age: null,
    smoke: false,
    drink: false,
    restaurantLocation: '',
    foodCategory: '',
    restaurantAttributes: [],
    pricePoint: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    switch (type) {
      case 'checkbox':
        setFormData((prevData) => ({
          ...prevData,
          [name]: (e.target as HTMLInputElement).checked ?? false,
        }));
        break;
      case 'file':
        // store the file itself
        setFormData((prevData) => ({
          ...prevData,
          [name]: (e.target as HTMLInputElement).files?.[0] || '',
        }));
        break;
      case 'select-multiple':
        // Handling multiple select inputs
        const selectedOptions = Array.from(
          (e.target as HTMLSelectElement).options,
        )
          .filter((option) => option.selected)
          .map((option) => option.value);
        setFormData((prevData) => ({ ...prevData, [name]: selectedOptions }));
        break;
      case 'number':
        setFormData((prevData) => ({
          ...prevData,
          [name]: value !== '' ? parseInt(value, 10) : null,
        }));
        break;
      default:
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to a server
    console.log(formData);
  };
  return (
    <div className="h-full w-full flex items-center overflow-y-auto py-20 px-52">
      <form className="h-full w-full" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Account Information
              </h2>
              <p className="mt-1 text-sm italic leading-6 text-error">
                Fields marked with an asterisk (*) are required
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name*
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Jane"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name*
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Doe"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address*
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="JaneDoe@example.com"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password*
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••••••••"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <PersonalInfo handleChange={handleChange} />
          </div>

          {/* LIFESTYLE */}
          <Lifestyle handleChange={handleChange} />

          {/* FOOD PREFERENCES */}
          <FoodPreferences handleChange={handleChange} />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6 pb-20">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Finish Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
