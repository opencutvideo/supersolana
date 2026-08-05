import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Wallet, Copy, CheckCheck, BarChart3, Zap, Globe, Shield, ExternalLink, RefreshCw, ArrowLeft } from 'lucide-react'
import { useWallet } from '../context/WalletContext'
import Logo from '../components/Logo'

const MOCK_ACTIVITY = [
  { type: 'wallet_reader', label: 'Wallet balance fetched', time: '2 min ago' },
  { type: 'nft_lookup', label: 'NFT metadata: DeGods #4421', time: '8 min ago' },
  { type: 'price_feed', label: 'SOL/USDC price pulled', time: '15 min ago' },
  { type: 'defi_positions', label: 'Orca LP position read', time: '1 hr ago' },
  { type: 'social_signals', label: 'Twitter scan: $BONK', time: '3 hr ago' },
]

const MOCK_STATS = [
  { label: 'Tools active', value: '6', sub: 'all operational' },
  { label: 'API calls today', value: '142', sub: '+18% vs yesterday' },
  { label: 'Avg latency', value: '186ms', sub: 'within SLA' },
  { label: 'Uptime', value: '99.9%', sub: 'last 30 days' },
]

const NAV_ITEMS = [
  { icon: <BarChart3 size={15} />, label: 'Overview', id: 'overview' },
  { icon: <Zap size={15} />, label: 'Tools', id: 'tools' },
  { icon: <Globe size={15} />, label: 'Activity', id: 'activity' },
  { icon: <Shield size={15} />, label: 'Security', id: 'security' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="p-1.5 rounded-md hover:bg-white/5 text-[#555570] hover:text-white transition-all shrink-0" title="Copy">
      {copied ? <CheckCheck size={13} className="text-[#14F195]" /> : <Copy size={13} />}
    </button>
  )
}

export default function Dashboard() {
  const { session, disconnect } = useWallet()
  const navigate = useNavigate()
  const [solPrice, setSolPrice] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [activeNav, setActiveNav] = useState('overview')

  useEffect(() => {
    if (!session) { navigate('/login'); return }
    fetchPrice()
  }, [session, navigate])

  const fetchPrice = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
      const data = await res.json()
      setSolPrice('$' + data.solana.usd.toFixed(2))
    } catch {
      setSolPrice('$--')
    } finally {
      setRefreshing(false)
    }
  }

  if (!session) return null

  const walletLabel =
    session.walletType === 'phantom' ? 'Phantom'
    : session.walletType === 'metamask' ? 'MetaMask'
    : 'Email'

  const walletColor =
    session.walletType === 'phantom' ? '#9945FF'
    : session.walletType === 'metamask' ? '#F6851B'
    : '#14F195'

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      {/* Top bar (mobile + desktop) */}
      <header className="flex items-center justify-between px-4 sm:px-6 h-14 border-b border-[#1E1E2E] bg-[#0D0D16] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 mr-2">
            <Logo size={22} />
            <span className="font-display font-bold text-sm text-white hidden sm:block">
              Super<span className="gradient-text">Solana</span>
            </span>
          </Link>
          <span className="hidden sm:block text-[#2A2A3E] text-lg">/</span>
          <span className="hidden sm:block font-display text-sm text-[#666680]">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-[#14F195]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
            <span className="hidden sm:inline">All systems operational</span>
            <span className="sm:hidden">Live</span>
          </span>
          <button
            onClick={() => { disconnect(); navigate('/') }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-[#555570] hover:text-red-400 hover:bg-red-500/10 transition-all border border-[#1E1E2E]"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: desktop only */}
        <aside className="hidden md:flex flex-col w-52 border-r border-[#1E1E2E] bg-[#0D0D16] shrink-0">
          <div className="p-3 flex-1">
            <p className="text-xs font-mono uppercase tracking-widest text-[#333350] px-3 pt-3 pb-2">Menu</p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-all ${
                  activeNav === item.id
                    ? 'bg-[#9945FF]/15 text-[#9945FF] font-medium'
                    : 'text-[#555570] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-[#1A1A28]">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#444460] hover:text-white hover:bg-white/5 transition-all"
            >
              <ArrowLeft size={12} />
              Back to site
            </Link>
          </div>
        </aside>

        {/* Mobile nav tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-[#0D0D16] border-t border-[#1E1E2E] flex">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
                activeNav === item.id ? 'text-[#9945FF]' : 'text-[#444460]'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="font-display font-bold text-lg text-white">
              Welcome back, <span style={{ color: walletColor }}>{session.username}</span>
            </h1>
            <p className="text-xs text-[#444460] mt-0.5">
              Connected via {walletLabel}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {MOCK_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card rounded-xl p-4"
              >
                <div className="font-display font-bold text-xl sm:text-2xl gradient-text">{s.value}</div>
                <div className="text-xs font-medium text-white mt-1">{s.label}</div>
                <div className="text-xs text-[#444460] mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Wallet card */}
            <div className="card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                  <Wallet size={14} className="text-[#444460]" />
                  Wallet
                </h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#444460] mb-1">Address</p>
                  <div className="flex items-center gap-1.5 bg-[#0A0A0F] rounded-lg px-3 py-2 border border-[#1A1A28]">
                    <code className="text-xs font-mono truncate flex-1" style={{ color: walletColor }}>
                      {session.address}
                    </code>
                    <CopyButton text={session.address} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-[#444460] mb-0.5">Type</p>
                    <p className="text-xs font-medium text-white capitalize">{session.walletType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#444460] mb-0.5">Joined</p>
                    <p className="text-xs font-medium text-white">
                      {new Date(session.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  {session.balance && (
                    <div>
                      <p className="text-xs text-[#444460] mb-0.5">Balance</p>
                      <p className="text-xs font-medium text-white">{session.balance}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SOL price */}
            <div className="card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-semibold text-sm text-white">Live SOL Price</h2>
                <button
                  onClick={fetchPrice}
                  disabled={refreshing}
                  className="p-1.5 rounded-md hover:bg-white/5 text-[#444460] hover:text-white transition-all"
                  title="Refresh"
                >
                  <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                </button>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-display font-bold gradient-text">
                  {solPrice ?? <span className="opacity-30 text-2xl">Loading...</span>}
                </span>
                <span className="text-xs text-[#555570]">USD</span>
              </div>
              <p className="text-xs text-[#444460]">
                Live via{' '}
                <a href="https://coingecko.com" target="_blank" rel="noopener noreferrer" className="text-[#9945FF] inline-flex items-center gap-0.5 hover:underline">
                  CoinGecko <ExternalLink size={10} />
                </a>
              </p>
            </div>
          </div>

          {/* Install command */}
          <div className="card rounded-xl p-5 mb-4">
            <h2 className="font-display font-semibold text-sm text-white mb-1">Your install command</h2>
            <p className="text-xs text-[#444460] mb-3">Paste into any AI agent to activate all 6 SuperSolana tools.</p>
            <div className="flex items-center gap-2 bg-[#0A0A0F] rounded-lg px-4 py-3 border border-[#1A1A28]">
              <code className="text-xs font-mono text-[#14F195] flex-1 overflow-x-auto whitespace-nowrap">
                Install SuperSolana: https://opencutvideo.github.io/supersolana/install.md
              </code>
              <CopyButton text="Install SuperSolana: https://opencutvideo.github.io/supersolana/install.md" />
            </div>
          </div>

          {/* Activity */}
          <div className="card rounded-xl p-5">
            <h2 className="font-display font-semibold text-sm text-white mb-4">Recent activity</h2>
            <div className="space-y-0">
              {MOCK_ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-center justify-between py-3 border-b border-[#111120] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14F195] shrink-0" />
                    <div>
                      <p className="text-xs text-[#CCCCDD]">{a.label}</p>
                      <p className="text-xs text-[#444460] font-mono mt-0.5">{a.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#444460] shrink-0 ml-3">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
