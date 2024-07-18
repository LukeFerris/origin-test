

// ["LoginPage", "Component"]    
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './AuthenticationSlice_Store.jsx';

// Default export of LoginPage_Component
export default function LoginPage_Component() {
  const [error, setError] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const authError = useSelector(state => state.authenticationState.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Dispatch login action
    try {
      await dispatch(loginUser({ username, password })).unwrap();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleInputChange = () => {
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to HelloGuardian
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                ref={usernameRef}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your username"
                aria-label="Enter your username"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                aria-label="Enter your password"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {(error || authError) && (
            <div className="text-red-500 text-sm" role="alert">
              {error || authError}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Log in to your account"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}