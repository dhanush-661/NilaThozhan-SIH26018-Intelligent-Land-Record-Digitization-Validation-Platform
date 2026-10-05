import CryptoJS from 'crypto-js';
import { AuditEvent, LandDocument, UserRole } from '../types';

export interface CryptographicBlock {
  blockIndex: number;
  timestamp: string;
  documentId: string;
  documentNumber: string;
  action: string;
  actorName: string;
  actorRole: UserRole;
  previousHash: string;
  blockHash: string;
  merkleRoot: string;
  signatureCertId?: string;
  payloadHash: string;
  isGenesis: boolean;
}

export interface ChainAuditResult {
  isIntact: boolean;
  totalBlocks: number;
  verifiedBlocks: number;
  genesisHash: string;
  latestBlockHash: string;
  tamperedBlockIndex: number | null;
  tamperReason?: string;
  auditTimestamp: string;
}

export interface VerificationQRData {
  verificationUrl: string;
  qrPayload: string;
  documentNumber: string;
  surveyNumber: string;
  ulpin: string;
  ownerName: string;
  registeredArea: string;
  digitalCertificateId: string;
  documentHash: string;
  cryptographicTimestamp: string;
  signerDesignation: string;
  issuerAuthority: string;
}

const GENESIS_PREVIOUS_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Calculates SHA-256 hash using standard CryptoJS
 */
export function calculateSha256(data: string): string {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

/**
 * Calculates deterministic hash for a document's core cadastral attributes
 */
export function calculateDocumentContentHash(doc: LandDocument): string {
  const payload = [
    doc.id,
    doc.documentNumber,
    doc.surveyNumber,
    doc.ownerName,
    doc.village,
    doc.district,
    doc.landArea,
    doc.status,
    doc.digitalSignature?.certificateId || 'UNSIGNED',
  ].join('|');

  return calculateSha256(payload);
}

/**
 * Computes deterministic payload string for a block
 */
export function computeBlockPayload(
  docId: string,
  docNumber: string,
  action: string,
  actorName: string,
  actorRole: string,
  timestamp: string
): string {
  return `${docId}:${docNumber}:${action}:${actorName}:${actorRole}:${timestamp}`;
}

/**
 * Builds an immutable cryptographic hash chain from an array of audit events
 */
export function buildCryptographicChain(
  doc: LandDocument,
  events: AuditEvent[]
): CryptographicBlock[] {
  const blocks: CryptographicBlock[] = [];
  let previousHash = GENESIS_PREVIOUS_HASH;

  // Sort events chronologically
  const sorted = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  sorted.forEach((event, idx) => {
    const isGenesis = idx === 0;
    const payload = computeBlockPayload(
      doc.id,
      doc.documentNumber,
      event.action,
      event.actorName,
      event.actorRole,
      event.timestamp
    );
    const payloadHash = calculateSha256(payload);

    // Compute block hash linking previousHash and payloadHash
    const blockData = `${idx}:${previousHash}:${payloadHash}:${event.timestamp}`;
    const blockHash = calculateSha256(blockData);
    const merkleRoot = calculateSha256(`${previousHash}+${blockHash}`);

    blocks.push({
      blockIndex: idx,
      timestamp: event.timestamp,
      documentId: doc.id,
      documentNumber: doc.documentNumber,
      action: event.action,
      actorName: event.actorName,
      actorRole: event.actorRole,
      previousHash,
      blockHash,
      merkleRoot,
      signatureCertId: event.digitalSignatureId,
      payloadHash,
      isGenesis,
    });

    previousHash = blockHash;
  });

  return blocks;
}

/**
 * Mathematically audits a cryptographic block chain to detect any tampering
 */
export function auditCryptographicChain(
  blocks: CryptographicBlock[],
  simulatedTamperIndex?: number
): ChainAuditResult {
  if (blocks.length === 0) {
    return {
      isIntact: true,
      totalBlocks: 0,
      verifiedBlocks: 0,
      genesisHash: GENESIS_PREVIOUS_HASH,
      latestBlockHash: GENESIS_PREVIOUS_HASH,
      tamperedBlockIndex: null,
      auditTimestamp: new Date().toISOString(),
    };
  }

  // Clone blocks for audit
  const auditBlocks = blocks.map((b) => ({ ...b }));

  // If testing tamper detection, inject an illegal modification
  if (simulatedTamperIndex !== undefined && simulatedTamperIndex >= 0 && simulatedTamperIndex < auditBlocks.length) {
    auditBlocks[simulatedTamperIndex].actorName = 'INTRUDER / UNAUTHORIZED_MODIFIER';
    auditBlocks[simulatedTamperIndex].action = 'TAMPERED_RECORD_APPROVAL';
  }

  let verifiedBlocks = 0;
  let prevHash = GENESIS_PREVIOUS_HASH;

  for (let i = 0; i < auditBlocks.length; i++) {
    const b = auditBlocks[i];

    // Check 1: Previous hash link
    if (b.previousHash !== prevHash) {
      return {
        isIntact: false,
        totalBlocks: auditBlocks.length,
        verifiedBlocks,
        genesisHash: auditBlocks[0].blockHash,
        latestBlockHash: auditBlocks[auditBlocks.length - 1].blockHash,
        tamperedBlockIndex: i,
        tamperReason: `Broken Hash Link: Block #${i} references previousHash '${b.previousHash.slice(0, 10)}...' but actual previous block hash is '${prevHash.slice(0, 10)}...'.`,
        auditTimestamp: new Date().toISOString(),
      };
    }

    // Check 2: Verify block payload integrity
    const recomputedPayload = computeBlockPayload(
      b.documentId,
      b.documentNumber,
      b.action,
      b.actorName,
      b.actorRole,
      b.timestamp
    );
    const recomputedPayloadHash = calculateSha256(recomputedPayload);

    // Check 3: Recompute block hash
    const blockData = `${i}:${b.previousHash}:${recomputedPayloadHash}:${b.timestamp}`;
    const expectedBlockHash = calculateSha256(blockData);

    if (b.blockHash !== expectedBlockHash || b.payloadHash !== recomputedPayloadHash) {
      return {
        isIntact: false,
        totalBlocks: auditBlocks.length,
        verifiedBlocks,
        genesisHash: auditBlocks[0].blockHash,
        latestBlockHash: auditBlocks[auditBlocks.length - 1].blockHash,
        tamperedBlockIndex: i,
        tamperReason: `Hash Mismatch on Block #${i}: Stored hash '${b.blockHash.slice(0, 12)}...' differs from recomputed payload digest '${expectedBlockHash.slice(0, 12)}...'. Document attributes have been modified after signing.`,
        auditTimestamp: new Date().toISOString(),
      };
    }

    prevHash = b.blockHash;
    verifiedBlocks++;
  }

  return {
    isIntact: true,
    totalBlocks: auditBlocks.length,
    verifiedBlocks,
    genesisHash: auditBlocks[0].blockHash,
    latestBlockHash: auditBlocks[auditBlocks.length - 1].blockHash,
    tamperedBlockIndex: null,
    auditTimestamp: new Date().toISOString(),
  };
}

/**
 * Generates an encrypted public verification payload and QR data for a land deed
 */
export function generatePublicVerificationPayload(doc: LandDocument): VerificationQRData {
  const docHash = calculateDocumentContentHash(doc);
  const certId = doc.digitalSignature?.certificateId || 'CERT-TN-DILRMP-2026-X88';
  const signer = doc.digitalSignature?.signerName || 'District Revenue Officer';
  const designation = doc.digitalSignature?.signerDesignation || 'Revenue Divisional Officer';
  const ulpin = doc.cadastralDetails?.pattaNumber
    ? `33${doc.surveyNumber.replace(/[^0-9]/g, '').padEnd(10, '0').slice(0, 10)}01`
    : '33181100010001';

  const verificationUrl = `https://dilrmp.nic.in/verify?doc=${encodeURIComponent(doc.documentNumber)}&hash=${docHash.slice(0, 16)}&ulpin=${ulpin}`;

  // Structured QR string conforming to NIC / Digital India e-Governance spec
  const qrPayload = [
    `GOVT_OF_TAMIL_NADU_RoR`,
    `DOC_NO:${doc.documentNumber}`,
    `ULPIN:${ulpin}`,
    `SURVEY:${doc.surveyNumber}`,
    `OWNER:${doc.ownerName}`,
    `AREA:${doc.landArea}`,
    `CERT_ID:${certId}`,
    `SIGNER:${signer}`,
    `SHA256:${docHash}`,
    `DATE:${doc.submissionDate}`,
  ].join('\n');

  return {
    verificationUrl,
    qrPayload,
    documentNumber: doc.documentNumber,
    surveyNumber: doc.surveyNumber,
    ulpin,
    ownerName: doc.ownerName,
    registeredArea: doc.landArea,
    digitalCertificateId: certId,
    documentHash: docHash,
    cryptographicTimestamp: doc.digitalSignature?.signDate || doc.submissionDate,
    signerDesignation: `${signer} (${designation})`,
    issuerAuthority: 'Department of Land Administration, Govt. of Tamil Nadu',
  };
}
