# Deployment Addresses

The Open Agent Trust Protocol is currently deployed on Base Sepolia testnet for immediate testing and development.

## Base Sepolia Testnet

### Contract Addresses

| Contract | Address | Explorer |
|----------|---------|----------|
| **Interaction Registry** | `0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707` | [View on BaseScan](https://sepolia.basescan.org/address/0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707) |
| **Attestation Schema Registry** | `0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5` | [View on BaseScan](https://sepolia.basescan.org/address/0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5) |
| **Trust Graph** | `0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF` | [View on BaseScan](https://sepolia.basescan.org/address/0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF) |

### Network Details

| Parameter | Value |
|-----------|-------|
| **Network Name** | Base Sepolia |
| **Chain ID** | 84532 |
| **Currency Symbol** | ETH |
| **RPC URL** | `https://sepolia.base.org` |
| **Block Explorer** | `https://sepolia.basescan.org` |
| **Faucet** | [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-sepolia-faucet) |

## SDK Configuration

Use these addresses to initialize the SDK:

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY!,
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});
```

## Environment Variables

Create a `.env` file with these values:

```bash
# Network
RPC_URL=https://sepolia.base.org
CHAIN_ID=84532

# Your agent's credentials
AGENT_PRIVATE_KEY=0x...

# Contract Addresses (Base Sepolia)
INTERACTION_REGISTRY=0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707
ATTESTATION_REGISTRY=0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5
TRUST_GRAPH=0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF
```

Then use in your code:

```typescript
import 'dotenv/config';

const sdk = new AgentTrustSDK({
  rpcUrl: process.env.RPC_URL!,
  privateKey: process.env.AGENT_PRIVATE_KEY!,
  contracts: {
    interactionRegistry: process.env.INTERACTION_REGISTRY!,
    attestationSchemaRegistry: process.env.ATTESTATION_REGISTRY!,
    trustGraph: process.env.TRUST_GRAPH!
  }
});
```

## Why Base Sepolia?

### Benefits of Base

- **Low Cost**: Transactions cost a fraction of a cent
- **Fast**: 2-second block times
- **EVM Compatible**: Works with all Ethereum tools
- **Coinbase Backed**: Reliable infrastructure
- **Easy Onboarding**: Simple faucet access

### Base Sepolia Testnet Features

- **Free ETH**: Get testnet ETH from faucets
- **No Risk**: Test without real money
- **Fast Iteration**: Deploy and test quickly
- **Production-like**: Same behavior as mainnet

## Getting Testnet ETH

Your agent needs ETH to pay for transaction gas fees.

### Option 1: Base Sepolia Faucet

1. Visit: https://www.coinbase.com/faucets/base-sepolia-faucet
2. Connect wallet or enter address
3. Complete verification
4. Receive 0.05-0.1 ETH

### Option 2: Bridge from Sepolia

If you have Sepolia ETH:

1. Get Sepolia ETH: https://sepoliafaucet.com
2. Bridge to Base: https://bridge.base.org/deposit
3. Switch to Base Sepolia network

### Option 3: Multi-Chain Faucets

- **QuickNode**: https://faucet.quicknode.com/base/sepolia
- **Alchemy**: https://www.alchemy.com/faucets/base-sepolia
- **Chainlist**: https://chainlist.org (search "Base Sepolia")

## Contract ABIs

The SDK includes contract ABIs, but if you need them separately:

### Interaction Registry ABI

Located in the SDK at: `node_modules/@open-agent-economy/trust-sdk/dist/contracts/InteractionRegistry.json`

### Attestation Schema Registry ABI

Located in the SDK at: `node_modules/@open-agent-economy/trust-sdk/dist/contracts/AttestationSchemaRegistry.json`

### Trust Graph ABI

Located in the SDK at: `node_modules/@open-agent-economy/trust-sdk/dist/contracts/TrustGraph.json`

## Verifying Contracts

All contracts are verified on BaseScan. You can:

1. View source code
2. Read contract state
3. Write to contract (if you have ETH)
4. View transaction history

### Example: View Interaction Count

1. Go to: https://sepolia.basescan.org/address/0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707#readContract
2. Connect wallet (optional, for read operations)
3. Call `getInteraction` with two addresses
4. View interaction count and details

## Gas Costs

Approximate gas costs on Base Sepolia:

| Operation | Gas Used | ETH Cost | USD Cost |
|-----------|----------|----------|----------|
| Register Interaction | ~50,000 | ~0.0001 ETH | ~$0.0002 |
| Submit Attestation | ~80,000 | ~0.00016 ETH | ~$0.0003 |
| Set Trust | ~45,000 | ~0.00009 ETH | ~$0.00018 |
| Register Schema | ~100,000 | ~0.0002 ETH | ~$0.0004 |
| Query (read) | 0 | 0 ETH | $0 |

::: tip
0.1 ETH on Base Sepolia is enough for approximately 600+ transactions!
:::

## Future Deployments

### Coming Soon

- **Base Mainnet**: Production deployment (Q2 2024)
- **Optimism**: Layer 2 deployment
- **Arbitrum**: Additional L2 option
- **Polygon**: EVM sidechain support

### Multi-Chain Strategy

The protocol is designed to be chain-agnostic. Future versions will support:

- Cross-chain agent identity
- Multi-chain reputation aggregation
- Bridge-based trust transfer

## Upgradeability

### Current Status

Contracts on Base Sepolia are **non-upgradeable** to ensure:
- Immutable history
- Predictable behavior
- No rug-pull risk

### New Features

New features will be deployed as:
- Additional contracts (modular design)
- Optional extensions
- Backward compatible

## Monitoring

### Block Explorer

Monitor all on-chain activity:
- **Base Sepolia Explorer**: https://sepolia.basescan.org

Search by:
- Transaction hash
- Wallet address
- Contract address
- Block number

### Network Status

Check network health:
- **Base Status**: https://status.base.org
- **RPC Health**: https://chainlist.org/chain/84532

## Developer Tools

### Hardhat Configuration

```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 84532
    }
  },
  etherscan: {
    apiKey: {
      baseSepolia: process.env.BASESCAN_API_KEY
    }
  }
};
```

### Foundry Configuration

```toml
# foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]

[rpc_endpoints]
base_sepolia = "https://sepolia.base.org"

[etherscan]
base_sepolia = { key = "${BASESCAN_API_KEY}", chain = 84532 }
```

### Web3.py Configuration

```python
from web3 import Web3

# Connect to Base Sepolia
w3 = Web3(Web3.HTTPProvider('https://sepolia.base.org'))

# Verify connection
print(f"Connected: {w3.is_connected()}")
print(f"Chain ID: {w3.eth.chain_id}")

# Load contract
interaction_registry = w3.eth.contract(
    address='0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    abi=interaction_registry_abi
)
```

## Support & Resources

### Official Links

- **Documentation**: https://docs.open-agent-economy.org
- **GitHub**: https://github.com/Open-Agent-Economy/open-agent-trust
- **NPM Package**: https://www.npmjs.com/package/@open-agent-economy/trust-sdk

### Base Resources

- **Base Docs**: https://docs.base.org
- **Base Discord**: https://discord.gg/buildonbase
- **Base Twitter**: https://twitter.com/base

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/Open-Agent-Economy/open-agent-trust/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Open-Agent-Economy/open-agent-trust/discussions)

## Testing Checklist

Before going to production, verify:

- [ ] Contracts are correct addresses
- [ ] Network is Base Sepolia (Chain ID: 84532)
- [ ] Agent wallet has testnet ETH
- [ ] RPC endpoint is responding
- [ ] Transactions are being confirmed
- [ ] Read operations return expected data
- [ ] Explorer shows your transactions

## Next Steps

Now that you know the deployment details:

1. **[Get Testnet ETH](/guide/prerequisites#_2-testnet-eth-base-sepolia)** - Fund your agent wallet
2. **[Quick Start](/guide/getting-started)** - Start building
3. **[Test Your Integration](/guide/testing)** - Verify everything works

