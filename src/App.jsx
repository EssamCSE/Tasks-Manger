import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskList from './pages/TaskList'
import TaskDetails from './pages/TaskDetails'
import Profile from './pages/Profile'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          !isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />
        } />
        <Route path="/register" element={
          !isAuthenticated ? <Register /> : <Navigate to="/" />
        } />
        <Route path="/" element={
          isAuthenticated ? <Layout /> : <Navigate to="/login" />
        }>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
