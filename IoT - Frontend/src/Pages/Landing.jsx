import { useState } from 'react';
import Arduino3D from '../Components/Arduino3D';
import AuthModal from '../Components/AuthModal';

export default function Landing() {
  const [modal, setModal] = useState(null);

  return (
    <div className='min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col'>
      {/* Floating Navigation */}
      <div className='fixed top-6 left-1/2 -translate-x-1/2 z-40'>
        <div className='flex items-center gap-8 bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-3 rounded-full shadow-lg'>
          <span className='font-semibold'>IoT Dashboard</span>

          <button
            onClick={() => setModal('login')}
            className='hover:text-blue-400 transition'
          >
            Login
          </button>

          <button
            onClick={() => setModal('register')}
            className='bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-600 transition'
          >
            Register
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className='flex-1 flex items-center justify-center px-6 pt-24'>
        <div className='max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-20'>
          <div className='max-w-xl'>
            <div className='inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-sm mb-5'>
              <span className='w-2 h-2 rounded-full bg-blue-400'></span>
              Demo Mode · Simulated sensor stream
            </div>

            <h1 className='text-5xl md:text-6xl font-bold mb-6 leading-tight'>
              IoT Dashboard for Simulated Sensor Monitoring
            </h1>

            <p className='text-gray-300 text-lg mb-8'>
              Monitors simulated Arduino sensor data in real time through modern
              dashboard with authentication, PostgreSQL base and live graphs.
            </p>

            <div className='flex gap-4 mb-6'>
              <button
                onClick={() => setModal('register')}
                className='bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium'
              >
                Get Started
              </button>

              <button
                onClick={() => setModal('login')}
                className='border border-gray-500 px-6 py-3 rounded-lg hover:border-white hover:bg-white/5 transition'
              >
                Login
              </button>
            </div>

            <p className='text-sm text-gray-400'>
              Built with React, Node.js, Express, PostgreSQL, JWT and Recharts.
            </p>
          </div>

          <div className='w-112.5 h-80'>
            <Arduino3D />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className='py-20 px-6'>
        <h2 className='text-3xl font-bold text-center mb-16'>Features</h2>

        <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'>
            <h3 className='text-xl font-semibold mb-3'>Live Monitoring</h3>
            <p className='text-gray-400'>
              The simulated sensor stream is refreshed periodically and
              displayed in the real time per user.
            </p>
          </div>

          <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'>
            <h3 className='text-xl font-semibold mb-3'>Data Visualization</h3>
            <p className='text-gray-400'>
              The dashboard displays the history of temperature, humidity and
              light throughout overview charts.
            </p>
          </div>

          <div className='bg-gray-800 border border-gray-700 rounded-xl p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'>
            <h3 className='text-xl font-semibold mb-3'>Secure Access</h3>
            <p className='text-gray-400'>
              JWT authentication and secure routes allow each user see only your
              data.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='border-t border-gray-800 text-center py-6 text-gray-400'>
        © 2026 IoT Dashboard · Simulated data for demonstration purposes.
      </footer>

      <AuthModal type={modal} onClose={() => setModal(null)} />
    </div>
  );
}
