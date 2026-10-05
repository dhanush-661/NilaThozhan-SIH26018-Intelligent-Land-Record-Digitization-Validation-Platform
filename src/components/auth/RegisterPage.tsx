import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { authService, UserProfileData } from '../../services/authService';
import { REGISTER_AUTH_STRINGS } from '../../i18n/authTranslations';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LandPlot,
  Building,
  Check,
  Sparkles,
  Globe,
} from 'lucide-react';
import {
  INDIAN_STATES,
  getStateByCode,
  getStateLanguage,
  DEFAULT_STATE_CODE,
} from '../../i18n/stateLanguages';
import { StateJurisdictionSelector } from '../common/StateJurisdictionSelector';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin, onSuccess }) => {
  const {
    loginUser,
    currentLanguage,
    selectedState,
    setSelectedState,
    autoDetectedLocation,
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [surveyNumberHint, setSurveyNumberHint] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showAutoNotice, setShowAutoNotice] = useState<boolean>(false);

  const tReg = REGISTER_AUTH_STRINGS[currentLanguage] || REGISTER_AUTH_STRINGS.ta;

  const STATE_DISTRICTS: Record<string, Array<{ name: string; taluks: string[] }>> = {
    TN: [
      { name: 'Coimbatore', taluks: ['Coimbatore (South)', 'Coimbatore (North)', 'Pollachi', 'Sulur'] },
      { name: 'Chengalpattu', taluks: ['Chengalpattu', 'Tambaram', 'Vandalur', 'Thiruporur'] },
      { name: 'Tiruppur', taluks: ['Tiruppur (North)', 'Tiruppur (South)', 'Avinashi', 'Dharapuram'] },
      { name: 'Chennai', taluks: ['Egmore', 'Mylapore', 'Guindy', 'Tondiarpet'] },
      { name: 'Salem', taluks: ['Salem', 'Attur', 'Mettur', 'Omalur'] },
      { name: 'Madurai', taluks: ['Madurai (South)', 'Madurai (North)', 'Melur', 'Thirumangalam'] },
    ],
    UP: [
      { name: 'Lucknow', taluks: ['Lucknow Sadar', 'Bakshi Ka Talab', 'Malihabad', 'Mohanlalganj'] },
      { name: 'Varanasi', taluks: ['Varanasi Sadar', 'Pindra', 'Raja Talab'] },
      { name: 'Prayagraj', taluks: ['Sadar', 'Phulpur', 'Koraon', 'Bara'] },
      { name: 'Kanpur Nagar', taluks: ['Kanpur Sadar', 'Ghatampur', 'Bilhaur'] },
    ],
    MP: [
      { name: 'Bhopal', taluks: ['Huzur', 'Berasia', 'Kolar'] },
      { name: 'Indore', taluks: ['Indore Old', 'Mhow', 'Depalpur', 'Sanwer'] },
      { name: 'Gwalior', taluks: ['Gwalior City', 'Dabra', 'Bhitarwar'] },
    ],
    BR: [
      { name: 'Patna', taluks: ['Patna Sadar', 'Danapur', 'Barh', 'Masaurhi'] },
      { name: 'Gaya', taluks: ['Gaya Sadar', 'Tekari', 'Sherghati', 'Neemchak Bathani'] },
      { name: 'Muzaffarpur', taluks: ['Muzaffarpur East', 'Muzaffarpur West', 'Kanti', 'Marwan'] },
    ],
    RJ: [
      { name: 'Jaipur', taluks: ['Jaipur Central', 'Sanganer', 'Amber', 'Chaksu'] },
      { name: 'Jodhpur', taluks: ['Jodhpur City', 'Luni', 'Osian', 'Phalodi'] },
      { name: 'Udaipur', taluks: ['Girwa', 'Badgaon', 'Mavli', 'Vallabhnagar'] },
    ],
    DL: [
      { name: 'New Delhi', taluks: ['Chanakyapuri', 'Delhi Cantonment', 'Vasant Vihar'] },
      { name: 'Central Delhi', taluks: ['Civil Lines', 'Karol Bagh', 'Kotwali'] },
      { name: 'South Delhi', taluks: ['Hauz Khas', 'Mehrauli', 'Saket'] },
    ],
    KA: [
      { name: 'Bengaluru Urban', taluks: ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal'] },
      { name: 'Mysuru', taluks: ['Mysuru', 'Hunsur', 'Nanjangud', 'T. Narasipura'] },
    ],
  };

  const getDistrictsForState = (code: string) => {
    return (
      STATE_DISTRICTS[code] || [
        { name: 'Central District', taluks: ['HQ Taluk / Circle 01', 'HQ Taluk / Circle 02'] },
        { name: 'North District', taluks: ['Circle North', 'Circle Central'] },
      ]
    );
  };

  const currentDistricts = getDistrictsForState(selectedState.code);

  const [district, setDistrict] = useState(() => currentDistricts[0]?.name || 'Coimbatore');
  const [taluk, setTaluk] = useState(() => currentDistricts[0]?.taluks[0] || 'Coimbatore (South)');

  const handleStateChange = (code: string) => {
    setSelectedState(code);
    const newDistricts = getDistrictsForState(code);
    if (newDistricts.length > 0) {
      setDistrict(newDistricts[0].name);
      setTaluk(newDistricts[0].taluks[0] || 'Taluk 1');
    }
    setShowAutoNotice(true);
    setTimeout(() => setShowAutoNotice(false), 3500);
  };

  const handleDistrictChange = (dName: string) => {
    setDistrict(dName);
    const found = currentDistricts.find((d) => d.name === dName);
    if (found && found.taluks.length > 0) {
      setTaluk(found.taluks[0]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMsg('Please complete all mandatory fields (Full Name, Email, Password).');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg('Please acknowledge the Cadastral Record Security Declaration.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);

      const locationStr = `${taluk}, ${district}, ${selectedState.name}`;
      const profile: UserProfileData = await authService.signUp(email, password, {
        fullName,
        role: 'CITIZEN',
        phone: phone || '+91 98401 23456',
        location: locationStr,
        department: 'Landholder Self-Service Portal',
        designation: 'Citizen / Registered Pattadar',
      });

      setSuccessMsg('Citizen Account Created Successfully!');
      await loginUser(profile);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col lg:flex-row text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* LEFT SECTION: Citizen Portal Information & Benefits */}
      <div className="relative w-full lg:w-5/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden bg-radial from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar: Back Button & Language Controls */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onSwitchToLogin}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tReg.backToSignIn}</span>
          </button>

          {/* Active Jurisdiction & Mapped Language Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/90 border border-slate-800 rounded-xl text-xs shadow-xs">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-slate-200">{selectedState.name}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-bold text-[11px]">{selectedState.languageLabel}</span>
            </div>
          </div>
        </div>

        {/* Central Explainer */}
        <div className="relative z-10 my-10 space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <LandPlot className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {tReg.heroTitle}
              <span className="block text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                {tReg.heroTitleSub}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
              {tReg.heroDesc}
            </p>
          </div>

          {/* Citizen Features List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-semibold">{tReg.f1Title}</strong>
                <span className="text-slate-400 text-[11px]">{tReg.f1Desc}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-semibold">{tReg.f2Title}</strong>
                <span className="text-slate-400 text-[11px]">{tReg.f2Desc}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block font-semibold">{tReg.f3Title}</strong>
                <span className="text-slate-400 text-[11px]">{tReg.f3Desc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
          <p className="leading-snug">
            🛡️ <strong>Regulatory Notice:</strong> {tReg.regNotice}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION: Registration Form Card */}
      <div className="w-full lg:w-7/12 bg-white text-slate-900 p-6 sm:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-lg w-full mx-auto space-y-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {tReg.selfEnroll}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              {tReg.cardTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {tReg.cardSubtitle}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span className="leading-snug">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {tReg.fullName}
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Patel / சுப்பிரமணியம்"
                  className="block w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Email & Phone Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tReg.email}
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tReg.phone}
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94440 XXXXX"
                    className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* State / Cadastral Jurisdiction Selection (Combined Universal Translate) */}
            <StateJurisdictionSelector
              id="reg-state-select"
              label={tReg.state}
              onStateChangeExtra={(code) => {
                const newDistricts = getDistrictsForState(code);
                if (newDistricts.length > 0) {
                  setDistrict(newDistricts[0].name);
                  setTaluk(newDistricts[0].taluks[0] || 'Taluk 1');
                }
              }}
            />

            {/* District and Taluk Dropdowns (State-Aware) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reg-district-select" className="block text-xs font-bold text-slate-700 mb-1">
                  {tReg.district}
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <select
                    id="reg-district-select"
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900 outline-none"
                  >
                    {currentDistricts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="reg-taluk-select" className="block text-xs font-bold text-slate-700 mb-1">
                  {tReg.taluk}
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-3.5 h-3.5" />
                  </div>
                  <select
                    id="reg-taluk-select"
                    value={taluk}
                    onChange={(e) => setTaluk(e.target.value)}
                    className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900 outline-none"
                  >
                    {currentDistricts
                      .find((d) => d.name === district)
                      ?.taluks.map((tk) => (
                        <option key={tk} value={tk}>
                          {tk}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Survey Number Hint */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {tReg.surveyNumberHint}
              </label>
              <input
                type="text"
                value={surveyNumberHint}
                onChange={(e) => setSurveyNumberHint(e.target.value)}
                placeholder="e.g. 142/3A or 89/1B (optional)"
                className="block w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900"
              />
            </div>

            {/* Password and Confirmation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tReg.password}
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="block w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {tReg.confirmPassword}
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="block w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/60 focus:bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Compliance Acknowledgment */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight cursor-pointer">
                {tReg.termsDeclaration}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl shadow-md text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{tReg.createBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return to Login */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600">
              {tReg.alreadyHaveAccount}{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                {tReg.signInHere}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
