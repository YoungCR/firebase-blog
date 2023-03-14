import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Header() {
  // create array with topics
  const categories = ['Health', 'Food', 'Travel', 'Technology'];

  return (
    <div className="flex h-14 items-center justify-between bg-blue-100 py-5">
      <FaHome />
      <div className="flex items-center justify-evenly">
        {categories.map((item) => (
          <Link to={`/category/${item}`} className="ml-2.5" key={item}>
            {item}
          </Link>
        ))}
      </div>
      <button
        className="rounded-full bg-indigo-600 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        type="button"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Header;
