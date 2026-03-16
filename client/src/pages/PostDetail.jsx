import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    api.get(`/posts/${id}`).then(r => setPost(r.data))
    api.get(`/comments/${id}`).then(r => setComments(r.data))
  }, [id])

  const submitComment = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/comments/${id}`, { content })
      setComments(prev => [...prev, res.data])
      setContent('')
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting comment')
    }
  }

  if (!post) return <div style={{ textAlign: 'center', padding: '100px', color: '#bae6fd' }}>Loading... 🌊</div>

  return (
    <div style={{ maxWidth: '720px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '32px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0a3d62', marginBottom: '8px' }}>{post.title}</h1>
        <p style={{ color: '#0369a1', marginBottom: '16px' }}>📍 {post.location} · {new Date(post.date).toLocaleDateString()}</p>
        <p style={{ color: '#0a3d62', lineHeight: '1.7', marginBottom: '16px' }}>{post.description}</p>
        <p style={{ color: '#0369a1', fontSize: '0.85rem' }}>Posted by <strong>{post.author?.name}</strong></p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.95)', padding: '32px', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#0a3d62', fontWeight: '700', marginBottom: '20px' }}>💬 Comments ({comments.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {comments.map(c => (
            <div key={c._id} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #0a3d62)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white', flexShrink: 0, fontSize: '0.9rem' }}>
                {c.author?.name?.charAt(0)}
              </div>
              <div style={{ background: '#f0f9ff', padding: '12px 16px', borderRadius: '12px', flex: 1, border: '1px solid #bae6fd' }}>
                <p style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '4px', color: '#0a3d62' }}>{c.author?.name}</p>
                <p style={{ color: '#0369a1', fontSize: '0.9rem' }}>{c.content}</p>
              </div>
            </div>
          ))}
        </div>
        {user && (
          <form onSubmit={submitComment} style={{ display: 'flex', gap: '12px' }}>
            <input value={content} onChange={e => setContent(e.target.value)} placeholder="Write a comment..." required
              style={{ flex: 1, padding: '12px', border: '1px solid #bae6fd', borderRadius: '10px', color: '#0a3d62', background: '#f0f9ff', fontSize: '0.95rem' }} />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7, #0a3d62)', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  )
}