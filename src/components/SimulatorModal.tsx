import React, { useState } from 'react';
import { ScamScenario } from '../types';

interface SimulatorModalProps {
  scenario: ScamScenario | null;
  onClose: () => void;
  onHaltAndReport: (scenario: ScamScenario) => void;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({
  scenario,
  onClose,
  onHaltAndReport,
}) => {
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);

  if (!scenario) return null;

  const handleBlockClick = () => {
    setReporting(true);
    setTimeout(() => {
      setReporting(false);
      setReported(true);
      setTimeout(() => {
        onHaltAndReport(scenario);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/80 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-high rounded-xl p-space-md shadow-2xl flex flex-col gap-space-md relative border border-error/30">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-error animate-ping"></span>
            <span className="font-headline-sm text-headline-sm text-error font-bold">
              Live Intercept Triggered
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Target Details Dossier */}
        <div className="p-3 bg-surface-container-lowest rounded-lg flex flex-col gap-2 border border-surface-container-highest">
          <div className="flex justify-between items-center text-body-sm font-label-numeric">
            <span className="text-on-surface-variant">Simulated Target:</span>
            <span className="text-tertiary font-bold truncate max-w-[220px]">
              {scenario.simTarget}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-label-numeric">
            <span className="text-on-surface-variant">Amount:</span>
            <span className="text-on-surface font-bold">
              ₹{scenario.simAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center text-body-sm font-label-numeric">
            <span className="text-on-surface-variant">Risk Index:</span>
            <span className="text-error font-bold">{scenario.simRisk} / 100</span>
          </div>

          {/* Risk Meter Bar */}
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-error rounded-full transition-all duration-500"
              style={{ width: `${scenario.simRisk}%` }}
            ></div>
          </div>

          {/* AI Intercept Logic Explanation */}
          <div className="font-body-sm text-body-sm text-on-error-container bg-error-container/40 p-2.5 rounded mt-1 border border-error/20">
            <strong className="text-error block mb-0.5">AI Intercept Logic:</strong>
            {scenario.simExplanation}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleBlockClick}
            disabled={reporting || reported}
            className={`flex-1 py-3 px-3 rounded-lg font-headline-sm text-body-md font-bold text-center active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
              reported
                ? 'bg-secondary-container text-on-secondary'
                : 'bg-error text-on-error hover:bg-error/90'
            }`}
          >
            {reporting ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                <span>Freezing VPA at NPCI...</span>
              </>
            ) : reported ? (
              <>
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>Transfer Halted & Reported!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">shield</span>
                <span>Halt Transfer & Report VPA</span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-surface-container-highest text-on-surface rounded-lg font-body-md text-body-md hover:bg-surface-variant transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
