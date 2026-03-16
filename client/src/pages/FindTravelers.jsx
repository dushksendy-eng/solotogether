import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function FindTravelers() {
  const [matches, setMatches] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/match')
      .then(r => { setMatches(r.data.matches); setMessage(r.data.message || '') })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', color: '#bae6fd', fontSize: '1.1rem' }}>
      🌊 Finding your matches...
    </div>
  )

  return (
    <div style={{ maxWidth: '860px', margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginBottom: '4px' }}>Find Travelers 🌍</h1>
      <p style={{ color: '#bae6fd', marginBottom: '32px' }}>Matched by destination, dates & interests</p>

      {message && (
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#bae6fd', backdropFilter: 'blur(10px)' }}>
          {message}
        </div>
      )}
      {matches.length === 0 && !message && (
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#bae6fd' }}>
          No matches yet. Create more travel plans!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {matches.map((m, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.95)', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #0a3d62)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: '800', color: 'white' }}>
                  {m.matchedUser.name.charAt(0)}
                </div>
                <div>
                  <p style={{ fontWeight: '700', color: '#0a3d62' }}>{m.matchedUser.name}</p>
                  <p style={{ fontSize: '0.8rem', color: '#0369a1' }}>{m.matchedUser.nationality || 'Traveler'}</p>
                </div>
              </div>
              <span style={{ background: m.score >= 70 ? '#dcfce7' : '#fef9c3', color: m.score >= 70 ? '#16a34a' : '#ca8a04', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', height: 'fit-content' }}>
                {m.score}% Match
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '6px' }}>
  📍 {m.matchedPlan.destination}
</p>
<p style={{ fontSize: '0.85rem', color: '#0369a1', marginBottom: '10px' }}>
  ✉️ {m.matchedUser.email}
</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {m.sharedInterests.map(i => (
                <span key={i} style={{ background: '#e0f2fe', color: '#0284c7', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>#{i}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}