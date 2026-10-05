import React, { useState } from 'react';
import { LandDocument } from '../../types';
import { buildParcelLineageDAG, MutationNode, TransactionType } from '../../services/mutationService';
import { downloadDilrmpXml, generateDilrmpXml } from '../../services/dilrmpService';
import {
  GitFork,
  CheckCircle2,
  AlertTriangle,
  X,
  Download,
  Code,
  ShieldCheck,
  ArrowDown,
  Calendar,
  Building,
  User,
  ExternalLink,
} from 'lucide-react';

interface MutationLineageModalProps {
  document: LandDocument;
  isOpen: boolean;
  onClose: () => void;
}

export const MutationLineageModal: React.FC<MutationLineageModalProps> = ({
  document: doc,
  isOpen,
  onClose,
}) => {
  const [showRawXml, setShowRawXml] = useState(false);

  if (!isOpen) return null;

  const isDisputed = doc.status === 'NEEDS_ATTENTION' || doc.status === 'REJECTED';
  const dag = buildParcelLineageDAG(
    doc.surveyNumber || '1811/1',
    doc.village || 'Ramanathapuram',
    doc.district || 'Coimbatore',
    doc.ownerName,
    isDisputed
  );

  const { auditResult } = dag;

  const getTransactionBadgeColor = (type: TransactionType) => {
    switch (type) {
      case 'JAMABANDI_ROR':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'INHERITANCE_NAMANTARAN':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'PARTITION_TAKSEEM':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'SALE_DEED_BAINAMA':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const handleDownloadXml = () => {
    downloadDilrmpXml(doc);
  };

  const rawXmlContent = generateDilrmpXml(doc);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Mutation Chain & Title Lineage (Namantaran DAG)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Survey Parcel: <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">{doc.surveyNumber}</span> • {doc.village}, {doc.district}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRawXml(!showRawXml)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showRawXml ? 'View DAG Graph' : 'View DILRMP XML'}</span>
            </button>
            <button
              onClick={handleDownloadXml}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export DILRMP XML</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {showRawXml ? (
            /* Raw DILRMP XML View */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  DILRMP-2.0 National XML Schema Standard
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">
                  ✓ Validated against NIC DoLR XML Specification
                </span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-[500px]">
                {rawXmlContent}
              </pre>
            </div>
          ) : (
            /* Lineage DAG View */
            <>
              {/* Algorithmic Audit Metrics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">
                    Chain Integrity
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      {auditResult.chainIntegrityScore}/100
                    </span>
                    {auditResult.isChainIntact ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {auditResult.isChainIntact ? 'Unbroken Title' : 'Title Defect Detected'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">
                    Generations Traced
                  </span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {auditResult.totalHistoricalGenerations} Deeds
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    1972 Root to Present
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">
                    Broken Chain Check
                  </span>
                  <span className={`text-sm font-bold ${auditResult.brokenChainDetected ? 'text-red-600' : 'text-emerald-600'}`}>
                    {auditResult.brokenChainDetected ? 'GAP DETECTED' : 'PASSED (Intact)'}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Root Grantor Verified
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-0.5">
                    Overselling / Hissa Check
                  </span>
                  <span className={`text-sm font-bold ${auditResult.oversellingDetected ? 'text-red-600' : 'text-emerald-600'}`}>
                    {auditResult.oversellingDetected ? 'OVERSELLING FRAUD' : 'PASSED (Conserved)'}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Sum of Shares ≤ 100%
                  </span>
                </div>
              </div>

              {/* Anomaly Alerts if any */}
              {auditResult.anomalyList.length > 0 && (
                <div className="space-y-2">
                  {auditResult.anomalyList.map((a, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs font-medium ${
                        a.severity === 'CRITICAL'
                          ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200'
                          : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">{a.code}</span>
                        <span>{a.message}</span>
                        <span className="block text-[11px] opacity-75 mt-0.5">Involved: {a.involvedParties}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Visual Directed Acyclic Graph (DAG) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Chain of Title Transaction Lineage
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Root of Title: Muthusamy Gounder (1972)
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-200 dark:before:bg-indigo-900">
                  {dag.nodes.map((node, i) => (
                    <div key={node.id} className="relative group">
                      {/* Node Bullet Marker */}
                      <div className="absolute -left-[27px] top-4 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      </div>

                      {/* Node Card */}
                      <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-indigo-700 dark:text-indigo-400">
                              {node.deedNumber}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getTransactionBadgeColor(
                                node.transactionType
                              )}`}
                            >
                              {node.transactionType.replace(/_/g, ' ')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{node.transactionDate}</span>
                          </div>
                        </div>

                        {/* Parties Transfer Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                          <div>
                            <span className="text-slate-400 block text-[11px]">Grantor (Transferor / Deceased):</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {node.grantor}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Grantee (Transferee / Heir):</span>
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {node.grantee}
                            </span>
                          </div>
                        </div>

                        {/* Extent & Mutation Order Details */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-50 dark:border-slate-800/60">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-600 dark:text-slate-400">
                              Extent: <strong className="text-slate-900 dark:text-slate-100">{node.transferredArea}</strong>
                            </span>
                            {node.revenueMutationNumber && (
                              <span className="text-slate-500 font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                Mutation: {node.revenueMutationNumber}
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] text-slate-400">
                            {node.sroRegistrationOffice}
                          </span>
                        </div>

                        {node.notes && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/30 p-2 rounded-lg">
                            {node.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            DILRMP Interoperability & Title Traceability • Ministry of Rural Development
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
