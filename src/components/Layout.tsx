import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { updateSeo } from '../lib/seo'

export default function Layout() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  useEffect(() => {
    updateSeo(location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      {!isDashboard && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}
