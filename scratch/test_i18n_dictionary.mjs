import { TRANSLATIONS } from '../src/i18n/translations.ts';

console.log('--- Checking i18n Translation Dictionary Integrity ---');

const enKeys = Object.keys(TRANSLATIONS.en);
const taKeys = Object.keys(TRANSLATIONS.ta);
const hiKeys = Object.keys(TRANSLATIONS.hi);

console.log(`Total Keys: EN=${enKeys.length}, TA=${taKeys.length}, HI=${hiKeys.length}`);

const missingInTa = enKeys.filter(k => !(k in TRANSLATIONS.ta));
const missingInHi = enKeys.filter(k => !(k in TRANSLATIONS.hi));

if (missingInTa.length > 0) {
  console.error('Missing in Tamil:', missingInTa);
  process.exit(1);
} else {
  console.log('✓ Tamil translation has 100% key parity with English');
}

if (missingInHi.length > 0) {
  console.error('Missing in Hindi:', missingInHi);
  process.exit(1);
} else {
  console.log('✓ Hindi translation has 100% key parity with English');
}

// Check key specific tests for the 3 user-reported pages
const criticalKeys = [
  'automatedPipeline',
  'processingWorkstation',
  'landDocUploadOcr',
  'uploadSubtitle',
  'dragDropDeed',
  'dropYourDeedHere',
  'requestForDigitalization',
  'citizenGisAssistant',
  'findMyLandFromDoc',
  'findLandFromDocSubtitle',
  'step2ReadingTitle',
  'step2ReadingDesc',
  'readingProgressStage1',
  'readingProgressStage2',
  'readingProgressStage3',
  'step3LandIdentifiedTitle',
  'submitSupportTicket',
  'submitTicketDesc',
  'inquiryCategory',
  'categoryCadastral',
  'contactEmailPhone',
  'ticketSubject',
  'detailedDescription',
  'btnSubmitSupportTicket',
  'backToMyDocuments',
  'deleteLandRecord',
  'openInFullGisMap',
];

console.log('\n--- Checking Critical Translation Keys for Reported Pages ---');
for (const key of criticalKeys) {
  const enVal = TRANSLATIONS.en[key];
  const taVal = TRANSLATIONS.ta[key];
  const hiVal = TRANSLATIONS.hi[key];
  if (!enVal || !taVal || !hiVal) {
    console.error(`Key ${key} missing values! EN=${enVal}, TA=${taVal}, HI=${hiVal}`);
    process.exit(1);
  }
  console.log(`[${key}]`);
  console.log(`   EN: ${enVal}`);
  console.log(`   TA: ${taVal}`);
  console.log(`   HI: ${hiVal}`);
}

console.log('\nALL 100% OF TRANSLATION KEYS PASSED VERIFICATION!');
