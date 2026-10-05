/**
 * Comprehensive Archaic Revenue Terminology Lexicon & Multi-Script Normalizer
 *
 * Covers:
 * - Urdu / Persianized Revenue Terms (Mughal & British colonial revenue system)
 * - Devanagari / Hindi Revenue Terminologies
 * - Kaithi Script (Historical Bihar / UP / Jharkhand land deeds & survey slips)
 * - Modi Script (Historical Maharashtra & Western India Maratha land grants)
 * - Tamil Nadu Classical Cadastral Lexicon
 */

export interface ArchaicTermEntry {
  term: string;
  transliterations: string[];
  scripts: ('Devanagari' | 'Urdu' | 'Kaithi' | 'Modi' | 'Tamil' | 'English')[];
  category: 'Land_Classification' | 'Document_Type' | 'Boundary_Direction' | 'Entity_Role' | 'Measurement_Unit';
  meaning: string;
  normalizedClassification: string;
  modernEnglishEquivalent: string;
  region: 'North India (UP/Punjab/Haryana/Bihar)' | 'Maharashtra' | 'Tamil Nadu' | 'Pan-India';
}

export const ARCHAIC_REVENUE_LEXICON: Record<string, ArchaicTermEntry> = {
  // --- Land Classification ---
  chahi: {
    term: 'चाही (Chahi)',
    transliterations: ['chahi', 'chaahi', 'चाही', 'چاہی'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Agricultural land irrigated from wells or tube-wells',
    normalizedClassification: 'Chahi (Well-Irrigated Agricultural Land)',
    modernEnglishEquivalent: 'Irrigated Cropland (Well/Tube-well)',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  barani: {
    term: 'बारानी (Barani)',
    transliterations: ['barani', 'baaraani', 'बारानी', 'بارانی'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Unirrigated land entirely dependent on rainfall',
    normalizedClassification: 'Barani (Rainfed Agricultural Land)',
    modernEnglishEquivalent: 'Rainfed / Dry Cropland',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  nahri: {
    term: 'नहरी (Nahri)',
    transliterations: ['nahri', 'nehri', 'नहरी', 'نہری'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Agricultural land irrigated through perennial canal systems',
    normalizedClassification: 'Nahri (Canal-Irrigated Land)',
    modernEnglishEquivalent: 'Canal-Irrigated Cropland',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  gair_mumkin: {
    term: 'गैर मुमकिन (Gair Mumkin)',
    transliterations: ['gair mumkin', 'ghair mumkin', 'gair-mumkin', 'गैर मुमकिन', 'गैरमुमकिन', 'غیر ممکن'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Barren, rocky, or uncultivable land reserved for roads, canals, or structures',
    normalizedClassification: 'Gair Mumkin (Uncultivable / Wasteland / Public Utility)',
    modernEnglishEquivalent: 'Barren / Uncultivable / Non-Agricultural Land',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  sailab: {
    term: 'सैलाब (Sailab)',
    transliterations: ['sailab', 'sailabi', 'सैलाब', 'सैलाबी', 'سیلاب'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Riverine land submerged during monsoons or subject to river floods',
    normalizedClassification: 'Sailab (Floodplain / Riverine Land)',
    modernEnglishEquivalent: 'Riverine / Inundated Land',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  banjar_jadid: {
    term: 'बंजर जदीद (Banjar Jadid)',
    transliterations: ['banjar jadid', 'banjar jadeed', 'बंजर जदीद', 'بنجر جدید'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Land left fallow for 1 to 3 successive harvests',
    normalizedClassification: 'Banjar Jadid (Short-Term Fallow Land)',
    modernEnglishEquivalent: 'Current Fallow Land',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  banjar_qadim: {
    term: 'बंजर कदीम (Banjar Qadim)',
    transliterations: ['banjar qadim', 'banjar kadim', 'बंजर कदीम', 'بنجر قدیم'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Land uncultivated for 4 or more consecutive years',
    normalizedClassification: 'Banjar Qadim (Long-Term Fallow / Cultural Wasteland)',
    modernEnglishEquivalent: 'Long-Term Fallow / Culturable Waste',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  abadi_deh: {
    term: 'आबादी देह (Abadi Deh)',
    transliterations: ['abadi deh', 'abadi', 'आबादी देह', 'आबादी', 'آبادی دہ'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Land_Classification',
    meaning: 'Village habitation / residential settlement cluster (Lal Dora)',
    normalizedClassification: 'Abadi Deh (Village Settlement / Residential Land)',
    modernEnglishEquivalent: 'Village Habitation / Abadi Site',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },

  // --- Modi / Maharashtra Terms ---
  jirayat: {
    term: 'जिरायत (Jirayat)',
    transliterations: ['jirayat', 'jirait', 'जिरायत'],
    scripts: ['Modi', 'Devanagari', 'English'],
    category: 'Land_Classification',
    meaning: 'Dry crop agricultural land dependent on rains (Maharashtra)',
    normalizedClassification: 'Jirayat (Dry Agricultural Land)',
    modernEnglishEquivalent: 'Rainfed Dry Crop Land',
    region: 'Maharashtra',
  },
  bagayat: {
    term: 'बागायत (Bagayat)',
    transliterations: ['bagayat', 'bagait', 'बागायत'],
    scripts: ['Modi', 'Devanagari', 'English'],
    category: 'Land_Classification',
    meaning: 'Irrigated orchard, garden or cash crop land (Maharashtra)',
    normalizedClassification: 'Bagayat (Irrigated Garden / Orchard Land)',
    modernEnglishEquivalent: 'Irrigated Orchard / Garden Land',
    region: 'Maharashtra',
  },
  pot_kharaba: {
    term: 'पोट खराबा (Pot Kharaba)',
    transliterations: ['pot kharaba', 'potkharaba', 'पोट खराबा', 'पोटखराबा'],
    scripts: ['Modi', 'Devanagari', 'English'],
    category: 'Land_Classification',
    meaning: 'Uncultivable wasteland included within a survey parcel (Class A or Class B)',
    normalizedClassification: 'Pot Kharaba (Uncultivable Waste within Parcel)',
    modernEnglishEquivalent: 'Uncultivable Portion of Survey Parcel',
    region: 'Maharashtra',
  },

  // --- Tamil Nadu Terms ---
  nansei: {
    term: 'நன்செய் (Nansei)',
    transliterations: ['nansei', 'nanjai', 'நன்செய்'],
    scripts: ['Tamil', 'English'],
    category: 'Land_Classification',
    meaning: 'Wet agricultural land with perennial irrigation source (tank, canal, river)',
    normalizedClassification: 'நன்செய் (Wet / Irrigated Land)',
    modernEnglishEquivalent: 'Wet Land (Canal / River Irrigated)',
    region: 'Tamil Nadu',
  },
  punsei: {
    term: 'புன்செய் (Punsei)',
    transliterations: ['punsei', 'punjai', 'புன்செய்'],
    scripts: ['Tamil', 'English'],
    category: 'Land_Classification',
    meaning: 'Dry agricultural land cultivated with dry grains dependent on seasons',
    normalizedClassification: 'புன்செய் (Dry Land)',
    modernEnglishEquivalent: 'Dry Land (Dry Crops)',
    region: 'Tamil Nadu',
  },
  manavari: {
    term: 'மானாவாரி (Manavari)',
    transliterations: ['manavari', 'manavari land', 'மானாவாரி'],
    scripts: ['Tamil', 'English'],
    category: 'Land_Classification',
    meaning: 'Rainfed agricultural land relying purely on rainfall',
    normalizedClassification: 'மானாவாரி (Rainfed Agricultural Land)',
    modernEnglishEquivalent: 'Rainfed Crop Land',
    region: 'Tamil Nadu',
  },
  natham: {
    term: 'நத்தம் (Natham)',
    transliterations: ['natham', 'grama natham', 'நத்தம்', 'கிராம நத்தம்'],
    scripts: ['Tamil', 'English'],
    category: 'Land_Classification',
    meaning: 'Village habitation / ancestral dwelling zone',
    normalizedClassification: 'நத்தம் (Grama Natham / Residential Land)',
    modernEnglishEquivalent: 'Grama Natham / Village Habitation Land',
    region: 'Tamil Nadu',
  },
  poramboke: {
    term: 'அரசு புறம்போக்கு (Poramboke)',
    transliterations: ['poramboke', 'puramboku', 'புறம்போக்கு', 'அரசு புறம்போக்கு'],
    scripts: ['Tamil', 'English'],
    category: 'Land_Classification',
    meaning: 'Government revenue waste / communal public land exempt from tax',
    normalizedClassification: 'அரசு புறம்போக்கு (Government Public Land / Poramboke)',
    modernEnglishEquivalent: 'Government Communal / Poramboke Land',
    region: 'Tamil Nadu',
  },

  // --- Document Types & Ledger Records ---
  jamabandi: {
    term: 'जमाबंदी (Jamabandi)',
    transliterations: ['jamabandi', 'jama bandi', 'जमाबंदी', 'جمابندی', '𑂔𑂧𑂰𑂥𑂁𑂠𑂲'],
    scripts: ['Devanagari', 'Urdu', 'Kaithi', 'English'],
    category: 'Document_Type',
    meaning: 'Official Record of Rights (RoR) / Register of holdings, ownership, and revenue assessment',
    normalizedClassification: 'Patta / RoR (Jamabandi)',
    modernEnglishEquivalent: 'Record of Rights (Jamabandi Register)',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  khasra: {
    term: 'खसरा (Khasra)',
    transliterations: ['khasra', 'khasra girdawari', 'khesra', 'खसरा', 'खसरा गिरदावरी', 'खेसरा', 'خسرہ', '𑂎𑂵𑂮𑂩𑂰'],
    scripts: ['Devanagari', 'Urdu', 'Kaithi', 'English'],
    category: 'Document_Type',
    meaning: 'Field parcel survey register showing parcel numbers, dimensions, soil types, and cultivators',
    normalizedClassification: 'A-Register (Khasra Field Ledger)',
    modernEnglishEquivalent: 'Field Parcel Register / Survey Index',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  khatauni: {
    term: 'खतौनी (Khatauni)',
    transliterations: ['khatauni', 'khatauni nakal', 'खतौनी', 'کھتونی'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Document_Type',
    meaning: 'Ledger detailing the person holding rights in the parcel (tenant / landlord summary)',
    normalizedClassification: 'Patta / RoR (Khatauni)',
    modernEnglishEquivalent: 'Tenancy / Landholding Ledger Extract',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  namantaran_panji: {
    term: 'नामान्तरण पंजी (Namantaran Panji / Inteqal)',
    transliterations: [
      'namantaran panji',
      'namantaran',
      'inteqal',
      'intikal',
      'dakhil kharij',
      'नामान्तरण पंजी',
      'नामान्तरण',
      'इंतकाल',
      'दाखिल खारिज',
      'انتقال',
      '𑂠𑂰𑂎𑂱𑂪 𑂎𑂰𑂩𑂱𑂔',
    ],
    scripts: ['Devanagari', 'Urdu', 'Kaithi', 'English'],
    category: 'Document_Type',
    meaning: 'Mutation register recording changes of ownership through inheritance, sale, gift, or partition',
    normalizedClassification: 'Inheritance Title (Namantaran Panji / Mutation Deed)',
    modernEnglishEquivalent: 'Mutation Register / Transfer Order',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  bainama: {
    term: 'बैनामा (Bainama)',
    transliterations: ['bainama', 'dastavez bai', 'bai nama', 'बैनामा', 'दस्तावेज बै', 'بیع نامہ'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Document_Type',
    meaning: 'Deed of absolute sale / Conveyance deed in revenue courts',
    normalizedClassification: 'Sale Deed (Bainama)',
    modernEnglishEquivalent: 'Absolute Sale Deed / Conveyance',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  hibbanama: {
    term: 'हिब्बानामा (Hibbanama)',
    transliterations: ['hibbanama', 'hiba nama', 'हिब्बानामा', 'ہبہ نامہ'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Document_Type',
    meaning: 'Deed of gift transferring proprietary rights without financial consideration',
    normalizedClassification: 'Gift Deed (Hibbanama)',
    modernEnglishEquivalent: 'Gift Deed (Voluntary Grant)',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  wasiyatnama: {
    term: 'वसीयतनामा (Wasiyatnama)',
    transliterations: ['wasiyatnama', 'vasiyatnama', 'वसीयतनामा', 'وصیت نامہ'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Document_Type',
    meaning: 'Testamentary document / Will specifying inheritance of landed property',
    normalizedClassification: 'Inheritance Title (Wasiyatnama / Will)',
    modernEnglishEquivalent: 'Testamentary Deed / Will',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  saat_baara: {
    term: 'सातबारा उतारा (Saat Baara 7/12)',
    transliterations: ['7/12', 'saat baara', 'saatbara', '7 12 utara', 'सातबारा उतारा', 'सातबारा'],
    scripts: ['Modi', 'Devanagari', 'English'],
    category: 'Document_Type',
    meaning: 'Maharashtra Village Form VII (Rights & Liabilities) and Form XII (Crops) extract',
    normalizedClassification: 'Patta / RoR (7/12 Utara)',
    modernEnglishEquivalent: 'Village Form 7/12 Record of Rights',
    region: 'Maharashtra',
  },
  ferfar_panji: {
    term: 'फेरफार नोंदवही (Ferfar Panji)',
    transliterations: ['ferfar', 'ferfar nondvahi', 'fer far', 'फेरफार', 'फेरफार नोंदवही'],
    scripts: ['Modi', 'Devanagari', 'English'],
    category: 'Document_Type',
    meaning: 'Village Form VI Mutation Register in Maharashtra',
    normalizedClassification: 'Inheritance Title (Ferfar / Mutation Register)',
    modernEnglishEquivalent: 'Maharashtra Form VI Mutation Register',
    region: 'Maharashtra',
  },

  // --- Entity Roles & Boundary Descriptors ---
  hissedar: {
    term: 'हिस्सेदार (Hissedar / Co-sharer)',
    transliterations: ['hissedar', 'hisedar', 'sharik', 'हिस्सेदार', 'शरीक', 'حصہ دار'],
    scripts: ['Devanagari', 'Urdu', 'English'],
    category: 'Entity_Role',
    meaning: 'Co-sharer holding fractional undivided interest in a joint Khata / survey parcel',
    normalizedClassification: 'Hissedar (Joint Parcel Shareholder)',
    modernEnglishEquivalent: 'Co-Sharer / Joint Title Holder',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
  raiyat: {
    term: 'रैयत (Raiyat / Cultivator)',
    transliterations: ['raiyat', 'ryot', 'kashtkar', 'रैयत', 'काश्तकार', 'رعیت', '𑂩𑂶𑂨𑂞'],
    scripts: ['Kaithi', 'Devanagari', 'Urdu', 'English'],
    category: 'Entity_Role',
    meaning: 'Primary landholder / recognized agricultural tenant under tenancy laws',
    normalizedClassification: 'Raiyat (Primary Landholder / Tenant)',
    modernEnglishEquivalent: 'Occupant Landholder / Tenant-in-Chief',
    region: 'North India (UP/Punjab/Haryana/Bihar)',
  },
};

/**
 * Normalizes an archaic or regional land classification into a standard classification.
 */
export function normalizeLandClassification(rawClassification: string): string {
  if (!rawClassification) return 'Punsei (Dry Land)';

  const normalized = rawClassification.toLowerCase().trim();

  // Chahi / Well
  if (normalized.includes('chahi') || normalized.includes('चाही') || normalized.includes('چاہی')) {
    return 'Chahi (Well-Irrigated Agricultural Land)';
  }

  // Barani / Rainfed
  if (normalized.includes('barani') || normalized.includes('बारानी') || normalized.includes('بارانی')) {
    return 'Barani (Rainfed Agricultural Land)';
  }

  // Nahri / Canal
  if (normalized.includes('nahri') || normalized.includes('nehri') || normalized.includes('नहरी') || normalized.includes('نہری')) {
    return 'Nahri (Canal-Irrigated Land)';
  }

  // Gair Mumkin / Wasteland
  if (
    normalized.includes('gair mumkin') ||
    normalized.includes('ghair mumkin') ||
    normalized.includes('गैर मुमकिन') ||
    normalized.includes('गैरमुमकिन') ||
    normalized.includes('غیر ممکن')
  ) {
    return 'Gair Mumkin (Uncultivable / Wasteland / Public Utility)';
  }

  // Sailab
  if (normalized.includes('sailab') || normalized.includes('सैलाब') || normalized.includes('سیلاب')) {
    return 'Sailab (Floodplain / Riverine Land)';
  }

  // Banjar
  if (normalized.includes('banjar') || normalized.includes('बंजर') || normalized.includes('بنجر')) {
    if (normalized.includes('jadid') || normalized.includes('जदीद')) {
      return 'Banjar Jadid (Short-Term Fallow Land)';
    }
    return 'Banjar Qadim (Long-Term Fallow / Cultural Wasteland)';
  }

  // Abadi Deh / Lal Dora
  if (normalized.includes('abadi') || normalized.includes('आबादी') || normalized.includes('آبادی')) {
    return 'Abadi Deh (Village Settlement / Residential Land)';
  }

  // Jirayat / Bagayat / Pot Kharaba
  if (normalized.includes('jirayat') || normalized.includes('जिरायत')) {
    return 'Jirayat (Dry Agricultural Land)';
  }
  if (normalized.includes('bagayat') || normalized.includes('बागायत')) {
    return 'Bagayat (Irrigated Garden / Orchard Land)';
  }
  if (normalized.includes('pot kharaba') || normalized.includes('पोट खराबा')) {
    return 'Pot Kharaba (Uncultivable Waste within Parcel)';
  }

  // Tamil Nadu Classifications
  if (normalized.includes('நன்செய்') || normalized.includes('nansei') || normalized.includes('wet')) {
    return 'நன்செய் (Wet Land)';
  }
  if (normalized.includes('புன்செய்') || normalized.includes('punsei') || normalized.includes('dry')) {
    return 'புன்செய் (Dry Land)';
  }
  if (normalized.includes('மானாவாரி') || normalized.includes('manavari') || normalized.includes('rainfed')) {
    return 'மானாவாரி (Rainfed Agricultural Land)';
  }
  if (normalized.includes('நத்தம்') || normalized.includes('natham')) {
    return 'நத்தம் (Grama Natham / Residential Land)';
  }
  if (normalized.includes('புறம்போக்கு') || normalized.includes('poramboke')) {
    return 'அரசு புறம்போக்கு (Govt Communal Land)';
  }

  return rawClassification;
}

/**
 * Normalizes document type acknowledging archaic names (Jamabandi, Khasra, Namantaran Panji, Bainama, 7/12)
 */
export function normalizeDocumentType(rawType: string): string {
  if (!rawType) return 'Sale Deed';

  const lower = rawType.toLowerCase();

  if (lower.includes('namantaran') || lower.includes('नामान्तरण') || lower.includes('inteqal') || lower.includes('इंतकाल') || lower.includes('dakhil kharij') || lower.includes('ferfar') || lower.includes('फेरफार')) {
    return 'Inheritance Title';
  }
  if (lower.includes('jamabandi') || lower.includes('जमाबंदी') || lower.includes('khatauni') || lower.includes('खतौनी') || lower.includes('7/12') || lower.includes('सातबारा') || lower.includes('patta') || lower.includes('பட்டா')) {
    return 'Patta / RoR';
  }
  if (lower.includes('khasra') || lower.includes('खसरा') || lower.includes('khesra') || lower.includes('खेसरा') || lower.includes('a-register') || lower.includes('பதிவேடு')) {
    return 'A-Register';
  }
  if (lower.includes('bainama') || lower.includes('बैनामा') || lower.includes('bai nama') || lower.includes('sale') || lower.includes('கிரையம்')) {
    return 'Sale Deed';
  }
  if (lower.includes('hibba') || lower.includes('हिब्बा') || lower.includes('gift') || lower.includes('தான')) {
    return 'Gift Deed';
  }
  if (lower.includes('wasiyat') || lower.includes('वसीयत') || lower.includes('inheritance') || lower.includes('வாரிசு')) {
    return 'Inheritance Title';
  }
  if (lower.includes('partition') || lower.includes('பாகப்') || lower.includes('बंटवारा') || lower.includes('takseem')) {
    return 'Partition Deed';
  }
  if (lower.includes('encumbrance') || lower.includes('வில்லங்கம்') || lower.includes('ec')) {
    return 'Encumbrance Certificate';
  }

  return rawType;
}

/**
 * Detect script and archaic revenue keywords in document text or filename
 */
export function detectArchaicContext(text: string): {
  detectedScripts: string[];
  matchedTerms: ArchaicTermEntry[];
  primaryScript: string;
} {
  const detectedScripts: Set<string> = new Set();
  const matchedTerms: ArchaicTermEntry[] = [];

  // Script detection regex
  if (/[\u0900-\u097F]/.test(text)) detectedScripts.add('Devanagari');
  if (/[\u0600-\u06FF]/.test(text)) detectedScripts.add('Urdu / Nastaliq');
  if (/[\u0B80-\u0BFF]/.test(text)) detectedScripts.add('Tamil');
  if (/[\u11080-\u110CF]/.test(text)) detectedScripts.add('Kaithi');
  if (/[a-zA-Z]/.test(text)) detectedScripts.add('English / Latin');

  const lower = text.toLowerCase();

  for (const entry of Object.values(ARCHAIC_REVENUE_LEXICON)) {
    for (const token of entry.transliterations) {
      if (lower.includes(token.toLowerCase())) {
        matchedTerms.push(entry);
        break;
      }
    }
  }

  const primaryScript = detectedScripts.has('Devanagari')
    ? 'Devanagari'
    : detectedScripts.has('Urdu / Nastaliq')
    ? 'Urdu / Nastaliq'
    : detectedScripts.has('Kaithi')
    ? 'Kaithi'
    : detectedScripts.has('Tamil')
    ? 'Tamil'
    : 'English / Latin';

  return {
    detectedScripts: Array.from(detectedScripts),
    matchedTerms,
    primaryScript,
  };
}
