import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Wallet, Copy, CheckCheck, BarChart3, Zap, Globe, Shield, ExternalLink, RefreshCw } from 'lucide-react'
import { useWallet } from '../context/WalletContext'
import Logo from '../components/Logo'

const MOCK_ACTIVITY = [
  { type: 'wallet_read', label: 'Wallet balance fetched', time: '2 min ago', status: 'ok' },
  { type: 'nft_lookup', label: 'NFT metadata: DeGods #4421', time: '8 min ago', status: 'ok' },
  { type: 'price_feed', label: 'SOL/USDC price pulled', time: '15 min ago', status: 'ok' },
  { type: 'defi_positions', label: 'Orca LP position read', time: '1 hr ago', status: 'ok' },
  { type: 'social_signals', label: 'Twitter scan: $BONK', time: '3 hr ago', status: 'ok' },
]

const MOCK_STATS = [
  { label: 'Tools installed', value: '6', sub: 'all active' },
  { label: 'API calls today', value: '142', sub: '+18% vs yesterday' },
  { label: 'Avg latency', value: '186ms', sub: 'well within SLA' },
  { label: 'Uptime', value: '99.9%', sub: 'last 30 days' },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy} className="p-1.5 rounded-md hover:bg-white/5 text-[#555570] hover:text-white transition-all">
      {copied ? <CheckCheck size={13} className="text-[#14F195]" /> : <Copy size={13} />}
    </button>
  )
}

export default function Dashboard() {
  const { session, disconnect } = useWallet()
  const navigate = useNavigate()
  const [solPrice, setSolPrice] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

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

  const walletIcon = session.walletType === 'phantom'
    ? <span className="text-[#9945FF]">Phantom</span>
    : session.walletType === 'metamask'
    ? <span className="text-[#F6851B]">MetaMask</span>
    : <span className="text-[#14F195]">Email</span>

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-0">
      {/* Sidebar + main layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-[#1E1E2E] bg-[#0D0D16] flex-shrink-0">
          <div className="p-4 border-b border-[#1E1E2E]">
            <Link to="/" className="flex items-center gap-2">
              <Logo size={24} />
              <span className="font-display font-bold text-sm text-white">
                Super<span className="gradient-text">Solana</span>
              </span>
            </Link>
          </div>
          <nav className="p-3">
            {[
              { icon: <BarChart3 size={15} />, label: 'Overview', active: true },
              { icon: <Zap size={15} />, label: 'Tools', active: false },
              { icon: <Globe size={15} />, label: 'Activity', active: false },
              { icon: <Shield size={15} />, label: 'Security', active: false },
            ].map(item => (
              <div
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all mb-0.5 ${
                  item.active
                    ? 'bg-[#9945FF]/15 text-[#9945FF] font-medium'
                    : 'text-[#666680] hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </nav>
          <div className="p-3 mt-auto border-t border-[#1E1E2E] absolute bottom-0 left-0 right-0 md:w-56">
            <button
              onClick={() => { disconnect(); navigate('/') }}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-[#666680] hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto pb-20 md:pb-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-bold text-xl text-white">Dashboard</h1>
              <p className="text-sm text-[#555570] mt-0.5">
                Connected via {walletIcon} — {session.username}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 text-xs text-[#14F195]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {MOCK_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card rounded-xl p-4"
              >
                <div className="font-display font-bold text-xl sm:text-2xl gradient-text">{s.value}</div>
                <div className="text-xs text-white font-medium mt-1">{s.label}</div>
                <div className="text-xs text-[#444460] mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Wallet info */}
            <div className="card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-sm text-white">Wallet</h2>
                <Wallet size={14} className="text-[#444460]" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#444460] mb-1">Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-[#14F195] font-mono truncate flex-1">
                      {session.address}
                    </code>
                    <CopyButton text={session.address} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-[#444460] mb-0.5">Type</p>
                    <p className="text-xs font-medium text-white capitalize">{session.walletType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#444460] mb-0.5">Joined</p>
                    <p className="text-xs font-medium text-white">
                      {new Date(session.joinedAt).toLocaleDateString()}
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

            {/* Live SOL price */}
            <div className="card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-sm text-white">Live Market</h2>
                <button
                  onClick={fetchPrice}
                  disabled={refreshing}
                  className="p-1.5 rounded-md hover:bg-white/5 text-[#444460] hover:text-white transition-all"
                >
                  <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                </button>
              </div>
              <div className="flex items-end gap-3">
                <div>
                  <p className="text-3xl font-display font-bold gradient-text">
                    {solPrice ?? <span className="opacity-30">$---</span>}
                  </p>
                  <p className="text-xs text-[#555570] mt-1">SOL / USD via CoinGecko</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1E1E2E]">
                <p className="text-xs text-[#444460]">
                  Price pulled live from the{' '}
                  <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="text-[#9945FF] inline-flex items-center gap-0.5">
                    CoinGecko API <ExternalLink size={10} />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Install command */}
          <div className="card rounded-xl p-5 mb-6">
            <h2 className="font-display font-semibold text-sm text-white mb-3">Your install command</h2>
            <div className="flex items-center gap-3 bg-[#0A0A0F] rounded-lg px-4 py-3 border border-[#1A1A28]">
              <code className="text-xs font-mono text-[#14F195] flex-1 overflow-x-auto whitespace-nowrap">
                Install SuperSolana: https://opencutvideo.github.io/supersolana/install.md
              </code>
              <CopyButton text="Install SuperSolana: https://opencutvideo.github.io/supersolana/install.md" />
            </div>
            <p className="text-xs text-[#444460] mt-2">Paste this into any compatible AI agent to install all 6 SuperSolana tools.</p>
          </div>

          {/* Recent activity */}
          <div className="card rounded-xl p-5">
            <h2 className="font-display font-semibold text-sm text-white mb-4">Recent activity</h2>
            <div className="space-y-2">
              {MOCK_ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between py-2.5 border-b border-[#1A1A28] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14F195] shrink-0" />
                    <div>
                      <p className="text-xs text-white">{a.label}</p>
                      <p className="text-xs text-[#444460] font-mono">{a.type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#444460]">{a.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
