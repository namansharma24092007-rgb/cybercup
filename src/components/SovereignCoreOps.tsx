import React, { useEffect, useState } from 'react';
import { SOC_TELEMETRY_FEED } from '../data/mockData';
import { Transaction } from '../types';

interface SovereignCoreOpsProps {
  onInspectTxn: (txn: Transaction) => void;
  onNavigateToMobileApp?: () => void;
}

export const SovereignCoreOps: React.FC<SovereignCoreOpsProps> = ({
  onInspectTxn,
  onNavigateToMobileApp,
}) => {
  const [activeNav, setActiveNav] = useState('overview-telemetry');
  const [searchQuery, setSearchQuery] = useState('');
  const [feedFilter, setFeedFilter] = useState('ALL');
  const [analystFeedback, setAnalystFeedback] = useState<{
    show: boolean;
    type: string;
    message: string;
  }>({
    show: false,
    type: '',
    message: '',
  });

  const [countDown, setCountDown] = useState(44);
  const [selectedIncident, setSelectedIncident] = useState('TXN-8841');

  // Interactive keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing into an input
      if (['input', 'textarea', 'select'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }
      const key = e.key.toUpperCase();
      if (key === 'F') {
        triggerAnalystAction('FREEZE_VPA');
      } else if (key === 'B') {
        triggerAnalystAction('PUSH_NPCI');
      } else if (key === 'A') {
        triggerAnalystAction('REQUEST_BIOMETRIC');
      } else if (key === 'S') {
        triggerAnalystAction('SIMULATE_HEURISTIC');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerAnalystAction = (actionType: string) => {
    if (actionType === 'FREEZE_VPA') {
      setAnalystFeedback({
        show: true,
        type: 'freeze',
        message:
          'EXECUTED: Target VPA fastag-mule-9821@airtel frozen across NPCI central registry. Airtel Payments Bank notified.',
      });
    } else if (actionType === 'PUSH_NPCI') {
      setAnalystFeedback({
        show: true,
        type: 'blacklist',
        message:
          'BROADCAST: VPA hash broadcasted to all 56 PSP switches under Category C-4 (Scam Collect).',
      });
    } else if (actionType === 'REQUEST_BIOMETRIC') {
      setAnalystFeedback({
        show: true,
        type: 'biometric',
        message:
          'CHALLENGE PUSHED: Victim device will require strict local FIDO2 biometric before PIN acceptance.',
      });
    } else if (actionType === 'SIMULATE_HEURISTIC') {
      setAnalystFeedback({
        show: true,
        type: 'simulate',
        message:
          'SIMULATION: TreeSHAP leaf re-evaluated with zero remote access flag -> Risk Score drops from 94 to 62.',
      });
    }

    setTimeout(() => {
      setAnalystFeedback((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  const handleRetrain = () => {
    alert(
      'Heuristic re-training triggered across distributed Mumbai-01 cluster. Model weights synced in 220ms.'
    );
  };

  const handleSyntheticVector = () => {
    alert(
      'Synthetic Vector Triggered: Injected 5 simulated probe intents matching Telegram-Task heuristic into test sandbox switch. Cluster #CL-092 validated.'
    );
  };

  const handleExportSTIX = () => {
    alert(
      'Exporting signed forensic STIX 2.1 envelope of current SOC window for law enforcement submission (CERT-In / I4C).'
    );
  };

  // Filtered rows
  const filteredFeed = SOC_TELEMETRY_FEED.filter((row) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        row.merchantOrPayee.toLowerCase().includes(q) ||
        row.vpa.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (feedFilter === 'PRE_PIN') return row.status === 'blocked';
    if (feedFilter === 'AUTO_FROZEN') return row.status === 'frozen';
    if (feedFilter === 'BIOMETRIC') return row.status === 'challenged';
    return true;
  });

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased flex">
      {/* Fixed Left Sidebar (w-72) */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col pt-space-lg pb-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-surface-container-high/60">
        {/* Brand */}
        <div className="px-space-lg mb-space-xl flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[22px]">
              shield
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-extrabold">
                UPI RAKSHA
              </span>
              <span className="px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold">
                AI
              </span>
            </div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Sovereign Core Ops
            </span>
          </div>
        </div>

        {/* Section Label */}
        <div className="px-space-lg mb-space-sm">
          <span className="font-label-caps text-label-caps uppercase text-outline tracking-wider">
            Navigation Engine
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-space-md space-y-1.5">
          <button
            onClick={() => setActiveNav('overview-telemetry')}
            className={`w-full flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-left transition-colors ${
              activeNav === 'overview-telemetry'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              grid_view
            </span>
            <span className="font-body-md text-body-md">Overview &amp; Telemetry</span>
          </button>

          <button
            onClick={() => setActiveNav('live-intercept-queue')}
            className={`w-full flex items-center justify-between px-space-md py-2.5 rounded-lg text-left transition-colors ${
              activeNav === 'live-intercept-queue'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-space-md">
              <span className="material-symbols-outlined text-[20px]">
                security_update_warning
              </span>
              <span className="font-body-md text-body-md">Live Intercept Queue</span>
            </div>
            <span className="font-label-numeric text-[11px] px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-semibold">
              14
            </span>
          </button>

          <button
            onClick={() => setActiveNav('zero-day-clusters')}
            className={`w-full flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-left transition-colors ${
              activeNav === 'zero-day-clusters'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              bubble_chart
            </span>
            <span className="font-body-md text-body-md">Zero-Day Clusters</span>
          </button>

          <button
            onClick={() => setActiveNav('shap-model-ops')}
            className={`w-full flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-left transition-colors ${
              activeNav === 'shap-model-ops'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              neurology
            </span>
            <span className="font-body-md text-body-md">SHAP &amp; Model Ops</span>
          </button>

          <button
            onClick={() => setActiveNav('mule-network-forensics')}
            className={`w-full flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-left transition-colors ${
              activeNav === 'mule-network-forensics'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">hub</span>
            <span className="font-body-md text-body-md">Mule Network Forensics</span>
          </button>

          <button
            onClick={() => setActiveNav('settings')}
            className={`w-full flex items-center gap-space-md px-space-md py-2.5 rounded-lg text-left transition-colors ${
              activeNav === 'settings'
                ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="font-body-md text-body-md">Settings</span>
          </button>

          {/* Quick link to Mobile Guardian */}
          {onNavigateToMobileApp && (
            <div className="pt-4 px-2">
              <button
                onClick={onNavigateToMobileApp}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-body-sm text-xs font-semibold border border-primary/30 transition-all"
              >
                <span className="material-symbols-outlined text-sm">smartphone</span>
                <span>Open Citizen App View</span>
              </button>
            </div>
          )}
        </nav>

        {/* NPCI Switch Status */}
        <div className="px-space-md mt-auto pt-space-md">
          <div className="p-space-md rounded-lg bg-surface-container flex items-center justify-between border border-surface-container-highest">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-on-surface uppercase font-bold">
                  NPCI Switch
                </span>
                <span className="font-label-numeric text-[11px] text-on-surface-variant">
                  99.98% Latency 4ms
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px] font-filled">
              verified
            </span>
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area (offset by pl-72) */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60">
          <div className="w-full h-full px-space-margin flex items-center justify-between gap-space-md">
            {/* Cluster Status */}
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-high text-on-surface border border-surface-container-highest">
                <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
                <span className="font-label-numeric text-[11px] text-on-surface font-semibold">
                  CLUSTER MUM-01: ONLINE
                </span>
              </div>
              <div className="h-4 w-px bg-surface-variant"></div>
              <div className="hidden xl:flex items-center gap-space-xs font-label-numeric text-[11px] text-on-surface-variant">
                <span>FPS: 48,219 txn/s</span>
                <span className="text-outline">|</span>
                <span>ML INFERENCE: 1.8ms</span>
              </div>
            </div>

            {/* Target VPA Search Bar */}
            <div className="flex-1 max-w-xl mx-space-md">
              <div className="relative flex items-center w-full">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-high text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner border border-surface-container-highest"
                  placeholder="Search target VPA (e.g. merchant@npci), UPI txn hash, or mule account ID..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Profile & Notifications */}
            <div className="flex items-center gap-space-md">
              <button
                onClick={() => alert('SOC Alert Center: 14 active pre-PIN intercepts queued across Mumbai, Delhi, and Bangalore clusters.')}
                className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-tertiary-container animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-tertiary-container"></span>
              </button>
              <div className="h-4 w-px bg-surface-variant"></div>
              <div className="flex items-center gap-space-sm">
                <div className="text-right hidden sm:block">
                  <div className="font-body-sm text-body-sm font-semibold text-on-surface">
                    Officer V. Sharma
                  </div>
                  <div className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                    L3 Intercept Analyst
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-on-primary">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    person
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="relative w-full pt-20 bg-background px-space-margin pb-space-xl">
          <div className="flex flex-col w-full">
            {/* Cockpit Breadcrumb & Dynamic Status Ticker */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-lg bg-surface-container-high border border-primary/20">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    security
                  </span>
                  <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase font-bold">
                    TIER-1 SOC RADAR
                  </span>
                </div>
                <span className="text-outline-variant font-label-numeric text-[12px]">
                  /
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  Pre-PIN Sovereign Intercept Gateway
                </span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed border border-secondary/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  <span className="font-label-numeric text-[11px] font-semibold tracking-wide">
                    NPCI SWITCH SYNC: 100% OK
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-2 px-space-md py-1.5 rounded-lg bg-surface-container border border-surface-container-highest">
                  <span className="material-symbols-outlined text-outline text-[16px]">
                    timer
                  </span>
                  <span className="font-label-numeric text-label-numeric text-on-surface-variant">
                    Avg Decision SLA:
                  </span>
                  <span className="font-label-numeric text-label-numeric text-secondary font-bold">
                    24.2ms
                  </span>
                </div>
                <button
                  onClick={handleRetrain}
                  className="flex items-center gap-1.5 px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-colors shadow-sm border border-surface-container-highest cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    sync
                  </span>
                  <span className="font-label-caps text-[10px] tracking-wider uppercase font-bold">
                    Force Heuristic Retrain
                  </span>
                </button>
              </div>
            </div>

            {/* SECTION 1: Top KPI Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md mb-space-lg">
              {/* KPI 1: Precision */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md border border-surface-container-highest">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">
                    Model Precision
                  </span>
                  <span className="font-label-numeric text-[11px] font-semibold text-secondary flex items-center">
                    <span className="material-symbols-outlined text-[14px]">
                      trending_up
                    </span>{' '}
                    +1.2% (7d)
                  </span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight">
                    98.4%
                  </span>
                  <span className="font-label-numeric text-[11px] text-outline">
                    &lt;0.05% miss
                  </span>
                </div>
                <div className="mt-space-sm h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '98.4%' }}></div>
                </div>
              </div>

              {/* KPI 2: Recall */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md border border-surface-container-highest">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">
                    Recall Rate
                  </span>
                  <span className="font-label-numeric text-[11px] font-semibold text-secondary-fixed-dim">
                    Target &gt;95%
                  </span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg text-secondary-fixed font-extrabold tracking-tight">
                    96.8%
                  </span>
                  <span className="font-label-numeric text-[11px] text-on-surface-variant">
                    High Catch
                  </span>
                </div>
                <div className="mt-space-sm h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '96.8%' }}></div>
                </div>
              </div>

              {/* KPI 3: False Positives */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md border border-surface-container-highest">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">
                    False Positives (FPR)
                  </span>
                  <span className="font-label-numeric text-[11px] font-semibold text-primary">
                    Benchmark: 0.50%
                  </span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight">
                    0.42%
                  </span>
                  <span className="font-label-numeric text-[11px] text-outline">
                    Merchant safe
                  </span>
                </div>
                <div className="mt-space-sm h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary-container"
                    style={{ width: '42%' }}
                  ></div>
                </div>
              </div>

              {/* KPI 4: Inference Latency */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-md border border-surface-container-highest">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-caps text-[10px] text-on-surface-variant tracking-wider uppercase">
                    Inference Latency
                  </span>
                  <span className="font-label-numeric text-[11px] font-semibold text-secondary">
                    Pre-PIN &lt;100ms
                  </span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg text-primary font-extrabold tracking-tight">
                    38
                    <span className="text-headline-md font-medium text-outline">
                      ms
                    </span>
                  </span>
                  <span className="font-label-numeric text-[11px] text-outline">
                    p99: 54ms
                  </span>
                </div>
                <div className="mt-space-sm h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container"
                    style={{ width: '38%' }}
                  ></div>
                </div>
              </div>

              {/* KPI 5: Capital Defended */}
              <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-md border border-tertiary/30">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-caps text-[10px] text-tertiary-fixed font-bold tracking-wider uppercase">
                    Capital Defended (24h)
                  </span>
                  <span className="material-symbols-outlined text-tertiary text-[18px]">
                    gavel
                  </span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg text-tertiary-fixed font-black tracking-tight">
                    ₹4.82 Cr
                  </span>
                </div>
                <div className="flex items-center justify-between mt-space-sm font-label-numeric text-[11px] text-on-surface-variant">
                  <span>3,842 Pre-PIN Intercepts</span>
                  <span className="text-tertiary font-semibold">+14.6% DoD</span>
                </div>
              </div>
            </div>

            {/* SECTION 2 & 3: Main Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
              {/* LEFT COLUMN (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                {/* Incident Detail Card */}
                <div className="rounded-xl bg-surface-container p-space-lg shadow-xl relative overflow-hidden border border-surface-container-highest">
                  {/* Urgent Top Bar Hazard Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-space-sm p-space-md rounded-lg bg-error-container/30 mb-space-md border border-error/30">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-error text-[24px]">
                        crisis_alert
                      </span>
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <span className="font-headline-sm text-headline-sm text-error font-extrabold tracking-tight">
                            ACTIVE INTERCEPT: {selectedIncident}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-error text-on-error font-label-caps text-[10px] uppercase font-bold tracking-widest">
                            CRITICAL RISK
                          </span>
                        </div>
                        <span className="font-label-numeric text-[11px] text-on-surface-variant">
                          Intercepted at NPCI Intent Switch (T-410ms before PIN submission)
                        </span>
                      </div>
                    </div>

                    {/* Gauge Radial Indicator */}
                    <div className="flex items-center gap-space-sm bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-inner border border-surface-container-highest">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-surface-variant"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></path>
                          <path
                            className="text-error"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="94, 100"
                            strokeLinecap="round"
                            strokeWidth="4"
                          ></path>
                        </svg>
                        <span className="absolute font-label-numeric text-[11px] font-black text-error">
                          94
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-caps text-[9px] text-outline uppercase tracking-wider">
                          AI Risk Score
                        </span>
                        <span className="font-label-numeric text-[11px] font-bold text-error">
                          EXTREME FRAUD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Victim vs Payee Transaction Dossier */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md p-space-md rounded-xl bg-surface-container-low mb-space-md border border-surface-container-highest">
                    {/* Victim Origin Details */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
                          Debited Entity (Victim)
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-secondary-container/20 text-secondary-fixed font-label-numeric text-[10px]">
                          KYC Tier-1 Verified
                        </span>
                      </div>
                      <div className="font-headline-sm text-sm font-bold text-on-surface">
                        Rameshwar K. Pendse
                      </div>
                      <div className="font-label-numeric text-[11px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">
                          account_balance_wallet
                        </span>
                        <span>rameshwar.pendse@hdfcbank</span>
                      </div>
                      <div className="text-[11px] text-outline font-body-sm mt-0.5">
                        Salary Acct • Normal Txn Pattern: ₹250 - ₹1,200 • HDFC Bank Bandra West
                      </div>
                    </div>

                    {/* Payee / Target Mule Details */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-label-caps text-[10px] text-error uppercase tracking-wider">
                          Payee (Reported Target Mule)
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-label-numeric text-[10px] font-bold">
                          EPHEMERAL VPA
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-sm font-bold text-on-surface truncate">
                          "MSEB Electricity Refund Desk"
                        </span>
                        <span
                          className="material-symbols-outlined text-tertiary text-[18px]"
                          title="Impersonated Entity"
                        >
                          gpp_maybe
                        </span>
                      </div>
                      <div className="font-label-numeric text-[11px] text-error font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">
                          send
                        </span>
                        <span>fastag-mule-9821@airtel</span>
                      </div>
                      <div className="text-[11px] text-tertiary-fixed-dim font-body-sm mt-0.5">
                        Attempted Debit:{' '}
                        <strong className="text-on-surface font-bold">
                          ₹4,999.00
                        </strong>{' '}
                        • Creation Age: <strong>2.8 Hours ago</strong>
                      </div>
                    </div>
                  </div>

                  {/* Anomaly Tag Badges */}
                  <div className="mb-space-md">
                    <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider block mb-2">
                      Pre-Execution Fraud Vectors Triggered
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-error-container text-on-error-container font-label-numeric text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          undo
                        </span>{' '}
                        REVERSE COLLECT SCAM
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-tertiary-container/30 text-tertiary-fixed font-label-numeric text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          schedule
                        </span>{' '}
                        EPHEMERAL VPA (2.8 HRS OLD)
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-error-container/40 text-error font-label-numeric text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">
                          screen_share
                        </span>{' '}
                        ANYDESK / SCREEN MIRROR ACTIVE
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-container-highest text-primary font-label-numeric text-[11px] font-semibold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">
                          speed
                        </span>{' '}
                        RAPID BURST FAN-OUT (MULE CLUSTER)
                      </span>
                    </div>
                  </div>

                  {/* SHAP Explainability Matrix */}
                  <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md border border-surface-container-highest">
                    <div className="flex items-center justify-between mb-space-sm">
                      <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          psychology
                        </span>
                        <span className="font-headline-sm text-sm text-on-surface font-bold">
                          SHAP Explainability Matrix (TreeSHAP v4.2)
                        </span>
                      </div>
                      <span className="font-label-numeric text-[11px] text-outline font-medium">
                        Base Log-Odds: -3.81 → Output: +5.12
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mb-space-md">
                      Contribution breakdown indicating exact feature weights driving the neural intercept before transaction reached beneficiary core switch.
                    </p>

                    {/* Bars Table */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                        <div className="w-64 flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-[16px]">
                            timer_off
                          </span>
                          <span className="font-label-numeric text-on-surface font-medium text-[12px]">
                            payee_vpa_age &lt; 24h
                          </span>
                        </div>
                        <div className="flex-1 flex items-center gap-space-md">
                          <div className="h-2 flex-1 bg-surface-container-highest rounded-full overflow-hidden flex">
                            <div
                              className="bg-error h-full rounded-full"
                              style={{ width: '76%' }}
                            ></div>
                          </div>
                          <div className="w-36 text-right">
                            <span className="font-label-numeric font-bold text-error text-[12px]">
                              +38% (+0.44 weight)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                        <div className="w-64 flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-[16px]">
                            transcribe
                          </span>
                          <span className="font-label-numeric text-on-surface font-medium text-[12px]">
                            nlp_intent_refund_on_debit
                          </span>
                        </div>
                        <div className="flex-1 flex items-center gap-space-md">
                          <div className="h-2 flex-1 bg-surface-container-highest rounded-full overflow-hidden flex">
                            <div
                              className="bg-error h-full rounded-full"
                              style={{ width: '58%' }}
                            ></div>
                          </div>
                          <div className="w-36 text-right">
                            <span className="font-label-numeric font-bold text-error text-[12px]">
                              +29% (+0.38 weight)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                        <div className="w-64 flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-[16px]">
                            phonelink_lock
                          </span>
                          <span className="font-label-numeric text-on-surface font-medium text-[12px]">
                            remote_access_service_running
                          </span>
                        </div>
                        <div className="flex-1 flex items-center gap-space-md">
                          <div className="h-2 flex-1 bg-surface-container-highest rounded-full overflow-hidden flex">
                            <div
                              className="bg-error h-full rounded-full"
                              style={{ width: '42%' }}
                            ></div>
                          </div>
                          <div className="w-36 text-right">
                            <span className="font-label-numeric font-bold text-error text-[12px]">
                              +21% (+0.27 weight)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                        <div className="w-64 flex items-center gap-2">
                          <span className="material-symbols-outlined text-tertiary text-[16px]">
                            cyclone
                          </span>
                          <span className="font-label-numeric text-on-surface font-medium text-[12px]">
                            unusual_burst_velocity
                          </span>
                        </div>
                        <div className="flex-1 flex items-center gap-space-md">
                          <div className="h-2 flex-1 bg-surface-container-highest rounded-full overflow-hidden flex">
                            <div
                              className="bg-tertiary-container h-full rounded-full"
                              style={{ width: '20%' }}
                            ></div>
                          </div>
                          <div className="w-36 text-right">
                            <span className="font-label-numeric font-bold text-tertiary-fixed text-[12px]">
                              +10% (+0.12 weight)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px]">
                        <div className="w-64 flex items-center gap-2">
                          <span className="material-symbols-outlined text-outline text-[16px]">
                            location_off
                          </span>
                          <span className="font-label-numeric text-on-surface font-medium text-[12px]">
                            device_geohash_mismatch
                          </span>
                        </div>
                        <div className="flex-1 flex items-center gap-space-md">
                          <div className="h-2 flex-1 bg-surface-container-highest rounded-full overflow-hidden flex">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: '6%' }}
                            ></div>
                          </div>
                          <div className="w-36 text-right">
                            <span className="font-label-numeric font-bold text-primary text-[12px]">
                              +2% (+0.03 weight)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Analyst Override Controls */}
                  <div>
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
                        Mandatory Analyst Override Controls
                      </span>
                      <span className="font-label-numeric text-[11px] text-outline font-medium">
                        Auto-action execution in:{' '}
                        <strong className="text-tertiary">
                          00:{countDown < 10 ? `0${countDown}` : countDown}s
                        </strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm" id="decisionActions">
                      <button
                        onClick={() => triggerAnalystAction('FREEZE_VPA')}
                        className="group flex flex-col items-center justify-center py-2.5 px-3 rounded-lg bg-error hover:bg-error-container text-on-error hover:text-on-error-container transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">
                            block
                          </span>
                          <span className="font-body-sm font-bold text-body-sm">
                            Freeze VPA
                          </span>
                        </div>
                        <span className="font-label-numeric text-[10px] opacity-80 group-hover:opacity-100">
                          [Key: F]
                        </span>
                      </button>

                      <button
                        onClick={() => triggerAnalystAction('PUSH_NPCI')}
                        className="group flex flex-col items-center justify-center py-2.5 px-3 rounded-lg bg-tertiary-container hover:bg-tertiary-fixed text-on-tertiary-container hover:text-on-tertiary-fixed transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px]">
                            publish
                          </span>
                          <span className="font-body-sm font-bold text-body-sm">
                            Push Blacklist
                          </span>
                        </div>
                        <span className="font-label-numeric text-[10px] opacity-80 group-hover:opacity-100">
                          [Key: B]
                        </span>
                      </button>

                      <button
                        onClick={() => triggerAnalystAction('REQUEST_BIOMETRIC')}
                        className="group flex flex-col items-center justify-center py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-all active:scale-95 border border-surface-container-highest cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            fingerprint
                          </span>
                          <span className="font-body-sm font-semibold text-body-sm">
                            Force Biometric
                          </span>
                        </div>
                        <span className="font-label-numeric text-[10px] text-outline group-hover:opacity-100">
                          [Key: A]
                        </span>
                      </button>

                      <button
                        onClick={() => triggerAnalystAction('SIMULATE_HEURISTIC')}
                        className="group flex flex-col items-center justify-center py-2.5 px-3 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface transition-all active:scale-95 border border-surface-container-highest cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[18px] text-secondary">
                            model_training
                          </span>
                          <span className="font-body-sm font-semibold text-body-sm">
                            Simulate Tree
                          </span>
                        </div>
                        <span className="font-label-numeric text-[10px] text-outline group-hover:opacity-100">
                          [Key: S]
                        </span>
                      </button>
                    </div>

                    {/* Feedback message banner */}
                    {analystFeedback.show && (
                      <div className="mt-space-sm p-space-sm rounded-lg bg-secondary-container/20 text-secondary-fixed font-body-sm text-body-sm flex items-center gap-2 border border-secondary/30 animate-in fade-in">
                        <span className="material-symbols-outlined text-[18px]">
                          check_circle
                        </span>
                        <span>{analystFeedback.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg">
                {/* Adaptive Zero-Day Clustering Engine Card */}
                <div className="rounded-xl bg-surface-container p-space-lg shadow-xl relative overflow-hidden border border-surface-container-highest">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        bubble_chart
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                        Adaptive Zero-Day Radar
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-numeric text-[11px] font-bold">
                      DBSCAN-ONLINE
                    </span>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md border border-surface-container-highest">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-caps text-[10px] text-tertiary-fixed font-bold tracking-widest uppercase">
                        EMERGING VECTOR PATTERN
                      </span>
                      <span className="font-label-numeric text-[11px] text-on-surface-variant">
                        Cluster ID: #CL-092
                      </span>
                    </div>
                    <div className="font-headline-sm text-sm font-bold text-on-surface mb-1">
                      Part-time Telegram Task + Reverse Collect Webhook
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mb-space-sm">
                      Victim prompted with ₹150 payout, then redirected to mock electricity portal initiating UPI collect intent with inverted payer/payee metadata.
                    </p>
                    <div className="grid grid-cols-3 gap-2 py-space-sm rounded-lg bg-surface-container px-space-sm mb-space-sm border border-surface-container-highest">
                      <div>
                        <span className="font-label-caps text-[9px] text-outline uppercase block">
                          Active Rule
                        </span>
                        <span className="font-label-numeric text-[12px] font-bold text-primary">
                          #Rule-892
                        </span>
                      </div>
                      <div>
                        <span className="font-label-caps text-[9px] text-outline uppercase block">
                          Intercepts (3h)
                        </span>
                        <span className="font-label-numeric text-[12px] font-bold text-tertiary-fixed">
                          412 hits
                        </span>
                      </div>
                      <div>
                        <span className="font-label-caps text-[9px] text-outline uppercase block">
                          Confidence
                        </span>
                        <span className="font-label-numeric text-[12px] font-bold text-secondary">
                          99.1%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-body-sm text-[12px] text-outline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          hub
                        </span>{' '}
                        Mumbai Metro Hub Focus
                      </span>
                      <button
                        onClick={handleSyntheticVector}
                        className="px-3 py-1 rounded-md bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-[12px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-surface-container-highest"
                      >
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          bolt
                        </span>{' '}
                        Test Vector
                      </button>
                    </div>
                  </div>

                  {/* Inline Visual Cluster Canvas (SVG Scatter representation) */}
                  <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-highest">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
                        Cluster Dimensional Embedding (UMAP)
                      </span>
                      <span className="font-label-numeric text-[11px] text-secondary">
                        Real-time Centroids: 14
                      </span>
                    </div>
                    <div className="relative w-full h-32 rounded-lg bg-surface-container-lowest overflow-hidden flex items-center justify-center p-2 border border-surface-container-highest">
                      <svg
                        className="w-full h-full"
                        fill="none"
                        viewBox="0 0 320 120"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Grid lines */}
                        <line stroke="#1a1f2e" strokeWidth="1" x1="0" x2="320" y1="30" y2="30"></line>
                        <line stroke="#1a1f2e" strokeWidth="1" x1="0" x2="320" y1="60" y2="60"></line>
                        <line stroke="#1a1f2e" strokeWidth="1" x1="0" x2="320" y1="90" y2="90"></line>
                        <line stroke="#1a1f2e" strokeWidth="1" x1="80" x2="80" y1="0" y2="120"></line>
                        <line stroke="#1a1f2e" strokeWidth="1" x1="160" x2="160" y1="0" y2="120"></line>
                        <line stroke="#1a1f2e" strokeWidth="1" x1="240" x2="240" y1="0" y2="120"></line>

                        {/* Safe normal points */}
                        <circle cx="50" cy="80" fill="#89ceff" opacity="0.3" r="3"></circle>
                        <circle cx="65" cy="90" fill="#89ceff" opacity="0.4" r="2.5"></circle>
                        <circle cx="40" cy="70" fill="#89ceff" opacity="0.3" r="2"></circle>
                        <circle cx="75" cy="75" fill="#89ceff" opacity="0.2" r="3.5"></circle>
                        <circle cx="90" cy="85" fill="#89ceff" opacity="0.4" r="2.5"></circle>
                        <circle cx="110" cy="95" fill="#89ceff" opacity="0.3" r="2"></circle>

                        {/* High Velocity Fraud Anomaly Cluster #CL-092 */}
                        <circle cx="230" cy="40" fill="#ff6c66" fillOpacity="0.1" r="24"></circle>
                        <circle cx="230" cy="40" fill="#ff6c66" fillOpacity="0.25" r="14"></circle>
                        <circle cx="230" cy="40" fill="#ff6c66" r="5"></circle>
                        <circle cx="220" cy="35" fill="#ffb4ab" r="3"></circle>
                        <circle cx="242" cy="38" fill="#ffb4ab" r="3.5"></circle>
                        <circle cx="235" cy="50" fill="#ffb4ab" r="2.5"></circle>
                        <circle cx="218" cy="46" fill="#ffb4ab" r="3"></circle>
                        <circle cx="248" cy="45" fill="#ff6c66" r="2"></circle>
                        <text
                          fill="#ffb4ab"
                          fontFamily="JetBrains Mono"
                          fontSize="9"
                          fontWeight="600"
                          x="245"
                          y="30"
                        >
                          CL-092 (Target)
                        </text>

                        {/* Secondary Cluster */}
                        <circle cx="140" cy="45" fill="#4edea3" fillOpacity="0.1" r="16"></circle>
                        <circle cx="140" cy="45" fill="#4edea3" r="4"></circle>
                        <circle cx="132" cy="40" fill="#6ffbbe" r="2.5"></circle>
                        <circle cx="148" cy="52" fill="#6ffbbe" r="3"></circle>
                        <circle cx="145" cy="38" fill="#6ffbbe" r="2"></circle>
                        <text
                          fill="#4edea3"
                          fontFamily="JetBrains Mono"
                          fontSize="8"
                          x="148"
                          y="60"
                        >
                          KYC Laundering
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mule Account Fan-Out Network Card */}
                <div className="rounded-xl bg-surface-container p-space-lg shadow-xl relative overflow-hidden border border-surface-container-highest">
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        hub
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                        Mule Account Fan-Out Network
                      </h2>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-numeric text-[11px] font-bold">
                      1:8 FAN-OUT
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mb-space-md">
                    Live graph routing from primary vector{' '}
                    <strong className="text-on-surface">
                      fastag-mule-9821@airtel
                    </strong>{' '}
                    to tier-3 cooperative accounts across Bihar &amp; West Bengal within 45 seconds of credit.
                  </p>

                  {/* Dynamic Visual Graph Representation */}
                  <div className="p-space-md rounded-xl bg-surface-container-lowest relative overflow-hidden mb-space-md border border-surface-container-highest">
                    <div className="relative w-full h-48 flex items-center justify-center">
                      <svg
                        className="w-full h-full"
                        fill="none"
                        viewBox="0 0 380 180"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Edges from Center Primary to Outer Nodes */}
                        <line
                          stroke="#93000a"
                          strokeDasharray="3 3"
                          strokeWidth="2"
                          x1="120"
                          x2="260"
                          y1="90"
                          y2="35"
                        ></line>
                        <line
                          stroke="#93000a"
                          strokeWidth="2"
                          x1="120"
                          x2="270"
                          y1="90"
                          y2="65"
                        ></line>
                        <line
                          stroke="#93000a"
                          strokeWidth="2"
                          x1="120"
                          x2="280"
                          y1="90"
                          y2="95"
                        ></line>
                        <line
                          stroke="#93000a"
                          strokeDasharray="2 2"
                          strokeWidth="2"
                          x1="120"
                          x2="270"
                          y1="90"
                          y2="125"
                        ></line>
                        <line
                          stroke="#93000a"
                          strokeWidth="2"
                          x1="120"
                          x2="260"
                          y1="90"
                          y2="155"
                        ></line>

                        {/* Inflow from Victim */}
                        <line
                          stroke="#0ea5e9"
                          strokeWidth="2.5"
                          x1="30"
                          x2="120"
                          y1="90"
                          y2="90"
                        ></line>
                        <circle cx="75" cy="90" fill="#89ceff" r="3"></circle>

                        {/* Victim Source Node */}
                        <circle cx="30" cy="90" fill="#161b2a" r="14"></circle>
                        <circle cx="30" cy="90" fill="#0ea5e9" r="10"></circle>
                        <text
                          fill="#89ceff"
                          fontFamily="Inter"
                          fontSize="8"
                          fontWeight="600"
                          x="12"
                          y="118"
                        >
                          Victim Acct
                        </text>

                        {/* Central Mule Target Node */}
                        <circle
                          cx="120"
                          cy="90"
                          fill="#93000a"
                          fillOpacity="0.3"
                          r="22"
                        ></circle>
                        <circle cx="120" cy="90" fill="#ffb4ab" r="16"></circle>
                        <text
                          fill="#690005"
                          fontFamily="JetBrains Mono"
                          fontSize="8"
                          fontWeight="bold"
                          textAnchor="middle"
                          x="120"
                          y="93"
                        >
                          MULE
                        </text>
                        <text
                          fill="#dee2f6"
                          fontFamily="JetBrains Mono"
                          fontSize="8"
                          textAnchor="middle"
                          x="120"
                          y="122"
                        >
                          airtel-mule
                        </text>

                        {/* Fan-out Destination Nodes */}
                        <circle cx="260" cy="35" fill="#303444" r="9"></circle>
                        <circle cx="260" cy="35" fill="#ff6c66" r="5"></circle>
                        <text fill="#bec8d2" fontFamily="Inter" fontSize="8" x="275" y="38">
                          WB-Gramin-01 (₹980)
                        </text>

                        <circle cx="270" cy="65" fill="#303444" r="9"></circle>
                        <circle cx="270" cy="65" fill="#ff6c66" r="5"></circle>
                        <text fill="#bec8d2" fontFamily="Inter" fontSize="8" x="285" y="68">
                          BR-Sahakari-88 (₹1,200)
                        </text>

                        <circle cx="280" cy="95" fill="#303444" r="9"></circle>
                        <circle cx="280" cy="95" fill="#ff6c66" r="5"></circle>
                        <text fill="#bec8d2" fontFamily="Inter" fontSize="8" x="295" y="98">
                          WB-Apex-Coop (₹850)
                        </text>

                        <circle cx="270" cy="125" fill="#303444" r="9"></circle>
                        <circle cx="270" cy="125" fill="#ff6c66" r="5"></circle>
                        <text fill="#bec8d2" fontFamily="Inter" fontSize="8" x="285" y="128">
                          BR-Muzaffar-Bank (₹1,150)
                        </text>

                        <circle cx="260" cy="155" fill="#303444" r="9"></circle>
                        <circle cx="260" cy="155" fill="#ff6c66" r="5"></circle>
                        <text fill="#bec8d2" fontFamily="Inter" fontSize="8" x="275" y="158">
                          JH-Dhanbad-Coop (₹819)
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Graph Metrics Strip */}
                  <div className="grid grid-cols-3 gap-space-sm">
                    <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-highest">
                      <span className="font-label-caps text-[9px] text-outline uppercase block">
                        Mean Hop Latency
                      </span>
                      <span className="font-label-numeric text-[13px] font-bold text-on-surface">
                        14.2s / hop
                      </span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-highest">
                      <span className="font-label-caps text-[9px] text-outline uppercase block">
                        Cluster Velocity
                      </span>
                      <span className="font-label-numeric text-[13px] font-bold text-tertiary">
                        ₹4,999 in 38s
                      </span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low border border-surface-container-highest">
                      <span className="font-label-caps text-[9px] text-outline uppercase block">
                        Total Frozen Chain
                      </span>
                      <span className="font-label-numeric text-[13px] font-bold text-secondary">
                        ₹38.4 Lakhs
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: Real-Time Pre-PIN Intercept Telemetry Feed */}
            <div className="rounded-xl bg-surface-container p-space-lg shadow-xl relative overflow-hidden border border-surface-container-highest">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-md">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      stream
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-extrabold tracking-tight">
                      Real-Time Pre-PIN Intercept Telemetry Feed
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-numeric text-[11px] font-semibold border border-secondary/30">
                      LIVE STREAMING (100Hz)
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    Live audit ledger of high-risk transactions actively halted or flagged at the NPCI pre-authorization switch.
                  </p>
                </div>

                <div className="flex items-center gap-space-sm">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-outline">
                      filter_list
                    </span>
                    <select
                      className="bg-surface-container-high text-on-surface font-label-numeric text-[12px] pl-8 pr-4 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-highest"
                      id="feedFilter"
                      value={feedFilter}
                      onChange={(e) => setFeedFilter(e.target.value)}
                    >
                      <option value="ALL">All Incidents</option>
                      <option value="PRE_PIN">Pre-PIN Intercepted Only</option>
                      <option value="AUTO_FROZEN">Auto-Frozen (Risk &gt;90)</option>
                      <option value="BIOMETRIC">Biometric Escalated</option>
                    </select>
                  </div>
                  <button
                    onClick={handleExportSTIX}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-[12px] font-medium transition-colors border border-surface-container-highest cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      download
                    </span>
                    <span>Export STIX / MISP</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left font-body-sm text-body-sm">
                  <thead>
                    <tr className="bg-surface-container-low text-outline font-label-caps text-[10px] uppercase tracking-wider border-b border-surface-container-highest">
                      <th className="py-3 px-space-md">Timestamp</th>
                      <th className="py-3 px-space-md">TXN ID</th>
                      <th className="py-3 px-space-md">Claimed Label vs Payee VPA</th>
                      <th className="py-3 px-space-md">Scam Taxonomy Vector</th>
                      <th className="py-3 px-space-md text-center">Risk Score</th>
                      <th className="py-3 px-space-md text-right">Amount (₹)</th>
                      <th className="py-3 px-space-md text-center">
                        Gateway Defense Action
                      </th>
                      <th className="py-3 px-space-md text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-highest" id="telemetryFeedBody">
                    {filteredFeed.map((row) => (
                      <tr
                        key={row.id}
                        className={`hover:bg-surface-container-high/40 transition-colors ${
                          selectedIncident === row.id ? 'bg-surface-container-high/60' : ''
                        }`}
                      >
                        <td className="py-3 px-space-md font-label-numeric text-[12px] text-on-surface-variant">
                          {row.timestamp}
                        </td>
                        <td className="py-3 px-space-md font-label-numeric text-[12px] font-bold text-primary">
                          {row.id}
                        </td>
                        <td className="py-3 px-space-md">
                          <div className="flex flex-col">
                            <span className="text-on-surface font-semibold text-[13px]">
                              {row.merchantOrPayee}
                            </span>
                            <span className="font-label-numeric text-[11px] text-error font-medium">
                              {row.vpa}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-space-md">
                          <span
                            className={`px-2 py-0.5 rounded font-label-numeric text-[11px] font-medium ${
                              row.status === 'blocked'
                                ? 'bg-error-container/40 text-error'
                                : 'bg-surface-container-highest text-tertiary'
                            }`}
                          >
                            {row.scamVector || row.category}
                          </span>
                        </td>
                        <td className="py-3 px-space-md text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full font-label-numeric text-[11px] font-black ${
                              row.riskScore > 90
                                ? 'bg-error text-on-error'
                                : row.riskScore > 75
                                ? 'bg-tertiary-container text-on-tertiary-container'
                                : 'bg-secondary-container/30 text-secondary-fixed'
                            }`}
                          >
                            {row.riskScore} / 100
                          </span>
                        </td>
                        <td className="py-3 px-space-md text-right font-label-numeric text-[13px] font-bold text-on-surface">
                          ₹{row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-space-md text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-caps text-[10px] tracking-wider uppercase font-bold ${
                              row.status === 'blocked'
                                ? 'bg-error-container text-on-error-container'
                                : row.status === 'frozen'
                                ? 'bg-surface-container-highest text-tertiary-fixed'
                                : 'bg-surface-container-highest text-primary'
                            }`}
                          >
                            {row.status === 'blocked' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                            )}
                            {row.timeLabel}
                          </span>
                        </td>
                        <td className="py-3 px-space-md text-right">
                          <button
                            onClick={() => {
                              setSelectedIncident(row.id);
                              onInspectTxn(row);
                            }}
                            className="text-primary hover:text-primary-container font-label-caps text-[11px] tracking-wider uppercase font-bold cursor-pointer"
                          >
                            Inspect →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Feed Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md mt-space-sm border-t border-surface-container-highest">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-label-numeric text-[12px] text-on-surface-variant">
                    Buffer: 1,420 items loaded • Synced with CERT-In Fin-CERT Feed
                  </span>
                </div>
                <div className="flex items-center gap-space-xs font-label-numeric text-[12px]">
                  <button className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface">
                    ← Prev
                  </button>
                  <span className="px-3 py-1 rounded bg-primary text-on-primary font-bold">
                    1
                  </span>
                  <span className="px-3 py-1 rounded bg-surface-container-high text-on-surface-variant">
                    2
                  </span>
                  <span className="px-3 py-1 rounded bg-surface-container-high text-on-surface-variant">
                    3
                  </span>
                  <span className="text-outline">...</span>
                  <span className="px-3 py-1 rounded bg-surface-container-high text-on-surface-variant">
                    48
                  </span>
                  <button className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface">
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
