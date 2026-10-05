import { AppLanguage } from './translations';

export interface StateOption {
  code: string;
  name: string;
  nativeName: string;
  language: AppLanguage;
  universalLangCode: string;
  region: string;
  languageLabel: string;
}

export const INDIAN_STATES: StateOption[] = [
  {
    code: 'TN',
    name: 'Tamil Nadu',
    nativeName: 'தமிழ்நாடு',
    language: 'ta',
    universalLangCode: 'ta',
    region: 'South',
    languageLabel: 'தமிழ் (Tamil)',
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    nativeName: 'उत्तर प्रदेश',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'North',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    nativeName: 'मध्य प्रदेश',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'Central',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'BR',
    name: 'Bihar',
    nativeName: 'बिहार',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'East',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    nativeName: 'राजस्थान',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'North-West',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'DL',
    name: 'Delhi (NCT)',
    nativeName: 'दिल्ली',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'North',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'HR',
    name: 'Haryana',
    nativeName: 'हरियाणा',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'North',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    nativeName: 'उत्तराखंड',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'North',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    nativeName: 'झारखण्ड',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'East',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'CG',
    name: 'Chhattisgarh',
    nativeName: 'छत्तीसगढ़',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'Central',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    nativeName: 'हिमाचल प्रदेश',
    language: 'hi',
    universalLangCode: 'hi',
    region: 'North',
    languageLabel: 'हिन्दी (Hindi)',
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    nativeName: 'महाराष्ट्र',
    language: 'hi',
    universalLangCode: 'mr',
    region: 'West',
    languageLabel: 'मराठी (Marathi)',
  },
  {
    code: 'KA',
    name: 'Karnataka',
    nativeName: 'ಕರ್ನಾಟಕ',
    language: 'en',
    universalLangCode: 'kn',
    region: 'South',
    languageLabel: 'ಕನ್ನಡ (Kannada)',
  },
  {
    code: 'KL',
    name: 'Kerala',
    nativeName: 'കേരളം',
    language: 'en',
    universalLangCode: 'ml',
    region: 'South',
    languageLabel: 'മലയാളം (Malayalam)',
  },
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    nativeName: 'ఆంధ్రప్రదేశ్',
    language: 'en',
    universalLangCode: 'te',
    region: 'South',
    languageLabel: 'తెలుగు (Telugu)',
  },
  {
    code: 'TG',
    name: 'Telangana',
    nativeName: 'తెలంగాణ',
    language: 'en',
    universalLangCode: 'te',
    region: 'South',
    languageLabel: 'తెలుగు (Telugu)',
  },
  {
    code: 'WB',
    name: 'West Bengal',
    nativeName: 'পশ্চিমবঙ্গ',
    language: 'en',
    universalLangCode: 'bn',
    region: 'East',
    languageLabel: 'বাংলা (Bengali)',
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    nativeName: 'ગુજરાત',
    language: 'hi',
    universalLangCode: 'gu',
    region: 'West',
    languageLabel: 'ગુજરાતી (Gujarati)',
  },
  {
    code: 'PB',
    name: 'Punjab',
    nativeName: 'ਪੰਜਾਬ',
    language: 'hi',
    universalLangCode: 'pa',
    region: 'North',
    languageLabel: 'ਪੰਜਾਬੀ (Punjabi)',
  },
  {
    code: 'OD',
    name: 'Odisha',
    nativeName: 'ଓଡ଼ିଶା',
    language: 'en',
    universalLangCode: 'or',
    region: 'East',
    languageLabel: 'ଓଡ଼ିଆ (Odia)',
  },
  {
    code: 'AS',
    name: 'Assam',
    nativeName: 'অসম',
    language: 'en',
    universalLangCode: 'as',
    region: 'North-East',
    languageLabel: 'অসমীয়া (Assamese)',
  },
  {
    code: 'CENTRAL',
    name: 'Central / National DILRMP',
    nativeName: 'राष्ट्रीय भूमि अभिलेख / National',
    language: 'en',
    universalLangCode: 'en',
    region: 'National',
    languageLabel: 'English',
  },
];

export const DEFAULT_STATE_CODE = 'TN';

export function getStateByCode(code: string): StateOption {
  return INDIAN_STATES.find((s) => s.code === code) || INDIAN_STATES[0];
}

export function getStateLanguage(code: string): AppLanguage {
  const state = INDIAN_STATES.find((s) => s.code === code);
  return state ? state.language : 'ta';
}

export function getStateUniversalLanguage(code: string): string {
  const state = INDIAN_STATES.find((s) => s.code === code);
  return state ? state.universalLangCode : 'ta';
}

/**
 * Parses any location string (e.g. from user profile or address)
 * and detects which Indian State it belongs to.
 */
export function findStateFromLocation(locationStr: string): StateOption | null {
  if (!locationStr) return null;
  const lower = locationStr.toLowerCase();

  for (const st of INDIAN_STATES) {
    if (
      lower.includes(st.name.toLowerCase()) ||
      lower.includes(st.nativeName.toLowerCase()) ||
      lower.includes(st.code.toLowerCase())
    ) {
      return st;
    }
  }

  // Tamil Nadu district matching
  const tnKeywords = [
    'chengalpattu',
    'coimbatore',
    'chennai',
    'salem',
    'madurai',
    'tiruppur',
    'vandalur',
    'tamil nadu',
    'tamilnadu',
  ];
  if (tnKeywords.some((kw) => lower.includes(kw))) {
    return getStateByCode('TN');
  }

  // Hindi belt keywords
  const hiKeywords = ['lucknow', 'varanasi', 'patna', 'bhopal', 'jaipur', 'delhi', 'kanpur'];
  if (hiKeywords.some((kw) => lower.includes(kw))) {
    return getStateByCode('UP');
  }

  return null;
}

/**
 * Automatically detects the user's state and regional language using:
 * 1. Saved user preference in localStorage
 * 2. Real-time IP-based client geolocation (using lightweight, free, secure HTTPS API)
 * 3. Browser locale / language preferences
 * 4. Fallback default to Tamil Nadu ('TN')
 */
export async function detectUserState(): Promise<{ state: StateOption; autoDetected: boolean }> {
  // 1. Check if user already has an explicit preference in localStorage
  if (typeof window !== 'undefined') {
    const savedStateCode = localStorage.getItem('nila_selected_state');
    if (savedStateCode) {
      const found = INDIAN_STATES.find((s) => s.code === savedStateCode);
      if (found) {
        return { state: found, autoDetected: false };
      }
    }
  }

  // 2. Try fast IP-based location detection
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout

    const res = await fetch('https://ipwho.is/?fields=success,region,region_code,country_code', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.region) {
        const regionStr = String(data.region).toLowerCase();
        const matched = INDIAN_STATES.find(
          (s) =>
            regionStr.includes(s.name.toLowerCase()) ||
            s.name.toLowerCase().includes(regionStr) ||
            (data.region_code && data.region_code.toUpperCase() === s.code)
        );

        if (matched) {
          localStorage.setItem('nila_selected_state', matched.code);
          return { state: matched, autoDetected: true };
        }
      }
    }
  } catch (_e) {
    // Network or timeout, fallback gracefully
  }

  // 3. Fallback to browser languages
  if (typeof navigator !== 'undefined' && navigator.languages) {
    for (const lang of navigator.languages) {
      const l = lang.toLowerCase();
      if (l.startsWith('ta')) {
        return { state: getStateByCode('TN'), autoDetected: true };
      }
      if (l.startsWith('hi')) {
        return { state: getStateByCode('UP'), autoDetected: true };
      }
    }
  }

  // 4. Default to Tamil Nadu
  return { state: getStateByCode(DEFAULT_STATE_CODE), autoDetected: true };
}
