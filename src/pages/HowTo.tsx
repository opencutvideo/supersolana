import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Terminal, Wallet, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react'

const TOOLS = [
  { name: 'wallet_reader', desc: 'Read any Solana wallet balance, token holdings, and recent transactions.', color: '#9945FF' },
  { name: 'nft_lookup', desc: 'Fetch NFT metadata, ownership, and floor prices from Metaplex and Magic Eden.', color: '#14F195' },
  { name: 'defi_positions', desc: 'Inspect liquidity positions on Raydium, Orca, and Jupiter.', color: '#00C2FF' },
  { name: 'price_feed', desc: 'Real-time token prices from CoinGecko and Birdeye, structured for agent use.', color: '#9945FF' },
  { name: 'social_signals', desc: 'Twitter and Discord monitoring for Solana project mentions and sentiment.', color: '#14F195' },
  { name: 'chain_events', desc: 'Subscribe to on-chain program events and get structured summaries.', color: '#00C2FF' },
]

const AGENTS = [
  { name: 'Claude (Anthropic)', supported: true },
  { name: 'GPT-4 / GPT-4o', supported: true },
  { name: 'Any MCP-compatible agent', supported: true },
  { name: 'LangChain agents', supported: true },
  { name: 'AutoGen', supported: true },
  { name: 'Custom agent frameworks', supported: true },
]

export default function HowTo() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E2E] text-xs font-mono text-[#666680] mb-8">
            Setup Guide
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            How SuperSolana works
          </h1>
          <p className="text-[#8888AA] text-lg mb-14">
            Three steps from zero to a fully Solana-aware AI agent.
          </p>

          {/* Step 1 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#9945FF]/15 border border-[#9945FF]/30 flex items-center justify-center">
                <Wallet className="text-[#9945FF]" size={16} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#555570]">Step 01</span>
                <h2 className="font-display font-semibold text-white text-lg">Connect your wallet</h2>
              </div>
            </div>
            <div className="pl-11 space-y-3 text-sm text-[#8888AA] leading-relaxed">
              <p>Go to the <Link to="/login" className="text-[#9945FF] hover:text-[#A855FF]">login page</Link> and connect with Phantom or MetaMask. Your wallet signature is your identity. No email, no password, no custody.</p>
              <p>If you prefer email login, that is available too. You can upgrade to wallet auth any time from your dashboard.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#14F195]/15 border border-[#14F195]/30 flex items-center justify-center">
                <Terminal className="text-[#14F195]" size={16} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#555570]">Step 02</span>
                <h2 className="font-display font-semibold text-white text-lg">Install into your agent</h2>
              </div>
            </div>
            <div className="pl-11">
              <p className="text-sm text-[#8888AA] mb-4">Copy the install command and paste it directly into your AI agent chat window:</p>
              <div className="card rounded-xl overflow-hidden mb-5">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#1E1E2E] bg-[#0D0D18]">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  <span className="ml-2 text-xs text-[#444460] font-mono">your agent</span>
                </div>
                <div className="p-4 font-mono text-sm">
                  <p className="text-[#14F195]">
                    Install SuperSolana: <span className="text-[#9945FF]">https://opencutvideo.github.io/supersolana/install.md</span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#555570]">The agent fetches the install document, runs setup, and confirms each tool is active. No manual configuration needed.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#00C2FF]/15 border border-[#00C2FF]/30 flex items-center justify-center">
                <Cpu className="text-[#00C2FF]" size={16} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#555570]">Step 03</span>
                <h2 className="font-display font-semibold text-white text-lg">Use it in conversation</h2>
              </div>
            </div>
            <div className="pl-11 space-y-3 text-sm text-[#8888AA] leading-relaxed">
              <p>Once installed, your agent has six Solana tools available. Ask it anything about wallets, tokens, NFTs, or DeFi. It will pull live on-chain data and reason from it.</p>
              <div className="card rounded-xl p-4 font-mono text-xs space-y-2">
                <p className="text-[#555570]"># Example prompts that now work:</p>
                <p className="text-white">"What is the SOL balance of wallet 7xKX...?"</p>
                <p className="text-white">"Check if my wallet has any Tensor NFTs."</p>
                <p className="text-white">"What is the current BONK price and 24h volume?"</p>
                <p className="text-white">"Summarize my Orca positions."</p>
              </div>
            </div>
          </div>

          {/* Available tools */}
          <div className="mb-14">
            <h2 className="font-display font-semibold text-white text-xl mb-6">Available tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOLS.map((tool) => (
                <div key={tool.name} className="card p-4 rounded-xl">
                  <p className="font-mono text-xs mb-1" style={{ color: tool.color }}>{tool.name}</p>
                  <p className="text-xs text-[#666680] leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="mb-10">
            <h2 className="font-display font-semibold text-white text-xl mb-6">Compatible agents</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AGENTS.map((a) => (
                <div key={a.name} className="flex items-center gap-2 text-sm text-[#8888AA]">
                  <CheckCircle2 size={14} className="text-[#14F195] shrink-0" />
                  {a.name}
                </div>
              ))}
            </div>
          </div>

          <Link to="/demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-sm font-semibold">
            Try a live demo <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
