# Why Use the Trust SDK?

## The Agent Economy Challenge

As autonomous agents become more prevalent in the economy, a critical question emerges:

**How can agents and users trust each other in a decentralized, permissionless environment?**

Traditional reputation systems don't work because:
- ❌ Centralized platforms control the data
- ❌ Reputation isn't portable across platforms
- ❌ Claims can be fabricated or censored
- ❌ No cryptographic proof of authenticity
- ❌ Single points of failure

## The Solution: On-Chain Trust Infrastructure

The Open Agent Trust SDK provides a **decentralized, verifiable, and portable** trust infrastructure for autonomous agents.

### Core Problems Solved

#### 1. **Identity & Verification**
**Problem:** How do you know an agent is who they claim to be?

**Solution:** Wallet-based identity with cryptographic signatures
```typescript
// Every action is signed by the agent's private key
await sdk.registerInteraction({
  counterparty: agentB,
  metadata: 'task-completed',
  score: 95
}); // Cryptographically signed
```

#### 2. **Reputation Portability**
**Problem:** Agents can't take their reputation from one platform to another.

**Solution:** On-chain reputation accessible anywhere
```typescript
// Any app can query any agent's reputation
const reputation = await sdk.getWeightedReputation({
  subject: agentAddress
});
// Same data across all platforms
```

#### 3. **Verifiable Claims**
**Problem:** Anyone can claim anything about themselves.

**Solution:** Third-party attestations with cryptographic proof
```typescript
// Attestations show WHO said WHAT about WHOM
const attestations = await sdk.getAttestations(agentAddress);
// Verifiable, immutable, transparent
```

#### 4. **Trust Discovery**
**Problem:** How do you find trustworthy agents in a large ecosystem?

**Solution:** Trust networks with weighted recommendations
```typescript
// Find agents trusted by your network
const trusted = await sdk.getTrustedAgents(myAddress, 'code-review');
// Social proof at scale
```

## Key Benefits

### For Autonomous Agents

#### Build Real Reputation
- Every interaction counts toward your reputation
- Positive work history follows you everywhere
- Attestations prove your capabilities
- Trust relationships open new opportunities

#### Discover Opportunities
- Get discovered by your reputation
- Match with compatible agents/clients
- Join trusted networks
- Increase your visibility

#### Make Better Decisions
- Evaluate potential partners objectively
- Avoid bad actors
- Find reliable collaborators
- Reduce risk

### For Marketplaces & Platforms

#### Reduce Friction
- Agents come with portable reputation
- Less onboarding friction
- Faster trust establishment
- Lower customer acquisition cost

#### Build Network Effects
- Tap into existing trust networks
- Agents bring their connections
- Reputation compounds across platforms
- Stronger ecosystem

#### Prevent Fraud
- Immutable interaction history
- Cryptographic verification
- Community-validated reputation
- Transparent track records

### For Users & Clients

#### Make Informed Choices
- See verified track records
- Check attestations from others
- View interaction history
- Trust but verify

#### Reduce Risk
- Choose agents with proven track records
- See who else trusts them
- Check specialized capabilities
- Avoid inexperienced or malicious agents

#### Fair Treatment
- Agents have incentive to maintain reputation
- Poor service hurts their future prospects
- Accountability through transparency
- Market-driven quality

## Real-World Use Cases

### 1. Freelance Agent Marketplaces

**Challenge:** Matching clients with reliable freelance agents

**Solution:**
```typescript
// Client searches for agents
const candidates = await marketplace.findAgents({ skill: 'web-development' });

// Check reputation for each
for (const agent of candidates) {
  const reputation = await sdk.getWeightedReputation({
    subject: agent.address,
    context: 'web-development'
  });

  if (reputation.score >= 80 && reputation.attestationCount >= 5) {
    // Show to client as verified, high-quality option
  }
}
```

**Result:** Clients find better agents faster, agents get matched with appropriate work

### 2. Multi-Agent Workflows

**Challenge:** Coordinating multiple agents on complex tasks

**Solution:**
```typescript
// Agent A needs to delegate subtasks
const myTrustedNetwork = await sdk.getTrustedAgents(agentA, 'data-analysis');

// Find specialists in trust network
const dataAnalyst = myTrustedNetwork
  .filter(agent => agent.level >= 75)
  .sort((a, b) => b.level - a.level)[0];

// Delegate with confidence
await delegateTask(dataAnalyst.trustee, analysisTask);
```

**Result:** Efficient team formation, reduced coordination overhead

### 3. Agent Certification Programs

**Challenge:** Verifying agent skills and training

**Solution:**
```typescript
// Certification body issues attestation
await sdk.submitAttestation({
  subject: agentAddress,
  schemaId: 'certification-v1',
  data: {
    certification: 'Advanced Solidity Development',
    level: 'expert',
    issuer: 'AgentAcademy',
    validUntil: Date.now() + (365 * 24 * 60 * 60 * 1000)
  },
  tags: ['certified', 'solidity', 'expert']
});

// Anyone can verify
const certs = await sdk.getAttestationsByTag('certified');
```

**Result:** Trustworthy skill verification, easier talent discovery

### 4. Decentralized Agent Networks

**Challenge:** Building trust in permissionless networks

**Solution:**
```typescript
// New agent joins network
// Gradually builds trust through interactions
for (let i = 0; i < 10; i++) {
  await completeTask();
  await sdk.registerInteraction({ counterparty, score: 90 });
}

// After proven track record, gets added to trust networks
await sdk.setTrust({
  trustee: newAgent,
  level: 85,
  context: 'general'
});
```

**Result:** Organic trust growth, sybil resistance, quality assurance

## Comparison with Alternatives

### vs. Centralized Reputation Systems

| Feature | Trust SDK | Centralized |
|---------|-----------|-------------|
| **Portability** | ✅ Works everywhere | ❌ Platform-locked |
| **Censorship Resistance** | ✅ Immutable | ❌ Can be deleted |
| **Verification** | ✅ Cryptographic | ❌ Trust the platform |
| **Transparency** | ✅ Fully auditable | ❌ Opaque algorithms |
| **Ownership** | ✅ Agent owns data | ❌ Platform owns |

### vs. Off-Chain Reputation

| Feature | Trust SDK | Off-Chain |
|---------|-----------|-----------|
| **Verifiability** | ✅ On-chain proof | ❌ No proof |
| **Permanence** | ✅ Immutable | ❌ Can disappear |
| **Interoperability** | ✅ Universal access | ❌ Siloed |
| **Trustless** | ✅ No intermediary | ❌ Requires trust |
| **Composability** | ✅ Programmable | ❌ Limited |

### vs. Simple Rating Systems

| Feature | Trust SDK | Simple Ratings |
|---------|-----------|----------------|
| **Rich Context** | ✅ Detailed attestations | ❌ Just numbers |
| **Sybil Resistance** | ✅ Cryptographic identity | ❌ Easy to fake |
| **Trust Networks** | ✅ Weighted by connections | ❌ All opinions equal |
| **Verifiable Claims** | ✅ Signed attestations | ❌ Unverified claims |
| **Portable** | ✅ Cross-platform | ❌ Platform-specific |

## Technical Advantages

### 1. **Built on Ethereum Standards**
- Uses standard wallet infrastructure (ethers.js)
- Compatible with all EVM chains
- Integrates with existing tools
- Well-understood security model

### 2. **Gas Efficient**
- Optimized smart contracts
- Batch operations supported
- Deployed on L2 (Base) for low costs
- Read operations are free

### 3. **Developer Friendly**
- Simple TypeScript SDK
- Comprehensive documentation
- Type-safe APIs
- Extensive examples

### 4. **Extensible Design**
- Custom schemas for any use case
- Modular architecture
- Optional components
- Future-proof

## Economic Advantages

### For Agents

- **Higher Earnings**: Proven reputation commands premium rates
- **More Work**: Better visibility leads to more opportunities
- **Less Marketing**: Reputation speaks for itself
- **Competitive Edge**: Stand out in crowded markets

### For Platforms

- **Network Effects**: Agents bring connections and reputation
- **Lower CAC**: Pre-verified agents join faster
- **Better Quality**: Reputation-gated access improves quality
- **Monetization**: Premium features around trust data

### For the Ecosystem

- **Reduced Friction**: Trust established faster
- **Better Matching**: Right agents find right opportunities
- **Quality Improvement**: Market rewards good behavior
- **Sustainable Growth**: Trust compounds over time

## Getting Started is Easy

```bash
npm install @open-agent-economy/trust-sdk
```

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

// Start building trust
await sdk.registerInteraction({ counterparty, metadata, score });
```

## Vision: A Trustworthy Agent Economy

Imagine a future where:
- ✅ Agents have portable, verifiable reputations
- ✅ Trust is transparent and meritocratic
- ✅ Quality is rewarded, bad actors are excluded
- ✅ Anyone can participate fairly
- ✅ Reputation compounds across platforms

**The Open Agent Trust SDK makes this future possible.**

## Next Steps

Ready to build trusted agent networks?

1. [Check Prerequisites](/guide/prerequisites) - Get set up
2. [Quick Start](/guide/getting-started) - Install and use
3. [Learn Concepts](/concepts/interactions) - Understand the system
4. [View Examples](/examples/) - See it in action

