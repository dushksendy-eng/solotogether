import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const typeEmoji = { eat: '🍜', explore: '🗺️', tour: '🏛️', 'day-trip': '🚌', nightlife: '🌙', other: '📌' }
const inputStyle = { width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '0.95rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }

export default function ActivityPosts() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'explore', location: '', date: '', description: '' })

  useEffect(() => {
    api.get('/posts').then(r => setPosts(r.data)).catch(console.error)
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/posts', form)
      setPosts(prev => [res.data, ...prev])
      setShowForm(false)
      setForm({ title: '', type: 'explore', location: '', date: '', description: '' })
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating post')
    }
  }

  return (
    <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '4px' }}>Activity Posts 📢</h1>
          <p style={{ color: '#bae6fd' }}>Find people to explore with!</p>
        </div>
        {user && (
          <button onClick={() => setShowForm(!showForm)} style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>
            + New Post
          </button>
        )}
      </div>

      {showForm && (
        <div style={{ background: 'rgba(255,255,255,0.95)', padding: '28px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', marginBottom: '24px' }}>
          <h3 style={{ color: '#0a3d62', marginBottom: '16px', fontWeight: '700' }}>Create Activity Post 🌊</h3>
          <form onSubmit={handleSubmit}>
            <input name="title" value={form.title} onChange={handleChange} required placeholder="Title e.g. Let's eat together!"
              style={{ ...inputStyle, marginBottom: '12px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
                <option value="eat">🍜 Eat</option>
                <option value="explore">🗺️ Explore</option>
                <option value="tour">🏛️ Tour</option>
                <option value="day-trip">🚌 Day Trip</option>
                <option value="nightlife">🌙 Nightlife</option>
                <option value="other">📌 Other</option>
              </select>
              <input name="location" value={form.location} onChange={handleChange} required placeholder="Location" style={inputStyle} />
              <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle} />
            </div>
            <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Describe your activity..." rows={3}
              style={{ ...inputStyle, marginBottom: '12px', resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>Post</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: '#f3f4f6', color: '#666', padding: '12px 24px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        {posts.map(post => (
          <Link to={`/posts/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(255,255,255,0.95)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', cursor: 'pointer', transition: 'transform 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>{typeEmoji[post.type] || '📌'}</span>
                <span style={{ color: '#0369a1', fontSize: '0.85rem' }}>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h3 style={{ color: '#0a3d62', marginBottom: '8px', fontWeight: '700' }}>{post.title}</h3>
              <p style={{ color: '#0369a1', fontSize: '0.9rem', marginBottom: '12px' }}>{post.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#0369a1', fontSize: '0.85rem' }}>📍 {post.location}</span>
                <span style={{ color: '#0369a1', fontSize: '0.85rem' }}>❤️ {post.likes?.length || 0} · by {post.author?.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}