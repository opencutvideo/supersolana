import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Github, Twitter } from 'lucide-react'

const LINKS = {
  Product: [
    { label: 'About', to: '/about' },
    { label: 'How It Works', to: '/how-to' },
    { label: 'Demo', to: '/demo' },
    { label: 'Roadmap', to: '/roadmap' },
  ],
  Account: [
    { label: 'Sign In', to: '/login' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
  Legal: [
    { label: 'Cookie Policy', to: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E2E] bg-[#0A0A0F] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo size={26} />
              <span className="font-display font-bold text-white">
                Super<span className="gradient-text">Solana</span>
              </span>
            </Link>
            <p className="text-xs text-[#555570] leading-relaxed mb-4">
              AI agents with Solana blockchain superpowers. Built by OpenCut Video.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/opencutvideo/supersolana"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[#1E1E2E] text-[#555570] hover:text-white hover:border-[#9945FF]/40 transition-all"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://twitter.com/opencutvideo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[#1E1E2E] text-[#555570] hover:text-white hover:border-[#9945FF]/40 transition-all"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display font-semibold text-xs uppercase tracking-widest text-[#444460] mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#666680] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#1A1A28] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#444460]">
            &copy; {new Date().getFullYear()} SuperSolana by OpenCut Video. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] animate-pulse" />
            <span className="text-xs text-[#444460]">Live on Solana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
