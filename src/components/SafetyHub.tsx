import React, { useState } from 'react';
import { RECENT_TRANSACTIONS, SCAM_SCENARIOS } from '../data/mockData';
import { ScamScenario, Transaction } from '../types';

interface SafetyHubProps {
  onRunSimulation: (scenario: ScamScenario) => void;
  onNavigateToIntercept: () => void;
}

export const SafetyHub: React.FC<SafetyHubProps> = ({
  onRunSimulation,
  onNavigateToIntercept,
}) => {
  // Shield state
  const [autoBlockVpa, setAutoBlockVpa] = useState(true);
  const [screenShareTrap, setScreenShareTrap] = useState(true);

  // VPA Inspector state
  const [vpaInput, setVpaInput] = useState('bill-refund@icici');
  const [analyzing, setAnalyzing] = useState(false);
  const [inspectorResult, setInspectorResult] = useState<{
    show: boolean;
    vpa: string;
    risk: number;
    flag: string;
    details: string;
    status: 'high' | 'safe' | 'medium';
  }>({
    show: false,
    vpa: 'bill-refund@icici',
    risk: 94,
    flag: 'Heuristic Flag: Impersonation Pattern',
    details:
      'VPA contains "refund" token registered 38 mins ago from suspicious IP range (ISP: VPN Gateway, Jamtara Cluster).',
    status: 'high',
  });

  // Full Log dialog state
  const [showFullLog, setShowFullLog] = useState(false);

  const handleInspectVpa = () => {
    if (!vpaInput.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const isKnownRefundScam =
        vpaInput.toLowerCase().includes('refund') ||
        vpaInput.toLowerCase().includes('mule') ||
        vpaInput.toLowerCase().includes('cashback') ||
        vpaInput.toLowerCase().includes('lucky');

      if (isKnownRefundScam) {
        setInspectorResult({
          show: true,
          vpa: vpaInput,
          risk: 94,
          flag: 'Heuristic Flag: Impersonation Pattern',
          details: `VPA "${vpaInput}" matches known phishing pattern registered <1 hour ago from high-velocity mule cluster (NPCI Alert #M-441).`,
          status: 'high',
        });
      } else {
        setInspectorResult({
          show: true,
          vpa: vpaInput,
          risk: 4,
          flag: 'Heuristic Flag: Verified Clean VPA',
          details: `VPA "${vpaInput}" verified through NPCI Directory. High reputation score with over 1,200 successful transactions.`,
          status: 'safe',
        });
      }
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-xl gap-space-md max-w-lg mx-auto">
      {/* Guardian Active Hero Status Card */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-xl border border-surface-container-highest/60">
        {/* Ambient Shield Glow Background */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-secondary/15 to-primary/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-secondary-container/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-md">
          {/* Shield Header & Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shadow-md border border-secondary/20">
                <span
                  className="material-symbols-outlined text-2xl font-filled"
                >
                  security
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Suraksha Shield Active
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                </div>
                <p className="font-devanagari-body text-[12px] text-secondary">
                  सुरक्षा स्थिति: पूर्णतः सक्रिय • 0ms Latency
                </p>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary border border-secondary/30">
              <span className="font-label-numeric text-[12px] font-semibold">
                99.98% SAFE
              </span>
            </div>
          </div>

          {/* Real-time Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 py-space-sm bg-surface-container rounded-lg px-space-sm border border-surface-container-highest/40">
            <div className="flex flex-col items-center text-center">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
                Scanned Today
              </span>
              <span className="font-label-numeric text-headline-sm text-on-surface font-bold mt-0.5">
                18
              </span>
              <span className="font-body-sm text-[11px] text-secondary">
                Txns Clear
              </span>
            </div>
            <div className="flex flex-col items-center text-center bg-surface-container-lowest/40 rounded py-1">
              <span className="font-label-caps text-[10px] text-error uppercase tracking-wider">
                Intercepted
              </span>
              <span className="font-label-numeric text-headline-sm text-tertiary font-bold mt-0.5">
                2
              </span>
              <span className="font-body-sm text-[11px] text-tertiary">
                Scams Foiled
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
                Money Saved
              </span>
              <span className="font-label-numeric text-headline-sm text-primary font-bold mt-0.5">
                ₹24,500
              </span>
              <span className="font-body-sm text-[11px] text-primary-fixed">
                Guarded
              </span>
            </div>
          </div>

          {/* Live Shield Toggles */}
          <div className="flex flex-col gap-2 pt-1">
            {/* Toggle 1: Auto-Block */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest/60 border border-surface-container-highest/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">
                  gpp_good
                </span>
                <div className="flex flex-col">
                  <span className="font-body-md text-sm text-on-surface font-semibold">
                    Auto-Block High-Risk VPA
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Real-time NPCI mule database sync
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAutoBlockVpa(!autoBlockVpa)}
                className={`w-10 h-5 rounded-full relative p-0.5 flex items-center transition-colors ${
                  autoBlockVpa ? 'bg-secondary-container justify-end' : 'bg-surface-container-highest justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-on-secondary rounded-full shadow-sm"></div>
              </button>
            </div>

            {/* Toggle 2: Screen-Share Trap */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest/60 border border-surface-container-highest/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">
                  screen_lock_portrait
                </span>
                <div className="flex flex-col">
                  <span className="font-body-md text-sm text-on-surface font-semibold">
                    Screen-Share &amp; Overlay Trap
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Blocks AnyDesk/TeamViewer during PIN
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScreenShareTrap(!screenShareTrap)}
                className={`w-10 h-5 rounded-full relative p-0.5 flex items-center transition-colors ${
                  screenShareTrap ? 'bg-secondary-container justify-end' : 'bg-surface-container-highest justify-start'
                }`}
              >
                <div className="w-4 h-4 bg-on-secondary rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quick Scan Bar */}
      <div className="flex flex-col gap-space-xs">
        <label className="font-headline-sm text-headline-sm text-on-surface flex items-center justify-between">
          <span>Live VPA &amp; QR Inspector</span>
          <span className="font-label-caps text-label-caps text-primary uppercase">
            Zero Touch API
          </span>
        </label>
        <div className="relative flex items-center bg-surface-container-high rounded-xl p-1.5 shadow-md border border-surface-container-highest">
          <span className="material-symbols-outlined text-on-surface-variant ml-2 text-xl">
            qr_code_scanner
          </span>
          <input
            className="w-full bg-transparent px-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none placeholder:text-outline font-label-numeric text-[13px]"
            id="vpa-input"
            placeholder="e.g. refund-desk@okaxis or bit.ly/upi..."
            type="text"
            value={vpaInput}
            onChange={(e) => setVpaInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInspectVpa()}
          />
          <button
            onClick={handleInspectVpa}
            disabled={analyzing}
            className="px-4 py-2 bg-primary-container hover:bg-primary text-on-primary rounded-lg font-headline-sm text-body-md font-bold flex items-center gap-1 active:scale-95 transition-all flex-shrink-0"
          >
            {analyzing ? (
              <span className="material-symbols-outlined text-sm animate-spin">
                sync
              </span>
            ) : (
              <>
                <span>Analyze</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>

        {/* Quick sample chips */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto text-xs">
          <span className="text-outline text-[11px] whitespace-nowrap">Try samples:</span>
          <button
            onClick={() => {
              setVpaInput('bill-refund@icici');
            }}
            className="px-2 py-0.5 bg-surface-container rounded text-outline hover:text-on-surface whitespace-nowrap font-label-numeric text-[11px]"
          >
            bill-refund@icici
          </button>
          <button
            onClick={() => {
              setVpaInput('electricity-pay@sbi');
            }}
            className="px-2 py-0.5 bg-surface-container rounded text-outline hover:text-on-surface whitespace-nowrap font-label-numeric text-[11px]"
          >
            electricity-pay@sbi
          </button>
          <button
            onClick={() => {
              setVpaInput('fastag-mule-9821@airtel');
            }}
            className="px-2 py-0.5 bg-surface-container rounded text-outline hover:text-on-surface whitespace-nowrap font-label-numeric text-[11px]"
          >
            fastag-mule-9821@airtel
          </button>
        </div>

        {/* Interactive Result Slot */}
        {inspectorResult.show && (
          <div className="rounded-lg p-space-sm bg-surface-container-highest transition-all duration-300 border border-surface-variant animate-in fade-in">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <span
                  className={`material-symbols-outlined mt-0.5 ${
                    inspectorResult.status === 'high'
                      ? 'text-tertiary-container'
                      : 'text-secondary'
                  }`}
                >
                  {inspectorResult.status === 'high' ? 'warning' : 'verified_user'}
                </span>
                <div>
                  <p
                    className={`font-headline-sm text-body-md font-bold ${
                      inspectorResult.status === 'high'
                        ? 'text-tertiary'
                        : 'text-secondary'
                    }`}
                  >
                    {inspectorResult.flag}
                  </p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                    {inspectorResult.details}
                  </p>
                </div>
              </div>
              <span
                className={`font-label-numeric text-[11px] px-2 py-0.5 rounded font-bold whitespace-nowrap ${
                  inspectorResult.status === 'high'
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-secondary-container/30 text-secondary-fixed'
                }`}
              >
                RISK: {inspectorResult.risk}/100
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Fraud Scenario Simulator */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-sm text-on-surface font-bold">
              Fraud Threat Simulator
            </h2>
            <p className="font-devanagari-body text-[12px] text-on-surface-variant">
              धोखाधड़ी सिमुलेशन • Tap to execute AI defense engine
            </p>
          </div>
          <span className="material-symbols-outlined text-primary text-xl">
            science
          </span>
        </div>

        <div className="flex flex-col gap-space-sm">
          {SCAM_SCENARIOS.map((scam) => (
            <div
              key={scam.id}
              onClick={() => onRunSimulation(scam)}
              className="cursor-pointer group relative overflow-hidden rounded-xl bg-surface-container p-space-md transition-all active:scale-[0.98] hover:bg-surface-container-high border border-surface-container-highest/40"
            >
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary flex-shrink-0 group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                    <span className="material-symbols-outlined">
                      {scam.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-headline-sm text-body-lg text-on-surface font-semibold">
                        {scam.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-caps text-[10px] uppercase font-bold ${scam.categoryBadgeClass}`}
                      >
                        {scam.categoryBadge}
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 line-clamp-2">
                      {scam.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`font-label-caps text-[10px] uppercase px-2 py-0.5 rounded ${scam.defenseClass}`}
                      >
                        {scam.defense}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors flex-shrink-0">
                  chevron_right
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Guardian Feed */}
      <div className="flex flex-col gap-space-sm pt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-sm text-on-surface font-bold">
            Recent Scanned Transactions
          </h2>
          <button
            onClick={() => setShowFullLog(true)}
            className="font-label-caps text-label-caps text-primary hover:underline cursor-pointer"
          >
            Full Log
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {/* Item 1: Verified Safe */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-surface-container-highest/30">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">
                  restaurant
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-body-md text-on-surface font-semibold truncate">
                    Swiggy Delivery
                  </span>
                  <span
                    className="material-symbols-outlined text-secondary text-sm font-filled"
                  >
                    verified
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-secondary truncate">
                  Verified Merchant • Risk: 0.02
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="font-label-numeric text-body-lg text-on-surface font-bold">
                ₹420
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                12:44 PM
              </span>
            </div>
          </div>

          {/* Item 2: Blocked Fraud (clickable to navigate to Live Intercept!) */}
          <div
            onClick={onNavigateToIntercept}
            className="cursor-pointer group flex items-center justify-between p-3 rounded-xl bg-error-container/20 shadow-[0_0_16px_rgba(239,68,68,0.15)] border border-error/40 hover:bg-error-container/30 transition-all"
            title="Click to view Live Intercept breakdown"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="material-symbols-outlined text-xl">block</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-body-md text-tertiary font-bold truncate max-w-[150px]">
                    cashback-gpay-9812@ybl
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-tertiary truncate">
                  Blocked: Fake Collect Scheme
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="font-label-numeric text-body-lg text-tertiary font-bold line-through">
                ₹4,999
              </span>
              <span className="font-body-sm text-[11px] text-error font-semibold flex items-center gap-1">
                PROTECTED
                <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </span>
            </div>
          </div>

          {/* Item 3: Verified Safe */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-surface-container-highest/30">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl">
                  storefront
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-body-md text-on-surface font-semibold truncate">
                    Sharma Groceries
                  </span>
                  <span
                    className="material-symbols-outlined text-secondary text-sm font-filled"
                  >
                    verified
                  </span>
                </div>
                <span className="font-body-sm text-[11px] text-secondary truncate">
                  Legit Dynamic QR • Risk: 0.05
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="font-label-numeric text-body-lg text-on-surface font-bold">
                ₹1,150
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                Yesterday
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Micro-Banner */}
      <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-surface-container-lowest text-on-surface-variant border border-surface-container-highest/20">
        <span className="material-symbols-outlined text-secondary text-sm">
          verified_user
        </span>
        <span className="font-label-caps text-[10px] uppercase tracking-wider text-outline">
          NPCI Sandbox &amp; Cert-In Aligned Protocol
        </span>
      </div>

      {/* Full Log Modal */}
      {showFullLog && (
        <div className="fixed inset-0 z-50 bg-surface-dim/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-md bg-surface-container-high rounded-xl p-4 shadow-2xl border border-surface-container-highest flex flex-col gap-3 max-h-[85vh]">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
                <span className="font-headline-sm text-body-lg font-bold text-on-surface">
                  Full Transaction Audit Log
                </span>
              </div>
              <button
                onClick={() => setShowFullLog(false)}
                className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto pr-1">
              {RECENT_TRANSACTIONS.concat([
                {
                  id: 'TXN-9010',
                  timestamp: '11:15 AM',
                  merchantOrPayee: 'Blinkit Instant Groceries',
                  vpa: 'blinkit@icici',
                  amount: 320,
                  riskScore: 2,
                  status: 'safe',
                  category: 'Verified Merchant',
                  timeLabel: '2 days ago',
                  isLegit: true,
                },
                {
                  id: 'TXN-9008',
                  timestamp: '09:40 AM',
                  merchantOrPayee: 'Uber India Mobility',
                  vpa: 'uber.ride@kotak',
                  amount: 240,
                  riskScore: 1,
                  status: 'safe',
                  category: 'Verified Merchant',
                  timeLabel: '3 days ago',
                  isLegit: true,
                },
              ]).map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container text-body-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-on-surface font-semibold">{txn.merchantOrPayee}</span>
                    <span className="font-label-numeric text-[11px] text-on-surface-variant">
                      {txn.vpa}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-label-numeric font-bold text-on-surface">
                      ₹{txn.amount}
                    </div>
                    <span
                      className={`text-[10px] font-bold ${
                        txn.status === 'blocked' ? 'text-error' : 'text-secondary'
                      }`}
                    >
                      {txn.status === 'blocked' ? 'BLOCKED' : 'VERIFIED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
