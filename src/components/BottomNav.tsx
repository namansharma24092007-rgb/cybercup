import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  unresolvedThreatCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onSelectScreen,
  unresolvedThreatCount = 1,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(2,6,23,0.85)] border-t border-surface-container-high/50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-gutter-mobile">
        {/* Safety Hub */}
        <button
          onClick={() => onSelectScreen('safety-hub')}
          className={`flex flex-col items-center justify-center min-w-[72px] h-12 transition-all ${
            currentScreen === 'safety-hub'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl transition-transform active:scale-90"
            style={currentScreen === 'safety-hub' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            verified_user
          </span>
          <span className="font-label-caps text-label-caps mt-0.5">Safety Hub</span>
        </button>

        {/* Live Intercept with 1 HIGH RISK badge */}
        <button
          onClick={() => onSelectScreen('live-intercept')}
          className={`flex flex-col items-center justify-center min-w-[72px] h-12 transition-all relative ${
            currentScreen === 'live-intercept'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span
              className="material-symbols-outlined text-2xl text-tertiary-container transition-transform active:scale-90"
              style={currentScreen === 'live-intercept' ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              gpp_maybe
            </span>
            {unresolvedThreatCount > 0 && (
              <span className="absolute -top-1.5 -right-7 px-1.5 py-0.2 bg-error text-on-error font-label-caps text-[9px] rounded-full uppercase tracking-tighter shadow-[0_0_10px_rgba(239,68,68,0.4)] animate-pulse">
                {unresolvedThreatCount} HIGH RISK
              </span>
            )}
          </div>
          <span className="font-label-caps text-label-caps mt-0.5">Live Intercept</span>
        </button>

        {/* Analyst AI */}
        <button
          onClick={() => onSelectScreen('analyst-ai')}
          className={`flex flex-col items-center justify-center min-w-[72px] h-12 transition-all ${
            currentScreen === 'analyst-ai'
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl transition-transform active:scale-90"
            style={currentScreen === 'analyst-ai' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            insights
          </span>
          <span className="font-label-caps text-label-caps mt-0.5">Analyst AI</span>
        </button>
      </div>
    </nav>
  );
};
