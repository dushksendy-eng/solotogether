import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const INTERESTS = ['food', 'nature', 'art', 'nightlife', 'adventure', 'culture', 'shopping', 'photography']

export default function CreatePlan() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ destination: '', country: '', startDate: '', endDate: '', notes: '', interests: [] })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const toggleInterest = (i) => {
    setForm(f => ({
      ...f, interests: f.interests.includes(i)
        ? f.interests.filter(x => x !== i)
        : [...f.interests, i]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/plans', form)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating plan')
    }
  }

  const inputStyle = { width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '0.95rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }

  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Create Travel Plan ✈️</h1>
      <p style={{ color: '#bae6fd', marginBottom: '28px' }}>Tell us where and when you're going!</p>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.95)', padding: '36px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>City</label>
            <input name="destination" value={form.destination} onChange={handleChange} required placeholder="e.g. Paris" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Country</label>
            <input name="country" value={form.country} onChange={handleChange} required placeholder="e.g. France" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>End Date</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Interests</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTERESTS.map(i => (
              <button type="button" key={i} onClick={() => toggleInterest(i)} style={{
                padding: '8px 16px', borderRadius: '20px', border: '1px solid', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600',
                background: form.interests.includes(i) ? '#0284c7' : 'white',
                color: form.interests.includes(i) ? 'white' : '#0a3d62',
                borderColor: form.interests.includes(i) ? '#0284c7' : '#bae6fd'
              }}>
                {i}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Notes (optional)</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
            style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <button type="submit" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '14px', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: '700' }}>
          Save Travel Plan 🌊
        </button>
      </form>
    </div>
  )
}