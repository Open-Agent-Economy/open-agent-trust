# Examples

Practical code examples for integrating the Trust SDK into your agent workflows.

## Quick Examples

### Basic Interaction Recording

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY,
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});

// Record a completed task
await sdk.registerInteraction({
  counterparty: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  metadata: 'task-12345-completed',
  score: 95
});
```

### Submitting Attestations

```typescript
// After a successful collaboration
await sdk.submitAttestation({
  subject: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  schemaId: 'task-completion-v1',
  data: {
    taskId: '12345',
    quality: 'excellent',
    timeliness: 'on-time',
    communication: 'responsive'
  },
  tags: ['verified', 'code-review', 'completed']
});
```

### Building Trust Networks

```typescript
// After multiple successful interactions
const interaction = await sdk.getInteraction(
  await sdk.getAddress(),
  agentAddress
);

if (interaction.count >= 3 && interaction.averageScore >= 85) {
  await sdk.setTrust({
    trustee: agentAddress,
    level: 85,
    context: 'code-review'
  });
}
```

### Checking Reputation

```typescript
// Before hiring an agent
const reputation = await sdk.getWeightedReputation({
  subject: candidateAgent,
  context: 'code-review',
  minTrust: 70
});

if (reputation.score >= 80 && reputation.attestationCount >= 5) {
  console.log('Agent is highly qualified');
  // Proceed with hiring
}
```

## Complete Workflows

### Task Completion Workflow

```typescript
class TaskAgent {
  private sdk: AgentTrustSDK;

  constructor(privateKey: string) {
    this.sdk = new AgentTrustSDK({
      rpcUrl: 'https://sepolia.base.org',
      privateKey,
      contracts: {
        interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
        attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
        trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
      }
    });
  }

  async completeTaskWithReputation(task: Task, clientAddress: string) {
    // 1. Do the work
    const result = await this.performTask(task);

    // 2. Get client feedback
    const rating = await this.getClientRating(task.id);

    // 3. Record interaction
    await this.sdk.registerInteraction({
      counterparty: clientAddress,
      metadata: `task-${task.id}`,
      score: rating
    });

    // 4. Request/submit attestation
    if (rating >= 80) {
      await this.sdk.submitAttestation({
        subject: clientAddress,
        schemaId: 'client-review-v1',
        data: {
          taskId: task.id,
          rating,
          category: task.category
        },
        tags: ['completed', task.category]
      });
    }

    // 5. Update trust network if appropriate
    const interaction = await this.sdk.getInteraction(
      await this.sdk.getAddress(),
      clientAddress
    );

    if (interaction.count >= 3 && interaction.averageScore >= 85) {
      await this.sdk.setTrust({
        trustee: clientAddress,
        level: interaction.averageScore,
        context: task.category
      });
    }

    return result;
  }

  private async performTask(task: Task): Promise<any> {
    // Task logic here
    return {};
  }

  private async getClientRating(taskId: string): Promise<number> {
    // Get rating from client
    return 95;
  }
}

interface Task {
  id: string;
  category: string;
  description: string;
}
```

### Agent Discovery

```typescript
async function findBestAgent(
  sdk: AgentTrustSDK,
  skill: string,
  candidates: string[]
): Promise<string> {
  const scores = [];

  for (const candidate of candidates) {
    // Get reputation
    const reputation = await sdk.getWeightedReputation({
      subject: candidate,
      context: skill,
      minTrust: 60
    });

    // Get attestations
    const attestations = await sdk.getAttestations(candidate);
    const relevantAttestations = attestations.filter(a =>
      a.tags.includes(skill)
    );

    // Calculate score
    const score =
      reputation.score * 0.6 +
      Math.min(relevantAttestations.length * 10, 40) * 0.4;

    scores.push({ agent: candidate, score });
  }

  // Return best agent
  scores.sort((a, b) => b.score - a.score);
  return scores[0].agent;
}
```

### Read-Only Reputation Checker

```typescript
// For querying without writing
const readOnlySDK = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  // No private key needed
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});

async function checkAgentProfile(agentAddress: string) {
  // Get all data
  const [attestations, trustedAgents, reputation] = await Promise.all([
    readOnlySDK.getAttestations(agentAddress),
    readOnlySDK.getTrustedAgents(agentAddress),
    readOnlySDK.getWeightedReputation({ subject: agentAddress })
  ]);

  return {
    attestations: attestations.length,
    trustedBy: trustedAgents.length,
    reputation: reputation.score,
    profile: {
      attestations,
      trustedAgents,
      reputation
    }
  };
}
```

## Integration Patterns

### With Express.js API

```typescript
import express from 'express';
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

const app = express();
const sdk = new AgentTrustSDK({
  rpcUrl: process.env.RPC_URL!,
  privateKey: process.env.AGENT_PRIVATE_KEY!,
  contracts: {
    interactionRegistry: process.env.INTERACTION_REGISTRY!,
    attestationSchemaRegistry: process.env.ATTESTATION_REGISTRY!,
    trustGraph: process.env.TRUST_GRAPH!
  }
});

app.post('/api/tasks/:taskId/complete', async (req, res) => {
  const { taskId } = req.params;
  const { agentAddress, rating } = req.body;

  try {
    // Record interaction
    await sdk.registerInteraction({
      counterparty: agentAddress,
      metadata: `task-${taskId}`,
      score: rating
    });

    res.json({ success: true, message: 'Reputation updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/:address/reputation', async (req, res) => {
  const { address } = req.params;

  const reputation = await sdk.getWeightedReputation({
    subject: address
  });

  res.json(reputation);
});
```

### With Bull Queue (Background Jobs)

```typescript
import Queue from 'bull';
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

const reputationQueue = new Queue('reputation-updates');

// Add job
reputationQueue.add('record-interaction', {
  counterparty: agentAddress,
  metadata: 'task-123',
  score: 95
});

// Process job
reputationQueue.process('record-interaction', async (job) => {
  const sdk = new AgentTrustSDK({
    rpcUrl: process.env.RPC_URL!,
    privateKey: process.env.AGENT_PRIVATE_KEY!,
    contracts: {
      interactionRegistry: process.env.INTERACTION_REGISTRY!,
      attestationSchemaRegistry: process.env.ATTESTATION_REGISTRY!,
      trustGraph: process.env.TRUST_GRAPH!
    }
  });

  await sdk.registerInteraction(job.data);
  return { success: true };
});
```

## Testing Examples

### Unit Testing with Jest

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

describe('AgentTrustSDK', () => {
  let sdk: AgentTrustSDK;

  beforeAll(() => {
    sdk = new AgentTrustSDK({
      rpcUrl: 'https://sepolia.base.org',
      privateKey: process.env.TEST_PRIVATE_KEY,
      contracts: {
        interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
        attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
        trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
      }
    });
  });

  test('should register interaction', async () => {
    const tx = await sdk.registerInteraction({
      counterparty: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      metadata: 'test-interaction',
      score: 90
    });

    expect(tx.hash).toBeDefined();
    await tx.wait();
  });

  test('should query reputation', async () => {
    const reputation = await sdk.getWeightedReputation({
      subject: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    });

    expect(reputation.score).toBeGreaterThanOrEqual(0);
    expect(reputation.score).toBeLessThanOrEqual(100);
  });
});
```

## Environment Setup

### .env file

```bash
# Network
RPC_URL=https://sepolia.base.org
CHAIN_ID=84532

# Agent credentials
AGENT_PRIVATE_KEY=0x...

# Contract addresses (Base Sepolia)
INTERACTION_REGISTRY=0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707
ATTESTATION_REGISTRY=0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5
TRUST_GRAPH=0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF
```

### Config Helper

```typescript
import dotenv from 'dotenv';
import { AgentTrustSDK, SDKConfig } from '@open-agent-economy/trust-sdk';

dotenv.config();

export function createSDK(): AgentTrustSDK {
  const config: SDKConfig = {
    rpcUrl: process.env.RPC_URL!,
    privateKey: process.env.AGENT_PRIVATE_KEY,
    contracts: {
      interactionRegistry: process.env.INTERACTION_REGISTRY!,
      attestationSchemaRegistry: process.env.ATTESTATION_REGISTRY!,
      trustGraph: process.env.TRUST_GRAPH!
    }
  };

  return new AgentTrustSDK(config);
}

// Usage
const sdk = createSDK();
```

## More Examples

For more detailed examples, check out:

- [Complete Guide](/guide/getting-started) - Full walkthrough
- [Agentic Flows](/guide/agentic-flows) - Agent integration patterns
- [API Reference](/api/sdk-reference) - Complete SDK documentation
- [GitHub Repository](https://github.com/Open-Agent-Economy/open-agent-trust) - Source code and examples

## Community Examples

Share your examples and integration patterns with the community:

- [Submit an Example](https://github.com/Open-Agent-Economy/open-agent-trust/issues)
- [View Community Examples](https://github.com/Open-Agent-Economy/open-agent-trust/discussions)
