import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🌍</div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white', marginBottom: '8px', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>SoTo</h1>
      <p style={{ fontSize: '1.2rem', color: '#bae6fd', marginBottom: '8px' }}>SoloTogether</p>
      <p style={{ fontSize: '1rem', color: '#7dd3fc', marginBottom: '40px' }}>Connect with solo travelers who share your destination & interests</p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
        <Link to="/signup" style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', fontSize: '1rem', fontWeight: '700', boxShadow: '0 4px 20px rgba(2,132,199,0.4)' }}>
          Get Started 🚀
        </Link>
        <Link to="/posts" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '14px 36px', borderRadius: '50px', textDecoration: 'none', fontSize: '1rem', fontWeight: '700', backdropFilter: 'blur(10px)' }}>
          Browse Posts 🌊
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '800px', width: '100%' }}>
        {[
          { icon: '🤝', title: 'Smart Matching' },
          { icon: '📢', title: 'Activity Posts' },
          { icon: '⚡', title: 'Meet Travelers'},
        ].map((f, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{f.icon}</div>
            <h3 style={{ color: 'white', fontWeight: '700', marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ color: '#bae6fd', fontSize: '0.85rem' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}