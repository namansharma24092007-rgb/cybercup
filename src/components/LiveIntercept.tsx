import React, { useEffect, useState } from 'react';

interface LiveInterceptProps {
  onResolveThreat?: () => void;
  onNavigateToHub?: () => void;
}

export const LiveIntercept: React.FC<LiveInterceptProps> = ({
  onResolveThreat,
  onNavigateToHub,
}) => {
  // Friction countdown breaker logic
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCooldownReady, setIsCooldownReady] = useState(false);

  // Button states
  const [blockStatus, setBlockStatus] = useState<'idle' | 'reporting' | 'blocked'>('idle');
  const [killStatus, setKillStatus] = useState<'idle' | 'terminated'>('idle');
  const [showOverridePrompt, setShowOverridePrompt] = useState(false);
  const [overrideGranted, setOverrideGranted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsCooldownReady(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCooldownReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleBlockFraud = () => {
    setBlockStatus('reporting');
    setTimeout(() => {
      setBlockStatus('blocked');
      if (onResolveThreat) {
        onResolveThreat();
      }
    }, 1200);
  };

  const handleKillScreenShare = () => {
    setKillStatus('terminated');
  };

  const handleOverrideClick = () => {
    if (!isCooldownReady) return;
    setShowOverridePrompt(true);
  };

  const handleConfirmOverride = () => {
    setShowOverridePrompt(false);
    setOverrideGranted(true);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile pb-space-xl max-w-lg mx-auto">
      {/* Glowing Urgent Intercept Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-error-container/90 via-surface-container-high to-surface-container p-space-md shadow-[0_0_35px_rgba(239,68,68,0.35)] mt-space-sm border border-error/50">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-tertiary-container/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-error flex items-center justify-center flex-shrink-0 text-on-error shadow-md animate-bounce">
            <span
              className="material-symbols-outlined text-2xl font-filled"
            >
              front_hand
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-caps text-[10px] uppercase tracking-wider font-bold">
                Intercept Level 4
              </span>
              <span className="font-label-numeric text-[11px] text-tertiary font-bold tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                LIVE BLOCK
              </span>
            </div>
            <h1 className="font-headline-md text-headline-sm text-error mt-0.5 leading-tight font-black">
              STOP: YOU ARE PAYING, NOT RECEIVING!
            </h1>
            <p className="font-devanagari-headline text-[13px] text-tertiary font-bold mt-0.5">
              रुकिए! आप पैसे भेज रहे हैं, प्राप्त नहीं कर रहे हैं!
            </p>
          </div>
        </div>

        {/* Live Amount Debit Warning Box */}
        <div className="mt-space-md p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between border border-error/30">
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider">
              Wallet Outflow
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg-mobile text-error font-black">
                - ₹4,999.00
              </span>
              <span className="font-label-caps text-[10px] text-error bg-error/15 px-1.5 py-0.5 rounded uppercase font-bold">
                Debit Intent
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <div className="px-2 py-1 rounded bg-error-container text-on-error-container font-label-numeric text-[11px] font-bold">
              RISK: 98/100
            </div>
            <span className="font-body-sm text-[11px] text-tertiary mt-1">
              Extreme Hazard
            </span>
          </div>
        </div>
      </div>

      {/* Deception Vector & Discrepancy Matrix */}
      <div className="mt-space-md rounded-xl bg-surface-container-high p-space-md shadow-lg border border-surface-container-highest">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary-container text-lg">
              psychology_alt
            </span>
            <span className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider">
              Social Engineering Trap
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-numeric text-[10px]">
            NPCI Fraud Sig #841
          </span>
        </div>

        {/* Comparative Visual: Claimed vs Verified VPA */}
        <div className="mt-space-sm space-y-2">
          {/* Claimed Identity */}
          <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between border border-surface-container-highest">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant flex-shrink-0">
                <span className="material-symbols-outlined text-sm">badge</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  Claimed Payee Header
                </span>
                <span className="font-headline-sm text-sm text-on-surface line-through decoration-error decoration-2 truncate">
                  MSEB Electricity Refund Desk
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-error flex-shrink-0">
              cancel
            </span>
          </div>

          {/* Actual Backend VPA */}
          <div className="p-space-sm rounded-lg bg-error-container/30 flex items-center justify-between border border-error/30">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-7 h-7 rounded-full bg-error-container flex items-center justify-center text-on-error-container flex-shrink-0">
                <span className="material-symbols-outlined text-sm">warning</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-body-sm text-[11px] text-tertiary">
                  Real Destination Account (Mule)
                </span>
                <span className="font-label-numeric text-xs text-error font-bold truncate">
                  fastag-mule-9821@airtel
                </span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-error text-on-error font-label-caps text-[9px] uppercase font-bold tracking-tighter">
              Fake ID
            </span>
          </div>
        </div>

        {/* Trap Note Quote */}
        <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container flex gap-space-sm items-start border border-surface-container-highest/60">
          <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">
            format_quote
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant italic">
            "Refund approved: Enter 6-digit UPI PIN to claim deposit into your bank account immediately."
          </p>
        </div>
      </div>

      {/* Multi-Factor Deep Explainability Drivers */}
      <div className="mt-space-md space-y-space-sm">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
            AI Explainability Vectors (3 Anomalies)
          </span>
          <span className="font-label-numeric text-[11px] text-secondary">
            Zero-Trust Active
          </span>
        </div>

        {/* Factor 1: PIN Reversal Lie */}
        <div className="rounded-xl bg-surface-container p-space-sm flex items-start gap-space-sm border border-surface-container-highest/50">
          <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-lg">pin</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-headline-sm text-xs text-on-surface font-bold">
                UPI Golden Rule Broken
              </span>
              <span className="font-label-numeric text-[11px] text-error font-bold">
                +48% Risk
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              UPI PIN is strictly used to <span className="text-error font-semibold">pay out</span>. You NEVER need to enter your secret PIN to receive any refund or cashback.
            </p>
            <div className="mt-1.5 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-error h-full rounded-full w-[96%]"></div>
            </div>
          </div>
        </div>

        {/* Factor 2: High Velocity Mule Account */}
        <div className="rounded-xl bg-surface-container p-space-sm flex items-start gap-space-sm border border-surface-container-highest/50">
          <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-lg">
              history_toggle_off
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-headline-sm text-xs text-on-surface font-bold">
                Ephemeral Mule Account
              </span>
              <span className="font-label-numeric text-[11px] text-tertiary-container font-bold">
                +31% Risk
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Target VPA created only{' '}
              <span className="text-on-surface font-medium">3 hours ago</span>. Received 42 suspicious inbound transfers from unlinked geographic clusters.
            </p>
            <div className="mt-1.5 w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-tertiary-container h-full rounded-full w-[78%]"></div>
            </div>
          </div>
        </div>

        {/* Factor 3: Active Screen Sharing Threat */}
        <div className="rounded-xl bg-error/10 p-space-sm flex items-start gap-space-sm border border-error/30">
          <div className="w-8 h-8 rounded-lg bg-error text-on-error flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_12px_rgba(239,68,68,0.5)]">
            <span className="material-symbols-outlined text-lg animate-pulse">
              screen_share
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-headline-sm text-xs text-error font-bold">
                Active Remote App Detected!
              </span>
              <span className="font-label-numeric text-[11px] text-error font-bold">
                CRITICAL
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              <span className="text-error font-semibold">AnyDesk / RustDesk</span> is actively streaming your display. Attackers can view your one-time passwords and interface!
            </p>
          </div>
        </div>
      </div>

      {/* Verified Guardian Hotline Capsule */}
      <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-lowest flex items-center justify-between shadow-sm border border-surface-container-highest">
        <div className="flex items-center gap-space-sm">
          <div className="w-7 h-7 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-sm">
              support_agent
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] text-secondary uppercase tracking-wider font-bold">
              National Cyber Crime Portal
            </span>
            <a
              href="tel:1930"
              className="font-body-sm text-xs text-on-surface hover:text-primary font-semibold"
            >
              Emergency Helpline: Dial 1930
            </a>
          </div>
        </div>
        <span className="px-2 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-numeric text-[11px] font-semibold">
          24x7 Active
        </span>
      </div>

      {/* Friction-Engineered Safety Decision Matrix */}
      <div className="mt-space-lg flex flex-col gap-space-sm">
        {/* Primary Big Action: Safe Abort & Blacklist */}
        <button
          onClick={handleBlockFraud}
          disabled={blockStatus !== 'idle'}
          className={`w-full py-3.5 px-space-md rounded-xl font-headline-sm text-sm font-bold flex items-center justify-center gap-space-sm shadow-[0_8px_24px_rgba(239,68,68,0.4)] active:scale-[0.98] transition-all ${
            blockStatus === 'blocked'
              ? 'bg-secondary-container text-on-secondary-container'
              : 'bg-error text-on-error hover:bg-error/90'
          }`}
          id="btn-block-fraud"
        >
          {blockStatus === 'reporting' ? (
            <>
              <span className="material-symbols-outlined text-xl animate-spin">
                sync
              </span>
              <span>Reporting to NPCI Central Registry...</span>
            </>
          ) : blockStatus === 'blocked' ? (
            <>
              <span className="material-symbols-outlined text-xl font-filled">
                verified
              </span>
              <span>VPA Blacklisted • Transaction Aborted</span>
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-xl font-filled"
              >
                gpp_bad
              </span>
              <span>BLOCK &amp; REPORT FRAUD (FREEZE)</span>
            </>
          )}
        </button>

        {/* Secondary Safe Action: Disconnect Screen Share & Exit */}
        <button
          onClick={handleKillScreenShare}
          className="w-full py-3 px-space-md rounded-xl bg-surface-container-high text-on-surface font-headline-sm text-xs font-semibold flex items-center justify-center gap-space-xs hover:bg-surface-container-highest active:scale-[0.98] transition-colors border border-surface-container-highest"
          id="btn-kill-session"
        >
          {killStatus === 'terminated' ? (
            <>
              <span className="material-symbols-outlined text-lg text-secondary">
                check_circle
              </span>
              <span className="text-secondary">Screen Feed Cut • Intent Voided</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg text-tertiary">
                stop_screen_share
              </span>
              <span>Terminate Remote Screen &amp; Cancel Request</span>
            </>
          )}
        </button>

        {/* Friction Gate: Cooldown Override */}
        <div className="mt-space-xs pt-space-xs flex flex-col items-center">
          <button
            onClick={handleOverrideClick}
            disabled={!isCooldownReady || overrideGranted}
            className={`font-body-sm text-xs flex items-center gap-1.5 py-1 px-3 rounded transition-all ${
              overrideGranted
                ? 'text-secondary font-semibold'
                : isCooldownReady
                ? 'text-on-surface-variant hover:text-on-surface cursor-pointer'
                : 'text-outline opacity-60 cursor-not-allowed'
            }`}
            id="btn-override"
          >
            <span className="material-symbols-outlined text-sm">
              {overrideGranted ? 'lock_open' : 'lock_clock'}
            </span>
            <span>
              {overrideGranted ? (
                'Manual Override Submitted (Forwarded to Bank Sandbox)'
              ) : isCooldownReady ? (
                'I trust this payee (Review complete - click to authorize)'
              ) : (
                <>
                  I trust this payee (
                  <span className="font-label-numeric font-bold text-tertiary">
                    00:0{timeLeft}
                  </span>{' '}
                  mandatory review)
                </>
              )}
            </span>
          </button>
          <span className="font-body-sm text-[10px] text-outline mt-1 text-center px-4">
            UPI Raksha AI automatically notifies your linked bank branch to halt unauthorized token handshakes.
          </span>
        </div>
      </div>

      {/* Override Confirmation Modal */}
      {showOverridePrompt && (
        <div className="fixed inset-0 z-50 bg-surface-dim/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
          <div className="w-full max-w-sm bg-surface-container-high rounded-xl p-4 shadow-2xl border border-error/40 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-error">
              <span className="material-symbols-outlined text-2xl">warning</span>
              <span className="font-headline-sm text-body-lg font-bold">
                High Risk Confirmation
              </span>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant">
              You are about to send <strong className="text-on-surface">₹4,999.00</strong> to an untrusted mule address flagged by NPCI. Are you absolutely certain?
            </p>
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleConfirmOverride}
                className="flex-1 py-2 bg-error text-on-error rounded-lg font-headline-sm text-xs font-bold"
              >
                Proceed via Bank Sandbox
              </button>
              <button
                onClick={() => setShowOverridePrompt(false)}
                className="px-3 py-2 bg-surface-container-highest text-on-surface rounded-lg font-body-sm text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return to Hub button if blocked */}
      {blockStatus === 'blocked' && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onNavigateToHub}
            className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary font-headline-sm text-xs rounded-lg flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Return to Safety Hub</span>
          </button>
        </div>
      )}
    </div>
  );
};
