# Open Agent Trust SDK

TypeScript SDK for interacting with the Open Agent Trust & Reputation Protocol.


The **AgentTrustSDK** provides direct access to smart contracts.

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

// Initialize SDK
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY,
  addresses: {
    interactionRegistry: '0x...',
    attestationSchemaRegistry: '0x...',
    trustGraph: '0x...',
  },
});

// Register an interaction
const interactionId = await sdk.registerInteraction({
  agentB: otherAgentId,
  interactionHash: 'ipfs://QmHash',
  interactionType: 'service_delivery',
});

// Submit an attestation
await sdk.submitAttestation({
  toAgent: otherAgentId,
  namespace: 'compute-market.v1',
  tag: 'service.quality',
  score: 95,
  interactionId,
  comment: 'Excellent service!',
});

// Query reputation
const reputation = await sdk.getWeightedReputation(otherAgentId);
console.log(`Overall reputation: ${reputation.overall}/100`);
```

## API Reference

#### Initialization

```typescript
const sdk = new AgentTrustSDK(config: SDKConfig);
```

**SDKConfig:**
- `rpcUrl`: RPC URL for the blockchain network
- `privateKey` (optional): Private key for signing transactions
- `addresses`: Contract addresses for the protocol

### Interaction Registry

#### registerInteraction(params)

Register a new interaction between two agents.

```typescript
const interactionId = await sdk.registerInteraction({
  agentB: BigInt('0x...'),
  interactionHash: 'ipfs://QmHash',
  interactionType: 'service_delivery',
});
```

#### hasInteracted(agentA, agentB)

Check if two agents have interacted.

```typescript
const hasInteracted = await sdk.hasInteracted(agentAId, agentBId);
```

#### getInteraction(interactionId)

Get details of a specific interaction.

```typescript
const interaction = await sdk.getInteraction(interactionId);
```

### Schema Registry

#### registerSchema(params)

Register a new attestation schema.

```typescript
const schemaId = await sdk.registerSchema({
  namespace: 'myapp.v1',
  name: 'My Application Schema',
  description: 'Attestations for my application',
  allowedTags: ['service.quality', 'service.speed'],
  minScore: 0,
  maxScore: 100,
});
```

#### getSchema(namespace)

Get schema details by namespace.

```typescript
const schema = await sdk.getSchema('compute-market.v1');
```

#### isSchemaActive(namespace)

Check if a schema is active.

```typescript
const isActive = await sdk.isSchemaActive('compute-market.v1');
```

### Trust Graph

#### setTrust(params)

Set or update trust level for another agent.

```typescript
await sdk.setTrust({
  toAgent: otherAgentId,
  trustLevel: 85, // 0-100
});
```

#### removeTrust(toAgent)

Remove trust relationship.

```typescript
await sdk.removeTrust(otherAgentId);
```

#### submitAttestation(params)

Submit an attestation for another agent.

```typescript
const attestationId = await sdk.submitAttestation({
  toAgent: otherAgentId,
  namespace: 'compute-market.v1',
  tag: 'service.quality',
  score: 95,
  interactionId: interactionId,
  comment: 'Great work!',
});
```

#### getTrustLevel(fromAgent, toAgent)

Get trust level between two agents.

```typescript
const trustLevel = await sdk.getTrustLevel(agentAId, agentBId);
```

#### getTrustedAgents(agentId)

Get all agents that an agent trusts.

```typescript
const trustedAgents = await sdk.getTrustedAgents(agentId);
```

#### getAttestation(attestationId)

Get attestation details.

```typescript
const attestation = await sdk.getAttestation(attestationId);
```

#### getAttestations(agentId)

Get all attestations for an agent.

```typescript
const attestationIds = await sdk.getAttestations(agentId);
```

#### getAttestationsByTag(agentId, namespace, tag)

Get attestations filtered by namespace and tag.

```typescript
const attestations = await sdk.getAttestationsByTag(
  agentId,
  'compute-market.v1',
  'service.quality'
);
```

### Advanced Methods

#### getWeightedReputation(agentId, query?)

Calculate weighted reputation for an agent.

```typescript
const reputation = await sdk.getWeightedReputation(agentId, {
  viewerAgentId: myAgentId, // Optional: personalize based on trust
  namespace: 'compute-market.v1', // Optional: filter by namespace
  tag: 'service.quality', // Optional: filter by tag
});

console.log(reputation);
// {
//   overall: 92.5,
//   byCategory: { 'compute-market.v1:service.quality': 95 },
//   decayFactor: 0.98,
//   riskLevel: 'low',
//   suspicionScore: 0.12,
//   totalAttestations: 45
// }
```

## Examples

### Complete Workflow Example

```typescript
import { AgentTrustSDK } from 'open-agent-trust';

async function main() {
  // Initialize SDK
  const sdk = new AgentTrustSDK({
    rpcUrl: 'https://sepolia.base.org',
    privateKey: process.env.PRIVATE_KEY,
    addresses: {
      interactionRegistry: '0x...',
      attestationSchemaRegistry: '0x...',
      trustGraph: '0x...',
    },
  });

  const myAgentId = await sdk.getAgentId();
  const otherAgentId = BigInt('0x...');

  // 1. Check if agents have interacted
  const hasInteracted = await sdk.hasInteracted(myAgentId, otherAgentId);

  if (!hasInteracted) {
    // 2. Register interaction
    const interactionId = await sdk.registerInteraction({
      agentB: otherAgentId,
      interactionHash: 'ipfs://QmProofOfInteraction',
      interactionType: 'service_delivery',
    });
    console.log('Interaction registered:', interactionId);
  }

  // 3. Get interaction proof
  const interactions = await sdk.getInteractionsBetween(myAgentId, otherAgentId);
  const interactionId = interactions[0];

  // 4. Submit attestation
  const attestationId = await sdk.submitAttestation({
    toAgent: otherAgentId,
    namespace: 'compute-market.v1',
    tag: 'service.quality',
    score: 95,
    interactionId,
    comment: 'Excellent GPU compute service!',
  });
  console.log('Attestation submitted:', attestationId);

  // 5. Set trust
  await sdk.setTrust({
    toAgent: otherAgentId,
    trustLevel: 90,
  });
  console.log('Trust relationship established');

  // 6. Query reputation
  const reputation = await sdk.getWeightedReputation(otherAgentId);
  console.log('Agent reputation:', reputation);
}

main().catch(console.error);
```

### Read-Only Usage (No Private Key)

```typescript
// Initialize without private key for read-only access
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  addresses: {
    interactionRegistry: '0x...',
    attestationSchemaRegistry: '0x...',
    trustGraph: '0x...',
  },
});

// Query data without signing transactions
const reputation = await sdk.getWeightedReputation(agentId);
const schema = await sdk.getSchema('compute-market.v1');
const trustLevel = await sdk.getTrustLevel(agentA, agentB);
```

## License

MIT
