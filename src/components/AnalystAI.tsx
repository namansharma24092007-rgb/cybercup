import React, { useState } from 'react';
import { SHAP_FEATURES } from '../data/mockData';

interface AnalystAIProps {
  onInspectTxn?: (txnId: string) => void;
}

export const AnalystAI: React.FC<AnalystAIProps> = ({ onInspectTxn }) => {
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    desc: string;
    icon: string;
    iconColor: string;
  }>({
    show: false,
    title: '',
    desc: '',
    icon: 'check_circle',
    iconColor: 'text-secondary',
  });

  const [graphMode, setGraphMode] = useState<'standard' | 'waterfall'>('standard');

  const showNotice = (
    title: string,
    desc: string,
    icon = 'check_circle',
    iconColor = 'text-secondary'
  ) => {
    setToast({
      show: true,
      title,
      desc,
      icon,
      iconColor,
    });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3400);
  };

  const handleSimulateSynthetic = () => {
    showNotice(
      'Synthetic Scam Injected',
      'Simulated 500 Mule Fan-Out requests. All intercepted in 39ms.',
      'smart_toy',
      'text-primary'
    );
  };

  const handleExportTelemetry = () => {
    showNotice(
      'Telemetry Exported',
      'Downloaded signed NPCI audit log package (JSON+CSV).',
      'file_download',
      'text-secondary'
    );
  };

  const handlePushHeuristics = () => {
    showNotice(
      'Rule #892 Propagated',
      'Threat matrix pushed to 4,219 edge nodes in 18ms.',
      'security',
      'text-secondary'
    );
  };

  return (
    <div className="flex flex-col w-full px-gutter-mobile space-y-space-md pt-2 pb-space-xl max-w-lg mx-auto">
      {/* Top Operational Bar & Engine Health Status */}
      <div className="flex items-center justify-between bg-surface-container-high px-space-md py-space-sm rounded-xl shadow-md border border-surface-container-highest">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-lowest text-primary shadow-inner">
            <span
              className="material-symbols-outlined text-lg font-filled"
            >
              neurology
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-high animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-secondary"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-[15px] leading-tight text-on-surface truncate font-bold">
              Risk Engine v3.4
            </span>
            <span className="font-label-numeric text-[11px] text-secondary truncate">
              99.98% INFRA UPTIME
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-numeric text-body-sm shadow-sm border border-surface-container-highest">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
          <span>CLUSTER: BOM-01</span>
        </div>
      </div>

      {/* Real-Time Model Telemetry KPI Grid */}
      <div className="grid grid-cols-2 gap-space-sm">
        {/* Precision */}
        <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-highest/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-1">
            <span className="font-label-caps text-[10px] uppercase tracking-wider">
              Precision
            </span>
            <span className="material-symbols-outlined text-sm text-secondary">
              verified
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-label-numeric text-headline-md font-bold text-on-surface">
              98.4%
            </span>
            <span className="font-label-numeric text-[11px] text-secondary">
              +1.2%
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
            Institutional trust
          </span>
          <div className="absolute right-0 bottom-0 w-12 h-1 bg-gradient-to-r from-transparent to-secondary opacity-60"></div>
        </div>

        {/* Recall */}
        <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-highest/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-1">
            <span className="font-label-caps text-[10px] uppercase tracking-wider">
              Recall
            </span>
            <span className="material-symbols-outlined text-sm text-primary">
              target
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-label-numeric text-headline-md font-bold text-on-surface">
              96.8%
            </span>
            <span className="font-label-numeric text-[10px] text-primary">
              High Catch
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
            &lt;0.05% miss rate
          </span>
          <div className="absolute right-0 bottom-0 w-12 h-1 bg-gradient-to-r from-transparent to-primary opacity-60"></div>
        </div>

        {/* False Positives */}
        <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-highest/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-1">
            <span className="font-label-caps text-[10px] uppercase tracking-wider">
              False Positives
            </span>
            <span className="material-symbols-outlined text-sm text-on-surface-variant">
              filter_alt_off
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-label-numeric text-headline-md font-bold text-on-surface">
              0.42%
            </span>
            <span className="font-label-numeric text-[10px] text-secondary">
              Optimal
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
            Seamless genuine UX
          </span>
          <div className="absolute right-0 bottom-0 w-12 h-1 bg-gradient-to-r from-transparent to-secondary-container opacity-60"></div>
        </div>

        {/* Pre-PIN Latency */}
        <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between relative overflow-hidden border border-surface-container-highest/40">
          <div className="flex items-center justify-between text-on-surface-variant mb-1">
            <span className="font-label-caps text-[10px] uppercase tracking-wider">
              Pre-PIN Latency
            </span>
            <span className="material-symbols-outlined text-sm text-primary-container">
              bolt
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-label-numeric text-headline-md font-bold text-primary-container">
              42ms
            </span>
            <span className="font-label-numeric text-[10px] text-outline">
              / 100ms max
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-on-surface-variant mt-1">
            Real-time gateway gate
          </span>
          <div className="absolute right-0 bottom-0 w-12 h-1 bg-gradient-to-r from-transparent to-primary-container opacity-60"></div>
        </div>
      </div>

      {/* Adaptive Learning & Zero-Day Scam Intelligence Banner */}
      <div className="p-space-md rounded-xl bg-surface-container shadow-lg relative overflow-hidden border border-surface-container-highest">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary-container text-base animate-pulse">
              radar
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Adaptive Zero-Day Detection
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error font-label-caps text-[10px] font-bold">
            NEW CLUSTER
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Detected 1 new emerging fraud vector in{' '}
          <strong className="text-on-surface">Mumbai Metro Cluster</strong>:{' '}
          <span className="text-tertiary font-medium">
            "Part-time Telegram Task + Reverse Collect Webhook"
          </span>
          . Auto-synthesized heuristic{' '}
          <span className="font-label-numeric text-primary text-[11px] font-bold">
            #Rule-892
          </span>
          .
        </p>
        <div className="mt-space-sm pt-space-sm flex items-center justify-between bg-surface-container-high/60 px-space-sm py-1.5 rounded-lg border border-surface-container-highest/30">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label-caps text-[10px] text-secondary tracking-wide font-bold">
              ACTIVE SHIELD
            </span>
          </div>
          <span className="font-label-numeric text-[12px] text-on-surface font-semibold">
            384 Intercepts{' '}
            <span className="text-outline font-normal">(Last 2 hrs)</span>
          </span>
        </div>
      </div>

      {/* Visual Feature Attribution & Explainability Card (SHAP/LIME breakdown) */}
      <div className="p-space-md rounded-xl bg-surface-container shadow-md flex flex-col space-y-space-sm border border-surface-container-highest">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Feature Attribution (SHAP)
              </span>
              <span className="material-symbols-outlined text-sm text-primary">
                info
              </span>
            </div>
            <span className="font-label-numeric text-body-sm text-outline">
              Inspection on TXN-8841 (Score: 94/100)
            </span>
          </div>
          <button
            onClick={() =>
              setGraphMode(graphMode === 'standard' ? 'waterfall' : 'standard')
            }
            className="px-2.5 py-1 rounded-lg bg-surface-container-high text-primary hover:bg-surface-container-highest transition-colors font-label-caps text-[11px] font-bold"
          >
            {graphMode === 'standard' ? 'INSPECT GRAPH' : 'COMPACT VIEW'}
          </button>
        </div>

        {/* SHAP Waterfall Attribute Rows */}
        <div className="space-y-2.5 pt-1">
          {SHAP_FEATURES.map((feature) => (
            <div key={feature.name} className="space-y-1">
              <div className="flex items-center justify-between font-label-numeric text-body-sm">
                <span className="text-on-surface flex items-center gap-1 truncate text-[12px]">
                  <span
                    className={`material-symbols-outlined text-xs ${
                      feature.percentage > 50
                        ? 'text-error'
                        : feature.percentage > 25
                        ? 'text-tertiary-container'
                        : 'text-outline'
                    }`}
                  >
                    {feature.icon}
                  </span>
                  {feature.label}
                </span>
                <span
                  className={`font-bold ${
                    feature.percentage > 50
                      ? 'text-error'
                      : feature.percentage > 25
                      ? 'text-tertiary-container'
                      : 'text-primary'
                  }`}
                >
                  {feature.contribution}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex">
                <div
                  className={`h-full rounded-full ${feature.colorClass}`}
                  style={{ width: `${feature.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Intercept Queue (Flagged Indian Fraud Vectors) */}
      <div className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-error text-lg">
              shield_with_heart
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Live Intercept Queue
            </h2>
          </div>
          <span className="font-label-numeric text-[11px] text-secondary bg-surface-container-high px-2 py-0.5 rounded-full border border-secondary/30">
            REALTIME FEED
          </span>
        </div>

        {/* Case Item 1 */}
        <div
          onClick={() => onInspectTxn?.('TXN-9021')}
          className="cursor-pointer group p-space-sm rounded-xl bg-surface-container shadow-md flex flex-col space-y-2 border border-surface-container-highest hover:bg-surface-container-high transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-label-numeric font-bold text-on-surface text-[13px]">
                TXN-9021
              </span>
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error font-label-caps text-[10px] font-bold">
                94% RISK
              </span>
            </div>
            <span className="font-label-numeric text-headline-sm text-on-surface font-semibold">
              ₹12,500
            </span>
          </div>
          <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
            <div className="flex items-center gap-1 truncate text-[12px]">
              <span className="material-symbols-outlined text-sm text-tertiary">
                hub
              </span>
              <span className="truncate">Mule Chain Fan-Out (Tier-3 Bank)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary-container font-label-numeric text-[11px] whitespace-nowrap font-semibold">
              Auto-Frozen
            </span>
          </div>
        </div>

        {/* Case Item 2 */}
        <div
          onClick={() => onInspectTxn?.('TXN-9019')}
          className="cursor-pointer group p-space-sm rounded-xl bg-surface-container shadow-md flex flex-col space-y-2 border border-surface-container-highest hover:bg-surface-container-high transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-label-numeric font-bold text-on-surface text-[13px]">
                TXN-9019
              </span>
              <span className="px-2 py-0.5 rounded bg-error-container text-on-error font-label-caps text-[10px] font-bold">
                98% RISK
              </span>
            </div>
            <span className="font-label-numeric text-headline-sm text-on-surface font-semibold">
              ₹4,999
            </span>
          </div>
          <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
            <div className="flex items-center gap-1 truncate text-[12px]">
              <span className="material-symbols-outlined text-sm text-tertiary">
                electrical_services
              </span>
              <span className="truncate">Fake Electricity Bill Collect Req</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-numeric text-[11px] whitespace-nowrap font-semibold">
              Pre-PIN Intercepted
            </span>
          </div>
        </div>

        {/* Case Item 3 */}
        <div
          onClick={() => onInspectTxn?.('TXN-9014')}
          className="cursor-pointer group p-space-sm rounded-xl bg-surface-container shadow-md flex flex-col space-y-2 border border-surface-container-highest hover:bg-surface-container-high transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-label-numeric font-bold text-on-surface text-[13px]">
                TXN-9014
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-label-caps text-[10px] font-bold">
                89% RISK
              </span>
            </div>
            <span className="font-label-numeric text-headline-sm text-on-surface font-semibold">
              ₹1,500
            </span>
          </div>
          <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
            <div className="flex items-center gap-1 truncate text-[12px]">
              <span className="material-symbols-outlined text-sm text-secondary">
                qr_code_scanner
              </span>
              <span className="truncate">Tampered Chai Vendor QR (VPA Swap)</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-numeric text-[11px] whitespace-nowrap font-semibold">
              Merchant Alerted
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Control Actions */}
      <div className="pt-2 flex flex-col space-y-space-sm">
        <button
          onClick={handleSimulateSynthetic}
          className="w-full py-3 px-space-md rounded-xl bg-primary text-on-primary font-headline-sm text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          id="simBtn"
        >
          <span className="material-symbols-outlined text-lg">science</span>
          <span>Simulate Synthetic Attack Vector</span>
        </button>
        <div className="grid grid-cols-2 gap-space-sm">
          <button
            onClick={handleExportTelemetry}
            className="py-2.5 px-space-sm rounded-xl bg-surface-container-high text-on-surface font-label-caps text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer border border-surface-container-highest"
            id="exportBtn"
          >
            <span className="material-symbols-outlined text-sm text-primary">
              download
            </span>
            <span>Export Telemetry</span>
          </button>
          <button
            onClick={handlePushHeuristics}
            className="py-2.5 px-space-sm rounded-xl bg-surface-container-high text-on-surface font-label-caps text-[12px] font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors active:scale-95 cursor-pointer border border-surface-container-highest"
            id="updateHeuristicsBtn"
          >
            <span className="material-symbols-outlined text-sm text-secondary">
              sync
            </span>
            <span>Push Heuristics</span>
          </button>
        </div>
      </div>

      {/* Interactive Feedback Toast */}
      {toast.show && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-40 transition-all duration-300 border border-primary/30 animate-in slide-in-from-bottom">
          <span className={`material-symbols-outlined ${toast.iconColor}`}>
            {toast.icon}
          </span>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-body-md font-bold text-on-surface">
              {toast.title}
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
              {toast.desc}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
