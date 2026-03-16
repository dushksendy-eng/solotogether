import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/signup', form)
      login(res.data.token, res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '40px', background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ marginBottom: '24px', color: '#0a3d62', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Create Account</span>
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>✈️</span>
        </h1>
        {error && <p style={{ color: '#dc2626', marginBottom: '16px', background: '#fee2e2', padding: '10px', borderRadius: '8px', fontSize: '0.9rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required
              style={{ width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Password</label>
            <div style={{ position: 'relative', zIndex: 0 }}>
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required
                style={{ width: '100%', padding: '12px', paddingRight: '48px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', zIndex: 1 }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '14px', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: '700', boxSizing: 'border-box' }}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#0369a1' }}>
          Have an account? <Link to="/login" style={{ color: '#0284c7', fontWeight: '700' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}