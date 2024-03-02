import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/userContextType';
import { useNavigate } from 'react-router-dom';
import { LoginFormData } from '../types/loginFormData';
import axios from 'axios';
import { auth_api_path } from '../api/auth';
import { Link } from 'react-router-dom';

function Login() {
  const { setCurrUser } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // send to server
      const res = await axios.post(`${auth_api_path}login`, formData);

      if (res.data) {
        // set registered user as current user
        setCurrUser(res.data);
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
            <div className="border-gray-900/10">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Welcome Back
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-900">
                Log back in to continue chatting!
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
          </div>
        </div>

        <div className="mt-6 flex flex-col items-end justify-end gap-x-6 pb-20">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
          <div>
            <p className="mt-1 text-sm leading-6 text-gray-900">
              Don't have an account? Create one{' '}
              <Link to="/register">
                <span className="text-indigo-600 hover:font-semibold">
                  here
                </span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
