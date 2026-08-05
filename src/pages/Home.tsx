import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Shield, Globe, ChevronRight, ArrowRight, Cpu, Lock, BarChart3 } from 'lucide-react'

const FEATURES = [
  {
    icon: <Zap className="text-[#9945FF]" size={20} />,
    title: 'On-Chain Intelligence',
    desc: 'Read wallet activity, token transfers, NFT metadata, and DeFi positions directly from the Solana blockchain.',
  },
  {
    icon: <Globe className="text-[#14F195]" size={20} />,
    title: 'Cross-Platform Reach',
    desc: 'Monitor Twitter, Discord, and Telegram for Solana project signals without managing API keys or rate limits.',
  },
  {
    icon: <Shield className="text-[#00C2FF]" size={20} />,
    title: 'Wallet-Native Auth',
    desc: 'Sign in with Phantom or MetaMask. Your data stays in your wallet. No passwords, no custody.',
  },
  {
    icon: <Cpu className="text-[#9945FF]" size={20} />,
    title: 'Agent-Ready API',
    desc: 'One command gives your AI agent full Solana context. Works with Claude, GPT-4, and any MCP-compatible agent.',
  },
  {
    icon: <BarChart3 className="text-[#14F195]" size={20} />,
    title: 'Live Market Data',
    desc: 'Real-time SOL price, token analytics, and on-chain volume aggregated for agent consumption.',
  },
  {
    icon: <Lock className="text-[#00C2FF]" size={20} />,
    title: 'Zero API Fees',
    desc: 'No RPC limits, no API bills. SuperSolana handles all infrastructure so your agent runs lean.',
  },
]

const STATS = [
  { value: '12+', label: 'Solana protocols' },
  { value: '0', label: 'API keys needed' },
  { value: '<200ms', label: 'Avg response time' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const STEPS = [
  { step: '01', title: 'Connect your wallet', desc: 'Sign in with Phantom or MetaMask in one click.' },
  { step: '02', title: 'Install the agent tool', desc: 'Paste one command to your AI agent and it self-configures.' },
  { step: '03', title: 'Run with superpowers', desc: 'Your agent reads Solana data, tracks wallets, and monitors DeFi positions.' },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-[#9945FF]/10 blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-[#14F195]/8 blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#9945FF]/30 bg-[#9945FF]/10 text-[#9945FF] text-xs font-mono font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
            Now live on Solana mainnet
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6">
            Give your AI agent<br />
            <span className="gradient-text">Solana superpowers</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8888AA] max-w-2xl mx-auto leading-relaxed mb-10">
            SuperSolana connects your AI agent to live blockchain data, wallet activity, NFT markets, and DeFi protocols. One command. No API keys. No rate limits.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/demo"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl btn-primary text-sm font-semibold"
            >
              <Zap size={16} />
              Try Demo Free
            </Link>
            <Link
              to="/how-to"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl btn-outline text-sm"
            >
              How it works
              <ChevronRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-16 w-full max-w-2xl"
        >
          <div className="card rounded-xl overflow-hidden glow-purple">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#1E1E2E] bg-[#0D0D18]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-[#444460] font-mono">agent shell</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-sm">
              <p className="text-[#555570]"># Tell your AI agent this one command:</p>
              <p className="text-[#14F195] mt-2">
                Install SuperSolana:{' '}
                <span className="text-[#9945FF]">https://supersolana.io/install</span>
              </p>
              <div className="mt-4 space-y-1.5">
                <p className="text-[#444460]">Installing SuperSolana tools...</p>
                <p className="text-[#14F195]">✓ wallet_reader — connected to Solana mainnet</p>
                <p className="text-[#14F195]">✓ nft_lookup — Metaplex + Magic Eden</p>
                <p className="text-[#14F195]">✓ defi_positions — Raydium, Orca, Jupiter</p>
                <p className="text-[#14F195]">✓ price_feed — real-time CoinGecko + Birdeye</p>
                <p className="text-white mt-3">Your agent now speaks Solana. <span className="text-[#9945FF]">_</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-[#1E1E2E] bg-[#0D0D16]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-display font-bold text-3xl sm:text-4xl gradient-text">{stat.value}</div>
                <div className="text-xs text-[#555570] mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Everything your agent needs
            </h2>
            <p className="text-[#666680] max-w-xl mx-auto">
              Six tools. One install. Your agent goes from blockchain-blind to fully aware of the Solana ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card p-6 rounded-xl"
              >
                <div className="w-9 h-9 rounded-lg bg-[#0A0A0F] border border-[#1E1E2E] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-display font-semibold text-white text-base mb-2">{f.title}</h3>
                <p className="text-sm text-[#666680] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24 px-4 bg-[#0D0D16] border-y border-[#1E1E2E]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Up and running in 3 steps
            </h2>
            <p className="text-[#666680] max-w-lg mx-auto">
              No configuration files. No API dashboards. Just your agent, one command, and full Solana access.
            </p>
          </motion.div>

          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 rounded-xl flex items-start gap-5"
              >
                <div className="font-mono font-bold text-2xl gradient-text shrink-0">{s.step}</div>
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-sm text-[#666680]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/how-to" className="inline-flex items-center gap-2 text-sm text-[#9945FF] hover:text-[#A855FF] font-medium transition-colors">
              Full setup guide <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready to go on-chain?
            </h2>
            <p className="text-[#666680] mb-8">
              Connect your wallet and give your AI agent access to the full Solana ecosystem. Free to start.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-primary text-base font-semibold"
            >
              Connect Wallet
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
