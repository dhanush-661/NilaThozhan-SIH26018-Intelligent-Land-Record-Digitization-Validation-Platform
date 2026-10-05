import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { authService, UserProfileData } from '../../services/authService';
import { UserRole } from '../../types';
import { LOGIN_AUTH_STRINGS } from '../../i18n/authTranslations';
import {
  ShieldCheck,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  UserPlus,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  FileCheck2,
  Layers,
  MapPin,
  Check,
  Globe,
} from 'lucide-react';
import {
  INDIAN_STATES,
  getStateByCode,
  getStateLanguage,
  DEFAULT_STATE_CODE,
} from '../../i18n/stateLanguages';
import { StateJurisdictionSelector } from '../common/StateJurisdictionSelector';

interface LoginPageProps {
  onSwitchToRegister?: () => void;
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister, onSuccess }) => {
  const {
    loginUser,
    currentLanguage,
    selectedState,
    setSelectedState,
    autoDetectedLocation,
  } = useApp();
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('CITIZEN');
  const [email, setEmail] = useState('citizen@nilathozhan.tn.gov.in');
  const [password, setPassword] = useState('NilaThozhan2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAutoNotice, setShowAutoNotice] = useState<boolean>(false);

  const handleStateChange = (code: string) => {
    setSelectedState(code);
    setShowAutoNotice(true);
    setTimeout(() => setShowAutoNotice(false), 3500);
  };

  const tAuth = LOGIN_AUTH_STRINGS[currentLanguage] || LOGIN_AUTH_STRINGS.ta;

  // Role Configurations with dynamic translation
  const roleConfigs = {
    CITIZEN: {
      role: 'CITIZEN' as UserRole,
      title: tAuth.roles.CITIZEN.title,
      tamilTitle: tAuth.roles.CITIZEN.tamilTitle,
      desc: tAuth.roles.CITIZEN.desc,
      accent: 'emerald',
      demoUser: {
        name: 'Ramesh Patel',
        email: 'citizen@nilathozhan.tn.gov.in',
        pass: 'NilaThozhan2026!',
        designation: 'Pattadar / Registered Landowner',
      },
    },
    OFFICER: {
      role: 'OFFICER' as UserRole,
      title: tAuth.roles.OFFICER.title,
      tamilTitle: tAuth.roles.OFFICER.tamilTitle,
      desc: tAuth.roles.OFFICER.desc,
      accent: 'amber',
      demoUser: {
        name: 'Officer K. Sharma',
        email: 'officer@nilathozhan.tn.gov.in',
        pass: 'NilaThozhan2026!',
        designation: 'Village Administrative Officer (VAO)',
      },
    },
    HIGH_AUTHORITY: {
      role: 'HIGH_AUTHORITY' as UserRole,
      title: tAuth.roles.HIGH_AUTHORITY.title,
      tamilTitle: tAuth.roles.HIGH_AUTHORITY.tamilTitle,
      desc: tAuth.roles.HIGH_AUTHORITY.desc,
      accent: 'indigo',
      demoUser: {
        name: 'Dr. V. Narayanan',
        email: 'authority@nilathozhan.tn.gov.in',
        pass: 'NilaThozhan2026!',
        designation: 'Sub-Registrar & Head of Approvals',
      },
    },
  };

  const handleRoleTabSelect = (role: UserRole) => {
    setSelectedRoleTab(role);
    setErrorMsg(null);
    setEmail(roleConfigs[role].demoUser.email);
    setPassword(roleConfigs[role].demoUser.pass);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      const profile: UserProfileData = await authService.signIn(email, password);

      // Verify that the user credentials match the required role portal
      if (profile.role !== selectedRoleTab) {
        throw new Error(
          `Security Notice: This account is registered as '${profile.role}'. Please select the '${profile.role}' tab to authenticate.`
        );
      }

      await loginUser(profile);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const activeConfig = roleConfigs[selectedRoleTab];

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col lg:flex-row text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* LEFT SECTION: High-Impact Government & AI Showcase (Desktop) */}
      <div className="relative w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden bg-radial from-slate-900 via-slate-950 to-slate-950">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-700 p-0.5 shadow-xl shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  {tAuth.sihBadge}
                </span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
                  {tAuth.dolrBadge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                {tAuth.deptTitle}
              </h3>
            </div>
          </div>

          {/* Jurisdiction & Language Controls */}
          <div className="flex items-center gap-2">
            {/* Active State & Mapped Language Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs shadow-xs">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-200">{selectedState.name}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-bold text-[11px]">{selectedState.languageLabel}</span>
            </div>
          </div>
        </div>

        {/* Central Brand Content */}
        <div className="relative z-10 my-12 lg:my-16 max-w-xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tAuth.heroBadge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              {tAuth.heroHeading}
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 mt-1">
                {tAuth.heroHeadingSub}
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed pt-2">
              {tAuth.heroSubheading}
            </p>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3 hover:border-emerald-500/40 transition-colors">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-white block font-semibold">{tAuth.p1Title}</strong>
                <span className="text-slate-400 text-[11px]">{tAuth.p1Desc}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3 hover:border-teal-500/40 transition-colors">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-white block font-semibold">{tAuth.p2Title}</strong>
                <span className="text-slate-400 text-[11px]">{tAuth.p2Desc}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3 hover:border-indigo-500/40 transition-colors">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-white block font-semibold">{tAuth.p3Title}</strong>
                <span className="text-slate-400 text-[11px]">{tAuth.p3Desc}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3 hover:border-cyan-500/40 transition-colors">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <strong className="text-white block font-semibold">{tAuth.p4Title}</strong>
                <span className="text-slate-400 text-[11px]">{tAuth.p4Desc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> {tAuth.ssl}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> {tAuth.rbac}
            </span>
          </div>
          <span>{tAuth.govtCopy}</span>
        </div>
      </div>

      {/* RIGHT SECTION: Secure Portal Authentication Card */}
      <div className="w-full lg:w-5/12 bg-white text-slate-900 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* Card Title */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {tAuth.authAccess}
              </span>
              <span className="text-[11px] text-slate-400">{tAuth.secureSignIn}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {tAuth.portalSignIn}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {tAuth.portalSignInDesc}
            </p>
          </div>

          {/* State / Cadastral Jurisdiction & Universal Translator Combined */}
          <StateJurisdictionSelector label={tAuth.stateLabel} />

          {/* Role Portal Selection Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-3 gap-1 border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => handleRoleTabSelect('CITIZEN')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                selectedRoleTab === 'CITIZEN'
                  ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-base">👤</span>
              <span className="truncate w-full text-center">{tAuth.citizenTab}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabSelect('OFFICER')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                selectedRoleTab === 'OFFICER'
                  ? 'bg-white text-amber-800 shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-base">🛡️</span>
              <span className="truncate w-full text-center">{tAuth.officerTab}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabSelect('HIGH_AUTHORITY')}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                selectedRoleTab === 'HIGH_AUTHORITY'
                  ? 'bg-white text-indigo-800 shadow-xs border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="text-base">🏛️</span>
              <span className="truncate w-full text-center">{tAuth.registrarTab}</span>
            </button>
          </div>

          {/* Active Role Description Strip */}
          <div
            className={`p-3 rounded-xl border text-xs leading-relaxed ${
              selectedRoleTab === 'CITIZEN'
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : selectedRoleTab === 'OFFICER'
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <strong className="font-bold">{activeConfig.title}</strong>
              <span className="text-[10px] font-medium opacity-80">{activeConfig.tamilTitle}</span>
            </div>
            <p className="text-[11px] opacity-90">{activeConfig.desc}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="leading-snug">{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {tAuth.emailLabel}
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@nilathozhan.tn.gov.in"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white transition-all text-slate-900 font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {tAuth.passwordLabel}
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white transition-all text-slate-900 font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Strict RBAC Notice */}
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
              <span className="text-xs">🔒</span>
              <p className="leading-snug">
                <strong>{tAuth.rbacNoticeTitle}</strong> {tAuth.rbacNoticeDesc}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-xl shadow-md text-xs sm:text-sm font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRoleTab === 'CITIZEN'
                  ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                  : selectedRoleTab === 'OFFICER'
                  ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
              } disabled:opacity-50`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{tAuth.signInAs}{activeConfig.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Pre-fill Preset Button */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setEmail(activeConfig.demoUser.email);
                setPassword(activeConfig.demoUser.pass);
              }}
              className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 text-[11px] text-slate-600 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>{tAuth.prefillButton}<strong>{activeConfig.demoUser.name}</strong></span>
              <span className="text-emerald-700 font-bold">{tAuth.prefillApply}</span>
            </button>
          </div>

          {/* Registration Link */}
          {onSwitchToRegister && (
            <div className="text-center pt-2">
              <p className="text-xs text-slate-600">
                {tAuth.newLandowner}{' '}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer inline-flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{tAuth.registerLink}</span>
                </button>
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {tAuth.govSecretariatNotice}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
