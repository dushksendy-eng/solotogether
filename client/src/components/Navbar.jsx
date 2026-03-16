import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav style={{ background: 'rgba(10, 29, 58, 0.85)', backdropFilter: 'blur(20px)', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(186,230,253,0.15)', position: 'sticky', top: 0, zIndex: 50 }}>
      <Link to="/" style={{ color: 'white', fontSize: '1.4rem', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🌍 <span style={{ color: '#7dd3fc' }}>SoTo</span>
      </Link>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/posts" style={{ color: '#bae6fd', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>Posts</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: '#bae6fd', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>Dashboard</Link>
            <Link to="/find" style={{ color: '#bae6fd', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>Find Travelers</Link>
            <Link to="/create-plan" style={{ color: '#bae6fd', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>+ New Plan</Link>
            <Link to="/profile" style={{ color: '#bae6fd', textDecoration: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>{user.name}</Link>
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link to="/login" style={{ color: '#bae6fd', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(186,230,253,0.3)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>Login</Link>
            <Link to="/signup" style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '8px 18px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '700' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  )
}