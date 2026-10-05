import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { INDIAN_STATES } from '../../i18n/stateLanguages';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';
import {
  Bell,
  Search,
  ChevronDown,
  Globe,
  Menu,
  Check,
  LogOut,
  Lock,
  Languages,
} from 'lucide-react';
import { NotificationDrawer } from '../common/NotificationDrawer';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    currentRole,
    currentProfile,
    userProfile,
    activeTab,
    setRole,
    signOut,
    lockWorkstation,
    unreadNotificationCount,
    openSearchModal,
    selectedState,
    setSelectedState,
    currentLanguage,
    setLanguage,
    t,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        !target.closest('#header-language-btn') &&
        !target.closest('#header-state-jurisdiction-btn') &&
        !target.closest('#user-profile-menu-btn')
      ) {
        setIsLangDropdownOpen(false);
        setIsStateDropdownOpen(false);
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Dynamic translated page title
  const getPageTitle = (): string => {
    switch (activeTab) {
      case 'dashboard':
      case 'my-documents':
        return t('navMyDocuments');
      case 'gis-map':
        return t('navGisMap');
      case 'upload':
        return t('navUpload');
      case 'file-to-gis':
        return t('navFileToGis');
      case 'queue':
        return t('navQueue');
      case 'processing-validation':
      case 'manual-verification':
      case 'gis-validation':
      case 'digitization':
        return t('navValidation');
      case 'approvals':
        return t('navApprovals');
      case 'final-approval':
        return t('navFinalApproval');
      case 'reports':
        return t('navReports');
      case 'audit-trail':
        return t('navAudit');
      case 'help':
        return t('navHelp');
      default:
        return t('appName');
    }
  };

  const roleOptions: { role: UserRole; title: string; subtitle: string; icon: string }[] = [
    {
      role: 'CITIZEN',
      title: t('roleCitizen'),
      subtitle: t('roleCitizenSubtitle'),
      icon: '👤',
    },
    {
      role: 'OFFICER',
      title: t('roleOfficer'),
      subtitle: t('roleOfficerSubtitle'),
      icon: '🛡️',
    },
    {
      role: 'HIGH_AUTHORITY',
      title: t('roleAuthority'),
      subtitle: t('roleAuthoritySubtitle'),
      icon: '🏛️',
    },
  ];

  return (
    <>
      <header
        id="app-header"
        className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-3 sm:px-6 shrink-0 shadow-xs"
      >
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            id="sidebar-mobile-toggle"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="md:hidden h-8 w-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs">
              <img
                src="/assets/home-button-svgrepo-com.svg"
                alt="Nila Thozhan"
                className="h-5 w-5"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                {getPageTitle()}
              </h1>
              <span className="hidden sm:block text-[11px] text-slate-500 font-medium">
                {t('appName')} • {currentProfile.location}
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls: Search, Language Switcher, Role Selector, Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Universal Search (simplified) */}
          <div className="relative hidden md:block">
            <input
              id="header-search-input"
              type="text"
              readOnly
              onClick={() => openSearchModal('')}
              placeholder={t('searchPlaceholder')}
              className="pl-9 pr-3 py-1.5 bg-slate-100/90 border border-slate-200/60 rounded-xl text-xs w-48 lg:w-60 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 placeholder:text-slate-400 cursor-pointer shadow-2xs hover:bg-slate-100"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>

          <button
            id="header-search-btn-mobile"
            onClick={() => openSearchModal('')}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            title={t('searchButton')}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* DEDICATED LANGUAGE SWITCHER */}
          <div className="relative notranslate">
            <button
              id="header-language-btn"
              type="button"
              onClick={() => {
                setIsLangDropdownOpen(!isLangDropdownOpen);
                setIsStateDropdownOpen(false);
                setIsRoleDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-2xs cursor-pointer"
              title="Change Display Language"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-bold text-slate-800 hidden xs:inline">
                {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeLabel || 'Language'}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {currentLanguage.toUpperCase()}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isLangDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setIsLangDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                  <span>Display Language</span>
                  <span className="text-[9px] text-emerald-600 font-semibold">Saved</span>
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-emerald-50/80 text-emerald-800 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <div>
                          <span className="font-semibold block">{lang.nativeLabel}</span>
                          <span className="text-[10px] text-slate-400">{lang.label}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CADASTRAL JURISDICTION SELECTOR */}
          <div className="relative notranslate">
            <button
              id="header-state-jurisdiction-btn"
              onClick={() => {
                setIsStateDropdownOpen(!isStateDropdownOpen);
                setIsLangDropdownOpen(false);
                setIsRoleDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-2xs cursor-pointer"
              title={`Cadastral Jurisdiction: ${selectedState.name}`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                {selectedState.code}
              </span>
              <span className="font-bold text-slate-800 max-w-[90px] sm:max-w-[120px] truncate">{selectedState.name}</span>
              <span className="text-[10px] text-emerald-700 font-medium hidden md:inline shrink-0">
                ({selectedState.languageLabel})
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isStateDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 custom-scrollbar"
                onClick={() => setIsStateDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                  <span>State & Mapped Language</span>
                </div>
                {INDIAN_STATES.map((st) => {
                  const isSelected = selectedState.code === st.code;
                  return (
                    <button
                      key={st.code}
                      type="button"
                      onClick={() => setSelectedState(st.code)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-emerald-50/80 text-emerald-800 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">{st.code}</span>
                          <span className="font-semibold text-slate-800">{st.name} ({st.nativeName})</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-medium block ml-6">
                          Language: {st.languageLabel}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* AUTHENTICATED USER IDENTITY & LOCKED ROLE BADGE */}
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsStateDropdownOpen(false);
              }}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-2xs ${
                currentRole === 'CITIZEN'
                  ? 'bg-emerald-50/80 border-emerald-200 hover:bg-emerald-100/70 text-emerald-900'
                  : currentRole === 'OFFICER'
                  ? 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/70 text-amber-900'
                  : 'bg-indigo-50/80 border-indigo-200 hover:bg-indigo-100/70 text-indigo-900'
              }`}
              title="View Authenticated Identity & Account"
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  currentRole === 'CITIZEN'
                    ? 'bg-emerald-500 ring-2 ring-emerald-300 animate-pulse'
                    : currentRole === 'OFFICER'
                    ? 'bg-amber-500 ring-2 ring-amber-300'
                    : 'bg-indigo-600 ring-2 ring-indigo-300'
                }`}
              />
              <span className="font-bold hidden sm:inline truncate max-w-[140px]">
                {currentRole === 'CITIZEN'
                  ? '👤 ' + (userProfile?.fullName || 'Citizen')
                  : currentRole === 'OFFICER'
                  ? '🛡️ ' + (userProfile?.fullName || 'VAO Officer')
                  : '🏛️ ' + (userProfile?.fullName || 'Registrar')}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-white/80 border border-slate-200/60 shadow-2xs">
                {currentRole === 'CITIZEN' ? 'Citizen' : currentRole === 'OFFICER' ? 'VAO' : 'Registrar'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
            </button>

            {isRoleDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setIsRoleDropdownOpen(false)}
              >
                {/* Account Details Header */}
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Authenticated Profile
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentRole === 'CITIZEN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : currentRole === 'OFFICER'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {currentRole}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    {userProfile?.fullName || currentProfile.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono truncate">
                    {userProfile?.email || 'citizen@nilathozhan.tn.gov.in'}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {userProfile?.designation || currentProfile.roleTitle} • {userProfile?.location || currentProfile.location}
                  </p>
                </div>

                {/* Role Lock Security Explanation */}
                <div className="mx-3 my-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-start gap-2 text-xs">
                  <span className="text-sm shrink-0">🔒</span>
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800 text-[11px]">
                      Role Locked (பாதுகாக்கப்பட்ட அமர்வு)
                    </p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Role switching is locked to prevent unauthorized tampering. To use another role, sign out and authenticate with verified department credentials.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-2 pt-1 border-t border-slate-100 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      lockWorkstation();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Lock Workstation (திரைப் பூட்டு)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">PIN Protect</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      signOut();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out / வெளியேறு</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Exit Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            id="header-notifications-btn"
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            title={t('notifications' as any, 'Notifications')}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-600 rounded-full border-2 border-white" />
            )}
          </button>
        </div>
      </header>

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
