import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Layers, Users } from 'lucide-react'

const VALUES = [
  {
    icon: <Target className="text-[#9945FF]" size={20} />,
    title: 'Agent-first design',
    desc: 'Built specifically for AI agents, not retrofitted. Every tool returns structured data agents can reason about directly.',
  },
  {
    icon: <Layers className="text-[#14F195]" size={20} />,
    title: 'Infrastructure you never see',
    desc: 'RPC nodes, rate limit handling, data normalization. We manage it so your agent concentrates on tasks.',
  },
  {
    icon: <Users className="text-[#00C2FF]" size={20} />,
    title: 'Ecosystem native',
    desc: 'We are builders in the Solana ecosystem. Phantom, Metaplex, Jupiter, Orca. We know the protocols from inside.',
  },
]

export default function About() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E2E] text-xs font-mono text-[#666680] mb-8">
            About SuperSolana
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-6">
            We give AI agents<br />
            <span className="gradient-text">eyes on Solana</span>
          </h1>

          <div className="space-y-5 text-[#8888AA] leading-relaxed text-base sm:text-lg mb-14">
            <p>
              SuperSolana started from a frustration: AI agents are smart enough to reason about DeFi, NFTs, and on-chain activity, but they are blind to real blockchain data. They hallucinate token prices, guess wallet balances, and cannot read live protocol state.
            </p>
            <p>
              We built SuperSolana to close that gap. One install gives an agent everything it needs to work meaningfully with the Solana ecosystem. Wallet reads, NFT lookups, DeFi positions, social signals. Structured, clean, and ready for agent reasoning.
            </p>
            <p>
              No API dashboards to set up. No rate limits to manage. No data cleaning to do. The agent gets what it needs and moves forward.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card p-5 rounded-xl"
              >
                <div className="mb-3">{v.icon}</div>
                <h3 className="font-display font-semibold text-white text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-[#666680] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Studio note */}
          <div className="border border-[#1E1E2E] rounded-xl p-6 bg-[#0D0D16] mb-10">
            <p className="text-xs uppercase tracking-widest font-mono text-[#444460] mb-3">From the studio</p>
            <p className="text-[#8888AA] text-sm leading-relaxed">
              SuperSolana is a product by OpenCut Video, a studio building tools at the intersection of AI and open protocols. We ship products that are direct, purposeful, and built to last. No fluff. No filler. Just tools that work.
            </p>
          </div>

          <Link
            to="/how-to"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-sm font-semibold"
          >
            See how it works <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
