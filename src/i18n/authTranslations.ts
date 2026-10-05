import { AppLanguage } from './translations';

export interface AuthStrings {
  deptTitle: string;
  sihBadge: string;
  dolrBadge: string;
  heroBadge: string;
  heroHeading: string;
  heroHeadingSub: string;
  heroSubheading: string;
  p1Title: string;
  p1Desc: string;
  p2Title: string;
  p2Desc: string;
  p3Title: string;
  p3Desc: string;
  p4Title: string;
  p4Desc: string;
  ssl: string;
  rbac: string;
  govtCopy: string;
  authAccess: string;
  secureSignIn: string;
  portalSignIn: string;
  portalSignInDesc: string;
  citizenTab: string;
  officerTab: string;
  registrarTab: string;
  roles: {
    CITIZEN: {
      title: string;
      tamilTitle: string;
      desc: string;
    };
    OFFICER: {
      title: string;
      tamilTitle: string;
      desc: string;
    };
    HIGH_AUTHORITY: {
      title: string;
      tamilTitle: string;
      desc: string;
    };
  };
  emailLabel: string;
  passwordLabel: string;
  rbacNoticeTitle: string;
  rbacNoticeDesc: string;
  signInAs: string;
  prefillButton: string;
  prefillApply: string;
  newLandowner: string;
  registerLink: string;
  govSecretariatNotice: string;
  stateLabel: string;
  stateDesc: string;
  autoLanguageNotice: string;
}

export interface RegisterStrings {
  backToSignIn: string;
  state: string;
  autoLanguageNotice: string;
  regBadge: string;
  heroTitle: string;
  heroTitleSub: string;
  heroDesc: string;
  f1Title: string;
  f1Desc: string;
  f2Title: string;
  f2Desc: string;
  f3Title: string;
  f3Desc: string;
  regNotice: string;
  selfEnroll: string;
  cardTitle: string;
  cardSubtitle: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  taluk: string;
  surveyNumberHint: string;
  password: string;
  confirmPassword: string;
  termsDeclaration: string;
  createBtn: string;
  creatingBtn: string;
  alreadyHaveAccount: string;
  signInHere: string;
}

export const LOGIN_AUTH_STRINGS: Record<AppLanguage, AuthStrings> = {
  ta: {
    deptTitle: 'தமிழ்நாடு அரசு • நில நிர்வாகத் துறை',
    sihBadge: 'SIH26018 • ABHILEKHAI 360',
    dolrBadge: 'DoLR • DILRMP 2.0',
    heroBadge: 'தேசிய நில ஆவண நவீனமயமாக்கல் திட்டம் (DILRMP)',
    heroHeading: 'நிலத் தோழன்',
    heroHeadingSub: 'Nila Thozhan 360',
    heroSubheading:
      'பழங்கால ஆவணங்கள் உரைபெயர்ப்பு, 14-இலக்க உல்பின் (பூ-ஆதார்) உருவாக்கம், பட்டா பரிவர்த்தனை lineage மற்றும் தேசிய DILRMP ஒத்திசைவு கொண்ட அடுத்த தலைமுறை AI தளம்.',
    p1Title: 'பழங்கால ஆவணங்கள் OCR',
    p1Desc: 'கைதி, மோடி, உருது, தேவநாகரி & தமிழ் கையெழுத்து படிகள்.',
    p2Title: '14-இலக்க ULPIN முறை',
    p2Desc: 'புவி மைய ஆயத்தொலைவுகளிலிருந்து பெறப்படும் பூ-ஆதார் எண்.',
    p3Title: 'பட்டா பரிவர்த்தனை வரைபடம்',
    p3Desc: 'இரட்டை விற்பனை மற்றும் உரிமை இடைவெளிகளைக் கண்டறியும் தணிக்கை.',
    p4Title: 'தேசிய DILRMP ஏற்றுமதி',
    p4Desc: 'தேசிய நிலப்பதிவு போர்ட்டலுடன் நேரடி பரிமாற்றம்.',
    ssl: '256-பிட் SSL பாதுகாப்பு',
    rbac: 'கண்டிப்பான RBAC தனிமைப்படுத்தல்',
    govtCopy: '© 2026 தமிழ்நாடு அரசு / DoLR',
    authAccess: 'அங்கீகரிக்கப்பட்ட அணுகல்',
    secureSignIn: 'பாதுகாப்பான உள்நுழைவு',
    portalSignIn: 'அதிகாரப்பூர்வ உள்நுழைவு',
    portalSignInDesc: 'உங்கள் அங்கீகரிக்கப்பட்ட துறைப் பணித்தளம் அல்லது குடிமகன் கணக்கைத் தேர்ந்தெடுக்கவும்.',
    citizenTab: 'குடிமகன்',
    officerTab: 'அதிகாரி',
    registrarTab: 'பதிவாளர்',
    roles: {
      CITIZEN: {
        title: 'நில உரிமையாளர் / குடிமகன்',
        tamilTitle: 'குடிமக்கள் சேவை',
        desc: 'சொந்த பட்டா, நில ஆவணங்கள், விண்ணப்ப நிலவரம் மற்றும் உரிமை சான்றிதழ்களை அணுகலாம்.',
      },
      OFFICER: {
        title: 'கிராம நிர்வாக அலுவலர் (VAO)',
        tamilTitle: 'அதிகாரி பணித்தளம்',
        desc: 'ஆவண OCR சரிபார்ப்பு, சர்வே கள ஆய்வு மற்றும் GIS சரிபார்ப்பு பணித்தளம்.',
      },
      HIGH_AUTHORITY: {
        title: 'சார்-பதிவாளர் / தலைமை ஒப்புதல்',
        tamilTitle: 'தலைமை ஒப்புதல்',
        desc: 'இறுதி ஆவண அனுமதி, டிஜிட்டல் கையொப்பம் மற்றும் DILRMP தேசிய ஏற்றுமதி தளம்.',
      },
    },
    emailLabel: 'அரசு / பயனர் மின்னஞ்சல் முகவரி',
    passwordLabel: 'பாதுகாப்புக் கடவுச்சொல்',
    rbacNoticeTitle: 'பங்கு சார்ந்த பாதுகாப்பு:',
    rbacNoticeDesc:
      'உள்நுழைந்த பிறகு பிற பயனர் நிலைகளுக்கு தன்னிச்சையாக மாற இயலாது. பாதுகாப்பு மற்றும் முறைகேடுகளைத் தடுக்க இது பூட்டப்பட்டுள்ளது.',
    signInAs: 'உள்நுழைக: ',
    prefillButton: 'பரிசோதனை நற்சான்றிதழ்களை நிரப்பு: ',
    prefillApply: 'நிரப்புக ✓',
    newLandowner: 'புதிய நில உரிமையாளரா?',
    registerLink: 'குடிமகன் கணக்கை துவங்க',
    govSecretariatNotice:
      '(அரசு நிர்வாகப் பணியாளர் கணக்குகள் துறைச் செயலகத்தால் வழங்கப்படுகின்றன)',
    stateLabel: 'மாநிலம் / அதிகார வரம்பு',
    stateDesc: 'தேர்ந்தெடுக்கப்பட்ட மாநிலத்திற்கு ஏற்ப மொழி தானாக அமைக்கப்படும்',
    autoLanguageNotice: 'மாநில அதிகார வரம்பிற்கு ஏற்ப இடைமுக மொழி தானாக அமைக்கப்பட்டது',
  },

  en: {
    deptTitle: 'Govt. of Tamil Nadu • Department of Land Administration',
    sihBadge: 'SIH26018 • ABHILEKHAI 360',
    dolrBadge: 'DoLR • DILRMP 2.0',
    heroBadge: 'National Land Record Modernization Standard',
    heroHeading: 'Nila Thozhan',
    heroHeadingSub: 'Cadastral AI 360',
    heroSubheading:
      'Next-generation Cadastral AI platform for archaic dialect transliteration, algorithmic 14-digit ULPIN Bhu-Aadhaar generation, mutation DAG verification, and DILRMP National XML synchronization.',
    p1Title: 'Archaic Scripts OCR',
    p1Desc: 'Kaithi, Modi, Urdu, Devanagari & Tamil handwriting.',
    p2Title: '14-Digit ULPIN Standard',
    p2Desc: 'Centroid-derived DoLR Bhu-Aadhaar coordinates.',
    p3Title: 'Mutation Lineage DAG',
    p3Desc: 'Audit graph detecting double conveyance & title gaps.',
    p4Title: 'DILRMP National XML',
    p4Desc: 'Seamless Central Land Registry synchronization.',
    ssl: '256-Bit SSL Enforced',
    rbac: 'Strict RBAC Isolation',
    govtCopy: '© 2026 Government of Tamil Nadu / DoLR',
    authAccess: 'Authorized Access',
    secureSignIn: 'Secure Sign-In',
    portalSignIn: 'Portal Sign-In',
    portalSignInDesc: 'Select your authorized department desk or citizen account to proceed.',
    citizenTab: 'Citizen',
    officerTab: 'Officer',
    registrarTab: 'Registrar',
    roles: {
      CITIZEN: {
        title: 'Landholder / Citizen',
        tamilTitle: 'Citizen Desk',
        desc: 'Access personal Patta, digital land records, mutation track, and title certificates.',
      },
      OFFICER: {
        title: 'Revenue Officer / VAO',
        tamilTitle: 'Officer Desk',
        desc: 'Officer workstation for optical OCR verification, survey adjudication, and ground GIS validation.',
      },
      HIGH_AUTHORITY: {
        title: 'Sub-Registrar / Approvals',
        tamilTitle: 'Authority Desk',
        desc: 'State authority console for final deed clearance, cryptographic signing, and DILRMP national export.',
      },
    },
    emailLabel: 'Official Identifier / Email Address',
    passwordLabel: 'Security Password',
    rbacNoticeTitle: 'Role-Enforced Access:',
    rbacNoticeDesc:
      'Your session is strictly bounded to the authorized permissions of this account. Arbitrary role swapping is disabled.',
    signInAs: 'Sign In as ',
    prefillButton: 'Fill Verified Test Credentials: ',
    prefillApply: 'Apply ✓',
    newLandowner: 'Are you a new landowner?',
    registerLink: 'Register Citizen Account',
    govSecretariatNotice:
      '(Official government staff accounts are provisioned via TN-RoR Department Secretariat)',
    stateLabel: 'State / Cadastral Jurisdiction',
    stateDesc: 'Language adapts automatically to the selected state',
    autoLanguageNotice: 'Interface language automatically adapted to state jurisdiction',
  },

  hi: {
    deptTitle: 'तमिलनाडु सरकार • भूमि प्रशासन विभाग',
    sihBadge: 'SIH26018 • ABHILEKHAI 360',
    dolrBadge: 'DoLR • DILRMP 2.0',
    heroBadge: 'राष्ट्रीय भूमि रिकॉर्ड आधुनिकीकरण मानक (DILRMP)',
    heroHeading: 'निला तोलन',
    heroHeadingSub: 'कैडस्ट्रल एआई 360',
    heroSubheading:
      'पुरातन लिपियों के लिप्यंतरण, 14-अंकीय यूएलपीआईएन (भू-आधार) सृजन, म्यूटेशन डीएजी सत्यापन और राष्ट्रीय डीआईएलआरएमपी एक्सएमएल सिंक्रनाइज़ेशन हेतु अगली पीढ़ी का भू-अभिलेख एआई प्लेटफॉर्म।',
    p1Title: 'पुरातन लिपियां ओसीआर',
    p1Desc: 'कैथी, मोडी, उर्दू, देवनागरी और तमिल हस्तलिखित अभिलेख।',
    p2Title: '14-अंकीय यूएलपीआईएन मानक',
    p2Desc: 'केंद्रक निर्देशांक आधारित भू-आधार विशिष्ट पहचान।',
    p3Title: 'नामांतरण वंशानुक्रम डीएजी',
    p3Desc: 'दोहरे विक्रय और स्वामित्व अंतराल का स्वतः पता लगाने वाला ग्राफ।',
    p4Title: 'डीआईएलआरएमपी राष्ट्रीय एक्सएमएल',
    p4Desc: 'केंद्रीय भूमि रजिस्ट्री पोर्टल के साथ सहज समन्वय।',
    ssl: '256-बिट एसएसएल सुरक्षित',
    rbac: 'सख्त आरबीएसी पृथक्करण',
    govtCopy: '© 2026 तमिलनाडु सरकार / DoLR',
    authAccess: 'प्राधिकृत प्रवेश',
    secureSignIn: 'सुरक्षित लॉगिन',
    portalSignIn: 'पोर्टल लॉगिन',
    portalSignInDesc: 'आगे बढ़ने हेतु अपने अधिकृत विभागीय डेस्क या नागरिक खाते का चयन करें।',
    citizenTab: 'नागरिक',
    officerTab: 'अधिकारी',
    registrarTab: 'पंजीयक',
    roles: {
      CITIZEN: {
        title: 'भूमि स्वामी / नागरिक',
        tamilTitle: 'नागरिक पोर्टल',
        desc: 'व्यक्तिगत पट्टा, डिजिटल भूमि अभिलेख, नामांतरण स्थिति और प्रमाणपत्र देखें।',
      },
      OFFICER: {
        title: 'राजस्व अधिकारी / वीएओ',
        tamilTitle: 'अधिकारी पोर्टल',
        desc: 'ऑप्टिकल ओसीआर सत्यापन, सर्वेक्षण निर्णय और जीआईएस सत्यापन वर्कस्टेशन।',
      },
      HIGH_AUTHORITY: {
        title: 'उप-पंजीयक / अनुमोदन प्राधिकारी',
        tamilTitle: 'प्राधिकारी पोर्टल',
        desc: 'अंतिम दस्तावेज स्वीकृति, डिजिटल हस्ताक्षर और राष्ट्रीय एक्सएमएल निर्यात कंसोल।',
      },
    },
    emailLabel: 'आधिकारिक पहचान / ईमेल पता',
    passwordLabel: 'सुरक्षा पासवर्ड',
    rbacNoticeTitle: 'भूमिका-आधारित सुरक्षा:',
    rbacNoticeDesc:
      'आपका सत्र इस खाते की अधिकृत अनुमतियों तक सीमित है। अनधिकृत भूमिका परिवर्तन अक्षम है।',
    signInAs: 'लॉगिन करें: ',
    prefillButton: 'परीक्षण क्रेडेंशियल्स भरें: ',
    prefillApply: 'लागू करें ✓',
    newLandowner: 'क्या आप नए भूमि स्वामी हैं?',
    registerLink: 'नागरिक खाता पंजीकृत करें',
    govSecretariatNotice:
      '(शासकीय अधिकारी खाते विभागीय सचिवालय द्वारा प्रदान किए जाते हैं)',
    stateLabel: 'राज्य / भू-अधिकार क्षेत्र',
    stateDesc: 'चयनित राज्य के अनुसार भाषा स्वतः निर्धारित होगी',
    autoLanguageNotice: 'राज्य क्षेत्राधिकार के अनुसार इंटरफ़ेस भाषा स्वतः अनुकूलित हुई',
  },
};

export const REGISTER_AUTH_STRINGS: Record<AppLanguage, RegisterStrings> = {
  ta: {
    backToSignIn: 'உள்நுழைவுப் பக்கத்திற்கு திரும்பு',
    state: 'மாநிலம் (State) *',
    autoLanguageNotice: 'மாநிலத்திற்கு ஏற்ப மொழி தானாக மாற்றப்பட்டது',
    regBadge: 'குடிமக்கள் பதிவு',
    heroTitle: 'குடிமக்கள் பதிவு',
    heroTitleSub: 'Citizen Landholder Portal',
    heroDesc:
      'உங்கள் நில உரிமை சுயவிவரத்தைப் பதிவு செய்து, தமிழ்நாடு நில ஆவணங்களை (TN-RoR) அணுகவும், பட்டா ஆவணங்களை டிஜிட்டல் மயமாக்கவும், 14-இலக்க ULPIN சான்றிதழ்களைப் பெறவும்.',
    f1Title: 'நேரடி பட்டா & சிட்டா அணுகல்',
    f1Desc: 'உடனடி AI உரை பிரித்தெடுத்தல் மற்றும் நில ஆவண சரிபார்ப்பு.',
    f2Title: 'பாதுகாக்கப்பட்ட உரிமை பரிவர்த்தனை',
    f2Desc: 'முந்தைய பத்திரப் பரிமாற்றங்கள் மற்றும் மோசடி எச்சரிக்கைகள் குறித்த முழு வெளிப்படைத்தன்மை.',
    f3Title: 'அதிகாரப்பூர்வ DILRMP XML & PDF',
    f3Desc: 'QR குறியீடு மற்றும் பாதுகாப்புக் கையொப்பத்துடன் சான்றளிக்கப்பட்ட டிஜிட்டல் ஆவணங்களைப் பதிவிறக்கவும்.',
    regNotice: 'அரசு நிர்வாகப் பணியாளர் கணக்குகள் (VAO / சார்-பதிவாளர்) மாநில வருவாய்ச் செயலகத்தால் வழங்கப்படுகின்றன.',
    selfEnroll: 'பட்டாதாரர் சுய பதிவு',
    cardTitle: 'குடிமகன் கணக்கை உருவாக்கு',
    cardSubtitle: 'உங்கள் அடையாளம் மற்றும் நிலப்பரப்பு அதிகார வரம்பு விவரங்களை வழங்கவும்.',
    fullName: 'முழு சட்டப்பூர்வ பெயர் (பட்டா/பத்திரத்தில் உள்ளபடி) *',
    email: 'மின்னஞ்சல் முகவரி *',
    phone: 'கைபேசி எண் (SMS மற்றும் OTP விழிப்பூட்டல்களுக்கு) *',
    district: 'மாவட்டம் (District) *',
    taluk: 'வட்டம் (Taluk) *',
    surveyNumberHint: 'முதன்மை சர்வே எண் (விருப்பத்தேர்வு)',
    password: 'பாதுகாப்புக் கடவுச்சொல் (குறைந்தது 6 எழுத்துக்கள்) *',
    confirmPassword: 'கடவுச்சொல்லை மீண்டும் உள்ளிடவும் *',
    termsDeclaration:
      'தமிழ்நாடு நில வருவாய் சட்டங்கள் மற்றும் DPDP 2023 வழிகாட்டுதல்களின்படி நில ஆவண விண்ணப்பங்கள் தாக்கல் செய்யப்படும் என்பதை நான் உறுதிப்படுத்துகிறேன்.',
    createBtn: 'பதிவை முடித்து உள்நுழையவும்',
    creatingBtn: 'கணக்கு உருவாக்கப்படுகிறது...',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    signInHere: 'இங்கு உள்நுழைக',
  },

  en: {
    backToSignIn: 'Back to Portal Sign-In',
    state: 'State / Jurisdiction *',
    autoLanguageNotice: 'Language automatically adapted to selected state',
    regBadge: 'Citizen Registration',
    heroTitle: 'Citizen Registration',
    heroTitleSub: 'Landholder Self-Service Portal',
    heroDesc:
      'Register your landholding profile to access Tamil Nadu Land Records (TN-RoR), digitize deed documents, track inheritance mutations, and obtain tamper-proof 14-digit ULPIN certificates.',
    f1Title: 'Direct Patta & Chitta Access',
    f1Desc: 'Instant optical extraction and cadastral record verification.',
    f2Title: 'Tamper-Proof Deed Lineage',
    f2Desc: 'Full transparency on prior deed transfers and fraud alerts.',
    f3Title: 'Official DILRMP XML & PDF',
    f3Desc: 'Download certified digital deeds with QR codes and checksums.',
    regNotice: 'Government administrative accounts (VAO / Sub-Registrar) are provisioned through State Revenue Secretariat credentials.',
    selfEnroll: 'Pattadar Self-Enrollment',
    cardTitle: 'Create Citizen Account',
    cardSubtitle: 'Provide your identification and cadastral jurisdiction details.',
    fullName: 'Full Legal Name (as per Patta/Deed) *',
    email: 'Email Address *',
    phone: 'Mobile Number (for SMS & OTP Alerts) *',
    district: 'District *',
    taluk: 'Taluk *',
    surveyNumberHint: 'Primary Survey Number (Optional)',
    password: 'Password (min 6 characters) *',
    confirmPassword: 'Confirm Password *',
    termsDeclaration:
      'I hereby confirm and declare that land record applications will be filed in accordance with Tamil Nadu Land Revenue Acts and DPDP 2023 guidelines.',
    createBtn: 'Complete Registration & Sign In',
    creatingBtn: 'Creating Account...',
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
  },

  hi: {
    backToSignIn: 'लॉगिन पोर्टल पर वापस जाएं',
    state: 'राज्य (State) *',
    autoLanguageNotice: 'राज्य के अनुसार भाषा स्वतः परिवर्तित हो गई',
    regBadge: 'नागरिक पंजीकरण',
    heroTitle: 'नागरिक पंजीकरण',
    heroTitleSub: 'भूमि स्वामी स्व-सेवा पोर्टल',
    heroDesc:
      'तमिलनाडु भू-अभिलेखों (TN-RoR) तक पहुंच, पट्टा डिजिटलीकरण, विरासत नामांतरण ट्रैकिंग और 14-अंकीय यूएलपीआईएन प्रमाणपत्र प्राप्त करने हेतु पंजीकरण करें।',
    f1Title: 'प्रत्यक्ष पट्टा एवं खसरा पहुंच',
    f1Desc: 'त्वरित ऑप्टिकल निष्कर्षण एवं भू-अभिलेख सत्यापन।',
    f2Title: 'अखंडित विलेख वंशावली',
    f2Desc: 'पूर्व विलेख हस्तांतरण एवं धोखाधड़ी चेतावनियों पर पूर्ण पारदर्शिता।',
    f3Title: 'आधिकारिक डीआईएलआरएमपी एक्सएमएल एवं पीडीएफ',
    f3Desc: 'क्यूआर कोड और चेकसम के साथ प्रमाणित डिजिटल विलेख डाउनलोड करें।',
    regNotice: 'प्रशासनिक अधिकारी खाते (वीएओ / उप-पंजीयक) राज्य राजस्व सचिवालय द्वारा प्रदान किए जाते हैं।',
    selfEnroll: 'पट्टाधारक स्व-नामांकन',
    cardTitle: 'नागरिक खाता बनाएं',
    cardSubtitle: 'अपनी पहचान और भू-अधिकार क्षेत्र का विवरण प्रदान करें।',
    fullName: 'पूरा कानूनी नाम (पट्टा/विलेख के अनुसार) *',
    email: 'ईमेल पता *',
    phone: 'मोबाइल नंबर (एसएमएस और ओटीपी हेतु) *',
    district: 'जिला (District) *',
    taluk: 'तालुका (Taluk) *',
    surveyNumberHint: 'प्राथमिक सर्वेक्षण संख्या (वैकल्पिक)',
    password: 'पासवर्ड (न्यूनतम 6 अक्षर) *',
    confirmPassword: 'पासवर्ड की पुष्टि करें *',
    termsDeclaration:
      'मैं पुष्टि करता हूँ कि भू-अभिलेख आवेदन तमिलनाडु भू-राजस्व नियमों एवं डीपीओपी 2023 दिशा-निर्देशों के अनुरूप प्रस्तुत किए जाएंगे।',
    createBtn: 'पंजीकरण पूर्ण करें और लॉगिन करें',
    creatingBtn: 'खाता बनाया जा रहा है...',
    alreadyHaveAccount: 'क्या आपके पास पहले से खाता है?',
    signInHere: 'यहाँ लॉगिन करें',
  },
};
