import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const siteUrl = 'https://supersolana.fun'
const distDir = new URL('../dist/', import.meta.url)
const template = await readFile(new URL('index.html', distDir), 'utf8')

const pages = {
  '/': {
    title: 'Solana AI Agent Tools for Wallets, DeFi & NFTs | SuperSolana',
    description: 'Give AI agents live Solana access with wallet, NFT, DeFi, price, social, and transaction tools. Install SuperSolana in one command.',
    heading: 'Solana tools for AI agents',
    summary: 'Give your AI agent live access to Solana wallets, NFTs, DeFi positions, token prices, and on-chain activity.',
    robots: 'index, follow',
  },
  '/about': {
    title: 'About SuperSolana | Solana Data for AI Agents',
    description: 'Learn how SuperSolana gives AI agents reliable, structured access to Solana wallets, NFTs, DeFi protocols, prices, and on-chain activity.',
    heading: 'Eyes on Solana for AI agents',
    summary: 'SuperSolana gives AI agents structured, reliable access to live Solana blockchain data.',
    robots: 'index, follow',
  },
  '/how-to': {
    title: 'How to Connect an AI Agent to Solana | SuperSolana',
    description: 'Follow the three-step SuperSolana setup guide to connect an AI agent to Solana wallet data, NFTs, DeFi positions, prices, and chain events.',
    heading: 'How SuperSolana works',
    summary: 'Connect a wallet, install SuperSolana in your agent, and use live Solana tools in three steps.',
    robots: 'index, follow',
  },
  '/demo': {
    title: 'Try Solana Wallet, Price & NFT Tools | SuperSolana Demo',
    description: 'Test SuperSolana tools in a live browser demo. Query Solana wallets, token prices, and NFT collections with structured agent-ready results.',
    heading: 'Try SuperSolana tools',
    summary: 'Test Solana wallet, token price, and NFT lookup tools in the SuperSolana browser demo.',
    robots: 'index, follow',
  },
  '/roadmap': {
    title: 'SuperSolana Roadmap | Solana AI Infrastructure',
    description: 'Explore the SuperSolana roadmap for DeFi positions, social intelligence, on-chain events, agent analytics, and the Solana SDK.',
    heading: 'What we are building',
    summary: 'Follow the SuperSolana roadmap for DeFi, social intelligence, on-chain events, and AI agent infrastructure.',
    robots: 'index, follow',
  },
  '/cookies': {
    title: 'Cookie Policy | SuperSolana',
    description: 'Read the SuperSolana cookie and local storage policy, including session data, analytics, third-party APIs, and user controls.',
    heading: 'Cookie Policy',
    summary: 'Learn how SuperSolana handles browser storage, sessions, analytics, and third-party API requests.',
    robots: 'index, follow',
  },
  '/login': {
    title: 'Sign In to SuperSolana',
    description: 'Connect a Solana wallet or sign in to access your SuperSolana dashboard.',
    heading: 'Sign in to SuperSolana',
    summary: 'Connect a Solana wallet or sign in with email to access your SuperSolana dashboard.',
    robots: 'noindex, nofollow',
  },
  '/dashboard': {
    title: 'Solana Agent Dashboard | SuperSolana',
    description: 'Manage your SuperSolana session and access your connected Solana agent tools.',
    heading: 'Solana Agent Dashboard',
    summary: 'Access your connected SuperSolana tools and session.',
    robots: 'noindex, nofollow',
  },
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function setMeta(html, selector, replacement) {
  return html.replace(selector, replacement)
}

for (const [route, page] of Object.entries(pages)) {
  const canonical = `${siteUrl}${route === '/' ? '/' : route}`
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${page.robots}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)

  const fallback = `<noscript data-seo-fallback><main><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.summary)}</p><p><a href="${siteUrl}/">Explore SuperSolana</a> · <a href="${siteUrl}/how-to">Read the setup guide</a> · <a href="${siteUrl}/demo">Try the live demo</a></p></main></noscript>`
  html = html.replace('<div id="root"></div>', `${fallback}<div id="root"></div>`)

  const outputPath = route === '/' ? new URL('index.html', distDir) : new URL(`.${route}/index.html`, distDir)
  await mkdir(dirname(outputPath.pathname), { recursive: true })
  await writeFile(outputPath, html)
}

console.log(`Pre-rendered ${Object.keys(pages).length} SEO routes`)