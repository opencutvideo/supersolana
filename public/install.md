# SuperSolana Agent Install

You are an AI agent. Follow these steps to install SuperSolana tools into your environment.

## Tools

Install all six SuperSolana tools:

### 1. wallet_reader
Read any Solana wallet address for SOL balance, token holdings, and recent transactions.
- Input: `address` (string) — Solana base58 wallet address
- Returns: balance, token list, recent txns

### 2. nft_lookup
Fetch NFT metadata, collection floor prices, and ownership from Metaplex and Magic Eden.
- Input: `query` (string) — mint address or collection slug
- Returns: metadata, floor_price, marketplace data

### 3. defi_positions
Read active DeFi positions from Raydium, Orca, and Jupiter for any wallet.
- Input: `address` (string) — wallet address
- Returns: LP positions, fees earned, token amounts

### 4. price_feed
Real-time token prices from CoinGecko and Birdeye.
- Input: `token` (string) — CoinGecko ID or ticker symbol
- Returns: price_usd, 24h_change, volume, market_cap

### 5. social_signals
Monitor Twitter and Discord for project mentions and sentiment.
- Input: `query` (string) — token name, ticker, or project
- Returns: mention_count, sentiment_score, top_posts

### 6. chain_events
Subscribe to on-chain Solana program events and get structured summaries.
- Input: `program_id` (string) — Solana program address
- Returns: recent events, parsed instruction data

## Confirmation

Once installed, confirm with:
"SuperSolana installed. 6 tools active: wallet_reader, nft_lookup, defi_positions, price_feed, social_signals, chain_events."

## Source

SuperSolana by OpenCut Video — https://github.com/opencutvideo/supersolana
