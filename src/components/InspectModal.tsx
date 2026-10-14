import React from 'react';
import { Transaction } from '../types';

interface InspectModalProps {
  txn: Transaction | null;
  onClose: () => void;
  onAction?: (action: string) => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({ txn, onClose, onAction }) => {
  if (!txn) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-surface-container rounded-xl p-space-lg shadow-2xl border border-surface-container-highest flex flex-col gap-space-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-2xl font-filled">
              manage_search
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Forensic Dossier: {txn.id}
                </h3>
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error font-label-numeric text-[11px] font-bold">
                  RISK: {txn.riskScore}/100
                </span>
              </div>
              <span className="font-label-numeric text-[11px] text-outline">
                Captured at: {txn.timestamp} • NPCI Gateway Switch Node BOM-01
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-bright transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
          <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container-highest">
            <span className="font-label-caps text-[10px] text-outline uppercase block mb-1">
              Payee Claimed / Target
            </span>
            <div className="font-headline-sm text-sm font-bold text-on-surface">
              {txn.merchantOrPayee}
            </div>
            <div className="font-label-numeric text-xs text-error font-medium mt-0.5">
              {txn.vpa}
            </div>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg border border-surface-container-highest">
            <span className="font-label-caps text-[10px] text-outline uppercase block mb-1">
              Attempted Transaction Outflow
            </span>
            <div className="font-headline-sm text-lg font-extrabold text-on-surface">
              ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="font-label-numeric text-[11px] text-secondary font-medium mt-0.5">
              Defense: {txn.timeLabel}
            </div>
          </div>
        </div>

        {/* Anomaly Taxonomy Vector */}
        <div className="p-space-sm bg-surface-container-low rounded-lg border border-surface-container-highest">
          <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider block mb-1">
            Scam Taxonomy &amp; Heuristic Pattern
          </span>
          <div className="text-sm font-semibold text-tertiary">
            {txn.scamVector || txn.category}
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            Transaction matched signature #SIG-741. Payer device was receiving automated collect request while remote sharing screen or under telephony social engineering pressure.
          </p>
        </div>

        {/* Telemetry Vectors Breakdown */}
        <div className="p-space-sm bg-surface-container-low rounded-lg border border-surface-container-highest space-y-2">
          <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider block">
            Automated Gateway Action Audit Trail
          </span>
          <div className="space-y-1.5 text-xs font-label-numeric">
            <div className="flex justify-between text-on-surface-variant">
              <span>• Pre-PIN Evaluation Completed:</span>
              <span className="text-secondary font-semibold">18ms (SLA OK)</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>• NPCI Mule Blacklist Sync:</span>
              <span className="text-primary font-semibold">Broadcasting to 56 PSPs</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>• I4C Fin-CERT Incident Report:</span>
              <span className="text-tertiary font-semibold">Queued #CERT-8841</span>
            </div>
          </div>
        </div>

        {/* Fast Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-highest">
          <button
            onClick={() => {
              onAction?.('FREEZE');
              onClose();
            }}
            className="px-3 py-2 rounded-lg bg-error text-on-error font-headline-sm text-xs font-bold hover:bg-error/90 active:scale-95 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">block</span>
            <span>Freeze VPA at Central NPCI</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs hover:bg-surface-bright transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
