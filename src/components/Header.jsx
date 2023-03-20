import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

function Header() {
  const navigate = useNavigate();
  // create array with topics
  const categories = ['Health', 'Food', 'Travel', 'Technology'];

  // get user data
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <div className="flex h-14 items-center justify-between bg-blue-100 py-5">
      <FaHome onClick={() => navigate('/')} />
      <div className="flex items-center justify-evenly">
        {categories.map((item) => (
          <Link to={`/category/${item}`} className="ml-2.5" key={item}>
            {item}
          </Link>
        ))}
      </div>
      {user ? (
        <div>
          <span>{user.displayName}</span>
          <button onClick={() => signOut(auth)} type="button">
            Logout
          </button>
        </div>
      ) : (
        <Link
          className="rounded-full bg-indigo-600 py-1.5 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to="/auth"
        >
          Sign In
        </Link>
      )}
    </div>
  );
}

export default Header;
