import React, { useState, useEffect, useRef } from 'react';
import {
  UNIVERSAL_LANGUAGES,
  UniversalLanguage,
  applyUniversalLanguage,
  getActiveUniversalLanguage,
  initUniversalTranslator,
} from '../../services/universalTranslator';
import { Globe, Check, ChevronDown, Sparkles, RotateCcw } from 'lucide-react';

interface UniversalTranslatorBarProps {
  variant?: 'header' | 'floating' | 'inline';
}

export const UniversalTranslatorBar: React.FC<UniversalTranslatorBarProps> = ({
  variant = 'header',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCode, setActiveCode] = useState<string>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initUniversalTranslator();
    setActiveCode(getActiveUniversalLanguage());

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: string) => {
    setActiveCode(code);
    setIsOpen(false);
    applyUniversalLanguage(code);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCode('en');
    setIsOpen(false);
    applyUniversalLanguage('en');
  };

  const currentLang =
    UNIVERSAL_LANGUAGES.find((l) => l.code === activeCode) || UNIVERSAL_LANGUAGES[0];

  const isTranslated = activeCode !== 'en';

  if (variant === 'floating') {
    return (
      <div
        ref={dropdownRef}
        className="fixed bottom-4 right-4 z-50 print:hidden notranslate"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-2xl shadow-xl border text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
            isTranslated
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
              : 'bg-slate-900/90 hover:bg-slate-800 text-slate-100 border-slate-700 hover:border-emerald-500'
          }`}
          title="Universal Browser Translation (Kannada, Malayalam, Telugu, etc.)"
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          <span className="flex items-center gap-1.5">
            <span>{currentLang.flag}</span>
            <span>{isTranslated ? currentLang.nativeName : 'Universal Translate'}</span>
          </span>
          <ChevronDown className="w-3.5 h-3.5 opacity-70" />
        </button>

        {isOpen && (
          <div className="absolute bottom-12 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-2 border-b border-slate-100 flex items-center justify-between">
              <div>
                <strong className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Universal Browser Translate
                </strong>
                <p className="text-[10px] text-slate-500">
                  Translate full page to Kannada, Malayalam, Telugu, etc.
                </p>
              </div>
              {isTranslated && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  title="Reset to Original"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
              {UNIVERSAL_LANGUAGES.map((lang) => {
                const isSelected = activeCode === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div>
                        <span className="font-semibold block">{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400">
                          {lang.name} • {lang.region}
                        </span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Header or inline variant
  return (
    <div ref={dropdownRef} className="relative notranslate">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs cursor-pointer ${
          isTranslated
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
        }`}
        title="Universal Browser Translation: Kannada, Malayalam, Telugu, Hindi, Tamil & more"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-slate-800 font-medium hidden sm:inline">
          {isTranslated ? currentLang.nativeName : 'Universal'}
        </span>
        <span className="text-xs">{currentLang.flag}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-slate-100 flex items-center justify-between">
            <div>
              <strong className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Universal Browser Translate
              </strong>
              <p className="text-[10px] text-slate-500">
                View in Kannada, Malayalam, Telugu, etc.
              </p>
            </div>
            {isTranslated && (
              <button
                type="button"
                onClick={handleReset}
                className="px-2 py-0.5 text-[10px] font-bold text-rose-600 hover:bg-rose-50 rounded-md border border-rose-200 transition-colors"
                title="Reset to Original"
              >
                ↺ Reset
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto py-1 space-y-0.5 custom-scrollbar">
            {UNIVERSAL_LANGUAGES.map((lang) => {
              const isSelected = activeCode === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <div>
                      <span className="font-semibold block">{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400">
                        {lang.name} • {lang.region}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
