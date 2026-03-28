import React from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Layout from './components/Layout'
import { StoreProvider } from './stores'

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </StoreProvider>
  )
}

export default App
