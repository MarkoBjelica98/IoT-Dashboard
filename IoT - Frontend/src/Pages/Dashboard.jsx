import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SensorChart from '../Components/SensorChart';

export default function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const token = localStorage.getItem('token');

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token],
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchDashboardData = async () => {
    try {
      const [profileRes, historyRes, latestRes] = await Promise.all([
        axios.get('/api/auth/profile', { headers }),
        axios.get('/api/sensors/history', { headers }),
        axios.get('/api/sensors/latest', { headers }),
      ]);

      setProfile(profileRes.data.user);
      setLatest(latestRes.data.latest);

      const formattedHistory = historyRes.data.history.map((item) => ({
        time: new Date(item.created_at).toLocaleTimeString(),
        temperature: Number(item.temperature),
        humidity: Number(item.humidity),
        light: Number(item.light),
      }));

      setHistory(formattedHistory);
      setLastUpdated(new Date().toLocaleTimeString());
      setDashboardError('');
    } catch (err) {
      console.error('DASHBOARD ERROR:', err);
      setDashboardError('Unable to load dashboard data.');
      localStorage.removeItem('token');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const generateAndRefresh = async () => {
    try {
      await axios.post('/api/sensors/generate', {}, { headers });

      await fetchDashboardData();
    } catch (err) {
      console.error('GENERATE ERROR:', err);
      setDashboardError('Unable to generate new sensor data.');
    }
  };

  const handleGenerateBurst = async () => {
    try {
      for (let i = 0; i < 5; i += 1) {
        await axios.post('/api/sensors/generate', {}, { headers });
      }

      await fetchDashboardData();
    } catch (err) {
      console.error('BURST ERROR:', err);
      setDashboardError('Unable to generate sample burst.');
    }
  };

  const handleClearMyData = async () => {
    try {
      await axios.delete('/api/sensors/all', {
        headers,
      });

      setHistory([]);
      setLatest(null);
      setLastUpdated(new Date().toLocaleTimeString());
      setDashboardError('');
    } catch (err) {
      console.error('CLEAR DATA ERROR:', err);
      setDashboardError('Unable to clear your sensor data.');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    fetchDashboardData();
    generateAndRefresh();

    const interval = setInterval(async () => {
      await generateAndRefresh();
    }, 3000);

    const cleanupInterval = setInterval(async () => {
      try {
        await axios.delete('/api/sensors/cleanup', {
          headers,
        });
      } catch (err) {
        console.error('CLEANUP ERROR:', err);
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [navigate, token]);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 text-white flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-2xl font-semibold mb-2'>
            Loading dashboard...
          </div>
          <p className='text-gray-400'>Fetching your simulated sensor data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 md:p-10'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10'>
        <div>
          <div className='flex items-center gap-3 mb-3'>
            <h1 className='text-4xl font-bold'>IoT Sensor Dashboard</h1>

            <span className='inline-flex items-center gap-2 bg-green-500/15 border border-green-400/20 text-green-300 px-3 py-1 rounded-full text-sm'>
              <span className='w-2 h-2 rounded-full bg-green-400'></span>
              Live
            </span>

            <span className='inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-sm'>
              Demo Mode
            </span>
          </div>

          <p className='text-gray-400'>
            Logged in as: {profile?.email || 'Unknown user'}
          </p>

          <p className='text-gray-500 text-sm mt-1'>
            Last update: {lastUpdated || '—'}
          </p>
        </div>

        <div className='flex flex-wrap gap-3'>
          <button
            onClick={handleGenerateBurst}
            className='bg-blue-500 px-4 py-3 rounded-lg hover:bg-blue-600 transition'
          >
            Generate Sample Burst
          </button>

          <button
            onClick={handleClearMyData}
            className='border border-yellow-500/40 text-yellow-300 px-4 py-3 rounded-lg hover:bg-yellow-500/10 transition'
          >
            Clear My Data
          </button>

          <button
            onClick={handleLogout}
            className='bg-red-500 px-4 py-3 rounded-lg hover:bg-red-600 transition'
          >
            Logout
          </button>
        </div>
      </div>

      {dashboardError && (
        <div className='mb-6 rounded-lg border border-red-500/20 bg-red-500/10 text-red-300 px-4 py-3'>
          {dashboardError}
        </div>
      )}

      {latest ? (
        <div className='grid md:grid-cols-3 gap-6 mb-10'>
          <div className='bg-gray-800 border border-gray-700 rounded-xl p-6'>
            <p className='text-gray-400 mb-2'>Latest Temperature</p>
            <h2 className='text-3xl font-bold'>{latest.temperature} °C</h2>
            <p className='text-sm text-gray-500 mt-2'>
              Current thermal reading
            </p>
          </div>

          <div className='bg-gray-800 border border-gray-700 rounded-xl p-6'>
            <p className='text-gray-400 mb-2'>Latest Humidity</p>
            <h2 className='text-3xl font-bold'>{latest.humidity} %</h2>
            <p className='text-sm text-gray-500 mt-2'>Current moisture level</p>
          </div>

          <div className='bg-gray-800 border border-gray-700 rounded-xl p-6'>
            <p className='text-gray-400 mb-2'>Latest Light</p>
            <h2 className='text-3xl font-bold'>{latest.light}</h2>
            <p className='text-sm text-gray-500 mt-2'>
              Current light intensity
            </p>
          </div>
        </div>
      ) : (
        <div className='mb-10 rounded-xl border border-gray-700 bg-gray-800 p-8 text-center'>
          <h2 className='text-2xl font-semibold mb-2'>No sensor data yet</h2>
          <p className='text-gray-400 mb-4'>
            Generate demo data to start filling the charts.
          </p>
          <button
            onClick={handleGenerateBurst}
            className='bg-blue-500 px-5 py-3 rounded-lg hover:bg-blue-600 transition'
          >
            Generate Data
          </button>
        </div>
      )}

      <div className='grid md:grid-cols-2 gap-8'>
        <SensorChart title='Temperature' dataKey='temperature' data={history} />

        <SensorChart title='Humidity' dataKey='humidity' data={history} />

        <SensorChart title='Light' dataKey='light' data={history} />
      </div>
    </div>
  );
}
