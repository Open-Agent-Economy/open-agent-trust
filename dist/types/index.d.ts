/**
 * Configuration for the SDK
 */
export interface SDKConfig {
    rpcUrl: string;
    privateKey?: string;
    addresses: {
        interactionRegistry: string;
        attestationSchemaRegistry: string;
        trustGraph: string;
    };
}
/**
 * Interaction data structure
 */
export interface Interaction {
    agentA: bigint;
    agentB: bigint;
    interactionHash: string;
    interactionType: string;
    timestamp: bigint;
    verified: boolean;
}
/**
 * Attestation schema structure
 */
export interface Schema {
    namespace: string;
    name: string;
    description: string;
    allowedTags: string[];
    minScore: number;
    maxScore: number;
    creator: string;
    createdAt: bigint;
    active: boolean;
}
/**
 * Trust edge structure
 */
export interface TrustEdge {
    fromAgent: bigint;
    toAgent: bigint;
    trustLevel: number;
    createdAt: bigint;
    lastUpdated: bigint;
}
/**
 * Attestation structure
 */
export interface Attestation {
    fromAgent: bigint;
    toAgent: bigint;
    namespace: string;
    tag: string;
    score: number;
    interactionId: string;
    comment: string;
    timestamp: bigint;
}
/**
 * Weighted reputation calculation result
 */
export interface WeightedReputation {
    overall: number;
    byCategory: Record<string, number>;
    decayFactor: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    suspicionScore: number;
    totalAttestations: number;
}
/**
 * Parameters for registering an interaction
 */
export interface RegisterInteractionParams {
    agentB: bigint;
    interactionHash: string;
    interactionType: string;
}
/**
 * Parameters for registering a schema
 */
export interface RegisterSchemaParams {
    namespace: string;
    name: string;
    description: string;
    allowedTags: string[];
    minScore: number;
    maxScore: number;
}
/**
 * Parameters for submitting an attestation
 */
export interface SubmitAttestationParams {
    toAgent: bigint;
    namespace: string;
    tag: string;
    score: number;
    interactionId: string;
    comment?: string;
}
/**
 * Parameters for setting trust
 */
export interface SetTrustParams {
    toAgent: bigint;
    trustLevel: number;
}
/**
 * Query parameters for weighted reputation
 */
export interface WeightedReputationQuery {
    viewerAgentId?: bigint;
    namespace?: string;
    tag?: string;
}
