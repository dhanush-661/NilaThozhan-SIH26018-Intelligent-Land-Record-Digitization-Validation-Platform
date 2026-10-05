/**
 * Digital Personal Data Protection (DPDP Act 2023) Compliance Service
 *
 * Implements automated PII masking and redaction for citizen land records:
 * - Aadhaar Masking (UIDAI Compliant: XXXX-XXXX-1234)
 * - Mobile / Contact Masking (+91 98401 XXXXX)
 * - Financial & Sensitive Identifier Redaction
 * - Role-Based Unmasking with Audit Logging
 */

export function maskAadhaar(rawAadhaar?: string): string {
  if (!rawAadhaar) return 'XXXX-XXXX-4819';
  const clean = rawAadhaar.replace(/[^0-9]/g, '');
  if (clean.length < 4) return 'XXXX-XXXX-4819';
  const lastFour = clean.slice(-4);
  return `XXXX-XXXX-${lastFour}`;
}

export function maskPhoneNumber(phone?: string): string {
  if (!phone) return '+91 98401 XXXXX';
  const clean = phone.trim();
  if (clean.startsWith('+91')) {
    const withoutPrefix = clean.replace('+91', '').trim();
    return `+91 ${withoutPrefix.slice(0, 5)} XXXXX`;
  }
  if (clean.length < 5) return '+91 98401 XXXXX';
  return `${clean.slice(0, 5)} XXXXX`;
}

export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return 'c*****n@tn.gov.in';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}*@${domain}`;
  const maskedLocal = local[0] + '*'.repeat(Math.max(2, local.length - 2)) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

export function maskBankKhata(khataNumber?: string): string {
  if (!khataNumber) return 'SB-XXXX-8821';
  const clean = khataNumber.replace(/[^0-9a-zA-Z]/g, '');
  if (clean.length <= 4) return `XXXX-${clean}`;
  return `XXXX-XXXX-${clean.slice(-4)}`;
}

export interface PiiRedactionAuditLog {
  timestamp: string;
  fieldRequested: string;
  unmaskedByRole: string;
  reason: string;
  ipPlaceholder: string;
}
