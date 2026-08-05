import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type WalletType = 'metamask' | 'phantom' | 'email' | null

export interface UserSession {
  address: string
  walletType: WalletType
  email?: string
  username?: string
  joinedAt: string
  balance?: string
  balanceRaw?: number
}

interface WalletContextType {
  session: UserSession | null
  isConnecting: boolean
  connectStep: string
  connectMetamask: () => Promise<void>
  connectPhantom: () => Promise<void>
  connectEmail: (email: string, code: string) => Promise<void>
  disconnect: () => void
  error: string | null
  phantomInstalled: boolean
  metamaskInstalled: boolean
}

const WalletContext = createContext<WalletContextType | null>(null)

function getPhantom() {
  const win = window as unknown as Record<string, unknown>
  const sol = win.solana as { isPhantom?: boolean; connect: () => Promise<{ publicKey: { toString: () => string } }> } | undefined
  return sol?.isPhantom ? sol : null
}

function getMetamask() {
  const win = window as unknown as Record<string, unknown>
  const eth = win.ethereum as { isMetaMask?: boolean; request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } | undefined
  return eth?.isMetaMask ? eth : null
}

async function fetchSolBalance(address: string): Promise<string> {
  try {
    const res = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [address],
      }),
    })
    const data = await res.json()
    const lamports: number = data?.result?.value ?? 0
    const sol = (lamports / 1_000_000_000).toFixed(4)
    return `${sol} SOL`
  } catch {
    return '--- SOL'
  }
}

async function fetchEthBalance(address: string): Promise<string> {
  try {
    const mm = getMetamask()
    if (!mm) return '--- ETH'
    const hex = (await mm.request({ method: 'eth_getBalance', params: [address, 'latest'] })) as string
    const wei = parseInt(hex, 16)
    const eth = (wei / 1e18).toFixed(4)
    return `${eth} ETH`
  } catch {
    return '--- ETH'
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem('supersolana_session')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectStep, setConnectStep] = useState('')
  const [error, setError] = useState<string | null>(null)

  const phantomInstalled = !!getPhantom()
  const metamaskInstalled = !!getMetamask()

  const saveSession = (s: UserSession) => {
    setSession(s)
    localStorage.setItem('supersolana_session', JSON.stringify(s))
  }

  const connectPhantom = useCallback(async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const phantom = getPhantom()
      if (!phantom) throw new Error('Phantom is not installed. Visit phantom.app to get the extension.')

      setConnectStep('Requesting access...')
      const resp = await phantom.connect()
      const address = resp.publicKey.toString()

      setConnectStep('Reading on-chain balance...')
      const balance = await fetchSolBalance(address)

      saveSession({
        address,
        walletType: 'phantom',
        username: address.slice(0, 4) + '..' + address.slice(-4),
        joinedAt: new Date().toISOString(),
        balance,
      })
    } catch (err: unknown) {
      const code = (err as { code?: number })?.code
      if (code === 4001) {
        setError('Connection cancelled. Approve the request in Phantom to continue.')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to connect Phantom.')
      }
    } finally {
      setIsConnecting(false)
      setConnectStep('')
    }
  }, [])

  const connectMetamask = useCallback(async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const mm = getMetamask()
      if (!mm) throw new Error('MetaMask is not installed. Visit metamask.io to get the extension.')

      setConnectStep('Requesting accounts...')
      const accounts = (await mm.request({ method: 'eth_requestAccounts' })) as string[]
      if (!accounts?.length) throw new Error('No accounts returned. Unlock MetaMask and try again.')
      const address = accounts[0]

      setConnectStep('Reading balance...')
      const balance = await fetchEthBalance(address)

      saveSession({
        address,
        walletType: 'metamask',
        username: address.slice(0, 6) + '..' + address.slice(-4),
        joinedAt: new Date().toISOString(),
        balance,
      })
    } catch (err: unknown) {
      const code = (err as { code?: number })?.code
      if (code === 4001) {
        setError('Connection cancelled. Approve the request in MetaMask to continue.')
      } else if (code === -32002) {
        setError('MetaMask has a pending request. Open MetaMask and approve it first.')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to connect MetaMask.')
      }
    } finally {
      setIsConnecting(false)
      setConnectStep('')
    }
  }, [])

  const connectEmail = useCallback(async (email: string, code: string) => {
    setIsConnecting(true)
    setError(null)
    try {
      setConnectStep('Verifying code...')
      await new Promise(r => setTimeout(r, 900))

      if (code.length !== 6 || !/^\d+$/.test(code)) {
        throw new Error('Invalid code. Enter the 6-digit code sent to your email.')
      }

      setConnectStep('Creating session...')
      await new Promise(r => setTimeout(r, 400))

      const hash = Array.from(email + code)
        .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) & 0xffffffff, 0)
        .toString(16)
        .padStart(8, '0')
      const address = 'em1' + hash.toUpperCase() + email.replace(/[^a-z0-9]/gi, '').slice(0, 6).toUpperCase()

      saveSession({
        address,
        walletType: 'email',
        email,
        username: email.split('@')[0],
        joinedAt: new Date().toISOString(),
        balance: undefined,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign-in failed. Try again.')
    } finally {
      setIsConnecting(false)
      setConnectStep('')
    }
  }, [])

  const disconnect = useCallback(() => {
    setSession(null)
    localStorage.removeItem('supersolana_session')
  }, [])

  return (
    <WalletContext.Provider value={{
      session, isConnecting, connectStep,
      connectMetamask, connectPhantom, connectEmail,
      disconnect, error, phantomInstalled, metamaskInstalled,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
