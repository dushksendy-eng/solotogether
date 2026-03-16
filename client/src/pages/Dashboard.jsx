import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const INTERESTS = ['food', 'nature', 'art', 'nightlife', 'adventure', 'culture', 'shopping', 'photography']
const card = { background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)' }
const label = { display: 'block', marginBottom: '6px', fontWeight: '600', color: '#0a3d62' }
const input = { width: '100%', padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', fontSize: '0.95rem', boxSizing: 'border-box', color: '#0a3d62', background: '#f0f9ff' }

export default function Dashboard() {
  const { user } = useAuth()
  const [plans, setPlans] = useState([])
  const [editingPlan, setEditingPlan] = useState(null)

  useEffect(() => {
    api.get('/plans/mine').then(r => setPlans(r.data)).catch(console.error)
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this plan?')) return
    try {
      await api.delete(`/plans/${id}`)
      setPlans(prev => prev.filter(p => p._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting plan')
    }
  }

  const handleEditChange = e => setEditingPlan({ ...editingPlan, [e.target.name]: e.target.value })

  const toggleEditInterest = (i) => {
    setEditingPlan(p => ({
      ...p, interests: p.interests.includes(i)
        ? p.interests.filter(x => x !== i)
        : [...p.interests, i]
    }))
  }

  const handleEditSave = async () => {
    try {
      await api.put(`/plans/${editingPlan._id}`, editingPlan)
      setPlans(prev => prev.map(p => p._id === editingPlan._id ? editingPlan : p))
      setEditingPlan(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating plan')
    }
  }

  return (
    <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '4px' }}>Welcome, {user?.name}! 👋</h1>
        <p style={{ color: '#bae6fd' }}>Manage your travel plans here</p>
      </div>

      {/* EDIT MODAL */}
      {editingPlan && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', width: '100%', maxWidth: '520px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h3 style={{ color: '#0a3d62', marginBottom: '20px', fontSize: '1.2rem', fontWeight: '700' }}>Edit Travel Plan ✈️</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={label}>City</label>
                <input name="destination" value={editingPlan.destination} onChange={handleEditChange} style={input} />
              </div>
              <div>
                <label style={label}>Country</label>
                <input name="country" value={editingPlan.country} onChange={handleEditChange} style={input} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={label}>Start Date</label>
                <input type="date" name="startDate" value={editingPlan.startDate?.split('T')[0]} onChange={handleEditChange} style={input} />
              </div>
              <div>
                <label style={label}>End Date</label>
                <input type="date" name="endDate" value={editingPlan.endDate?.split('T')[0]} onChange={handleEditChange} style={input} />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={label}>Interests</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {INTERESTS.map(i => (
                  <button type="button" key={i} onClick={() => toggleEditInterest(i)} style={{
                    padding: '6px 14px', borderRadius: '20px', border: '1px solid', cursor: 'pointer', fontSize: '0.8rem',
                    background: editingPlan.interests.includes(i) ? '#0284c7' : 'white',
                    color: editingPlan.interests.includes(i) ? 'white' : '#0a3d62',
                    borderColor: editingPlan.interests.includes(i) ? '#0284c7' : '#bae6fd'
                  }}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handleEditSave} style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '10px', cursor: 'pointer', flex: 1, fontWeight: '700' }}>
                Save Changes
              </button>
              <button onClick={() => setEditingPlan(null)} style={{ background: '#f3f4f6', color: '#666', padding: '12px 24px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: 'white', fontWeight: '700', fontSize: '1.3rem' }}>My Travel Plans ✈️</h2>
        <Link to="/create-plan" style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '10px 22px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem' }}>
          + New Plan
        </Link>
      </div>

      {plans.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '1.1rem', color: '#0369a1', marginBottom: '12px' }}>No travel plans yet!</p>
          <Link to="/create-plan" style={{ color: '#0284c7', fontWeight: '700' }}>Create your first plan →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {plans.map(plan => (
            <div key={plan._id} style={card}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '6px', color: '#0a3d62', fontWeight: '700' }}>📍 {plan.destination}, {plan.country}</h3>
              <p style={{ color: '#0369a1', marginBottom: '12px', fontSize: '0.9rem' }}>
                {new Date(plan.startDate).toLocaleDateString()} — {new Date(plan.endDate).toLocaleDateString()}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {plan.interests.map(i => (
                    <span key={i} style={{ background: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                      #{i}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setEditingPlan(plan)} style={{ background: '#fef9c3', color: '#ca8a04', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(plan._id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}