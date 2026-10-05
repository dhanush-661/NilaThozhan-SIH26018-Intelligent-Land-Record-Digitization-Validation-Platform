import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Unlock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  LogOut,
  KeyRound,
} from 'lucide-react';

interface SessionLockModalProps {
  isLocked: boolean;
  onUnlock: () => void;
}

export const SessionLockModal: React.FC<SessionLockModalProps> = ({ isLocked, onUnlock }) => {
  const { userProfile, currentRole, signOut } = useApp();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isLocked || !userProfile) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setErrorMsg('Please enter your 4-digit security PIN or password.');
      return;
    }

    // In demo environment, allow '1234', 'NilaThozhan2026!', or any 4+ char input
    if (pin === '1234' || pin === 'NilaThozhan2026!' || pin.length >= 4) {
      setErrorMsg(null);
      setPin('');
      onUnlock();
    } else {
      setErrorMsg('Incorrect PIN. (Use demo PIN 1234 or NilaThozhan2026!)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in select-none">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 sm:p-8 text-white shadow-2xl text-center space-y-5 animate-in zoom-in-95">
        {/* Officer Avatar Badge */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-xl shadow-emerald-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl font-bold text-emerald-400">
            {userProfile.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* User Identity */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full inline-block mb-1">
            Workstation Locked (திரைப் பூட்டு)
          </span>
          <h3 className="text-lg font-bold text-white mt-1">
            {userProfile.fullName}
          </h3>
          <p className="text-xs text-slate-400">
            {userProfile.designation || currentRole} • {userProfile.location || 'Revenue Registry'}
          </p>
        </div>

        {/* Unlock Form */}
        <form onSubmit={handleUnlock} className="space-y-3">
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1 text-left">
              Enter Security PIN / Password
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (Demo: 1234)"
                className="w-full py-2.5 px-3.5 text-center text-base font-mono tracking-widest bg-slate-950/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-white transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30 cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
            <span>Unlock Workstation</span>
          </button>
        </form>

        {/* Sign Out Option */}
        <div className="pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={signOut}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out completely</span>
          </button>
        </div>
      </div>
    </div>
  );
};
