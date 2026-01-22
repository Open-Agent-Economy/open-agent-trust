"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentTrustSDK = void 0;
const ethers_1 = require("ethers");
// Import ABI files (these would be generated from forge build)
const InteractionRegistry_json_1 = __importDefault(require("./contracts/InteractionRegistry.json"));
const AttestationSchemaRegistry_json_1 = __importDefault(require("./contracts/AttestationSchemaRegistry.json"));
const TrustGraph_json_1 = __importDefault(require("./contracts/TrustGraph.json"));
/**
 * Open Agent Trust SDK
 *
 * Provides a simple TypeScript interface for interacting with the
 * Open Agent Trust & Reputation Protocol smart contracts.
 *
 * @example
 * ```typescript
 * const sdk = new AgentTrustSDK({
 *   rpcUrl: 'https://sepolia.base.org',
 *   privateKey: process.env.PRIVATE_KEY,
 *   addresses: {
 *     interactionRegistry: '0x...',
 *     attestationSchemaRegistry: '0x...',
 *     trustGraph: '0x...',
 *   },
 * });
 *
 * // Register an interaction
 * const interactionId = await sdk.registerInteraction({
 *   agentB: otherAgentId,
 *   interactionHash: ipfsHash,
 *   interactionType: 'service_delivery',
 * });
 *
 * // Submit attestation
 * await sdk.submitAttestation({
 *   toAgent: otherAgentId,
 *   namespace: 'compute-market.v1',
 *   tag: 'service.quality',
 *   score: 95,
 *   interactionId,
 * });
 * ```
 */
class AgentTrustSDK {
    constructor(config) {
        // Initialize provider
        this.provider = new ethers_1.ethers.JsonRpcProvider(config.rpcUrl);
        // Initialize signer if private key provided
        if (config.privateKey) {
            const wallet = new ethers_1.ethers.Wallet(config.privateKey, this.provider);
            // Use NonceManager to handle nonce tracking automatically
            this.nonceManager = new ethers_1.ethers.NonceManager(wallet);
            this.signer = this.nonceManager;
        }
        // Initialize contract instances
        this.interactionRegistry = new ethers_1.ethers.Contract(config.addresses.interactionRegistry, InteractionRegistry_json_1.default, this.signer || this.provider);
        this.schemaRegistry = new ethers_1.ethers.Contract(config.addresses.attestationSchemaRegistry, AttestationSchemaRegistry_json_1.default, this.signer || this.provider);
        this.trustGraph = new ethers_1.ethers.Contract(config.addresses.trustGraph, TrustGraph_json_1.default, this.signer || this.provider);
    }
    // ============================================
    // Interaction Registry Methods
    // ============================================
    /**
     * Register a new interaction between two agents
     * Returns the transaction hash
     */
    async registerInteraction(params) {
        if (!this.signer)
            throw new Error('Signer required for write operations');
        const agentA = await this.getAgentId();
        // Convert interactionHash string to bytes32
        // If it's already a valid bytes32 (0x...), use it as-is
        // Otherwise, hash the string to get bytes32
        let hashBytes32;
        if (params.interactionHash.startsWith('0x') && params.interactionHash.length === 66) {
            hashBytes32 = params.interactionHash;
        }
        else {
            // Hash the string (IPFS URL, etc.) to get bytes32
            hashBytes32 = ethers_1.ethers.keccak256(ethers_1.ethers.toUtf8Bytes(params.interactionHash));
        }
        const tx = await this.interactionRegistry.registerInteraction(agentA, params.agentB, hashBytes32, params.interactionType);
        const receipt = await tx.wait();
        const eventFragment = this.interactionRegistry.interface.getEvent('InteractionRegistered');
        if (!eventFragment)
            throw new Error('InteractionRegistered event not found');
        const event = receipt.logs.find((log) => log.topics[0] === eventFragment.topicHash);
        return { interactionId: event?.topics[1] || '', txHash: receipt.hash }; // Return interaction ID
    }
    /**
     * Check if two agents have interacted
     */
    async hasInteracted(agentA, agentB) {
        return await this.interactionRegistry.hasInteracted(agentA, agentB);
    }
    /**
     * Get interaction details
     */
    async getInteraction(interactionId) {
        const interaction = await this.interactionRegistry.getInteraction(interactionId);
        return {
            agentA: interaction.agentA,
            agentB: interaction.agentB,
            interactionHash: interaction.interactionHash,
            interactionType: interaction.interactionType,
            timestamp: interaction.timestamp,
            verified: interaction.verified,
        };
    }
    /**
     * Get all interactions between two agents
     */
    async getInteractionsBetween(agentA, agentB) {
        return await this.interactionRegistry.getInteractionsBetween(agentA, agentB);
    }
    // ============================================
    // Schema Registry Methods
    // ============================================
    /**
     * Register a new attestation schema
     */
    async registerSchema(params) {
        if (!this.signer)
            throw new Error('Signer required for write operations');
        const tx = await this.schemaRegistry.registerSchema(params.namespace, params.name, params.description, params.allowedTags, params.minScore, params.maxScore);
        const receipt = await tx.wait();
        const eventFragment = this.schemaRegistry.interface.getEvent('SchemaRegistered');
        if (!eventFragment)
            throw new Error('SchemaRegistered event not found');
        const event = receipt.logs.find((log) => log.topics[0] === eventFragment.topicHash);
        return event?.topics[1] || ''; // Return schema ID
    }
    /**
     * Get schema by namespace
     */
    async getSchema(namespace) {
        const schema = await this.schemaRegistry.getSchemaByNamespace(namespace);
        return {
            namespace: schema.namespace,
            name: schema.name,
            description: schema.description,
            allowedTags: schema.allowedTags,
            minScore: schema.minScore,
            maxScore: schema.maxScore,
            creator: schema.creator,
            createdAt: schema.createdAt,
            active: schema.active,
        };
    }
    /**
     * Check if schema is active
     */
    async isSchemaActive(namespace) {
        return await this.schemaRegistry.isSchemaActive(namespace);
    }
    // ============================================
    // Trust Graph Methods
    // ============================================
    /**
     * Set trust level for another agent
     * Returns the transaction hash
     */
    async setTrust(params) {
        if (!this.signer)
            throw new Error('Signer required for write operations');
        const tx = await this.trustGraph.setTrust(params.toAgent, params.trustLevel);
        const receipt = await tx.wait();
        // Return transaction hash
        return receipt.hash;
    }
    /**
     * Remove trust relationship
     * Returns the transaction hash
     */
    async removeTrust(toAgent) {
        if (!this.signer)
            throw new Error('Signer required for write operations');
        const tx = await this.trustGraph.removeTrust(toAgent);
        const receipt = await tx.wait();
        // Return transaction hash
        return receipt.hash;
    }
    /**
     * Submit an attestation
     * Returns the transaction hash
     */
    async submitAttestation(params) {
        if (!this.signer)
            throw new Error('Signer required for write operations');
        const tx = await this.trustGraph.submitAttestation(params.toAgent, params.namespace, params.tag, params.score, params.interactionId, params.comment || '');
        const receipt = await tx.wait();
        // Return transaction hash instead of attestation ID
        return receipt.hash;
    }
    /**
     * Get trust level from one agent to another
     */
    async getTrustLevel(fromAgent, toAgent) {
        return await this.trustGraph.getTrustLevel(fromAgent, toAgent);
    }
    /**
     * Get all agents that an agent trusts
     */
    async getTrustedAgents(agentId) {
        return await this.trustGraph.getTrustedAgents(agentId);
    }
    /**
     * Get attestation details
     */
    async getAttestation(attestationId) {
        const attestation = await this.trustGraph.getAttestation(attestationId);
        return {
            fromAgent: attestation.fromAgent,
            toAgent: attestation.toAgent,
            namespace: attestation.namespace,
            tag: attestation.tag,
            score: attestation.score,
            interactionId: attestation.interactionId,
            comment: attestation.comment,
            timestamp: attestation.timestamp,
        };
    }
    /**
     * Get all attestations for an agent
     */
    async getAttestations(agentId) {
        return await this.trustGraph.getAttestations(agentId);
    }
    /**
     * Get attestations by tag
     */
    async getAttestationsByTag(agentId, namespace, tag) {
        return await this.trustGraph.getAttestationsByTag(agentId, namespace, tag);
    }
    // ============================================
    // Advanced/Computed Methods
    // ============================================
    /**
     * Calculate weighted reputation for an agent
     *
     * This is a client-side implementation of the weighted reputation
     * algorithm. For production, this should be computed by the off-chain
     * indexer for better performance.
     */
    async getWeightedReputation(agentId, query) {
        // Get all attestations
        const attestationIds = await this.getAttestations(agentId);
        // Fetch all attestation details
        const attestations = await Promise.all(attestationIds.map((id) => this.getAttestation(id)));
        // Filter by namespace/tag if specified
        let filteredAttestations = attestations;
        if (query?.namespace) {
            filteredAttestations = filteredAttestations.filter((a) => a.namespace === query.namespace);
        }
        if (query?.tag) {
            filteredAttestations = filteredAttestations.filter((a) => a.tag === query.tag);
        }
        // Group by category
        const byCategory = {};
        for (const att of filteredAttestations) {
            const key = `${att.namespace}:${att.tag}`;
            if (!byCategory[key])
                byCategory[key] = [];
            byCategory[key].push(att.score);
        }
        // Calculate averages
        const categoryScores = {};
        for (const [key, scores] of Object.entries(byCategory)) {
            categoryScores[key] = scores.reduce((a, b) => a + b, 0) / scores.length;
        }
        // Calculate overall (simple average for now)
        const allScores = Object.values(categoryScores);
        const overall = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
        // Simple decay factor (1% per day, simplified)
        const decayFactor = 0.98;
        // Simple risk level based on attestation count
        let riskLevel;
        if (attestations.length > 20)
            riskLevel = 'low';
        else if (attestations.length > 10)
            riskLevel = 'medium';
        else if (attestations.length > 5)
            riskLevel = 'high';
        else
            riskLevel = 'critical';
        return {
            overall,
            byCategory: categoryScores,
            decayFactor,
            riskLevel,
            suspicionScore: 0, // Would be computed by off-chain indexer
            totalAttestations: attestations.length,
        };
    }
    // ============================================
    // Utility Methods
    // ============================================
    /**
     * Get the agent ID for the current signer
     */
    async getAgentId() {
        if (!this.signer)
            throw new Error('Signer required');
        const address = await this.signer.getAddress();
        return BigInt(address);
    }
    /**
     * Get the current signer's address
     */
    async getAddress() {
        if (!this.signer)
            throw new Error('Signer required');
        return await this.signer.getAddress();
    }
}
exports.AgentTrustSDK = AgentTrustSDK;
// Export types
__exportStar(require("./types"), exports);
