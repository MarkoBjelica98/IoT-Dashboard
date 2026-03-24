import { useState } from 'react';
import api from '../Services/api';
// import axios from 'axios';

export default function Register({ onRegisterSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      console.log('BASE URL:', api.defaults.baseURL);
      console.log('ENV URL:', import.meta.env.VITE_API_URL);

      await api.post('/api/auth/register', {
        email,
        password,
      });

      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Register failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500'
      />

      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500'
      />

      {errorMessage && (
        <div className='rounded-lg border border-red-500/20 bg-red-500/10 text-red-300 px-4 py-3 text-sm text-center'>
          {errorMessage}
        </div>
      )}

      <button
        type='submit'
        disabled={loading}
        className='w-full mt-2 bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-60'
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
