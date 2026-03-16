import { useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user, login, token } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    nationality: user?.nationality || '',
    gender: user?.gender || 'prefer not to say'
  })
  const [saved, setSaved] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.put('/auth/profile', form)
      login(token, res.data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating profile')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '500px', padding: '40px', background: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ marginBottom: '24px', color: '#0a3d62', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>My Profile</span>
          <span style={{ fontSize: '1.5rem' }}>👤</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Nationality</label>
            <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. Korean"
              style={{ width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}
              style={{ width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer not to say">Prefer not to say </option>
            </select>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }}>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3}
              placeholder="Tell other travelers about yourself..."
              style={{ width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '1rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff', resize: 'vertical' }} />
          </div>
          <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '14px', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: '700' }}>
            {saved ? '✅ Saved!' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}