#

Generated via [`nx-hardhat`](https://github.com/samatechtw/nx-hardhat)

## Usage

[Hardhat](https://hardhat.org/) is used for contract development and deploy.

**Compile contracts** (see [Environment](#environment))

```bash
$ npx nx compile nft
```

**Run tests**

```bash
$ npx nx test nft

# With coverage
$ npx nx test-coverage nft
```

**Lint**

```bash
# Tests and config files (JS/TS)
$ npx nx lint nft

# Contracts
$ npx nx lint-solidity nft
```

**Hardhat local blockchain node**

```bash
$ npx nx dev nft
```

**Deploy**

```bash
# To local node
$ npx nx deploy-dev nft

# To Ropsten testnet (needs "ROPSTEN_X" env vars)
$ npx nx deploy-testnet nft
```

**Misc**

```sh
# Clear cache and delete all artifacts
$ npx nx clean nft
```

## Environment

The repo comes with and example config in `.env.dist`. These represent the defaults; to modify them copy the file to `.env` and edit.

| Name              | Default | Description                                                             |
| ----------------- | ------- | ----------------------------------------------------------------------- |
| HARDHAT_LOGGING   | 1       | Logger switch                                                           |
| WALLET_MNEMONIC   | -       | Custom wallet mnemonic for local dev (for Metamask testing convenience) |
| ETHERSCAN_API_KEY | -       | API key for etherscan. Used for deployed contract verification.         |
| ROPSTEN_RPC_URL   | -       | RPC URL for ropsten testnet deploy                                      |
| ROPSTEN_MNEMONIC  | -       | Wallet mnemonic for ropsten deploy                                      |
| TEST_REPORT_GAS   | 1       | Report gas usage after test                                             |
