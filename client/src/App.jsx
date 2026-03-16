import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreatePlan from './pages/CreatePlan'
import FindTravelers from './pages/FindTravelers'
import ActivityPosts from './pages/ActivityPosts'
import PostDetail from './pages/PostDetail'
import Profile from './pages/Profile'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>
  return user ? children : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/signup"      element={<Signup />} />
        <Route path="/posts"       element={<ActivityPosts />} />
        <Route path="/posts/:id"   element={<PostDetail />} />
        <Route path="/dashboard"   element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create-plan" element={<PrivateRoute><CreatePlan /></PrivateRoute>} />
        <Route path="/find"        element={<PrivateRoute><FindTravelers /></PrivateRoute>} />
        <Route path="/profile"     element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}