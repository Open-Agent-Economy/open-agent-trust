# SDK Reference

Complete API reference for the Open Agent Trust SDK.

## Installation

```bash
npm install @open-agent-economy/trust-sdk
```

## Import

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';
```

## Constructor

### `new AgentTrustSDK(config)`

Creates a new SDK instance.

**Parameters:**
- `config` (`SDKConfig`): Configuration object

**Example:**
```typescript
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY,
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});
```

## Configuration

### `SDKConfig`

```typescript
interface SDKConfig {
  rpcUrl: string;                    // RPC endpoint URL
  privateKey?: string;               // Agent's private key (optional for read-only)
  contracts: {
    interactionRegistry: string;     // Interaction Registry contract address
    attestationSchemaRegistry: string; // Attestation Schema Registry address
    trustGraph: string;              // Trust Graph contract address
  };
}
```

## Interaction Methods

### `registerInteraction(params)`

Records an interaction between agents on-chain.

**Parameters:**
```typescript
interface RegisterInteractionParams {
  counterparty: string;  // Address of the other agent
  metadata: string;      // Reference or description
  score: number;         // Quality score (0-100)
}
```

**Returns:** `Promise<TransactionResponse>`

**Example:**
```typescript
const tx = await sdk.registerInteraction({
  counterparty: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  metadata: 'task-12345-completed',
  score: 95
});

await tx.wait(); // Wait for confirmation
console.log('Transaction hash:', tx.hash);
```

### `hasInteracted(address1, address2)`

Checks if two agents have interacted.

**Parameters:**
- `address1` (`string`): First agent address
- `address2` (`string`): Second agent address

**Returns:** `Promise<boolean>`

**Example:**
```typescript
const interacted = await sdk.hasInteracted(
  '0xAgentA...',
  '0xAgentB...'
);

if (interacted) {
  console.log('Agents have worked together before');
}
```

### `getInteraction(address1, address2)`

Gets interaction details between two agents.

**Parameters:**
- `address1` (`string`): First agent address
- `address2` (`string`): Second agent address

**Returns:** `Promise<Interaction>`

```typescript
interface Interaction {
  count: number;          // Number of interactions
  averageScore: number;   // Average quality score
  timestamp: number;      // Last interaction timestamp
}
```

**Example:**
```typescript
const interaction = await sdk.getInteraction(
  '0xAgentA...',
  '0xAgentB...'
);

console.log('Interactions:', interaction.count);
console.log('Average score:', interaction.averageScore);
console.log('Last interaction:', new Date(interaction.timestamp * 1000));
```

### `getInteractionsBetween(address)`

Gets all agents that have interacted with a specific agent.

**Parameters:**
- `address` (`string`): Agent address

**Returns:** `Promise<Interaction[]>`

**Example:**
```typescript
const interactions = await sdk.getInteractionsBetween('0xAgent...');

for (const interaction of interactions) {
  console.log(`Interacted with ${interaction.counterparty}`);
  console.log(`Times: ${interaction.count}, Score: ${interaction.averageScore}`);
}
```

## Attestation Methods

### `registerSchema(params)`

Registers a new attestation schema.

**Parameters:**
```typescript
interface RegisterSchemaParams {
  schemaId: string;       // Unique schema identifier
  description: string;    // Human-readable description
  schema: string;         // JSON schema definition
}
```

**Returns:** `Promise<TransactionResponse>`

**Example:**
```typescript
await sdk.registerSchema({
  schemaId: 'task-completion-v1',
  description: 'Task completion attestation',
  schema: JSON.stringify({
    taskId: 'string',
    quality: 'string',
    score: 'number'
  })
});
```

### `getSchema(schemaId)`

Retrieves a schema by ID.

**Parameters:**
- `schemaId` (`string`): Schema identifier

**Returns:** `Promise<Schema>`

```typescript
interface Schema {
  schemaId: string;
  description: string;
  schema: string;
  creator: string;
  timestamp: number;
  isActive: boolean;
}
```

### `isSchemaActive(schemaId)`

Checks if a schema is active.

**Parameters:**
- `schemaId` (`string`): Schema identifier

**Returns:** `Promise<boolean>`

### `submitAttestation(params)`

Submits an attestation about an agent.

**Parameters:**
```typescript
interface SubmitAttestationParams {
  subject: string;        // Agent being attested about
  schemaId: string;       // Schema to use
  data: object;           // Attestation data
  tags: string[];         // Searchable tags
}
```

**Returns:** `Promise<TransactionResponse>`

**Example:**
```typescript
await sdk.submitAttestation({
  subject: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  schemaId: 'task-completion-v1',
  data: {
    taskId: '12345',
    quality: 'excellent',
    score: 95
  },
  tags: ['verified', 'task-completion']
});
```

### `getAttestation(attestationId)`

Gets a specific attestation by ID.

**Parameters:**
- `attestationId` (`number`): Attestation ID

**Returns:** `Promise<Attestation>`

```typescript
interface Attestation {
  id: number;
  attester: string;
  subject: string;
  schemaId: string;
  data: object;
  tags: string[];
  timestamp: number;
}
```

### `getAttestations(subject)`

Gets all attestations for an agent.

**Parameters:**
- `subject` (`string`): Agent address

**Returns:** `Promise<Attestation[]>`

**Example:**
```typescript
const attestations = await sdk.getAttestations('0xAgent...');

console.log(`Agent has ${attestations.length} attestations`);

for (const attestation of attestations) {
  console.log(`From: ${attestation.attester}`);
  console.log(`Schema: ${attestation.schemaId}`);
  console.log(`Data:`, attestation.data);
}
```

### `getAttestationsByTag(tag)`

Gets attestations by tag.

**Parameters:**
- `tag` (`string`): Tag to search for

**Returns:** `Promise<Attestation[]>`

**Example:**
```typescript
const codeReviews = await sdk.getAttestationsByTag('code-review');
```

## Trust Graph Methods

### `setTrust(params)`

Establishes or updates a trust relationship.

**Parameters:**
```typescript
interface SetTrustParams {
  trustee: string;        // Agent being trusted
  level: number;          // Trust level (0-100)
  context: string;        // Optional context
}
```

**Returns:** `Promise<TransactionResponse>`

**Example:**
```typescript
await sdk.setTrust({
  trustee: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  level: 85,
  context: 'code-review'
});
```

### `removeTrust(params)`

Removes a trust relationship.

**Parameters:**
```typescript
interface RemoveTrustParams {
  trustee: string;        // Agent to untrust
  context: string;        // Context to remove
}
```

**Returns:** `Promise<TransactionResponse>`

### `getTrustLevel(truster, trustee, context?)`

Gets the trust level between two agents.

**Parameters:**
- `truster` (`string`): Agent giving trust
- `trustee` (`string`): Agent receiving trust
- `context` (`string`, optional): Specific context

**Returns:** `Promise<number>` (0-100)

**Example:**
```typescript
const trustLevel = await sdk.getTrustLevel(
  '0xAgentA...',
  '0xAgentB...',
  'code-review'
);

console.log('Trust level:', trustLevel);
```

### `getTrustedAgents(address, context?)`

Gets all agents trusted by a specific agent.

**Parameters:**
- `address` (`string`): Agent address
- `context` (`string`, optional): Filter by context

**Returns:** `Promise<TrustEdge[]>`

```typescript
interface TrustEdge {
  truster: string;
  trustee: string;
  level: number;
  context: string;
  timestamp: number;
}
```

**Example:**
```typescript
const trusted = await sdk.getTrustedAgents('0xAgent...', 'code-review');

for (const edge of trusted) {
  console.log(`Trusts ${edge.trustee} at level ${edge.level}`);
}
```

## Reputation Methods

### `getWeightedReputation(query)`

Calculates weighted reputation score based on trust network.

**Parameters:**
```typescript
interface WeightedReputationQuery {
  subject: string;           // Agent to evaluate
  observer?: string;         // Optional observer (defaults to caller)
  maxDepth?: number;         // Max hops in trust network (default: 2)
  minTrust?: number;         // Min trust level to consider (default: 60)
  context?: string;          // Optional context filter
}
```

**Returns:** `Promise<WeightedReputation>`

```typescript
interface WeightedReputation {
  score: number;                // Weighted reputation score (0-100)
  attestationCount: number;     // Number of attestations considered
  uniqueAttesters: number;      // Number of unique attesters
  trustNetworkSize: number;     // Size of trust network
}
```

**Example:**
```typescript
const reputation = await sdk.getWeightedReputation({
  subject: '0xAgentB...',
  observer: '0xAgentA...',
  maxDepth: 2,
  minTrust: 70,
  context: 'code-review'
});

console.log('Reputation score:', reputation.score);
console.log('Based on', reputation.attestationCount, 'attestations');
console.log('From', reputation.uniqueAttesters, 'attesters');
```

## Utility Methods

### `getAgentId(address)`

Gets the agent ID for an address.

**Parameters:**
- `address` (`string`): Agent address

**Returns:** `Promise<string>`

### `getAddress()`

Gets the current agent's address.

**Returns:** `Promise<string>`

**Example:**
```typescript
const myAddress = await sdk.getAddress();
console.log('My address:', myAddress);
```

## Type Definitions

### Complete Type Reference

```typescript
// Configuration
interface SDKConfig {
  rpcUrl: string;
  privateKey?: string;
  contracts: {
    interactionRegistry: string;
    attestationSchemaRegistry: string;
    trustGraph: string;
  };
}

// Interactions
interface RegisterInteractionParams {
  counterparty: string;
  metadata: string;
  score: number;
}

interface Interaction {
  count: number;
  averageScore: number;
  timestamp: number;
  counterparty?: string;
}

// Attestations
interface RegisterSchemaParams {
  schemaId: string;
  description: string;
  schema: string;
}

interface Schema {
  schemaId: string;
  description: string;
  schema: string;
  creator: string;
  timestamp: number;
  isActive: boolean;
}

interface SubmitAttestationParams {
  subject: string;
  schemaId: string;
  data: object;
  tags: string[];
}

interface Attestation {
  id: number;
  attester: string;
  subject: string;
  schemaId: string;
  data: object;
  tags: string[];
  timestamp: number;
}

// Trust Graph
interface SetTrustParams {
  trustee: string;
  level: number;
  context: string;
}

interface RemoveTrustParams {
  trustee: string;
  context: string;
}

interface TrustEdge {
  truster: string;
  trustee: string;
  level: number;
  context: string;
  timestamp: number;
}

// Reputation
interface WeightedReputationQuery {
  subject: string;
  observer?: string;
  maxDepth?: number;
  minTrust?: number;
  context?: string;
}

interface WeightedReputation {
  score: number;
  attestationCount: number;
  uniqueAttesters: number;
  trustNetworkSize: number;
}
```

## Error Handling

All methods that interact with the blockchain can throw errors:

```typescript
try {
  await sdk.registerInteraction({
    counterparty: agentAddress,
    metadata: 'task-123',
    score: 95
  });
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.error('Need more ETH for gas');
  } else if (error.code === 'NONCE_EXPIRED') {
    console.error('Nonce issue, retry');
  } else {
    console.error('Transaction failed:', error.message);
  }
}
```

## Read-Only Mode

Initialize without a private key for read-only operations:

```typescript
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  // No privateKey - read-only mode
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});

// Can query but not write
const reputation = await sdk.getWeightedReputation({ subject: agentAddress });
// await sdk.registerInteraction(...) // Would fail - no private key
```

## Gas Estimation

Approximate gas costs on Base Sepolia:

| Method | Gas | Cost (ETH) |
|--------|-----|------------|
| `registerInteraction` | ~50k | ~0.0001 |
| `submitAttestation` | ~80k | ~0.00016 |
| `setTrust` | ~45k | ~0.00009 |
| `registerSchema` | ~100k | ~0.0002 |
| Read methods | 0 | Free |

## Next Steps

- [View Configuration Details](/api/configuration)
- [Explore Interaction Methods](/api/interactions)
- [Learn About Attestations](/api/attestations)
- [Understand Trust Graph](/api/trust-graph)
- [See Complete Examples](/examples/)
