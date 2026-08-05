import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="font-mono text-8xl font-bold gradient-text mb-4">404</div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">Page not found</h1>
        <p className="text-[#666680] text-sm mb-8 max-w-xs mx-auto">
          This page does not exist or was moved. Head back to the home page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary text-sm font-semibold"
        >
          <Home size={15} />
          Back to home
        </Link>
      </motion.div>
    </div>
  )
}
