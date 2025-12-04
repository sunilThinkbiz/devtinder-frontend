import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] w-full px-4">
      <div className="card bg-white w-96 shadow-2xl border border-gray-100">
        <div className="card-body">
          <h2 className="card-title text-gray-800">Create account</h2>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="First Name"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-4">
              <input
                type="text"
                className="grow"
                placeholder="Email"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-4">
              <input
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>
          </div>
          <div className="mt-4">
            <button
              className="btn w-full bg-pink-500 text-white border-none hover:bg-pink-600 shadow-md hover:shadow-lg transition-all"
            >
              SignUp
            </button>
          </div>
          <div className="flex flex-row justify-evenly mt-4">
            <Link to="/login" className="text-sm text-pink-500 hover:text-pink-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup