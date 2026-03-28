import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <div className="logo">ResumeMaker</div>
        <nav className="nav" aria-label="Main navigation">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/editor">Editor</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
