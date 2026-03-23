import { useState, useEffect } from 'react';
import Login from '../Pages/Login';
import Register from '../Pages/Register';

function AuthModalContent({ type, onClose }) {
  const [tab, setTab] = useState(type || 'login');
  const [registerMessage, setRegisterMessage] = useState('');

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4'
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 animate-[fadeIn_0.25s_ease]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className='absolute top-1 right-1 text-gray-400 hover:text-white transition text-lg'
        >
          ✕
        </button>

        {/* TABS */}
        <div className='flex mb-8 bg-gray-800 rounded-lg p-1'>
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              tab === 'login'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setTab('register');
              setRegisterMessage('');
            }}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              tab === 'register'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        {registerMessage && tab === 'login' && (
          <div className='mb-4 rounded-lg border border-green-500/20 bg-green-500/10 text-green-300 px-4 py-3 text-sm text-center'>
            {registerMessage}
          </div>
        )}

        {/* FORM AREA */}
        <div className='w-full'>
          {tab === 'login' && <Login isModal onSuccess={onClose} />}

          {tab === 'register' && (
            <Register
              isModal
              onRegisterSuccess={() => {
                setRegisterMessage('Registration successful. Please login.');
                setTab('login');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthModal({ type, onClose }) {
  if (!type) return null;

  return <AuthModalContent key={type} type={type} onClose={onClose} />;
}
