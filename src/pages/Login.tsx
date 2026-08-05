import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Eye, EyeOff, AlertCircle, ExternalLink, CheckCircle2, Loader2, Send } from 'lucide-react'
import Logo from '../components/Logo'
import { useWallet } from '../context/WalletContext'

const ease = [0.22, 1, 0.36, 1] as const

/* Phantom SVG */
function PhantomIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#9945FF" />
      <path d="M8 20.5C8 14.149 13.149 9 19.5 9H28c1.105 0 2 .895 2 2v1c0 1.105-.895 2-2 2h-8.5C15.462 14 12 17.462 12 21.5S15.462 29 19.5 29H22v-4h-2.5C17.567 25 16 23.433 16 21.5S17.567 18 19.5 18H28c1.105 0 2 .895 2 2v9c0 1.105-.895 2-2 2h-8.5C13.149 31 8 25.851 8 19.5v1Z" fill="white" />
    </svg>
  )
}

/* MetaMask SVG fox (simplified) */
function MetaMaskIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="#1B1B1B" />
      <path d="M32 10L22.5 17l1.8-4.3L32 10Z" fill="#E2761B" />
      <path d="M8 10l9.4 7.1-1.7-4.4L8 10Z" fill="#E4761B" />
      <path d="M28.7 26.7l-2.5 3.8 5.3 1.5 1.5-5.2-4.3-.1ZM6.5 26.8l1.5 5.2 5.3-1.5-2.5-3.8-4.3.1Z" fill="#E4761B" />
      <path d="M13 19.5l-1.4 2.1 5 .2-.2-5.4-3.4 3.1ZM27 19.5l-3.5-3.2-.1 5.4 5-.2L27 19.5Z" fill="#E4761B" />
      <path d="M13.3 30.5l3-1.4-2.6-2-.4 3.4ZM23.7 29.1l3 1.4-.4-3.4-2.6 2Z" fill="#E4761B" />
    </svg>
  )
}

function WalletButton({
  onClick,
  disabled,
  installed,
  icon,
  name,
  label,
  installUrl,
}: {
  onClick: () => void
  disabled: boolean
  installed: boolean
  icon: React.ReactNode
  name: string
  label: string
  installUrl: string
}) {
  if (!installed) {
    return (
      <a
        href={installUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#1E1E2E] bg-[#0D0D16] hover:border-[#444460] transition-all duration-200 group"
      >
        <div className="shrink-0 opacity-50">{icon}</div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-[#555570]">{name}</p>
          <p className="text-xs text-[#333350] mt-0.5">Not installed</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#444460] group-hover:text-[#9945FF] transition-colors duration-200">
          <span>Install</span>
          <ExternalLink size={11} />
        </div>
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#1E1E2E] bg-[#0D0D16] hover:border-[#9945FF]/50 hover:bg-[#9945FF]/5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <div className="shrink-0">{icon}</div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-[#555570] mt-0.5">{label}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#14F195]" />
        <span className="text-xs text-[#14F195]">Ready</span>
      </div>
    </button>
  )
}

type EmailStep = 'input' | 'code' | 'done'

export default function Login() {
  const {
    session, isConnecting, connectStep,
    connectMetamask, connectPhantom, connectEmail,
    error, phantomInstalled, metamaskInstalled,
  } = useWallet()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'wallet' | 'email'>('wallet')

  // Email flow
  const [emailStep, setEmailStep] = useState<EmailStep>('input')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [formError, setFormError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const codeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (session) navigate('/dashboard')
  }, [session, navigate])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  const startResendTimer = () => {
    setResendTimer(30)
    timerRef.current = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0 }
        return t - 1
      })
    }, 1000)
  }

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Enter a valid email address.')
      return
    }
    setSendingCode(true)
    // Simulate sending email
    await new Promise(r => setTimeout(r, 1200))
    setSendingCode(false)
    setEmailStep('code')
    startResendTimer()
    setTimeout(() => codeRef.current?.focus(), 100)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (code.length !== 6) { setFormError('Enter the 6-digit code from your email.'); return }
    await connectEmail(email, code)
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    setSendingCode(true)
    await new Promise(r => setTimeout(r, 800))
    setSendingCode(false)
    startResendTimer()
  }

  const displayError = error || formError

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={40} />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Sign in to SuperSolana</h1>
          <p className="text-sm text-[#666680] mt-2">Connect your wallet or use email to continue</p>
        </div>

        <div className="card rounded-2xl overflow-hidden">
          {/* Tab switcher */}
          <div className="grid grid-cols-2 border-b border-[#1E1E2E]">
            {([['wallet', 'Wallet'], ['email', 'Email']] as const).map(([t, label]) => (
              <button
                key={t}
                onClick={() => { setTab(t); setFormError('') }}
                className={`py-3.5 text-sm font-medium font-display transition-all duration-200 ${
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
            <AnimatePresence mode="wait">
              {displayError && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease }}
                  className="flex items-start gap-3 p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 mb-5 overflow-hidden"
                >
                  <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-red-300 leading-relaxed">{displayError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connecting overlay */}
            <AnimatePresence>
              {isConnecting && connectStep && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, ease }}
                  className="flex flex-col items-center justify-center gap-3 py-8 mb-4 rounded-xl border border-[#1E1E2E] bg-[#0A0A12]"
                >
                  <Loader2 size={22} className="text-[#9945FF] animate-spin" />
                  <p className="text-sm text-[#8888AA] font-mono">{connectStep}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {tab === 'wallet' && !isConnecting && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease }}
                className="space-y-3"
              >
                <p className="text-xs text-[#555570] mb-5 text-center">
                  Your wallet signature is your identity. No passwords, no custody.
                </p>

                <WalletButton
                  onClick={connectPhantom}
                  disabled={isConnecting}
                  installed={phantomInstalled}
                  icon={<PhantomIcon size={34} />}
                  name="Phantom"
                  label="Solana wallet"
                  installUrl="https://phantom.app"
                />

                <WalletButton
                  onClick={connectMetamask}
                  disabled={isConnecting}
                  installed={metamaskInstalled}
                  icon={<MetaMaskIcon size={34} />}
                  name="MetaMask"
                  label="Ethereum wallet"
                  installUrl="https://metamask.io"
                />

                {!phantomInstalled && !metamaskInstalled && (
                  <p className="text-xs text-[#444460] text-center pt-2">
                    No wallet detected. Install Phantom for the full Solana experience.
                  </p>
                )}
              </motion.div>
            )}

            {tab === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <AnimatePresence mode="wait">
                  {emailStep === 'input' && (
                    <motion.form
                      key="email-input"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, ease }}
                      onSubmit={handleSendCode}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-xs text-[#666680] mb-1.5 block font-medium">Email address</label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444460]" />
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#0D0D16] border border-[#1E1E2E] text-white text-sm placeholder:text-[#333350] focus:outline-none focus:border-[#9945FF]/60 transition-colors duration-200"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={sendingCode || !email}
                        className="w-full py-3 rounded-xl btn-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {sendingCode ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            Sending code...
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Send verification code
                          </>
                        )}
                      </button>
                      <p className="text-xs text-[#444460] text-center">
                        We'll send a 6-digit code to your email.
                      </p>
                    </motion.form>
                  )}

                  {emailStep === 'code' && !isConnecting && (
                    <motion.form
                      key="email-code"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25, ease }}
                      onSubmit={handleVerifyCode}
                      className="space-y-4"
                    >
                      <div className="p-3.5 rounded-xl border border-[#14F195]/20 bg-[#14F195]/5 flex items-start gap-3 mb-2">
                        <CheckCircle2 size={15} className="text-[#14F195] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-[#14F195] font-medium">Code sent</p>
                          <p className="text-xs text-[#666680] mt-0.5">Check <span className="text-white">{email}</span></p>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-[#666680] mb-1.5 block font-medium">6-digit verification code</label>
                        <input
                          ref={codeRef}
                          type={showPass ? 'text' : 'password'}
                          inputMode="numeric"
                          maxLength={6}
                          value={code}
                          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="000000"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0D0D16] border border-[#1E1E2E] text-white text-xl font-mono tracking-[0.4em] placeholder:text-[#2A2A3E] placeholder:tracking-normal focus:outline-none focus:border-[#9945FF]/60 transition-colors duration-200 text-center"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(p => !p)}
                          className="text-xs text-[#444460] hover:text-[#666680] mt-1.5 flex items-center gap-1 transition-colors"
                        >
                          {showPass ? <EyeOff size={11} /> : <Eye size={11} />}
                          {showPass ? 'Hide' : 'Show'} code
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isConnecting || code.length !== 6}
                        className="w-full py-3 rounded-xl btn-primary text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Verify and sign in
                      </button>

                      <div className="flex items-center justify-between text-xs text-[#444460]">
                        <button
                          type="button"
                          onClick={() => { setEmailStep('input'); setCode(''); setFormError('') }}
                          className="hover:text-white transition-colors"
                        >
                          Change email
                        </button>
                        <button
                          type="button"
                          onClick={handleResend}
                          disabled={resendTimer > 0 || sendingCode}
                          className={`transition-colors ${resendTimer > 0 ? 'text-[#333350] cursor-not-allowed' : 'hover:text-[#9945FF]'}`}
                        >
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend code'}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-[#444460] mt-6 leading-relaxed">
          By connecting, you agree to our{' '}
          <Link to="/cookies" className="text-[#9945FF] hover:underline">Cookie Policy</Link>.
          {' '}We never store private keys or seed phrases.
        </p>
      </motion.div>
    </div>
  )
}
