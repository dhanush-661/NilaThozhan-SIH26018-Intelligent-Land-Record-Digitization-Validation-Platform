import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_STATES } from '../../i18n/stateLanguages';
import { Globe, Sparkles } from 'lucide-react';

interface StateJurisdictionSelectorProps {
  id?: string;
  onStateChangeExtra?: (stateCode: string) => void;
  label?: string;
}

export const StateJurisdictionSelector: React.FC<StateJurisdictionSelectorProps> = ({
  id = 'state-jurisdiction-select',
  onStateChangeExtra,
  label = 'State / Cadastral Jurisdiction',
}) => {
  const {
    selectedState,
    setSelectedState,
    autoDetectedLocation,
  } = useApp();

  const [showAutoNotice, setShowAutoNotice] = useState<boolean>(false);

  const handleStateChange = (code: string) => {
    setSelectedState(code);
    if (onStateChangeExtra) {
      onStateChangeExtra(code);
    }
    setShowAutoNotice(true);
    setTimeout(() => setShowAutoNotice(false), 3500);
  };

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-2.5 notranslate">
      {/* Header Row: Label on Left, Non-interactive State Mapped Language Badge on Right */}
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label}</span>
        </label>

        {/* State Mapped Language Indicator Badge (No manual override option) */}
        <div
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs select-none"
          title={`Language mapped to ${selectedState.name}: ${selectedState.languageLabel}`}
        >
          <span>🌐</span>
          <span>{selectedState.languageLabel}</span>
        </div>
      </div>

      {/* State Selector Dropdown (combines jurisdiction and regional language) */}
      <div className="relative">
        <select
          id={id}
          value={selectedState.code}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer shadow-2xs"
        >
          {INDIAN_STATES.map((st) => (
            <option key={st.code} value={st.code} className="text-slate-800 py-1">
              {st.name} ({st.nativeName}) — {st.languageLabel}
            </option>
          ))}
        </select>
      </div>

      {/* Auto-detected IP Location Notice */}
      {autoDetectedLocation && !showAutoNotice && (
        <div className="text-[11px] font-medium text-emerald-800 bg-emerald-50/90 border border-emerald-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            📍 Auto-detected location: <strong>{selectedState.name}</strong> • Language: <strong>{selectedState.languageLabel}</strong>
          </span>
        </div>
      )}

      {/* Language Auto-adapted notification pill */}
      {showAutoNotice && (
        <div className="text-[11px] font-medium text-emerald-700 bg-emerald-50/90 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>
            Language automatically mapped to state: <strong>{selectedState.languageLabel}</strong>
          </span>
        </div>
      )}
    </div>
  );
};
