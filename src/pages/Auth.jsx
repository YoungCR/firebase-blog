import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';

function Auth() {
  // activate useNavigate
  const navigate = useNavigate();
  // create state to control which form to show
  const [existingUser, setExisitingUser] = useState(false);
  // create state for user information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('signup');
    // call function to create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        // add username as display name
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        // navigate to homepage after form submit
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // login
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        alert(err.com);
      });
  };

  return (
    <div className="">
      {existingUser ? (
        <form
          onSubmit={handleLogin}
          className="m-auto flex w-2/5 flex-col items-center justify-between rounded-2xl bg-white p-5 shadow-xl"
        >
          <h1>Login with your email</h1>
          <div className="flex flex-col items-center justify-between">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{' '}
            <span className="form-link" onClick={() => setExisitingUser(false)}>
              Signup
            </span>
          </p>
        </form>
      ) : (
        <form
          onSubmit={handleSignup}
          className="m-auto flex w-2/5 flex-col items-center justify-between rounded-2xl bg-white p-5 shadow-xl"
        >
          <h1>Signup with your email</h1>
          <div className="flex flex-col items-center justify-between">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              required
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?{' '}
            <span className="form-link" onClick={() => setExisitingUser(true)}>
              Login
            </span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
