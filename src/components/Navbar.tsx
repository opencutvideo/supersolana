import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import Logo from './Logo'
import { useWallet } from '../context/WalletContext'

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-to' },
  { label: 'Demo', to: '/demo' },
  { label: 'Roadmap', to: '/roadmap' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { session, disconnect } = useWallet()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    document.body.classList.remove('mobile-nav-open')
  }, [location.pathname])

  const toggleMenu = () => {
    setOpen(p => {
      document.body.classList.toggle('mobile-nav-open', !p)
      return !p
    })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#1E1E2E]' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo size={30} />
          <span className="font-display font-700 text-lg text-white tracking-tight group-hover:text-solana-purple transition-colors">
            Super<span className="gradient-text">Solana</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-[#9945FF] bg-[#9945FF]/10'
                  : 'text-[#8888AA] hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[#14F195] border border-[#14F195]/30 hover:bg-[#14F195]/10 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                {session.username}
              </button>
              <button
                onClick={disconnect}
                className="text-xs text-[#555570] hover:text-white transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-[#8888AA] hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/demo"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg btn-primary text-sm"
              >
                <Zap size={14} />
                Try Demo
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-[#8888AA] hover:text-white hover:bg-white/5 transition-all"
          onClick={toggleMenu}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0D0D16]/98 backdrop-blur-xl border-b border-[#1E1E2E] px-4 pb-6">
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-[#9945FF] bg-[#9945FF]/10'
                    : 'text-[#AAAACC] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {session ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full px-4 py-3 rounded-lg text-sm font-medium text-[#14F195] border border-[#14F195]/30 text-center"
                  >
                    Dashboard — {session.username}
                  </button>
                  <button onClick={disconnect} className="text-xs text-[#555570] text-center">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full px-4 py-3 rounded-lg text-sm font-medium text-center btn-outline">
                    Sign in
                  </Link>
                  <Link to="/demo" className="w-full px-4 py-3 rounded-lg btn-primary text-sm text-center">
                    Try Demo
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
