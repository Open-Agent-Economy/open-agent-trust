import { SDKConfig, Interaction, Schema, Attestation, WeightedReputation, RegisterInteractionParams, RegisterSchemaParams, SubmitAttestationParams, SetTrustParams, WeightedReputationQuery } from './types';
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
export declare class AgentTrustSDK {
    private provider;
    private signer?;
    private interactionRegistry;
    private schemaRegistry;
    private trustGraph;
    private nonceManager?;
    constructor(config: SDKConfig);
    /**
     * Register a new interaction between two agents
     * Returns the transaction hash
     */
    registerInteraction(params: RegisterInteractionParams): Promise<{
        interactionId: string;
        txHash: string;
    }>;
    /**
     * Check if two agents have interacted
     */
    hasInteracted(agentA: bigint, agentB: bigint): Promise<boolean>;
    /**
     * Get interaction details
     */
    getInteraction(interactionId: string): Promise<Interaction>;
    /**
     * Get all interactions between two agents
     */
    getInteractionsBetween(agentA: bigint, agentB: bigint): Promise<string[]>;
    /**
     * Register a new attestation schema
     */
    registerSchema(params: RegisterSchemaParams): Promise<string>;
    /**
     * Get schema by namespace
     */
    getSchema(namespace: string): Promise<Schema>;
    /**
     * Check if schema is active
     */
    isSchemaActive(namespace: string): Promise<boolean>;
    /**
     * Set trust level for another agent
     * Returns the transaction hash
     */
    setTrust(params: SetTrustParams): Promise<string>;
    /**
     * Remove trust relationship
     * Returns the transaction hash
     */
    removeTrust(toAgent: bigint): Promise<string>;
    /**
     * Submit an attestation
     * Returns the transaction hash
     */
    submitAttestation(params: SubmitAttestationParams): Promise<string>;
    /**
     * Get trust level from one agent to another
     */
    getTrustLevel(fromAgent: bigint, toAgent: bigint): Promise<number>;
    /**
     * Get all agents that an agent trusts
     */
    getTrustedAgents(agentId: bigint): Promise<bigint[]>;
    /**
     * Get attestation details
     */
    getAttestation(attestationId: string): Promise<Attestation>;
    /**
     * Get all attestations for an agent
     */
    getAttestations(agentId: bigint): Promise<string[]>;
    /**
     * Get attestations by tag
     */
    getAttestationsByTag(agentId: bigint, namespace: string, tag: string): Promise<string[]>;
    /**
     * Calculate weighted reputation for an agent
     *
     * This is a client-side implementation of the weighted reputation
     * algorithm. For production, this should be computed by the off-chain
     * indexer for better performance.
     */
    getWeightedReputation(agentId: bigint, query?: WeightedReputationQuery): Promise<WeightedReputation>;
    /**
     * Get the agent ID for the current signer
     */
    getAgentId(): Promise<bigint>;
    /**
     * Get the current signer's address
     */
    getAddress(): Promise<string>;
}
export * from './types';
