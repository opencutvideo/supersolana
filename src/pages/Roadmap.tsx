import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

const PHASES = [
  {
    phase: 'Phase 1',
    period: 'August 2026',
    status: 'current',
    title: 'Foundation',
    items: [
      { done: true, text: 'SuperSolana public launch' },
      { done: true, text: 'Wallet Reader tool (Solana mainnet)' },
      { done: true, text: 'Price Feed via CoinGecko + Birdeye' },
      { done: false, text: 'NFT Lookup via Metaplex + Magic Eden' },
      { done: false, text: 'Phantom + MetaMask login gate' },
    ],
  },
  {
    phase: 'Phase 2',
    period: 'September 2026',
    status: 'upcoming',
    title: 'DeFi Layer',
    items: [
      { done: false, text: 'Raydium LP position reader' },
      { done: false, text: 'Orca Whirlpool position tracker' },
      { done: false, text: 'Jupiter swap route explorer' },
      { done: false, text: 'DeFi positions tool (full release)' },
      { done: false, text: 'Per-user usage analytics dashboard' },
    ],
  },
  {
    phase: 'Phase 3',
    period: 'October 2026',
    status: 'upcoming',
    title: 'Social Intelligence',
    items: [
      { done: false, text: 'Twitter signal monitoring for Solana projects' },
      { done: false, text: 'Discord server scanner' },
      { done: false, text: 'Telegram channel tracker' },
      { done: false, text: 'Sentiment scoring per token' },
      { done: false, text: 'Social signals tool (public beta)' },
    ],
  },
  {
    phase: 'Phase 4',
    period: 'November 2026',
    status: 'upcoming',
    title: 'On-Chain Events',
    items: [
      { done: false, text: 'Program event subscription (websocket)' },
      { done: false, text: 'Custom alert rules per wallet or token' },
      { done: false, text: 'Chain events tool (general availability)' },
      { done: false, text: 'Agent webhook delivery' },
      { done: false, text: 'Team workspaces with shared wallets' },
    ],
  },
  {
    phase: 'Phase 5',
    period: 'December 2026',
    status: 'upcoming',
    title: 'Platform Maturity',
    items: [
      { done: false, text: 'Paid tiers with higher rate limits' },
      { done: false, text: 'CLI installer for developer environments' },
      { done: false, text: 'Agent marketplace listing (Claude, GPT stores)' },
      { done: false, text: 'Cross-chain expansion (Ethereum, Base)' },
      { done: false, text: 'SuperSolana SDK (npm package)' },
    ],
  },
]

const STATUS_CONFIG = {
  current: { color: '#14F195', label: 'In progress', bg: 'bg-[#14F195]/10', border: 'border-[#14F195]/30' },
  upcoming: { color: '#9945FF', label: 'Planned', bg: 'bg-[#9945FF]/5', border: 'border-[#9945FF]/20' },
  done: { color: '#555570', label: 'Done', bg: 'bg-white/3', border: 'border-[#1E1E2E]' },
}

export default function Roadmap() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E2E] text-xs font-mono text-[#666680] mb-8">
            Roadmap
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
            What we are building
          </h1>
          <p className="text-[#8888AA] text-lg mb-14">
            August to December 2026. Five phases. One goal: give every AI agent complete Solana ecosystem access.
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#9945FF] via-[#14F195]/40 to-transparent hidden sm:block" />

            <div className="space-y-6">
              {PHASES.map((phase, i) => {
                const cfg = STATUS_CONFIG[phase.status as keyof typeof STATUS_CONFIG]
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="sm:pl-12 relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-2 top-5 w-5 h-5 rounded-full border-2 hidden sm:flex items-center justify-center"
                      style={{ borderColor: cfg.color, backgroundColor: '#0A0A0F' }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                    </div>

                    <div className={`card rounded-xl p-5 border ${cfg.border}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs" style={{ color: cfg.color }}>{phase.phase}</span>
                            <span className="text-xs text-[#444460]">{phase.period}</span>
                          </div>
                          <h3 className="font-display font-semibold text-white text-base mt-0.5">{phase.title}</h3>
                        </div>
                        <span className={`self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg}`} style={{ color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm">
                            {item.done ? (
                              <CheckCircle2 size={14} className="text-[#14F195] mt-0.5 shrink-0" />
                            ) : phase.status === 'current' ? (
                              <Clock size={14} className="text-[#666680] mt-0.5 shrink-0" />
                            ) : (
                              <Circle size={14} className="text-[#2A2A3E] mt-0.5 shrink-0" />
                            )}
                            <span className={item.done ? 'text-[#8888AA] line-through' : 'text-[#AAAACC]'}>
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="mt-10 p-5 rounded-xl border border-[#1E1E2E] bg-[#0D0D16]">
            <p className="text-xs text-[#555570] leading-relaxed">
              This roadmap reflects our current priorities and may shift based on community feedback and protocol changes in the Solana ecosystem. Dates are targets, not guarantees.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
