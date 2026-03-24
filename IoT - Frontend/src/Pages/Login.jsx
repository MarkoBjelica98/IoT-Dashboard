import { useState } from 'react';
// import axios from 'axios';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.post('/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);

      if (onSuccess) onSuccess();

      navigate('/dashboard');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed');
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
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
