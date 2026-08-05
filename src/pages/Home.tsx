import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

const TOOLS = [
  { name: 'wallet_reader', desc: 'Reads any Solana wallet — balances, history, tokens' },
  { name: 'nft_lookup', desc: 'Metaplex metadata, Magic Eden listings, floor prices' },
  { name: 'defi_positions', desc: 'Raydium, Orca, Jupiter — open positions in real time' },
  { name: 'price_feed', desc: 'SOL and token prices via CoinGecko + Birdeye' },
  { name: 'social_monitor', desc: 'Twitter, Discord, Telegram signals — no API keys' },
  { name: 'tx_decoder', desc: 'Parses raw transactions into human-readable summaries' },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        {/* Orbs */}
        <div className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full bg-[#FF3399]/8 blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/5 w-64 h-64 rounded-full bg-[#00FF41]/6 blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF3399]/25 bg-[#FF3399]/8 text-[#FF3399] text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
            Solana mainnet · live
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.06] tracking-tight mb-5">
            Your agent,<br />
            <span className="gradient-text">on-chain.</span>
          </h1>

          <p className="text-lg text-[#888] max-w-xl mx-auto leading-relaxed mb-10">
            Six Solana tools. One install command. Your AI agent reads wallets, tracks DeFi, and monitors markets — no API keys, no setup.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/demo"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl btn-primary text-sm font-semibold"
            >
              <Zap size={15} />
              Try Demo
            </Link>
            <Link
              to="/how-to"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl btn-outline text-sm"
            >
              How it works
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Install command */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-14 w-full max-w-xl"
        >
          <div className="card rounded-xl overflow-hidden glow-pink">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-[#333] font-mono">agent shell</span>
            </div>
            <div className="p-5 font-mono text-sm">
              <p className="text-[#444]"># one command, fully self-configures</p>
              <p className="text-white mt-2">
                Install SuperSolana:{' '}
                <span className="text-[#FF3399]">https://supersolana.io/install</span>
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-[#333]">Connecting tools...</p>
                <p className="text-[#00FF41]">✓ 6 tools loaded · 0 API keys needed</p>
                <p className="text-white mt-2">Ready. <span className="text-[#FF3399]">_</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tools list */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              What gets installed
            </h2>
            <p className="text-[#555] text-sm">Six focused tools. Nothing you don't need.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="card p-5 rounded-xl flex items-start gap-4"
              >
                <span className="text-[#FF3399] font-mono text-xs mt-0.5 shrink-0">→</span>
                <div>
                  <code className="text-[#00FF41] text-sm font-mono">{tool.name}</code>
                  <p className="text-sm text-[#555] mt-1">{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — minimal */}
      <section className="py-20 px-4 border-y border-[#1A1A1A] bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Three steps
            </h2>
          </motion.div>

          <div className="space-y-3">
            {[
              { n: '01', t: 'Connect wallet', d: 'Phantom or MetaMask — no passwords.' },
              { n: '02', t: 'Run one command', d: 'Paste the install URL into your agent.' },
              { n: '03', t: 'Agent goes on-chain', d: 'Wallet reads, DeFi positions, market data — all live.' },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card p-5 rounded-xl flex items-start gap-5"
              >
                <span className="font-mono font-bold text-xl gradient-text shrink-0 w-8">{s.n}</span>
                <div>
                  <h3 className="font-display font-semibold text-white text-sm">{s.t}</h3>
                  <p className="text-sm text-[#555] mt-0.5">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/how-to" className="inline-flex items-center gap-2 text-sm text-[#FF3399] hover:text-[#FF55AA] font-medium transition-colors">
              Full guide <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Start now
            </h2>
            <p className="text-[#555] mb-8 text-sm">
              Connect your wallet. Free to use.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl btn-primary text-sm font-semibold"
            >
              Connect Wallet
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
