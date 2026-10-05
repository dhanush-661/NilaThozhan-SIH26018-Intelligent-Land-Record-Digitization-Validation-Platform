import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  RefreshCw,
  KeyRound,
} from 'lucide-react';

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  actionTitle: string;
  officerName: string;
  phoneNumber?: string;
}

export const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  actionTitle,
  officerName,
  phoneNumber = '+91 94440 XXXXX',
}) => {
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(30);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setOtpDigits(['', '', '', '', '', '']);
      setErrorMsg(null);
      setCountdown(30);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }

    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);
    setErrorMsg(null);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-box-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMsg('Please enter all 6 digits of the authentication OTP.');
      return;
    }

    // In demo environment, any 6-digit OTP or '123456' is valid
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
      onClose();
    }, 600);
  };

  const fillDemoOtp = () => {
    setOtpDigits(['1', '2', '3', '4', '5', '6']);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                2FA Multi-Factor Challenge
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                Officer Security Verification
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          <div className="text-center space-y-1">
            <p className="text-xs text-slate-500">
              High-privilege action requested by <strong>{officerName}</strong>:
            </p>
            <p className="font-bold text-slate-800 text-sm bg-slate-50 p-2 rounded-lg border border-slate-200 font-mono">
              {actionTitle}
            </p>
            <p className="text-[11px] text-slate-500 pt-1 flex items-center justify-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-slate-400" />
              <span>Enter 6-digit OTP dispatched to {phoneNumber}</span>
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* OTP Digit Boxes */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                id={`otp-box-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-10 sm:w-11 h-12 text-center text-lg font-bold font-mono rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 bg-slate-50 focus:bg-white text-slate-900 outline-none transition-all shadow-2xs"
                autoFocus={i === 0}
              />
            ))}
          </div>

          {/* Countdown & Resend */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>
              {countdown > 0 ? (
                `OTP expires in ${countdown}s`
              ) : (
                <button
                  type="button"
                  onClick={() => setCountdown(30)}
                  className="text-amber-700 font-bold hover:underline"
                >
                  Resend OTP Code
                </button>
              )}
            </span>
            <button
              type="button"
              onClick={fillDemoOtp}
              className="text-emerald-700 font-bold hover:underline"
            >
              Fill Demo OTP (123456)
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-amber-600 hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Authorize & Apply Digital Signature</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 text-center text-[10px] text-slate-400">
          🔒 Protected by UIDAI Aadhaar e-Sign & DILRMP Two-Factor Security Protocol
        </div>
      </div>
    </div>
  );
};
