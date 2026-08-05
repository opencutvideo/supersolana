import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Wallet, Mail, Eye, EyeOff, AlertCircle, ExternalLink } from 'lucide-react'
import Logo from '../components/Logo'
import { useWallet } from '../context/WalletContext'

export default function Login() {
  const { session, isConnecting, connectMetamask, connectPhantom, connectEmail, error } = useWallet()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'wallet' | 'email'>('wallet')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (session) navigate('/dashboard')
  }, [session, navigate])

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!email || !password) { setFormError('Please fill in all fields.'); return }
    if (password.length < 6) { setFormError('Password must be at least 6 characters.'); return }
    await connectEmail(email, password)
  }

  const displayError = error || formError

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={40} />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Sign in to SuperSolana</h1>
          <p className="text-sm text-[#666680] mt-2">Connect your wallet or use email to get started</p>
        </div>

        <div className="card rounded-2xl overflow-hidden">
          {/* Tab switcher */}
          <div className="grid grid-cols-2 border-b border-[#1E1E2E]">
            {([['wallet', 'Wallet'], ['email', 'Email']] as const).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-3.5 text-sm font-medium font-display transition-all ${
                  tab === t
                    ? 'text-white border-b-2 border-[#9945FF] bg-[#9945FF]/5'
                    : 'text-[#555570] hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 mb-5"
              >
                <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-xs text-red-300 leading-relaxed">{displayError}</p>
              </motion.div>
            )}

            {tab === 'wallet' ? (
              <div className="space-y-3">
                <p className="text-xs text-[#555570] mb-5 text-center">
                  Connect your crypto wallet. No passwords. Your signature is your identity.
                </p>

                {/* Phantom */}
                <button
                  onClick={connectPhantom}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#1E1E2E] bg-[#0D0D16] hover:border-[#9945FF]/40 hover:bg-[#9945FF]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#551BF9] to-[#AB9FF2] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="50" fill="url(#ph)"/>
                      <defs>
                        <radialGradient id="ph" cx="50%" cy="50%">
                          <stop offset="0%" stopColor="#551BF9"/>
                          <stop offset="100%" stopColor="#9945FF"/>
                        </radialGradient>
                      </defs>
                      <path d="M28 38h44c4 0 7 3 7 7s-3 7-7 7H52c-4 0-7 3-7 7s3 7 7 7h8" stroke="#fff" strokeWidth="7" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-display font-semibold text-sm text-white">Phantom</div>
                    <div className="text-xs text-[#555570]">Solana native wallet</div>
                  </div>
                  {isConnecting ? (
                    <div className="w-4 h-4 border-2 border-[#9945FF] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ExternalLink size={14} className="text-[#444460]" />
                  )}
                </button>

                {/* MetaMask */}
                <button
                  onClick={connectMetamask}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#1E1E2E] bg-[#0D0D16] hover:border-[#F6851B]/40 hover:bg-[#F6851B]/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F6851B] to-[#E2761B] flex items-center justify-center shrink-0">
                    <Wallet size={18} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-display font-semibold text-sm text-white">MetaMask</div>
                    <div className="text-xs text-[#555570]">Ethereum compatible wallet</div>
                  </div>
                  {isConnecting ? (
                    <div className="w-4 h-4 border-2 border-[#F6851B] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ExternalLink size={14} className="text-[#444460]" />
                  )}
                </button>

                <p className="text-xs text-[#444460] text-center pt-3">
                  No wallet?{' '}
                  <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-[#9945FF] hover:underline">
                    Get Phantom
                  </a>{' '}
                  or{' '}
                  <button onClick={() => setTab('email')} className="text-[#9945FF] hover:underline">
                    use email
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#8888AA] mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444460]" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D0D16] border border-[#1E1E2E] text-white text-sm placeholder:text-[#444460] focus:outline-none focus:border-[#9945FF]/60 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8888AA] mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#0D0D16] border border-[#1E1E2E] text-white text-sm placeholder:text-[#444460] focus:outline-none focus:border-[#9945FF]/60 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#444460] hover:text-white transition-colors"
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="w-full py-3 rounded-xl btn-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : 'Sign in'}
                </button>
                <p className="text-xs text-[#444460] text-center">
                  For best experience,{' '}
                  <button type="button" onClick={() => setTab('wallet')} className="text-[#9945FF] hover:underline">
                    connect a wallet
                  </button>{' '}
                  instead.
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#444460] mt-6">
          By connecting, you agree to our{' '}
          <Link to="/cookies" className="text-[#9945FF] hover:underline">Cookie Policy</Link>
          . We never store private keys.
        </p>
      </motion.div>
    </div>
  )
}
