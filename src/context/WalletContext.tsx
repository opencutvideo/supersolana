import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type WalletType = 'metamask' | 'phantom' | 'email' | null

export interface UserSession {
  address: string
  walletType: WalletType
  email?: string
  username?: string
  joinedAt: string
  balance?: string
}

interface WalletContextType {
  session: UserSession | null
  isConnecting: boolean
  connectMetamask: () => Promise<void>
  connectPhantom: () => Promise<void>
  connectEmail: (email: string, password: string) => Promise<void>
  disconnect: () => void
  error: string | null
}

const WalletContext = createContext<WalletContextType | null>(null)

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
  const [error, setError] = useState<string | null>(null)

  const saveSession = (s: UserSession) => {
    setSession(s)
    localStorage.setItem('supersolana_session', JSON.stringify(s))
  }

  const connectMetamask = useCallback(async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const eth = (window as unknown as Record<string, unknown>).ethereum
      if (!eth) throw new Error('MetaMask is not installed. Install the MetaMask extension to continue.')
      const mm = eth as { request: (args: { method: string; params?: unknown[] }) => Promise<string[]> }
      const accounts = await mm.request({ method: 'eth_requestAccounts' })
      if (!accounts || accounts.length === 0) throw new Error('No accounts found.')
      const address = accounts[0]
      saveSession({
        address,
        walletType: 'metamask',
        username: address.slice(0, 6) + '...' + address.slice(-4),
        joinedAt: new Date().toISOString(),
        balance: '0.00 ETH',
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect MetaMask'
      setError(msg)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const connectPhantom = useCallback(async () => {
    setIsConnecting(true)
    setError(null)
    try {
      const win = window as unknown as Record<string, unknown>
      const solana = win.solana as { isPhantom?: boolean; connect: () => Promise<{ publicKey: { toString: () => string } }> } | undefined
      if (!solana || !solana.isPhantom) throw new Error('Phantom wallet is not installed. Install Phantom to continue.')
      const resp = await solana.connect()
      const address = resp.publicKey.toString()
      saveSession({
        address,
        walletType: 'phantom',
        username: address.slice(0, 6) + '...' + address.slice(-4),
        joinedAt: new Date().toISOString(),
        balance: '0.00 SOL',
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to connect Phantom'
      setError(msg)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const connectEmail = useCallback(async (email: string, _password: string) => {
    setIsConnecting(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 800))
      if (!email.includes('@')) throw new Error('Invalid email address.')
      const fakeAddress = '0x' + Array.from(email).map(c => c.charCodeAt(0).toString(16)).join('').slice(0, 40).padEnd(40, '0')
      saveSession({
        address: fakeAddress,
        walletType: 'email',
        email,
        username: email.split('@')[0],
        joinedAt: new Date().toISOString(),
      })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed'
      setError(msg)
    } finally {
      setIsConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setSession(null)
    localStorage.removeItem('supersolana_session')
  }, [])

  return (
    <WalletContext.Provider value={{ session, isConnecting, connectMetamask, connectPhantom, connectEmail, disconnect, error }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
