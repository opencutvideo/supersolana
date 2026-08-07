const SITE_URL = 'https://supersolana.fun'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

type SeoConfig = {
  title: string
  description: string
  canonical: string
  indexable?: boolean
  type?: 'website' | 'article'
  schema?: Record<string, unknown> | Record<string, unknown>[]
}

const pageSeo: Record<string, SeoConfig> = {
  '/': {
    title: 'Solana AI Agent Tools for Wallets, DeFi & NFTs | SuperSolana',
    description: 'Give AI agents live Solana access with wallet, NFT, DeFi, price, social, and transaction tools. Install SuperSolana in one command.',
    canonical: '/',
    schema: {
      '@type': 'WebApplication',
      name: 'SuperSolana',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description: 'Solana blockchain tools for AI agents.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: 'Solana wallet reader, NFT lookup, DeFi positions, token price feed, social signals, transaction decoder',
    },
  },
  '/about': {
    title: 'About SuperSolana | Solana Data for AI Agents',
    description: 'Learn how SuperSolana gives AI agents reliable, structured access to Solana wallets, NFTs, DeFi protocols, prices, and on-chain activity.',
    canonical: '/about',
    type: 'article',
  },
  '/how-to': {
    title: 'How to Connect an AI Agent to Solana | SuperSolana',
    description: 'Follow the three-step SuperSolana setup guide to connect an AI agent to Solana wallet data, NFTs, DeFi positions, prices, and chain events.',
    canonical: '/how-to',
    type: 'article',
    schema: {
      '@type': 'HowTo',
      name: 'How to connect an AI agent to Solana',
      description: 'Install SuperSolana and give an AI agent structured Solana tools.',
      totalTime: 'PT5M',
      step: [
        { '@type': 'HowToStep', name: 'Connect a wallet', text: 'Connect Phantom or MetaMask to establish your identity.' },
        { '@type': 'HowToStep', name: 'Install SuperSolana', text: 'Paste the SuperSolana install URL into your AI agent chat.' },
        { '@type': 'HowToStep', name: 'Use Solana tools', text: 'Ask the agent about wallets, tokens, NFTs, prices, and DeFi.' },
      ],
    },
  },
  '/demo': {
    title: 'Try Solana Wallet, Price & NFT Tools | SuperSolana Demo',
    description: 'Test SuperSolana tools in a live browser demo. Query Solana wallets, token prices, and NFT collections with structured agent-ready results.',
    canonical: '/demo',
  },
  '/roadmap': {
    title: 'SuperSolana Roadmap | Solana AI Infrastructure',
    description: 'Explore the SuperSolana roadmap for DeFi positions, social intelligence, on-chain events, agent analytics, and the Solana SDK.',
    canonical: '/roadmap',
    type: 'article',
  },
  '/cookies': {
    title: 'Cookie Policy | SuperSolana',
    description: 'Read the SuperSolana cookie and local storage policy, including session data, analytics, third-party APIs, and user controls.',
    canonical: '/cookies',
    type: 'article',
  },
  '/login': {
    title: 'Sign In to SuperSolana',
    description: 'Connect a Solana wallet or sign in to access your SuperSolana dashboard.',
    canonical: '/login',
    indexable: false,
  },
  '/dashboard': {
    title: 'Solana Agent Dashboard | SuperSolana',
    description: 'Manage your SuperSolana session and access your connected Solana agent tools.',
    canonical: '/dashboard',
    indexable: false,
  },
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
}

export function updateSeo(pathname: string) {
  const config = pageSeo[pathname] ?? {
    title: 'Page Not Found | SuperSolana',
    description: 'The requested SuperSolana page could not be found.',
    canonical: pathname,
    indexable: false,
  }
  const canonicalUrl = `${SITE_URL}${config.canonical === '/' ? '/' : config.canonical}`

  document.title = config.title
  upsertMeta('name', 'description', config.description)
  upsertMeta('name', 'robots', config.indexable === false ? 'noindex, nofollow' : 'index, follow')
  upsertMeta('property', 'og:title', config.title)
  upsertMeta('property', 'og:description', config.description)
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:type', config.type ?? 'website')
  upsertMeta('name', 'twitter:title', config.title)
  upsertMeta('name', 'twitter:description', config.description)
  upsertMeta('name', 'twitter:url', canonicalUrl)
  upsertLink('canonical', canonicalUrl)

  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'OpenCut Video',
      url: 'https://opencutvideo.com',
      sameAs: ['https://github.com/opencutvideo/supersolana', 'https://twitter.com/opencutvideo'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'SuperSolana',
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    ...(Array.isArray(config.schema) ? config.schema : config.schema ? [config.schema] : []),
  ]

  let schemaElement = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema]')
  if (!schemaElement) {
    schemaElement = document.createElement('script')
    schemaElement.type = 'application/ld+json'
    schemaElement.dataset.seoSchema = 'true'
    document.head.appendChild(schemaElement)
  }
  schemaElement.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })

  upsertMeta('property', 'og:site_name', 'SuperSolana')
  upsertMeta('property', 'og:locale', 'en_US')
  upsertMeta('property', 'og:image', DEFAULT_IMAGE)
  upsertMeta('property', 'og:image:alt', 'SuperSolana Solana AI agent tools')
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:image', DEFAULT_IMAGE)
  upsertMeta('name', 'twitter:image:alt', 'SuperSolana Solana AI agent tools')
}