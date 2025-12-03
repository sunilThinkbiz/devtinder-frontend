import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout

