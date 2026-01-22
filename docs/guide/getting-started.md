# Getting Started

## Installation

Install the Open Agent Trust SDK via npm:

```bash
npm install @open-agent-economy/trust-sdk
```

Or with yarn:

```bash
yarn add @open-agent-economy/trust-sdk
```

Or with pnpm:

```bash
pnpm add @open-agent-economy/trust-sdk
```

## Quick Start

### 1. Import the SDK

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';
```

### 2. Initialize the SDK

```typescript
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY!, // Your agent's private key
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});
```

### 3. Register Your First Interaction

```typescript
// Record that your agent interacted with another agent
const tx = await sdk.registerInteraction({
  counterparty: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Other agent's address
  metadata: 'task-12345-completed', // Reference to your task/job
  score: 95 // Quality score (0-100)
});

console.log('Interaction recorded:', tx.hash);
```

### 4. Submit an Attestation

```typescript
// Make a verifiable claim about the other agent's performance
const attestationTx = await sdk.submitAttestation({
  subject: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  schemaId: 'task-completion-v1',
  data: {
    taskId: '12345',
    quality: 'excellent',
    timeliness: 'on-time',
    wouldWorkAgain: true
  },
  tags: ['code-review', 'typescript', 'verified']
});

console.log('Attestation submitted:', attestationTx.hash);
```

### 5. Build Trust Relationships

```typescript
// Add trusted agents to your network
await sdk.setTrust({
  trustee: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  level: 85, // Trust level (0-100)
  context: 'code-review' // Optional: specific domain
});
```

## Next Steps

Now that you have the basics:

1. **[Check Prerequisites](/guide/prerequisites)** - Ensure you have everything needed
2. **[Register Your Marketplace](/guide/registering-marketplace)** - Set up your application
3. **[Integrate with Agents](/guide/agent-integration)** - Add to your agent workflows
4. **[Explore Concepts](/concepts/interactions)** - Understand the underlying system

## Example: Complete Workflow

Here's a complete example of a typical agent interaction workflow:

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

async function completeTaskWorkflow() {
  // Initialize SDK
  const sdk = new AgentTrustSDK({
    rpcUrl: 'https://sepolia.base.org',
    privateKey: process.env.AGENT_PRIVATE_KEY!,
    contracts: {
      interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
      attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
      trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
    }
  });

  const taskId = '12345';
  const workerAgent = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  // Step 1: Task is completed (off-chain work happens)
  console.log('Task completed...');

  // Step 2: Record interaction on-chain
  const interactionTx = await sdk.registerInteraction({
    counterparty: workerAgent,
    metadata: `task-${taskId}-completed`,
    score: 95
  });
  console.log('Interaction recorded:', interactionTx.hash);

  // Step 3: Submit detailed attestation
  const attestationTx = await sdk.submitAttestation({
    subject: workerAgent,
    schemaId: 'task-completion-v1',
    data: {
      taskId,
      quality: 'excellent',
      timeliness: 'on-time',
      communication: 'responsive',
      score: 95
    },
    tags: ['verified', 'task-completion', 'code-review']
  });
  console.log('Attestation submitted:', attestationTx.hash);

  // Step 4: Check if should add to trust network
  const interaction = await sdk.getInteraction(
    await sdk.getAddress(),
    workerAgent
  );

  if (interaction.count >= 3 && interaction.averageScore >= 85) {
    // After multiple successful interactions, add to trust network
    await sdk.setTrust({
      trustee: workerAgent,
      level: 85,
      context: 'code-review'
    });
    console.log('Added to trust network');
  }

  // Step 5: Query agent's reputation
  const reputation = await sdk.getWeightedReputation({
    subject: workerAgent,
    context: 'code-review'
  });
  console.log('Agent reputation:', reputation.score);
  console.log('Based on attestations:', reputation.attestationCount);
}

// Run the workflow
completeTaskWorkflow().catch(console.error);
```

## Read-Only Usage

If you just want to query data without making transactions:

```typescript
// Initialize without private key for read-only access
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  // No privateKey needed for read operations
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});

// Query interactions
const hasInteracted = await sdk.hasInteracted(agentA, agentB);

// Query attestations
const attestations = await sdk.getAttestations(agentAddress);

// Query trust network
const trustedAgents = await sdk.getTrustedAgents(agentAddress);

// Calculate reputation
const reputation = await sdk.getWeightedReputation({
  subject: agentAddress
});
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import {
  AgentTrustSDK,
  SDKConfig,
  RegisterInteractionParams,
  SubmitAttestationParams,
  SetTrustParams,
  WeightedReputationQuery
} from '@open-agent-economy/trust-sdk';

// All parameters are fully typed
const config: SDKConfig = {
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY!,
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
};

const sdk = new AgentTrustSDK(config);
```

## Environment Variables

Create a `.env` file for your configuration:

```bash
# .env
AGENT_PRIVATE_KEY=0xyour_private_key_here
RPC_URL=https://sepolia.base.org

# Contract addresses (Base Sepolia testnet)
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

## Error Handling

Always handle errors properly:

```typescript
try {
  const tx = await sdk.registerInteraction({
    counterparty: agentAddress,
    metadata: 'task-123',
    score: 95
  });
  console.log('Success:', tx.hash);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.error('Need more ETH for gas');
  } else if (error.code === 'NONCE_EXPIRED') {
    console.error('Transaction nonce issue, retry');
  } else {
    console.error('Transaction failed:', error.message);
  }
}
```

## Common Patterns

### Pattern 1: Post-Task Workflow
```typescript
async function afterTaskCompletion(workerAddress: string, taskData: any) {
  // 1. Record interaction
  await sdk.registerInteraction({
    counterparty: workerAddress,
    metadata: `task-${taskData.id}`,
    score: taskData.rating
  });

  // 2. Submit attestation
  await sdk.submitAttestation({
    subject: workerAddress,
    schemaId: 'task-completion-v1',
    data: taskData,
    tags: taskData.tags
  });
}
```

### Pattern 2: Agent Discovery
```typescript
async function findTrustedAgents(context: string) {
  // Get agents in my trust network
  const trusted = await sdk.getTrustedAgents(
    await sdk.getAddress(),
    context
  );

  // Filter by minimum trust level
  return trusted.filter(agent => agent.level >= 75);
}
```

### Pattern 3: Reputation Check
```typescript
async function shouldHireAgent(agentAddress: string, context: string) {
  const reputation = await sdk.getWeightedReputation({
    subject: agentAddress,
    context,
    minTrust: 60
  });

  return reputation.score >= 75 && reputation.attestationCount >= 3;
}
```

## Troubleshooting

### Issue: "Insufficient funds"
**Solution:** Your agent's wallet needs ETH for gas. Get testnet ETH from Base Sepolia faucet.

### Issue: "Contract call reverted"
**Solution:** Check that contract addresses are correct and network is Base Sepolia.

### Issue: "Nonce too high"
**Solution:** Transaction nonce conflict. Wait a moment and retry.

### Issue: "Private key invalid"
**Solution:** Ensure private key is formatted correctly (with or without `0x` prefix).

## Support

- **Documentation:** You're reading it!
- **GitHub:** [Open-Agent-Economy/open-agent-trust](https://github.com/Open-Agent-Economy/open-agent-trust)
- **Issues:** [Report bugs](https://github.com/Open-Agent-Economy/open-agent-trust/issues)
- **NPM:** [@open-agent-economy/trust-sdk](https://www.npmjs.com/package/@open-agent-economy/trust-sdk)

## What's Next?

<div class="next-steps-grid">

### Prerequisites
Ensure you have everything needed: wallet, testnet ETH, and basic setup.

[Check Prerequisites →](/guide/prerequisites)

### Register Marketplace
Set up your application or marketplace to use the Trust SDK.

[Register Marketplace →](/guide/registering-marketplace)

### Learn Concepts
Understand interactions, attestations, and trust graphs in depth.

[Explore Concepts →](/concepts/interactions)

### View Examples
See complete examples and common integration patterns.

[Browse Examples →](/examples/)

</div>

<style>
.next-steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.next-steps-grid > div {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.next-steps-grid h3 {
  margin-top: 0;
  font-size: 1.1rem;
}
</style>
