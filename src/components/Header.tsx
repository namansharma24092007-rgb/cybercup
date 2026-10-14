import React from 'react';
import { LOGO_URL, PROFILE_AVATAR } from '../data/mockData';

interface HeaderProps {
  onProfileClick?: () => void;
  shieldActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ shieldActive = true, onProfileClick }) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.45)] border-b border-surface-container-high/40">
      <div className="h-16 px-gutter-mobile flex items-center justify-between max-w-lg mx-auto">
        {/* Brand Lockup */}
        <div className="flex items-center gap-space-sm min-w-0">
          <img
            alt="UPI Raksha AI Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                UPI Raksha AI
              </span>
            </div>
            <span className="font-devanagari-body text-[11px] text-secondary truncate">
              यूपीआई रक्षा • NPCI Verified Guardian
            </span>
          </div>
        </div>

        {/* Right Status Capsule & User Avatar */}
        <div className="flex items-center gap-space-sm flex-shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-[0_0_12px_rgba(78,222,163,0.15)] border border-secondary/20">
            <span className="relative flex h-2 w-2">
              {shieldActive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  shieldActive ? 'bg-secondary' : 'bg-outline'
                }`}
              ></span>
            </span>
            <span
              className={`font-label-numeric text-[10px] uppercase font-bold tracking-wider ${
                shieldActive ? 'text-secondary' : 'text-outline'
              }`}
            >
              {shieldActive ? 'SHIELD: ACTIVE' : 'SHIELD: PAUSED'}
            </span>
          </div>

          <button
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            title="Citizen Profile: Namrata S."
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={PROFILE_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
