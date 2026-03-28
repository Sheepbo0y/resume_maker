import React from 'react'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout-root">
      <Header />
      <main className="layout-content">{children}</main>
    </div>
  )
}

export default Layout
