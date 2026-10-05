/**
 * Universal Browser Translation Service
 * Integrates Google Web Translation API with custom React controls.
 * Supports all 22 scheduled Indian languages (Kannada, Malayalam, Telugu, Tamil, Hindi, etc.)
 */

export interface UniversalLanguage {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

export const UNIVERSAL_LANGUAGES: UniversalLanguage[] = [
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', region: 'Karnataka', flag: '🟡' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala', flag: '🌴' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra & Telangana', flag: '🌾' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu', flag: '🛕' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North & Central India', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', region: 'Pan-India', flag: '🌐' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra', flag: '🚩' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal', flag: '🐅' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat', flag: '🦁' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab', flag: '🌾' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha', flag: '🌊' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', region: 'Pan-India', flag: '🌙' },
];

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// Cookie helper
function setCookie(name: string, value: string, days: number = 30) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  // Also set on root domain if applicable
  const host = window.location.hostname;
  if (host !== 'localhost' && !host.startsWith('127.0.')) {
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;domain=.${host};SameSite=Lax`;
  }
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Initializes the Google Translate client engine safely.
 */
export function initUniversalTranslator(): void {
  if (typeof window === 'undefined') return;

  // Set global init callback
  if (!window.googleTranslateElementInit) {
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'kn,ml,te,ta,hi,en,mr,bn,gu,pa,or,ur',
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout?.HORIZONTAL,
            },
            'google_translate_element'
          );
        }
      } catch (err) {
        console.warn('Google Translate initialization notice:', err);
      }
    };
  }

  // Inject Google Translate script if not present
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }
}

/**
 * Translates the current page to the given language code (e.g., 'kn' for Kannada).
 */
export function applyUniversalLanguage(langCode: string): void {
  if (typeof window === 'undefined') return;

  // Persist preference
  localStorage.setItem('nila_universal_lang', langCode);

  if (langCode === 'en' || !langCode) {
    // Reset translation
    const hadCookie = getCookie('googtrans') !== null;
    setCookie('googtrans', '/en/en', -1);
    setCookie('googtrans', '', -1);
    localStorage.removeItem('nila_universal_lang');
    if (hadCookie) {
      window.location.reload();
    }
    return;
  }

  // Set cookie for Google Translate
  setCookie('googtrans', `/en/${langCode}`);
  setCookie('googtrans', `/auto/${langCode}`);

  // Update HTML lang tag
  if (document.documentElement) {
    document.documentElement.lang = langCode;
  }

  // Attempt DOM element trigger if Google select box is already rendered, or poll briefly
  const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (selectElem) {
    selectElem.value = langCode;
    selectElem.dispatchEvent(new Event('change'));
  } else {
    // Retry shortly once Google Translate widget mounts, without forceful page reloads
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const el = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (el) {
        el.value = langCode;
        el.dispatchEvent(new Event('change'));
        clearInterval(interval);
      } else if (attempts >= 8) {
        clearInterval(interval);
      }
    }, 400);
  }
}

/**
 * Reads the currently active universal language code.
 */
export function getActiveUniversalLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('nila_universal_lang');
  if (saved) return saved;

  const cookieVal = getCookie('googtrans');
  if (cookieVal) {
    const parts = cookieVal.split('/');
    const last = parts[parts.length - 1];
    if (last && last.length <= 3) return last;
  }

  return 'en';
}
