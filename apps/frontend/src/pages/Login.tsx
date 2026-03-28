import React from 'react'

const Login: React.FC = () => {
  return (
    <section className="page login">
      <h2>Login</h2>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Login</button>
      </form>
    </section>
  )
}

export default Login
