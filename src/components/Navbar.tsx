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
    document.body.style.overflow = ''
  }, [location.pathname])

  const toggleMenu = () => {
    setOpen(p => {
      document.body.style.overflow = p ? '' : 'hidden'
      return !p
    })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-[#1A1A1A]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group z-10">
            <Logo size={28} />
            <span className="font-display font-bold text-base text-white tracking-tight">
              Super<span className="gradient-text">Solana</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-[#FF3399] bg-[#FF3399]/10'
                    : 'text-[#666] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[#00FF41] border border-[#00FF41]/25 hover:bg-[#00FF41]/8 transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse shrink-0" />
                  {session.username}
                </button>
                <button
                  onClick={disconnect}
                  className="text-xs text-[#333] hover:text-[#666] transition-colors duration-200"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#555] hover:text-white transition-colors duration-200 px-2 py-1"
                >
                  Sign in
                </Link>
                <Link
                  to="/demo"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg btn-primary text-sm"
                >
                  <Zap size={13} />
                  Try Demo
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden relative z-10 p-2 rounded-lg text-[#555] hover:text-white hover:bg-white/5 transition-all duration-200"
            onClick={toggleMenu}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-xl"
          onClick={() => {
            setOpen(false)
            document.body.style.overflow = ''
          }}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          open ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[#0D0D0D]/98 backdrop-blur-xl border-b border-[#1A1A1A] px-4 pt-2 pb-6">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-[#FF3399] bg-[#FF3399]/10'
                    : 'text-[#888] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#111] flex flex-col gap-2.5">
            {session ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-medium text-[#00FF41] border border-[#00FF41]/25"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                  Dashboard: {session.username}
                </button>
                <button
                  onClick={() => { disconnect(); setOpen(false); document.body.style.overflow = '' }}
                  className="text-sm text-[#444] text-center py-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/demo"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl btn-primary text-sm font-semibold"
                >
                  <Zap size={14} />
                  Try Demo Free
                </Link>
                <Link
                  to="/login"
                  className="w-full px-4 py-3.5 rounded-xl btn-outline text-sm text-center"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
