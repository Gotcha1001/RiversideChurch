import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider } from '../utils/firebase'; // Ensure this is the correct path
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home page after successful login
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Incorrect email or password. Please try again or register.');
      } else {
        alert('Error logging in user: Please check your password ');
      }
    }
  };
  
  


  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setEmail(''); // Clear email field
      setPassword(''); // Clear password field
      setErrorMessage(''); // Clear error message
      setUser(null); // Reset user state
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Clear form fields when the user state changes
    setEmail('');
    setPassword('');
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black via-red-500 to-yellow-600">
      {user ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">Welcome, {user.email}</h2>
          <button
            className="px-6 py-3 text-lg text-teal-100 rounded-sm bg-teal-500 hover:bg-teal-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="login-form p-8 rounded-lg shadow-lg text-center max-w-md w-full bg-black">
          <h2 className="mb-6 text-2xl font-bold text-white">Login</h2>
          {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}
          <form onSubmit={handleLogin} autoComplete="new-password">
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="new-password" // Disable browser autocomplete
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                value={password} // Bind value to state
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password" // Disable browser autocomplete
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-gray-900"
            >
              Sign In
            </button>
          </form>
          <button
            type="button"
            className="w-full py-2 px-4 bg-gray-700 text-white rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-gray-900 mt-4"
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
