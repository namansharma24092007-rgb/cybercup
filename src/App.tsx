/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnalystAI } from './components/AnalystAI';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { InspectModal } from './components/InspectModal';
import { LiveIntercept } from './components/LiveIntercept';
import { SafetyHub } from './components/SafetyHub';
import { SimulatorModal } from './components/SimulatorModal';
import { SovereignCoreOps } from './components/SovereignCoreOps';
import { ViewSwitcher } from './components/ViewSwitcher';
import { SCAM_SCENARIOS, SOC_TELEMETRY_FEED } from './data/mockData';
import { AppMode, ScamScenario, ScreenType, Transaction } from './types';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('mobile');
  const [mobileScreen, setMobileScreen] = useState<ScreenType>('safety-hub');
  const [phoneFrameEnabled, setPhoneFrameEnabled] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState<ScamScenario | null>(null);
  const [inspectingTxn, setInspectingTxn] = useState<Transaction | null>(null);
  const [unresolvedThreatCount, setUnresolvedThreatCount] = useState(1);
  const [shieldActive, setShieldActive] = useState(true);

  // Trigger test scam
  const handleTriggerScamTest = () => {
    setAppMode('mobile');
    setMobileScreen('live-intercept');
    setUnresolvedThreatCount(1);
  };

  const handleResolveThreat = () => {
    setUnresolvedThreatCount(0);
  };

  const handleHaltAndReport = (scenario: ScamScenario) => {
    setActiveSimulation(null);
    setMobileScreen('live-intercept');
  };

  const handleInspectById = (txnId: string) => {
    const found =
      SOC_TELEMETRY_FEED.find((t) => t.id === txnId) || {
        id: txnId,
        timestamp: '14:02:19.421',
        merchantOrPayee: 'Reported Mule VPA',
        vpa: 'fastag-mule-9821@airtel',
        amount: 4999.00,
        riskScore: 94,
        status: 'blocked' as const,
        category: 'Reverse Collect Intent',
        scamVector: 'Reverse Collect Intent',
        timeLabel: 'PRE-PIN HALTED',
      };
    setInspectingTxn(found);
  };

  return (
    <div className="min-h-screen bg-[#0e1321] text-[#dee2f6]">
      {/* Top Floating View Switcher Bar */}
      <ViewSwitcher
        appMode={appMode}
        onSelectMode={(mode) => setAppMode(mode)}
        currentMobileScreen={mobileScreen}
        onSelectMobileScreen={(screen) => setMobileScreen(screen)}
        phoneFrameEnabled={phoneFrameEnabled}
        onTogglePhoneFrame={() => setPhoneFrameEnabled(!phoneFrameEnabled)}
        onTriggerScamTest={handleTriggerScamTest}
      />

      {/* Screen 4: Sovereign Core Ops (SOC Desktop Dashboard) */}
      {appMode === 'soc' ? (
        <SovereignCoreOps
          onInspectTxn={(txn) => setInspectingTxn(txn)}
          onNavigateToMobileApp={() => setAppMode('mobile')}
        />
      ) : (
        /* Citizen Guardian Mobile App (Screens 1, 2, 3) */
        <div
          className={`min-h-screen flex flex-col justify-start items-center ${
            phoneFrameEnabled ? 'py-8 px-4 bg-surface-container-lowest' : ''
          }`}
        >
          {/* Optional Phone Bezel Frame for Desktop Review */}
          <div
            className={`w-full flex flex-col relative transition-all duration-300 ${
              phoneFrameEnabled
                ? 'max-w-[420px] rounded-[42px] border-[10px] border-surface-container-highest shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden bg-surface min-h-[880px]'
                : 'max-w-lg'
            }`}
          >
            {/* Phone Speaker & Dynamic Island simulation if frame active */}
            {phoneFrameEnabled && (
              <div className="w-full h-7 bg-surface-container-lowest flex items-center justify-between px-6 text-[10px] font-label-numeric text-outline z-50">
                <span>9:41</span>
                <div className="w-20 h-4 bg-surface-container-highest rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest"></div>
                </div>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <span className="material-symbols-outlined text-[13px]">
                    battery_full
                  </span>
                </div>
              </div>
            )}

            {/* Mobile Header */}
            <Header
              shieldActive={shieldActive}
              onProfileClick={() => {
                alert(
                  'Citizen Profile: Namrata S. • Protected Device ID #IN-9021-M • Bank Handshakes: 3 Verified (HDFC, SBI, ICICI)'
                );
              }}
            />

            {/* Main Content Body */}
            <main
              className={`flex flex-col relative w-full pt-20 bg-surface min-h-screen pb-24 ${
                phoneFrameEnabled ? 'pt-16 min-h-[800px]' : ''
              }`}
            >
              {mobileScreen === 'safety-hub' && (
                <SafetyHub
                  onRunSimulation={(scenario) => setActiveSimulation(scenario)}
                  onNavigateToIntercept={() => setMobileScreen('live-intercept')}
                />
              )}

              {mobileScreen === 'live-intercept' && (
                <LiveIntercept
                  onResolveThreat={handleResolveThreat}
                  onNavigateToHub={() => setMobileScreen('safety-hub')}
                />
              )}

              {mobileScreen === 'analyst-ai' && (
                <AnalystAI onInspectTxn={handleInspectById} />
              )}
            </main>

            {/* Mobile Bottom Navigation */}
            <BottomNav
              currentScreen={mobileScreen}
              onSelectScreen={(screen) => setMobileScreen(screen)}
              unresolvedThreatCount={unresolvedThreatCount}
            />
          </div>
        </div>
      )}

      {/* Simulator Modal for Fraud Threat Testing */}
      <SimulatorModal
        scenario={activeSimulation}
        onClose={() => setActiveSimulation(null)}
        onHaltAndReport={handleHaltAndReport}
      />

      {/* Forensic Dossier Inspect Modal */}
      <InspectModal
        txn={inspectingTxn}
        onClose={() => setInspectingTxn(null)}
        onAction={(action) => {
          alert(`Gateway Action: ${action} executed successfully. NPCI switch updated.`);
        }}
      />
    </div>
  );
}
