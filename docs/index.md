---
layout: home
title: Open Agent Trust SDK - Build Trusted Agent Networks
titleTemplate: Blockchain Reputation & Attestations for Autonomous Agents
description: TypeScript SDK for building verifiable, portable reputation systems for autonomous AI agents. Record on-chain interactions, issue attestations, build trust networks, and calculate reputation scores on Base Sepolia.
head:
  - - meta
    - name: keywords
      content: agent trust SDK, autonomous agent reputation, blockchain attestations, AI agent trust, decentralized reputation, agent marketplace, Web3 agents, smart contract reputation, Base Sepolia, TypeScript blockchain SDK
  - - meta
    - property: og:title
      content: Open Agent Trust SDK - Build Trusted Agent Networks
  - - meta
    - property: og:description
      content: TypeScript SDK for autonomous agent reputation on blockchain. Record interactions, issue attestations, and build verifiable trust networks.

hero:
  name: Open Agent Trust SDK
  text: Build Trusted Agent Networks
  tagline: On-chain reputation, attestations, and trust graphs for autonomous agents
  image:
    src: /logo.svg
    alt: Open Agent Trust SDK
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Open-Agent-Economy/open-agent-trust
    - theme: alt
      text: NPM Package
      link: https://www.npmjs.com/package/@open-agent-economy/trust-sdk

features:
  - icon: 🤝
    title: Track Interactions
    details: Record and verify agent-to-agent interactions on-chain with cryptographic proof and immutable history.

  - icon: ✅
    title: Issue Attestations
    details: Create verifiable attestations about agent behavior, capabilities, and outcomes with flexible schema registry.

  - icon: 🕸️
    title: Build Trust Networks
    details: Establish trust relationships between agents with weighted reputation scores and social proof.

  - icon: 📊
    title: Calculate Reputation
    details: Compute weighted reputation scores based on trust networks, attestations, and interaction history.

  - icon: 🔐
    title: Cryptographically Secure
    details: Powered by smart contracts on Base Sepolia with wallet-based agent identity and signatures.

  - icon: 🚀
    title: Easy Integration
    details: Simple TypeScript SDK with comprehensive documentation and examples for agentic workflows.

  - icon: 🧪
    title: Test Network Ready
    details: Deployed on Base Sepolia testnet with faucets available for immediate testing and development.

  - icon: 🌐
    title: Marketplace Neutral
    details: Register your own marketplace or application and build custom trust models for your agent ecosystem.
---

## Quick Start

Install the SDK and start building trusted agent networks in minutes:

```bash
npm install @open-agent-economy/trust-sdk
```

```typescript
import { AgentTrustSDK } from '@open-agent-economy/trust-sdk';

// Initialize with Base Sepolia testnet
const sdk = new AgentTrustSDK({
  rpcUrl: 'https://sepolia.base.org',
  privateKey: process.env.AGENT_PRIVATE_KEY,
  contracts: {
    interactionRegistry: '0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707',
    attestationSchemaRegistry: '0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5',
    trustGraph: '0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF'
  }
});

// Register an interaction
await sdk.registerInteraction({
  counterparty: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  metadata: 'task-completion',
  score: 95
});

// Submit an attestation
await sdk.submitAttestation({
  subject: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  schemaId: 'performance-review',
  data: { quality: 'excellent', reliability: 95 },
  tags: ['task-completion', 'verified']
});

// Set trust relationship
await sdk.setTrust({
  trustee: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  level: 85,
  context: 'code-review'
});
```

## Why Use This SDK?

<div class="features-grid">

### For Autonomous Agents
Build verifiable reputation for your AI agents based on real interactions and attestations, not just claims.

### For Marketplaces
Create trusted agent ecosystems where users can verify agent capabilities and history before engaging.

### For Developers
Simple integration with comprehensive TypeScript SDK, detailed documentation, and ready-to-use examples.

### For the Ecosystem
Interoperable trust infrastructure that works across applications, enabling agent reputation portability.

</div>

## Core Concepts

<div class="concept-cards">

### 🤝 Interactions
Record every agent interaction on-chain to build an immutable history. Track who worked with whom, when, and the outcome.

[Learn about Interactions →](/concepts/interactions)

### ✅ Attestations
Issue cryptographically signed statements about agent behavior, skills, or outcomes using flexible schemas.

[Learn about Attestations →](/concepts/attestations)

### 🕸️ Trust Graph
Build a web of trust between agents with weighted relationships and context-specific trust levels.

[Learn about Trust Graph →](/concepts/trust-graph)

### 📊 Reputation
Calculate comprehensive reputation scores by combining trust networks, attestations, and interaction history.

[Learn about Reputation →](/concepts/reputation)

</div>

## Deployment

Currently deployed on **Base Sepolia** testnet for immediate testing:

| Contract | Address |
|----------|---------|
| Interaction Registry | `0x12F5C3fD1893bf9b2DeaA43AE1A2CCb122C3E707` |
| Attestation Schema Registry | `0x64DaE82fE64D2fE96f90017FE51069C107BFe9d5` |
| Trust Graph | `0x8DC39B04A9C32e16DD7bd8906a8ea0d9DE6cCbDF` |

[View deployment details →](/guide/deployment-addresses)

## Ready to Build?

<div class="cta-buttons">

[Get Started](/guide/getting-started) · [View Examples](/examples/) · [API Reference](/api/sdk-reference)

</div>

<style>
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.features-grid > div {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.features-grid h3 {
  margin-top: 0;
  font-size: 1.1rem;
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.concept-cards > div {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.concept-cards h3 {
  margin-top: 0;
  font-size: 1.2rem;
}

.cta-buttons {
  margin: 3rem 0;
  text-align: center;
  font-size: 1.1rem;
}

.cta-buttons a {
  margin: 0 0.5rem;
}
</style>
