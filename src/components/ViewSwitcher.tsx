import React from 'react';
import { AppMode, ScreenType } from '../types';

interface ViewSwitcherProps {
  appMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  currentMobileScreen: ScreenType;
  onSelectMobileScreen: (screen: ScreenType) => void;
  phoneFrameEnabled: boolean;
  onTogglePhoneFrame: () => void;
  onTriggerScamTest: () => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  appMode,
  onSelectMode,
  currentMobileScreen,
  onSelectMobileScreen,
  phoneFrameEnabled,
  onTogglePhoneFrame,
  onTriggerScamTest,
}) => {
  return (
    <aside
      aria-label="Screen View Controller"
      className="fixed top-2 right-2 sm:right-4 z-[999] flex items-center gap-1.5 p-1 bg-surface-container-lowest/90 backdrop-blur-xl rounded-xl border border-surface-container-highest shadow-2xl"
    >
      {/* Mode Segmented Controls */}
      <div className="flex items-center gap-1 bg-surface-container-high/80 p-0.5 rounded-lg border border-surface-container-highest/60">
        <button
          onClick={() => onSelectMode('mobile')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            appMode === 'mobile'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="Switch to Mobile Citizen Guardian view (Screens 1, 2, 3)"
        >
          <span className="material-symbols-outlined text-[15px]">smartphone</span>
          <span className="hidden sm:inline">Citizen App</span>
        </button>

        <button
          onClick={() => onSelectMode('soc')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
            appMode === 'soc'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          title="Switch to Sovereign Core Ops Desktop SOC console (Screen 4)"
        >
          <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
          <span className="hidden sm:inline">Sovereign SOC</span>
        </button>
      </div>

      {/* When in Mobile Mode: Screen Jump Tabs */}
      {appMode === 'mobile' && (
        <div className="hidden md:flex items-center gap-1 bg-surface-container-high/60 p-0.5 rounded-lg border border-surface-container-highest/40">
          <button
            onClick={() => onSelectMobileScreen('safety-hub')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              currentMobileScreen === 'safety-hub'
                ? 'bg-surface-bright text-primary font-bold'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Hub
          </button>
          <button
            onClick={() => onSelectMobileScreen('live-intercept')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              currentMobileScreen === 'live-intercept'
                ? 'bg-error-container text-on-error font-bold'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
            Intercept
          </button>
          <button
            onClick={() => onSelectMobileScreen('analyst-ai')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              currentMobileScreen === 'analyst-ai'
                ? 'bg-surface-bright text-primary font-bold'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            Analyst AI
          </button>
        </div>
      )}

      {/* Frame Toggle */}
      {appMode === 'mobile' && (
        <button
          onClick={onTogglePhoneFrame}
          className={`hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border border-surface-container-highest transition-colors cursor-pointer ${
            phoneFrameEnabled
              ? 'bg-secondary-container/20 text-secondary border-secondary/30'
              : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
          }`}
          title={phoneFrameEnabled ? 'Disable device frame' : 'Enable device frame'}
        >
          <span className="material-symbols-outlined text-[15px]">
            {phoneFrameEnabled ? 'phone_iphone' : 'crop_free'}
          </span>
          <span className="text-[11px]">{phoneFrameEnabled ? 'Framed' : 'Full'}</span>
        </button>
      )}

      {/* Quick Test Trigger */}
      <button
        onClick={onTriggerScamTest}
        className="flex items-center gap-1 px-2.5 py-1 bg-error/90 hover:bg-error text-on-error rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        title="Simulate incoming collect scam to trigger live intercept banner"
      >
        <span className="material-symbols-outlined text-[15px] animate-pulse">
          warning
        </span>
        <span className="text-[11px]">Test Intercept</span>
      </button>
    </aside>
  );
};
