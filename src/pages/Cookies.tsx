import { motion } from 'framer-motion'

const SECTIONS = [
  {
    title: 'What we store',
    content: `SuperSolana stores a minimal session token in your browser's localStorage when you connect a wallet or sign in via email. This token contains your wallet address or username and the type of connection you used. It does not contain your private key, seed phrase, or any sensitive credential.`,
  },
  {
    title: 'What we do not store',
    content: `We do not store private keys. We do not store seed phrases. We do not set any third-party advertising cookies. We do not share your wallet address with external analytics services. We do not track you across other websites.`,
  },
  {
    title: 'Session data',
    content: `Your session is stored locally in your browser under the key supersolana_session. It persists until you sign out or clear your browser storage. We use this to keep you logged in between page loads. No data is sent to a server during this process. The site runs entirely in your browser.`,
  },
  {
    title: 'Analytics',
    content: `We may collect aggregate, anonymous usage metrics such as page view counts and tool invocation frequency to understand how the product is used. These metrics do not identify individual users. No third-party analytics SDK is included in this build.`,
  },
  {
    title: 'Third-party APIs',
    content: `When you use the Demo page, your browser sends requests directly to CoinGecko's public API to fetch live token prices. This is governed by CoinGecko's own privacy policy. We do not proxy or log these requests on our end.`,
  },
  {
    title: 'Your controls',
    content: `You can clear your SuperSolana session at any time by clicking Sign out in the navigation bar or by clearing localStorage in your browser's developer tools. You can also disable cookies and localStorage in your browser settings, though this will prevent you from staying logged in.`,
  },
  {
    title: 'Contact',
    content: `Questions about data handling? Reach us at privacy@opencutvideo.com or open an issue on our GitHub repository at github.com/opencutvideo.`,
  },
]

export default function Cookies() {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1E1E2E] text-xs font-mono text-[#666680] mb-8">
            Cookie Policy
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-3">Cookie Policy</h1>
          <p className="text-sm text-[#555570] mb-10">
            Last updated: August 2026. This policy applies to opencutvideo.github.io/supersolana.
          </p>

          <div className="space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display font-semibold text-white text-base mb-3">{s.title}</h2>
                <p className="text-sm text-[#8888AA] leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-5 rounded-xl border border-[#1E1E2E] bg-[#0D0D16]">
            <p className="text-xs text-[#555570]">
              SuperSolana is a product by OpenCut Video. We are committed to minimal data collection and full user control. This policy will be updated when our data practices change.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
