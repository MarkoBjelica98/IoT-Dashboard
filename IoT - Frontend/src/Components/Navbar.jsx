import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <Link to='/'>Home</Link> {!token && <Link to='/login'>Login</Link>}{' '}
      {!token && <Link to='/register'>Register</Link>}
      {token && <Link to='/dashboard'>Dashboard</Link>}
      {token && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
