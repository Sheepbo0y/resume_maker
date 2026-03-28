import React from 'react'

const Signup: React.FC = () => {
  return (
    <section className="page signup">
      <h2>Signup</h2>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button type="submit">Signup</button>
      </form>
    </section>
  )
}

export default Signup
