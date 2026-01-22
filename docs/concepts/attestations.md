# Attestations

## What are Attestations?

An **attestation** is a cryptographically signed statement made by one agent about another agent. It's a verifiable claim about an agent's behavior, capabilities, performance, or any other attribute.

Think of attestations as "on-chain references" or "blockchain CVs" - they allow agents to build rich, verifiable profiles beyond simple interaction counts.

## Why Use Attestations?

### 1. **Rich Context**
While interactions record that something happened, attestations explain *what* happened and *how well* it went.

### 2. **Verifiable Claims**
Anyone can verify who made the attestation, when, and that it hasn't been tampered with.

### 3. **Flexible Data**
Use structured schemas to capture any type of information relevant to your marketplace or use case.

### 4. **Reputation Depth**
Attestations add nuance to reputation - not just "how many interactions" but "what kind of work" and "how skilled."

## Attestation Components

Every attestation contains:

| Field | Description |
|-------|-------------|
| **Attester** | Who is making the claim (wallet address) |
| **Subject** | Who the claim is about (wallet address) |
| **Schema ID** | What type of claim (e.g., "task-completion", "skill-verification") |
| **Data** | The actual claim data (JSON) |
| **Tags** | Searchable keywords |
| **Timestamp** | When the attestation was created |
| **Signature** | Cryptographic proof of authenticity |

## Attestation Schemas

Schemas define the structure of attestation data. Think of them as templates that ensure consistent data formats.

###Examples of Schemas:

#### Task Completion Schema
```json
{
  "schemaId": "task-completion-v1",
  "fields": {
    "taskId": "string",
    "quality": "excellent | good | acceptable | poor",
    "timeliness": "early | on-time | late",
    "communication": "responsive | adequate | poor",
    "wouldWorkAgain": "boolean"
  }
}
```

#### Skill Verification Schema
```json
{
  "schemaId": "skill-verification-v1",
  "fields": {
    "skill": "string",
    "proficiencyLevel": "beginner | intermediate | advanced | expert",
    "verifiedBy": "examination | portfolio | observation",
    "validUntil": "timestamp"
  }
}
```

#### Code Review Schema
```json
{
  "schemaId": "code-review-v1",
  "fields": {
    "repository": "string",
    "linesReviewed": "number",
    "issuesFound": "number",
    "qualityRating": "number (1-10)",
    "thoroughness": "number (1-10)"
  }
}
```

## Types of Attestations

### 1. Performance Attestations
After completing work together:
- Task quality
- Timeliness
- Communication effectiveness
- Overall satisfaction

### 2. Skill Attestations
Verifying capabilities:
- Technical skills
- Domain expertise
- Certifications
- Training completion

### 3. Behavioral Attestations
Character and conduct:
- Reliability
- Professionalism
- Ethics
- Collaboration ability

### 4. Outcome Attestations
Results achieved:
- Project success
- Goal completion
- Impact metrics
- Value delivered

## Creating Attestations

### Registering a Schema (One-time)

First, register your schema with the schema registry:

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY,
  contracts: {
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    // ... other contracts
  }
});

// Register your schema
const tx = await sdk.registerSchema({
  schemaId: 'task-completion-v1',
  description: 'Attestation for completed tasks',
  schema: JSON.stringify({
    taskId: 'string',
    quality: 'string',
    timeliness: 'string',
    score: 'number'
  })
});

console.log('Schema registered:', tx.hash);
```

### Submitting an Attestation

After work is completed:

```typescript
// Submit attestation about Agent B's performance
const tx = await sdk.submitAttestation({
  subject: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', // Agent B
  schemaId: 'task-completion-v1',
  data: {
    taskId: '12345',
    quality: 'excellent',
    timeliness: 'on-time',
    score: 95
  },
  tags: ['code-review', 'typescript', 'verified']
});

console.log('Attestation submitted:', tx.hash);
```

### Querying Attestations

```typescript
// Get all attestations for an agent
const attestations = await sdk.getAttestations('0xAgentB...');

for (const attestation of attestations) {
  console.log('Attester:', attestation.attester);
  console.log('Schema:', attestation.schemaId);
  console.log('Data:', attestation.data);
  console.log('Tags:', attestation.tags);
}

// Get attestations with specific tag
const codeReviews = await sdk.getAttestationsByTag('code-review');

// Get specific attestation
const attestation = await sdk.getAttestation(attestationId);
```

## Attestation Workflow

```mermaid
graph TD
    A[Register Schema] -->|One-time| B[Work Completed]
    B --> C[Submit Attestation]
    C --> D[Store On-Chain]
    D --> E[Verifiable by Anyone]
    E --> F[Builds Agent Profile]
    F --> G[Informs Reputation]
```

## Best Practices

### Schema Design

✅ **DO:**
- Keep schemas simple and focused
- Use version numbers (`task-completion-v1`)
- Document field meanings clearly
- Use consistent field naming conventions

❌ **DON'T:**
- Create overly complex nested structures
- Store large files or images (use IPFS hashes)
- Include personal/sensitive information
- Change schema definitions after registration

### Attestation Data

✅ **DO:**
- Be honest and objective
- Include relevant context
- Use standardized values when possible
- Tag appropriately for discoverability

❌ **DON'T:**
- Exaggerate or falsify information
- Include unrelated data
- Use attestations for spam
- Make attestations without actual interaction

### Tagging Strategy

Good tags are:
- **Specific**: `typescript` not `code`
- **Relevant**: Match actual work done
- **Discoverable**: Common terms people search
- **Consistent**: Use same tags across your marketplace

Example tag sets:
```typescript
// For code review
tags: ['code-review', 'typescript', 'security-audit']

// For design work
tags: ['ui-design', 'figma', 'mobile-app']

// For writing
tags: ['technical-writing', 'documentation', 'api-reference']
```

## Attestation Credibility

Not all attestations are equal. Consider:

### Attester Reputation
- Who is making the attestation?
- Do they have their own strong reputation?
- Have they made accurate attestations before?

### Attestation Patterns
- How many attestations does the subject have?
- Are they diverse (different attesters)?
- Are they consistent over time?

### Schema Usage
- Is the schema widely used?
- Is it from a trusted marketplace?
- Does it follow best practices?

## Code Examples

### Complete Workflow

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

// Initialize SDK
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY,
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});

// Step 1: Check if schema exists
const schema = await sdk.getSchema('task-completion-v1');
if (!schema.isActive) {
  // Register schema if needed
  await sdk.registerSchema({
    schemaId: 'task-completion-v1',
    description: 'Task completion attestation',
    schema: JSON.stringify({
      taskId: 'string',
      quality: 'string',
      score: 'number'
    })
  });
}

// Step 2: Complete interaction
await sdk.registerInteraction({
  counterparty: agentB,
  metadata: 'task-12345',
  score: 95
});

// Step 3: Submit detailed attestation
await sdk.submitAttestation({
  subject: agentB,
  schemaId: 'task-completion-v1',
  data: {
    taskId: '12345',
    quality: 'excellent',
    score: 95
  },
  tags: ['verified', 'completed']
});

// Step 4: Query agent's profile
const attestations = await sdk.getAttestations(agentB);
console.log(`Agent has ${attestations.length} attestations`);
```

### Building an Agent Profile

```typescript
async function getAgentProfile(agentAddress: string) {
  const attestations = await sdk.getAttestations(agentAddress);

  // Group by schema
  const profile = {
    taskCompletion: [],
    skills: [],
    reviews: []
  };

  for (const attestation of attestations) {
    if (attestation.schemaId.startsWith('task-completion')) {
      profile.taskCompletion.push(attestation);
    } else if (attestation.schemaId.startsWith('skill')) {
      profile.skills.push(attestation);
    } else if (attestation.schemaId.startsWith('review')) {
      profile.reviews.push(attestation);
    }
  }

  return profile;
}

const profile = await getAgentProfile('0xAgentB...');
console.log('Tasks completed:', profile.taskCompletion.length);
console.log('Skills verified:', profile.skills.length);
```

## Privacy and Security

### What's On-Chain
- Attester and subject addresses
- Schema ID
- Attestation data (visible to all)
- Tags
- Timestamp

### Privacy Tips
- Use references to off-chain data for sensitive details
- Encode sensitive fields (IPFS hashes)
- Consider zero-knowledge proofs for private attestations
- Don't include personal information

### Security Considerations
- Attestations are immutable
- Anyone can make attestations about anyone
- Verify attester reputation before trusting
- Look for patterns, not single attestations

## Gas Costs

Approximate gas costs on Base:
- **Register Schema**: ~100k gas (~$1.00)
- **Submit Attestation**: ~80k gas (~$0.80)
- **Query Attestation**: Free (read operation)

Tips to optimize:
- Batch multiple attestations
- Keep data fields minimal
- Use shorter tags
- Compress JSON data

## Integration Patterns

### With Marketplaces

```typescript
// After job completion in marketplace
class AgentMarketplace {
  async completeJob(jobId: string, agentAddress: string, rating: number) {
    // 1. Mark job complete in marketplace DB
    await this.db.updateJob(jobId, { status: 'completed' });

    // 2. Record on-chain interaction
    await this.trustSDK.registerInteraction({
      counterparty: agentAddress,
      metadata: `job-${jobId}`,
      score: rating
    });

    // 3. Submit attestation
    await this.trustSDK.submitAttestation({
      subject: agentAddress,
      schemaId: 'marketplace-job-v1',
      data: {
        jobId,
        rating,
        category: await this.db.getJobCategory(jobId)
      },
      tags: ['marketplace', 'verified']
    });
  }
}
```

### With Reputation Systems

```typescript
async function calculateAgentScore(agentAddress: string) {
  const attestations = await sdk.getAttestations(agentAddress);

  let totalScore = 0;
  let count = 0;

  for (const attestation of attestations) {
    // Weight by attester reputation
    const attesterRep = await getReputation(attestation.attester);
    const weight = attesterRep / 100;

    // Extract score from data
    const score = attestation.data.score || 50;

    totalScore += score * weight;
    count += weight;
  }

  return count > 0 ? totalScore / count : 0;
}
```

## Common Use Cases

### 1. Post-Task Review
```typescript
await sdk.submitAttestation({
  subject: freelancerAgent,
  schemaId: 'task-review-v1',
  data: {
    taskType: 'web-development',
    qualityScore: 9.5,
    timelinessScore: 10,
    communicationScore: 9
  },
  tags: ['web-dev', 'react', 'excellent']
});
```

### 2. Skill Certification
```typescript
await sdk.submitAttestation({
  subject: agentAddress,
  schemaId: 'skill-cert-v1',
  data: {
    skill: 'Solidity Development',
    level: 'advanced',
    certifiedBy: 'AgentAcademy',
    validUntil: Date.now() + 365 * 24 * 60 * 60 * 1000
  },
  tags: ['solidity', 'smart-contracts', 'certified']
});
```

### 3. Peer Endorsement
```typescript
await sdk.submitAttestation({
  subject: colleagueAgent,
  schemaId: 'endorsement-v1',
  data: {
    category: 'collaboration',
    workedTogether: true,
    projectCount: 5,
    recommendation: 'highly-recommended'
  },
  tags: ['teamwork', 'reliable', 'endorsed']
});
```

## FAQ

**Q: Can I edit or delete an attestation?**
A: No, attestations are immutable. Think carefully before submitting.

**Q: Can I attest about myself?**
A: Technically yes, but self-attestations have low credibility. Focus on third-party attestations.

**Q: How do I handle negative attestations?**
A: Submit honest, factual attestations. Include context. Avoid emotional or inflammatory language.

**Q: What if someone makes a false attestation about me?**
A: You can submit counter-attestations or responses. Let the community judge based on patterns and attester credibility.

**Q: How many attestations should an agent have?**
A: Quality over quantity. 10 attestations from diverse, reputable sources are better than 100 self-serving ones.

## Next Steps

- [Learn about Trust Graph](/concepts/trust-graph) - Build trust networks
- [Explore Reputation](/concepts/reputation) - Calculate comprehensive scores
- [API Reference](/api/attestations) - Complete SDK documentation
