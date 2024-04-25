import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/userContextType';
import { useNavigate } from 'react-router-dom';
import Lifestyle from '../components/settings/Lifestyle';
import PersonalInfo from '../components/settings/PersonalInfo';
import FoodPreferences from '../components/settings/FoodPreferences';
import { FormData } from '../types/formData';
import axios from 'axios';
import { user_api_path } from '../api/user';
import { updateUserForm } from '../utils/updateUserForm';
import WarningToast from '../components/toast/WarningToast';

function Settings() {
  const { currUser, setCurrUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: currUser ? currUser.profile.firstName : '',
    lastName: currUser ? currUser.profile.lastName : '',
    email: currUser ? currUser.email : '',
    password: '',
    profileImg: null,
    coverImg: null,
    about: currUser ? currUser.profile.about : '',
    nationality: currUser ? currUser.profile.nationality : '',
    sex: currUser ? currUser.profile.sex : '',
    height_ft: currUser ? currUser.profile.height_ft : null,
    height_in: currUser ? currUser.profile.height_in : null,
    age: currUser ? currUser.profile.age : null,
    smoke: currUser ? currUser.profile.smoke : false,
    drink: currUser ? currUser.profile.drink : false,
    restaurantLocation: currUser ? currUser.profile.restaurantLocation : '',
    foodCategories: currUser ? currUser.profile.foodCategories : [],
    restaurantAttributes: currUser ? currUser.profile.restaurantAttributes : [],
    pricePoint: currUser ? currUser.profile.pricePoint : [],
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

  // get all food categories user selected
  const handleCategoriesChange = (categories: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      foodCategories: categories,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.foodCategories.length) {
      setShowToast(true);
      return;
    }

    // modifying formData to match user model
    const submitData = await updateUserForm(formData);

    try {
      setShowToast(false);

      // send to server
      const res = await axios.patch(
        `${user_api_path}/${currUser?._id}`,
        submitData,
        {
          withCredentials: true,
        },
      );

      if (res.data) {
        // set updated user as current user
        setCurrUser(res.data);

        // set local storage
        localStorage.setItem('user', JSON.stringify(res.data));
      }
      // go to home
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full w-full flex items-center overflow-y-auto py-20 px-52">
      <form className="h-full w-full" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Account Settings
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
                      value={formData.firstName}
                      // placeholder="Jane"
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
                      value={formData.lastName}
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
                      value={formData.email}
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <PersonalInfo handleChange={handleChange} formData={formData} />
          </div>

          {/* LIFESTYLE */}
          <Lifestyle handleChange={handleChange} formData={formData} />

          {/* FOOD PREFERENCES */}
          <FoodPreferences
            handleChange={handleChange}
            formData={formData}
            handleCategoriesChange={handleCategoriesChange}
          />
        </div>

        <div className="mt-6 flex items-end justify-end gap-x-6 pb-20">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-indigo-600 border border-gray-100 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
        </div>
      </form>

      {showToast && (
        <WarningToast
          message="Food category is required"
          setShowToast={setShowToast}
        />
      )}
    </div>
  );
}

export default Settings;
