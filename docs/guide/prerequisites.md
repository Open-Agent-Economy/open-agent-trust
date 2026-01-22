# Prerequisites

Before integrating the Open Agent Trust SDK, ensure you have the following prerequisites in place.

## 1. Agent Wallet Address

Every agent needs a wallet address to interact with the blockchain. This wallet serves as the agent's identity.

### Creating a Wallet

You have several options:

#### Option A: Generate with ethers.js

```typescript
import { Wallet } from 'ethers';

// Generate a new random wallet
const wallet = Wallet.createRandom();

console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
// Store private key securely! Never commit to code or share publicly
```

#### Option B: Use Existing Wallet

If your agent already has a wallet (from Metamask, hardware wallet, etc.), you can use that address and private key.

#### Option C: Use Wallet-as-a-Service Providers

For production agents, consider managed wallet services:

**Privy** (https://privy.io)
- Embedded wallets for agents
- MPC (Multi-Party Computation) security
- Easy integration

```typescript
import { PrivyClient } from '@privy-io/server-auth';

const privy = new PrivyClient(process.env.PRIVY_APP_ID!, process.env.PRIVY_APP_SECRET!);

// Create wallet for agent
const user = await privy.createUser({ linkedAccounts: [] });
const wallet = await privy.createWallet({ userId: user.id });
```

**Turnkey** (https://turnkey.com)
- API-driven wallet infrastructure
- Non-custodial, secure key management
- Perfect for autonomous agents

**Dynamic** (https://dynamic.xyz)
- Embedded wallet infrastructure
- Multi-chain support
- Developer-friendly APIs

### Wallet Security Best Practices

**DO:**
- Store private keys in environment variables
- Use secret management systems (AWS Secrets Manager, HashiCorp Vault)
- Implement key rotation policies
- Use MPC or HSM for high-value agents
- Keep separate wallets for dev/test/prod

**DON'T:**
- Hardcode private keys in source code
- Commit private keys to git repositories
- Share private keys across agents
- Use same wallet for dev and production
- Store private keys in plaintext files

### Environment Setup

```bash
# .env file
AGENT_PRIVATE_KEY=0x... # Your agent's private key
AGENT_ADDRESS=0x...     # Your agent's public address (for reference)
```

## 2. Testnet ETH (Base Sepolia)

Your agent needs ETH to pay for transaction gas fees on the Base Sepolia testnet.

### Getting Testnet ETH

#### Option 1: Base Sepolia Faucet

1. **Visit Base Sepolia Faucet:**
   - https://www.coinbase.com/faucets/base-sepolia-faucet
   - Or https://faucet.quicknode.com/base/sepolia

2. **Enter your agent's wallet address**

3. **Complete verification** (usually requires Coinbase account or social auth)

4. **Receive testnet ETH** (usually 0.05-0.1 ETH)

#### Option 2: Sepolia ETH Bridge

If you have Sepolia ETH:

1. Get Sepolia ETH from https://sepoliafaucet.com
2. Bridge to Base Sepolia: https://bridge.base.org/deposit

#### Option 3: Multi-Chain Faucets

- **Alchemy Faucet:** https://sepoliafaucet.com
- **QuickNode Faucet:** https://faucet.quicknode.com
- **Chainlist Faucets:** https://chainlist.org (search "Base Sepolia")

### Checking Your Balance

```typescript
import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider('https://sepolia.base.org');
const balance = await provider.getBalance('YOUR_AGENT_ADDRESS');

console.log('Balance:', balance.toString(), 'wei');
console.log('Balance:', balance / BigInt(10**18), 'ETH');
```

### How Much ETH Do You Need?

Typical transaction costs on Base Sepolia:

| Operation | Gas Cost | ETH Cost (approx) |
|-----------|----------|-------------------|
| Register Interaction | ~50k gas | ~0.0001 ETH |
| Submit Attestation | ~80k gas | ~0.00016 ETH |
| Set Trust | ~45k gas | ~0.00009 ETH |
| Register Schema | ~100k gas | ~0.0002 ETH |

**Recommendation:** Start with **0.05 ETH** for testing (enough for ~300 transactions).

## 3. RPC Endpoint

You need an RPC endpoint to connect to the Base Sepolia network.

### Option 1: Public RPC (Quick Start)

```typescript
const rpcUrl = 'https://sepolia.base.org';
```

**Limitations:**
- Rate limited
- Shared with other users
- May be slow during high traffic

### Option 2: Dedicated RPC Providers (Recommended)

For production agents, use dedicated RPC services:

#### Alchemy

1. Sign up at https://www.alchemy.com
2. Create an app for "Base Sepolia"
3. Get your API key

```typescript
const rpcUrl = `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
```

**Benefits:**
- High reliability
- Better rate limits
- Advanced features (webhooks, analytics)
- Free tier available

#### QuickNode

1. Sign up at https://www.quicknode.com
2. Create endpoint for "Base Sepolia"
3. Get your endpoint URL

```typescript
const rpcUrl = process.env.QUICKNODE_URL;
```

**Benefits:**
- Very fast
- Global network
- Good free tier
- Excellent documentation

#### Infura

1. Sign up at https://infura.io
2. Create project for "Base Sepolia"
3. Get your project ID

```typescript
const rpcUrl = `https://base-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
```

**Benefits:**
- Reliable and established
- Good free tier
- Multi-chain support

### RPC Configuration

```typescript
// .env
RPC_URL=https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY

// In code
import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider(process.env.RPC_URL);
```

## 4. Development Environment

### Node.js

Minimum version: **Node.js 16+**

Check your version:
```bash
node --version  # Should be v16.0.0 or higher
```

Install/upgrade:
- **Mac/Linux:** Use [nvm](https://github.com/nvm-sh/nvm)
  ```bash
  nvm install 20
  nvm use 20
  ```
- **Windows:** Download from [nodejs.org](https://nodejs.org)

### Package Manager

Use npm, yarn, or pnpm:

```bash
# npm (comes with Node.js)
npm --version

# yarn (optional)
npm install -g yarn

# pnpm (optional)
npm install -g pnpm
```

### TypeScript (Optional but Recommended)

```bash
npm install -g typescript
```

The SDK is written in TypeScript and provides full type definitions, but you can use it with JavaScript too.

## 5. Contract Addresses

You need the deployed contract addresses for Base Sepolia testnet.

### Base Sepolia Testnet Addresses

```typescript
const contracts = {
  interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
  attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
  trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
};
```

These addresses are for the **Base Sepolia testnet** and are ready to use immediately.

::: tip
These contracts are already deployed and funded. You can start testing right away!
:::

### Network Details

| Parameter | Value |
|-----------|-------|
| **Network Name** | Base Sepolia |
| **Chain ID** | 84532 |
| **Currency** | ETH |
| **RPC URL** | https://sepolia.base.org |
| **Explorer** | https://sepolia.basescan.org |

### Adding Base Sepolia to MetaMask

If you want to view your agent's wallet in MetaMask:

1. Open MetaMask
2. Click network dropdown → "Add Network"
3. Fill in the details above
4. Save

## 6. Optional Tools

### Block Explorer

View transactions and contracts:
- **Base Sepolia Explorer:** https://sepolia.basescan.org
- Search by transaction hash, address, or block

### Agent Framework Integration

If you're using an agent framework:

#### LangChain
```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';
import { Tool } from 'langchain/tools';

class TrustSDKTool extends Tool {
  name = 'trust_sdk';
  description = 'Record agent interactions and attestations on-chain';

  async _call(input: string) {
    // Use SDK here
    return result;
  }
}
```

#### AutoGPT / Agent Protocol
```python
# Python wrapper (community-maintained)
from agent_trust import AgentTrustClient

client = AgentTrustClient(
    rpc_url="https://sepolia.base.org",
    private_key=os.getenv("AGENT_PRIVATE_KEY")
)
```

### Testing Tools

**Hardhat** - For contract testing:
```bash
npm install --save-dev hardhat
```

**Jest** - For SDK testing:
```bash
npm install --save-dev jest @types/jest
```

## Quick Setup Checklist

Use this checklist to ensure you're ready:

- [ ] Agent wallet created
- [ ] Private key stored securely in environment variables
- [ ] Testnet ETH obtained (check balance)
- [ ] RPC endpoint configured (public or dedicated)
- [ ] Node.js 16+ installed
- [ ] SDK installed (`npm install @open-agent-economy/trust-sdk`)
- [ ] Contract addresses noted
- [ ] Environment variables set up

## Example: Complete Setup

Here's a complete setup script:

```typescript
// setup.ts
import { Wallet, JsonRpcProvider } from 'ethers';
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';
import dotenv from 'dotenv';

dotenv.config();

async function verifySetup() {
  console.log('🔍 Verifying setup...\n');

  // 1. Check environment variables
  if (!process.env.AGENT_PRIVATE_KEY) {
    console.error('❌ AGENT_PRIVATE_KEY not set');
    return;
  }
  console.log('✅ Private key found');

  // 2. Check wallet
  const wallet = new Wallet(process.env.AGENT_PRIVATE_KEY);
  console.log('✅ Wallet address:', wallet.address);

  // 3. Check RPC connection
  const provider = new JsonRpcProvider(process.env.RPC_URL || 'https://sepolia.base.org');
  try {
    const network = await provider.getNetwork();
    console.log('✅ Connected to network:', network.name, `(Chain ID: ${network.chainId})`);
  } catch (error) {
    console.error('❌ Failed to connect to RPC');
    return;
  }

  // 4. Check balance
  const balance = await provider.getBalance(wallet.address);
  console.log('✅ Balance:', (Number(balance) / 10**18).toFixed(6), 'ETH');

  if (balance === 0n) {
    console.warn('⚠️  Balance is 0! Get testnet ETH from faucet.');
  }

  // 5. Initialize SDK
  try {
    const sdk = new AgentTrustSDK({
      rpcUrl: process.env.RPC_URL || 'https://sepolia.base.org',
      privateKey: process.env.AGENT_PRIVATE_KEY,
      contracts: {
        interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
        attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
        trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
      }
    });
    console.log('✅ SDK initialized');

    // Test read operation
    const agentId = await sdk.getAgentId(wallet.address);
    console.log('✅ Agent ID:', agentId);
  } catch (error) {
    console.error('❌ SDK initialization failed:', error.message);
    return;
  }

  console.log('\n✅ Setup complete! Ready to build trusted agent networks.');
}

verifySetup().catch(console.error);
```

Run this script to verify your setup:

```bash
npx ts-node setup.ts
```

## Troubleshooting

### "Insufficient funds" Error
**Problem:** Your wallet doesn't have enough ETH for gas.
**Solution:** Get testnet ETH from faucet (see above).

### "Invalid private key" Error
**Problem:** Private key format is incorrect.
**Solution:** Ensure private key starts with `0x` or remove the prefix depending on your setup.

### "Network connection failed" Error
**Problem:** Cannot connect to RPC endpoint.
**Solution:**
- Check internet connection
- Verify RPC URL is correct
- Try a different RPC provider

### "Contract not found" Error
**Problem:** Wrong network or contract address.
**Solution:**
- Ensure you're on Base Sepolia (chain ID: 84532)
- Double-check contract addresses
- Verify network in MetaMask/wallet

## Next Steps

Once you have all prerequisites:

1. **[Quick Start Guide](/guide/getting-started)** - Install and use the SDK
2. **[Register Your Marketplace](/guide/registering-marketplace)** - Set up your application
3. **[Integration Guide](/guide/agent-integration)** - Add to your agents

## Need Help?

- **Faucet Issues:** Try multiple faucets listed above
- **Wallet Issues:** Check [ethers.js documentation](https://docs.ethers.org)
- **RPC Issues:** Contact your RPC provider support
- **SDK Issues:** [Open an issue on GitHub](https://github.com/Open-Agent-Economy/open-agent-trust/issues)
