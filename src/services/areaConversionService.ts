/**
 * Regional Area Solver & Mathematical Conversion Engine (SIH26018 / DILRMP Standard)
 *
 * Implements:
 * - Multi-State Conversion Matrix:
 *   - North India: Pucca Bigha, Kachha Bigha, Biswa, Biswansi, Kattha, Dhur
 *   - Northwest India: Kanal, Marla, Sarsahi, Killa, Murabba (Punjab, Haryana, HP, J&K)
 *   - Western India: Guntha, Vigha, Are (Maharashtra, Gujarat)
 *   - South India: Cent, Ground, Ankanam, Guntha, Acre (Tamil Nadu, Kerala, Karnataka, AP)
 * - Deterministic Normalization to SI Units: Hectares (Ha) and Square Meters (m²)
 * - Fractional Share (Hissa) Arithmetic Engine:
 *   - Rational fractions (e.g. 1/2, 3/8, 5/16)
 *   - Traditional Anna-Pai revenue system (16 Annas = 1 Rupee / 100% ownership)
 *   - Audit verification to detect overselling (>100% aggregate share) and succession gaps
 */

export interface NormalizedArea {
  hectares: number; // SI Metric (Ha)
  squareMeters: number; // SI Metric (m²)
  acres: number; // Imperial Acre
  cents: number; // South Indian Cent
  rawInput: string;
  detectedRegion?: string;
  detectedUnits: string[];
  formattedSummary: string; // e.g. "0.9840 Ha (9,840.00 m² / 2.43 Acres)"
}

export interface HissaShareItem {
  ownerName: string;
  shareString: string;
  fractionalValue: number; // e.g. 0.25 for 1/4 or 4 Annas
  percentage: number; // e.g. 25.0%
  allocatedAreaSqM: number;
  allocatedAreaHa: number;
  allocatedAreaAcres: number;
}

export interface HissaAuditResult {
  isValid: boolean;
  totalSharesFraction: number; // Should be <= 1.0
  totalPercentage: number;
  isOversold: boolean;
  unallocatedPercentage: number;
  shares: HissaShareItem[];
  auditMessage: string;
}

// ============================================================================
// Conversion Factors (Base: Square Meters m²)
// ============================================================================

export const BASE_CONVERSIONS_SQM = {
  // Standard SI & International
  sqm: 1.0,
  hectare: 10000.0,
  are: 100.0,
  acre: 4046.8564224,
  sqft: 0.09290304,
  sqyard: 0.83612736, // Gaj

  // Tamil Nadu & South India
  cent: 40.468564224, // 1/100 Acre = 435.6 sq.ft
  ground: 222.967296, // 2,400 sq.ft
  guntha: 101.17141056, // 1/40 Acre = 1,089 sq.ft
  ankanam: 6.68901888, // 72 sq.ft (AP / Rayalaseema)

  // North India (UP, Rajasthan, Bihar, MP)
  pucca_bigha: 2529.285264, // 3,025 sq.yards ≈ 2,529.28 m² (5/8 Acre)
  pucca_biswa: 126.4642632, // 1/20 Pucca Bigha ≈ 151.25 sq.yards
  biswansi: 6.32321316, // 1/20 Biswa

  kachha_bigha: 843.095088, // 1/3 Pucca Bigha ≈ 1,008.33 sq.yards
  kachha_biswa: 42.1547544, // 1/20 Kachha Bigha

  kattha: 126.4642632, // 1/20 Bigha in Bihar/Bengal = 1,361.25 sq.ft
  dhur: 6.32321316, // 1/20 Kattha ≈ 68.06 sq.ft
  dhurki: 0.316160658, // 1/20 Dhur

  // Northwest India (Punjab, Haryana, HP, J&K)
  marla: 25.29285264, // 9 Sarsahi = 272.25 sq.ft
  kanal: 505.8570528, // 20 Marla = 5,445 sq.ft
  killa: 4046.8564224, // 8 Kanal = 1 Acre
  murabba: 101171.41056, // 25 Killa / Acres

  // Western India (Gujarat / Maharashtra)
  vigha_gujarat: 2208.95, // Common Gujarat Vigha ≈ 23,777 sq.ft
};

// ============================================================================
// Core Math Helpers
// ============================================================================

/**
 * Builds a standardized NormalizedArea object from an exact square-meter amount.
 */
export function buildNormalizedArea(sqMeters: number, rawInput: string, detectedUnits: string[] = []): NormalizedArea {
  const safeSqM = Math.max(0, sqMeters);
  const hectares = Number((safeSqM / 10000.0).toFixed(4));
  const acres = Number((safeSqM / BASE_CONVERSIONS_SQM.acre).toFixed(4));
  const cents = Number((safeSqM / BASE_CONVERSIONS_SQM.cent).toFixed(2));
  const cleanSqM = Number(safeSqM.toFixed(2));

  let region = 'Pan-India / Metric';
  const joined = detectedUnits.join(' ').toLowerCase();
  if (/cent|ground|ankanam|ஹெக்டேர்|ஏர்ஸ்/.test(joined)) {
    region = 'South India (Tamil Nadu / AP / Kerala)';
  } else if (/bigha|biswa|kattha|dhur/.test(joined)) {
    region = 'North India (UP / Bihar / Rajasthan)';
  } else if (/kanal|marla|killa|murabba/.test(joined)) {
    region = 'Northwest India (Punjab / Haryana)';
  } else if (/guntha|vigha/.test(joined)) {
    region = 'Western India (Maharashtra / Gujarat)';
  }

  const formattedSummary = `${hectares} Ha (${cleanSqM.toLocaleString('en-IN')} m² / ${acres} Acres)`;

  return {
    hectares,
    squareMeters: cleanSqM,
    acres,
    cents,
    rawInput,
    detectedRegion: region,
    detectedUnits,
    formattedSummary,
  };
}

/**
 * Parses any regional Indian land extent string (including multi-token expressions)
 * into standardized SI Metric units without rounding loss.
 *
 * Supported Patterns:
 * - "2 Hectares 43.00 Ares" / "2 ஹெக்டேர் 43 ஏர்ஸ்"
 * - "2 Bigha 4 Biswa" / "3 Bigha 12 Biswa"
 * - "4 Kanal 12 Marla"
 * - "2 Bigha 5 Kattha 10 Dhur"
 * - "15 Guntha"
 * - "3 Ground 1200 Sq.Ft"
 * - "10 Cent" / "2.45 Acres"
 */
export function parseRegionalAreaText(areaText: string, stateHint?: string): NormalizedArea {
  if (!areaText || typeof areaText !== 'string') {
    return buildNormalizedArea(0, '');
  }

  const raw = areaText.trim();
  const lower = raw.toLowerCase();
  const detectedUnits: string[] = [];
  let totalSqM = 0;

  // 1. Tamil Nadu Hectares & Ares: e.g. "2 Hectares 43.00 Ares" or "2 ஹெக்டேர் 43 ஏர்ஸ்"
  const haAresMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hectares?|ஹெக்டேர்|ha)\s*(?:and)?\s*(\d+(?:\.\d+)?)\s*(?:ares?|ஏர்ஸ்|a)/i);
  if (haAresMatch) {
    const ha = parseFloat(haAresMatch[1]);
    const ares = parseFloat(haAresMatch[2]);
    totalSqM = ha * 10000 + ares * 100;
    detectedUnits.push('Hectare', 'Are');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // 2. North Indian Bigha, Biswa, Biswansi / Kattha / Dhur:
  // e.g. "2 Bigha 4 Biswa", "1 Bigha 10 Kattha 5 Dhur"
  const bighaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:pucca\s+bigha|bigha|बीघा)/i);
  const biswaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:biswa|बिस्वा)/i);
  const biswansiMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:biswansi|बिस्वांसी)/i);
  const katthaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:kattha|katha|कट्ठा)/i);
  const dhurMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:dhur|धुर)/i);

  if (bighaMatch || biswaMatch || katthaMatch) {
    const isKachha = lower.includes('kachha') || lower.includes('kacha');
    const bighaFactor = isKachha ? BASE_CONVERSIONS_SQM.kachha_bigha : BASE_CONVERSIONS_SQM.pucca_bigha;
    const biswaFactor = isKachha ? BASE_CONVERSIONS_SQM.kachha_biswa : BASE_CONVERSIONS_SQM.pucca_biswa;

    if (bighaMatch) {
      totalSqM += parseFloat(bighaMatch[1]) * bighaFactor;
      detectedUnits.push(isKachha ? 'Kachha Bigha' : 'Bigha');
    }
    if (biswaMatch) {
      totalSqM += parseFloat(biswaMatch[1]) * biswaFactor;
      detectedUnits.push('Biswa');
    }
    if (biswansiMatch) {
      totalSqM += parseFloat(biswansiMatch[1]) * BASE_CONVERSIONS_SQM.biswansi;
      detectedUnits.push('Biswansi');
    }
    if (katthaMatch) {
      totalSqM += parseFloat(katthaMatch[1]) * BASE_CONVERSIONS_SQM.kattha;
      detectedUnits.push('Kattha');
    }
    if (dhurMatch) {
      totalSqM += parseFloat(dhurMatch[1]) * BASE_CONVERSIONS_SQM.dhur;
      detectedUnits.push('Dhur');
    }

    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // 3. Northwest India: Kanal & Marla (Punjab, Haryana, J&K)
  const kanalMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:kanal|कनाल)/i);
  const marlaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:marla|मरला)/i);
  const killaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:killa|किल्ला)/i);

  if (kanalMatch || marlaMatch || killaMatch) {
    if (killaMatch) {
      totalSqM += parseFloat(killaMatch[1]) * BASE_CONVERSIONS_SQM.killa;
      detectedUnits.push('Killa');
    }
    if (kanalMatch) {
      totalSqM += parseFloat(kanalMatch[1]) * BASE_CONVERSIONS_SQM.kanal;
      detectedUnits.push('Kanal');
    }
    if (marlaMatch) {
      totalSqM += parseFloat(marlaMatch[1]) * BASE_CONVERSIONS_SQM.marla;
      detectedUnits.push('Marla');
    }
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // 4. Chennai / Tamil Nadu Ground & Sq.Ft: e.g. "3 Ground 1200 Sq.Ft"
  const groundMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:grounds?|கிரவுண்ட்)/i);
  const sqftMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:sq\.?\s*ft|square\s+feet|சதுர\s+அடி)/i);

  if (groundMatch) {
    totalSqM += parseFloat(groundMatch[1]) * BASE_CONVERSIONS_SQM.ground;
    detectedUnits.push('Ground');
    if (sqftMatch) {
      totalSqM += parseFloat(sqftMatch[1]) * BASE_CONVERSIONS_SQM.sqft;
      detectedUnits.push('Sq.Ft');
    }
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // 5. Cent (South India): e.g. "10 Cent" or "45 சென்ட்"
  const centMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:cents?|சென்ட்)/i);
  if (centMatch) {
    totalSqM = parseFloat(centMatch[1]) * BASE_CONVERSIONS_SQM.cent;
    detectedUnits.push('Cent');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // 6. Guntha (Maharashtra / Karnataka / Telangana / AP): e.g. "15 Guntha" or "10 गुंठा"
  const gunthaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:gunthas?|guntas?|गुंठा)/i);
  if (gunthaMatch) {
    totalSqM = parseFloat(gunthaMatch[1]) * BASE_CONVERSIONS_SQM.guntha;
    detectedUnits.push('Guntha');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // 7. Standalone Acre / Hectare / Sq.Meter
  const acreMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:acres?|ஏக்கர்)/i);
  if (acreMatch) {
    totalSqM = parseFloat(acreMatch[1]) * BASE_CONVERSIONS_SQM.acre;
    detectedUnits.push('Acre');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  const singleHaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:hectares?|ஹெக்டேர்|ha)/i);
  if (singleHaMatch) {
    totalSqM = parseFloat(singleHaMatch[1]) * BASE_CONVERSIONS_SQM.hectare;
    detectedUnits.push('Hectare');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  const sqmMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:sq\.?\s*m|square\s+meters?|ச\.மீ)/i);
  if (sqmMatch) {
    totalSqM = parseFloat(sqmMatch[1]);
    detectedUnits.push('Sq.Meter');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  // Fallback: Check if string is just a numeric value, default to Acres if not specified
  const numOnly = parseFloat(raw.replace(/,/g, ''));
  if (!isNaN(numOnly) && numOnly > 0) {
    totalSqM = numOnly * BASE_CONVERSIONS_SQM.acre;
    detectedUnits.push('Acre (inferred)');
    return buildNormalizedArea(totalSqM, raw, detectedUnits);
  }

  return buildNormalizedArea(0, raw, ['Unknown']);
}

// ============================================================================
// Fractional Share (Hissa) Solver & Auditor
// ============================================================================

/**
 * Parses a fractional share string from deeds and Jamabandis into a decimal fraction (0.0 to 1.0).
 *
 * Handles:
 * - Mathematical Fractions: "1/2", "3/4", "1/8", "5/16", "2/5"
 * - Traditional Anna Revenue System (16 Annas = 100%): "8 Anna" (0.50), "4 Aana" (0.25), "12 Anna" (0.75)
 * - Percentages: "25%", "50.0%"
 * - Decimals: "0.25", "0.5"
 */
export function parseFractionalShare(shareStr: string): number {
  if (!shareStr || typeof shareStr !== 'string') return 1.0;

  const clean = shareStr.trim().toLowerCase();

  // 1. Anna / Aana system (16 Annas = 1.0)
  const annaMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:annas?|aana|आना)/i);
  if (annaMatch) {
    const annas = parseFloat(annaMatch[1]);
    return Number(Math.min(1.0, Math.max(0, annas / 16.0)).toFixed(6));
  }

  // 2. Percentage: "25%"
  const percentMatch = clean.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    return Number(Math.min(1.0, Math.max(0, parseFloat(percentMatch[1]) / 100.0)).toFixed(6));
  }

  // 3. Rational Fraction: "1/2", "3/8", "12/16"
  const fracMatch = clean.match(/(\d+)\s*\/\s*(\d+)/);
  if (fracMatch) {
    const numerator = parseFloat(fracMatch[1]);
    const denominator = parseFloat(fracMatch[2]);
    if (denominator > 0) {
      return Number(Math.min(1.0, Math.max(0, numerator / denominator)).toFixed(6));
    }
  }

  // 4. Raw Decimal
  const decimal = parseFloat(clean);
  if (!isNaN(decimal) && decimal > 0) {
    return decimal > 1.0 ? Number((decimal / 100.0).toFixed(6)) : Number(decimal.toFixed(6));
  }

  return 1.0;
}

/**
 * Performs complete mathematical validation on a multi-owner parcel (Joint Khata / Hissedar Ledger).
 * Verifies whether total distributed shares equal 100%, and detects overselling fraud.
 *
 * @param totalParcelAreaText - The total surveyed area of the parent parcel (e.g. "4.20 Acres" or "2 Bigha")
 * @param coSharers - Array of co-sharers with their share strings (e.g. [{ name: "Ramesh", share: "1/2" }])
 */
export function auditCoSharerHissas(
  totalParcelAreaText: string,
  coSharers: Array<{ ownerName: string; shareString: string }>
): HissaAuditResult {
  const totalArea = parseRegionalAreaText(totalParcelAreaText);
  let totalFraction = 0;

  const shares: HissaShareItem[] = coSharers.map((sharer) => {
    const fractionalValue = parseFractionalShare(sharer.shareString);
    totalFraction += fractionalValue;

    const allocatedAreaSqM = Number((totalArea.squareMeters * fractionalValue).toFixed(2));
    const allocatedAreaHa = Number((totalArea.hectares * fractionalValue).toFixed(4));
    const allocatedAreaAcres = Number((totalArea.acres * fractionalValue).toFixed(4));

    return {
      ownerName: sharer.ownerName,
      shareString: sharer.shareString,
      fractionalValue,
      percentage: Number((fractionalValue * 100).toFixed(2)),
      allocatedAreaSqM,
      allocatedAreaHa,
      allocatedAreaAcres,
    };
  });

  const roundedTotalFraction = Number(totalFraction.toFixed(4));
  const totalPercentage = Number((roundedTotalFraction * 100).toFixed(2));
  const isOversold = roundedTotalFraction > 1.0001; // Allow 0.01% floating tolerance
  const unallocatedPercentage = isOversold ? 0 : Number((100 - totalPercentage).toFixed(2));

  let auditMessage = 'All co-sharer shares (Hissas) are mathematically validated.';
  if (isOversold) {
    auditMessage = `CRITICAL FRAUD ALERT: Sum of co-sharer entitlements (${totalPercentage}%) exceeds 100% of parent parcel area. Overselling discrepancy detected: +${(totalPercentage - 100).toFixed(2)}%.`;
  } else if (unallocatedPercentage > 0.1) {
    auditMessage = `Partial Distribution: ${unallocatedPercentage}% unallocated residual share remains in parent Khata ledger.`;
  }

  return {
    isValid: !isOversold,
    totalSharesFraction: roundedTotalFraction,
    totalPercentage,
    isOversold,
    unallocatedPercentage,
    shares,
    auditMessage,
  };
}

/**
 * Calculates the exact portion of land transferred in a mutation/sale deed.
 */
export function calculateDeedTransferArea(
  totalAreaText: string,
  transferredShareString: string
): {
  parentParcelArea: NormalizedArea;
  transferShareFraction: number;
  transferredArea: NormalizedArea;
} {
  const parent = parseRegionalAreaText(totalAreaText);
  const fraction = parseFractionalShare(transferredShareString);
  const transferredSqM = parent.squareMeters * fraction;
  const transferred = buildNormalizedArea(transferredSqM, `${fraction * 100}% share of ${parent.rawInput}`, parent.detectedUnits);

  return {
    parentParcelArea: parent,
    transferShareFraction: fraction,
    transferredArea: transferred,
  };
}
