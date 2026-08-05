import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('ss_cookies_ok')
    if (!accepted) setTimeout(() => setVisible(true), 1200)
  }, [])

  const accept = () => {
    localStorage.setItem('ss_cookies_ok', '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50"
        >
          <div className="card rounded-xl p-4 shadow-2xl border border-[#9945FF]/20">
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="text-xs text-[#8888AA] leading-relaxed">
                We use localStorage to keep you signed in. No tracking cookies, no third-party ads.{' '}
                <Link to="/cookies" className="text-[#9945FF] hover:underline">Cookie Policy</Link>
              </p>
              <button
                onClick={accept}
                className="shrink-0 p-1 rounded-md text-[#555570] hover:text-white hover:bg-white/5 transition-all"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
            <button
              onClick={accept}
              className="w-full py-2 rounded-lg btn-primary text-xs font-semibold"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
