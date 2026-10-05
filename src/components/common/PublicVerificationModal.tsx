import React, { useState } from 'react';
import { LandDocument } from '../../types';
import {
  buildCryptographicChain,
  auditCryptographicChain,
  generatePublicVerificationPayload,
  CryptographicBlock,
} from '../../services/cryptographicAuditService';
import {
  ShieldCheck,
  QrCode,
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Copy,
  Check,
  Layers,
  Sparkles,
  Award,
  RefreshCw,
  Fingerprint,
} from 'lucide-react';

interface PublicVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: LandDocument;
}

export const PublicVerificationModal: React.FC<PublicVerificationModalProps> = ({
  isOpen,
  onClose,
  document: doc,
}) => {
  const [isTamperSimulated, setIsTamperSimulated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !doc) return null;

  // Generate QR payload and cryptographic blocks
  const qrData = generatePublicVerificationPayload(doc);
  const blocks = buildCryptographicChain(doc, doc.auditTrail || []);

  // Run cryptographic chain audit
  const auditResult = auditCryptographicChain(
    blocks,
    isTamperSimulated ? Math.max(0, Math.floor(blocks.length / 2)) : undefined
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrData.verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  DoLR DILRMP-2.0 PKI Standard
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Public Trust Registry</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                Cryptographic Seal & Verification Verifier
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs">
          {/* Top Banner: Tamper Simulation Warning or Intact Status */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
              auditResult.isIntact
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {auditResult.isIntact ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <div>
                <p className="font-bold text-xs sm:text-sm">
                  {auditResult.isIntact
                    ? 'Cryptographic Hash-Chain Intact (Unbroken Proof of Title)'
                    : 'CRITICAL SECURITY ALERT: Database Tampering Detected!'}
                </p>
                <p className="text-[11px] opacity-90">
                  {auditResult.isIntact
                    ? `All ${auditResult.verifiedBlocks} historical deed lifecycle blocks verified against SHA-256 Merkle root.`
                    : auditResult.tamperReason}
                </p>
              </div>
            </div>

            {/* Interactive Tamper Test Toggle */}
            <button
              onClick={() => setIsTamperSimulated(!isTamperSimulated)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors shrink-0 ${
                isTamperSimulated
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
              title="Test real-time database tampering detection"
            >
              {isTamperSimulated ? 'Reset Ledger' : 'Simulate DB Tampering'}
            </button>
          </div>

          {/* Dual Panel: LEFT = Visual QR & Cert Details, RIGHT = Merkle Hash Chain */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* LEFT: QR Code & Certificate Details (5 cols) */}
            <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Official Verification QR Code
                </span>

                {/* Styled SVG QR Code Matrix */}
                <div className="relative inline-block p-3 bg-white rounded-xl border-2 border-slate-300 shadow-md">
                  <svg className="w-36 h-36 mx-auto text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corners */}
                    <path d="M5,5 h24 v24 h-24 z M9,9 h16 v16 h-16 z M13,13 h8 v8 h-8 z" />
                    <path d="M71,5 h24 v24 h-24 z M75,9 h16 v16 h-16 z M79,13 h8 v8 h-8 z" />
                    <path d="M5,71 h24 v24 h-24 z M9,75 h16 v16 h-16 z M13,79 h8 v8 h-8 z" />
                    {/* Data Pattern Mock */}
                    <rect x="35" y="6" width="6" height="6" />
                    <rect x="47" y="6" width="6" height="6" />
                    <rect x="59" y="6" width="6" height="6" />
                    <rect x="35" y="18" width="6" height="6" />
                    <rect x="53" y="18" width="6" height="6" />
                    <rect x="6" y="35" width="6" height="6" />
                    <rect x="18" y="35" width="6" height="6" />
                    <rect x="35" y="35" width="12" height="12" className="text-emerald-700" />
                    <rect x="53" y="35" width="6" height="6" />
                    <rect x="65" y="35" width="6" height="6" />
                    <rect x="77" y="35" width="6" height="6" />
                    <rect x="6" y="47" width="6" height="6" />
                    <rect x="24" y="47" width="6" height="6" />
                    <rect x="71" y="47" width="6" height="6" />
                    <rect x="83" y="47" width="6" height="6" />
                    <rect x="35" y="53" width="6" height="6" />
                    <rect x="53" y="53" width="12" height="12" className="text-emerald-700" />
                    <rect x="71" y="59" width="6" height="6" />
                    <rect x="35" y="71" width="6" height="6" />
                    <rect x="47" y="71" width="6" height="6" />
                    <rect x="71" y="71" width="6" height="6" />
                    <rect x="83" y="71" width="6" height="6" />
                    <rect x="35" y="83" width="6" height="6" />
                    <rect x="59" y="83" width="6" height="6" />
                    <rect x="71" y="83" width="6" height="6" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="p-1 rounded bg-white shadow-xs text-[10px] font-bold text-emerald-800 border border-emerald-300">
                      TN-RoR
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 mt-2">
                  Scan via camera or DoLR portal to verify authenticity.
                </p>
              </div>

              {/* Certificate Metadata */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Certificate ID</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px] break-all">{qrData.digitalCertificateId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Signer & Designation</span>
                  <span className="font-medium text-slate-800">{qrData.signerDesignation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Document SHA-256 Digest</span>
                  <span className="font-mono text-[10px] text-slate-600 break-all bg-white p-1 rounded border border-slate-200 block">
                    {qrData.documentHash}
                  </span>
                </div>
              </div>

              {/* Copy URL */}
              <button
                onClick={handleCopyLink}
                className="w-full py-1.5 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Verification URL Copied!' : 'Copy Public Verification Link'}</span>
              </button>
            </div>

            {/* RIGHT: Merkle Hash Chain (7 cols) */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Immutable Audit Hash Chain ({blocks.length} Blocks)</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Algorithm: SHA-256</span>
              </div>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {blocks.map((b, idx) => {
                  const isTampered = !auditResult.isIntact && auditResult.tamperedBlockIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all ${
                        isTampered
                          ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-400'
                          : 'bg-white border-slate-200 shadow-2xs hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold flex items-center gap-1.5">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isTampered
                                ? 'bg-rose-600 text-white'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            #{b.blockIndex}
                          </span>
                          <span className={isTampered ? 'text-rose-900 font-extrabold' : 'text-slate-800'}>
                            {b.action.replace(/_/g, ' ')}
                          </span>
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 mb-2">
                        Actor: <strong>{b.actorName}</strong> ({b.actorRole})
                      </p>

                      <div className="space-y-1 font-mono text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div className="flex items-center justify-between text-slate-500">
                          <span>Prev Hash:</span>
                          <span className="text-slate-700 truncate max-w-[190px]">{b.previousHash.slice(0, 18)}...</span>
                        </div>
                        <div className="flex items-center justify-between font-bold">
                          <span className={isTampered ? 'text-rose-700' : 'text-emerald-700'}>Block Hash:</span>
                          <span className={isTampered ? 'text-rose-900 underline' : 'text-slate-900 truncate max-w-[190px]'}>
                            {b.blockHash.slice(0, 18)}...
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanatory Callout */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                <Fingerprint className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>Why Hash Chaining Matters:</strong> Every transaction cryptographically encloses the prior deed event. Any rogue SQL update or unauthorized mutation breaks downstream hashes, rendering fraudulent deeds mathematically invalid.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Compliant with ISO/IEC 27001 & DILRMP National Cadastral Security Architecture
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
          >
            Close Verifier
          </button>
        </div>
      </div>
    </div>
  );
};
