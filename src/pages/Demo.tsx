import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Zap, RefreshCw, CheckCircle2, AlertCircle, Wallet, BarChart3, Image } from 'lucide-react'

type ToolId = 'wallet_reader' | 'price_feed' | 'nft_lookup'

const TOOLS: { id: ToolId; label: string; icon: JSX.Element; placeholder: string; hint: string }[] = [
  {
    id: 'wallet_reader',
    label: 'Wallet Reader',
    icon: <Wallet size={16} />,
    placeholder: 'Enter any Solana wallet address...',
    hint: 'Try: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  },
  {
    id: 'price_feed',
    label: 'Price Feed',
    icon: <BarChart3 size={16} />,
    placeholder: 'Enter token symbol or CoinGecko ID...',
    hint: 'Try: solana, bonk, or jito-governance-token',
  },
  {
    id: 'nft_lookup',
    label: 'NFT Lookup',
    icon: <Image size={16} />,
    placeholder: 'Enter NFT mint address or collection name...',
    hint: 'Try: degods or any Solana NFT mint address',
  },
]

type ResultState = { status: 'idle' | 'loading' | 'ok' | 'error'; data: unknown }

async function fetchWallet(address: string): Promise<unknown> {
  const trimmed = address.trim()
  if (trimmed.length < 32) throw new Error('Invalid Solana address. Must be 32-44 characters.')
  return {
    address: trimmed,
    sol_balance: (Math.random() * 200 + 0.5).toFixed(4),
    token_count: Math.floor(Math.random() * 40 + 3),
    nft_count: Math.floor(Math.random() * 20),
    last_activity: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
    recent_txns: [
      { type: 'SOL transfer', amount: (Math.random() * 10).toFixed(4), time: '12 min ago' },
      { type: 'Token swap', amount: (Math.random() * 500).toFixed(2) + ' USDC', time: '3 hr ago' },
      { type: 'NFT purchase', amount: (Math.random() * 30 + 1).toFixed(2) + ' SOL', time: '1 day ago' },
    ],
  }
}

async function fetchPrice(query: string): Promise<unknown> {
  const id = query.trim().toLowerCase().replace(/\s+/g, '-')
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
  )
  const data = await res.json()
  if (!data[id]) throw new Error(`Token "${query}" not found. Try "solana" or "bonk".`)
  return {
    token: id,
    price_usd: data[id].usd,
    change_24h: data[id].usd_24h_change?.toFixed(2),
    volume_24h: data[id].usd_24h_vol?.toFixed(0),
    market_cap: data[id].usd_market_cap?.toFixed(0),
    source: 'CoinGecko',
    fetched_at: new Date().toISOString(),
  }
}

async function fetchNFT(query: string): Promise<unknown> {
  const q = query.trim()
  if (!q) throw new Error('Please enter an NFT collection name or mint address.')
  return {
    query: q,
    type: q.length > 30 ? 'single_mint' : 'collection',
    collection: q.length > 30 ? 'Unknown Collection' : q.charAt(0).toUpperCase() + q.slice(1),
    floor_price: (Math.random() * 100 + 0.5).toFixed(2) + ' SOL',
    listed_count: Math.floor(Math.random() * 500 + 10),
    owners: Math.floor(Math.random() * 5000 + 200),
    volume_7d: (Math.random() * 2000 + 50).toFixed(1) + ' SOL',
    marketplace: 'Magic Eden',
    note: 'Demo data. Live production calls Metaplex + Magic Eden APIs.',
  }
}

export default function Demo() {
  const [activeTool, setActiveTool] = useState<ToolId>('price_feed')
  const [input, setInput] = useState('solana')
  const [result, setResult] = useState<ResultState>({ status: 'idle', data: null })

  const tool = TOOLS.find(t => t.id === activeTool)!

  const run = async () => {
    if (!input.trim()) return
    setResult({ status: 'loading', data: null })
    try {
      let data: unknown
      if (activeTool === 'wallet_reader') data = await fetchWallet(input)
      else if (activeTool === 'price_feed') data = await fetchPrice(input)
      else data = await fetchNFT(input)
      setResult({ status: 'ok', data })
    } catch (err) {
      setResult({ status: 'error', data: err instanceof Error ? err.message : 'Request failed.' })
    }
  }

  const switchTool = (id: ToolId) => {
    setActiveTool(id)
    setResult({ status: 'idle', data: null })
    setInput(id === 'price_feed' ? 'solana' : '')
  }

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#9945FF]/30 bg-[#9945FF]/10 text-[#9945FF] text-xs font-mono font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
            Live Demo
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-3">
            Try SuperSolana tools
          </h1>
          <p className="text-[#8888AA] text-lg mb-10">
            Three of our six tools, running live. No login required.
          </p>

          {/* Tool selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {TOOLS.map(t => (
              <button
                key={t.id}
                onClick={() => switchTool(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-display whitespace-nowrap transition-all border ${
                  activeTool === t.id
                    ? 'bg-[#9945FF]/15 border-[#9945FF]/40 text-[#9945FF]'
                    : 'bg-transparent border-[#1E1E2E] text-[#666680] hover:text-white hover:border-[#2E2E3E]'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="card rounded-xl p-1 mb-4 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={15} className="text-[#444460] shrink-0" />
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && run()}
                placeholder={tool.placeholder}
                className="flex-1 bg-transparent text-white text-sm py-3 outline-none placeholder:text-[#444460]"
              />
            </div>
            <button
              onClick={run}
              disabled={result.status === 'loading'}
              className="flex items-center gap-2 px-5 py-3 rounded-lg btn-primary text-sm font-semibold shrink-0 disabled:opacity-50"
            >
              {result.status === 'loading' ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Zap size={14} />
              )}
              Run
            </button>
          </div>

          <p className="text-xs text-[#444460] mb-8">
            Hint: {tool.hint}
          </p>

          {/* Result panel */}
          <AnimatePresence mode="wait">
            {result.status === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card rounded-xl p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#9945FF] border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-[#666680] font-mono">Calling {activeTool}...</span>
                </div>
                <div className="mt-4 space-y-2">
                  {[80, 60, 72].map((w, i) => (
                    <div key={i} className="h-3 rounded bg-[#1E1E2E] animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </motion.div>
            )}

            {result.status === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card rounded-xl p-5 border-red-500/20"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-300 mb-1">Tool error</p>
                    <p className="text-xs text-[#666680]">{result.data as string}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {result.status === 'ok' && (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card rounded-xl overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1E2E] bg-[#0D0D18]">
                  <CheckCircle2 size={13} className="text-[#14F195]" />
                  <span className="text-xs font-mono text-[#14F195]">{activeTool} — 200 OK</span>
                  <span className="ml-auto text-xs text-[#444460] font-mono">{Math.floor(Math.random() * 150 + 80)}ms</span>
                </div>
                <div className="p-5">
                  <pre className="text-xs font-mono text-[#C8C8E0] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}

            {result.status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card rounded-xl p-8 text-center border-dashed"
              >
                <div className="w-10 h-10 rounded-xl bg-[#9945FF]/10 border border-[#9945FF]/20 flex items-center justify-center mx-auto mb-4">
                  <Zap size={18} className="text-[#9945FF]" />
                </div>
                <p className="text-sm text-[#555570]">Enter a value above and click Run to call the tool.</p>
                <p className="text-xs text-[#444460] mt-2">Results are returned as structured JSON, ready for agent consumption.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note */}
          <div className="mt-8 p-4 rounded-xl border border-[#1E1E2E] bg-[#0D0D16]">
            <p className="text-xs text-[#555570] leading-relaxed">
              <span className="text-[#9945FF] font-medium">Demo note.</span> Wallet Reader and NFT Lookup use simulated data in this demo. Price Feed calls the real CoinGecko API. Production SuperSolana tools connect directly to Solana mainnet, Metaplex, Magic Eden, Raydium, and Birdeye.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
