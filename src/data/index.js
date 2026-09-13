import { WORLDWIDE_BANKS } from './banksData';
import { ADDITIONAL_BANKS } from './additionalBanks';
import { GOVERNMENT_BANKS } from './governmentBanks';
import { RURAL_VILLAGE_BANKS } from './ruralVillageBanks';
import { LOCAL_COOP_BANKS } from './localCoopBanks';
import { DIGITAL_BANKS } from './digitalBanks';
import allBanks25k from './allGlobalBanks25k.json';

// Assign standard bankType to base banks if missing
const normalizeBank = (bank, defaultType = 'Commercial Bank') => ({
  ...bank,
  bankType: bank.bankType || defaultType,
});

// Expand compact entries with full settlement metadata
const expandBank = (b) => {
  if (b.completionTimes) return b;
  const curr = b.limits?.domesticDaily?.split(' ')[0] || 'USD';
  return {
    ...b,
    supportedCurrencies: [curr, 'USD', 'EUR'],
    paymentRails: ['National Clearing / RTGS', 'SWIFT gpi', 'ISO 20022'],
    completionTimes: {
      instantRail: '<15 Seconds (24/7/365)',
      standardAch: 'Same-day to 1 Business Day',
      internationalSwift: '1-3 Business Days (SWIFT gpi)',
      cutoffTime: '17:00 Local Time'
    },
    fees: {
      domesticInstant: `${curr} 0.00 - 1.00`,
      domesticWire: `${curr} 5.00 - 15.00`,
      internationalWire: `${curr} 15.00 - 35.00`,
      currencyExchangeSpread: '0.25% - 1.50%'
    },
    regulatoryBody: `Central Bank of ${b.country} / National Financial Authority`,
    source: b.source || 'Global Financial Directory Registry'
  };
};

// Curated seed dataset with rich verified metrics
const CURATED_BANKS = [
  ...WORLDWIDE_BANKS.map((b) => normalizeBank(b, b.tier?.includes('G-SIB') ? 'Major Commercial & G-SIB' : 'Commercial Bank')),
  ...ADDITIONAL_BANKS.map((b) => normalizeBank(b, 'Commercial Bank')),
  ...GOVERNMENT_BANKS.map((b) => normalizeBank(b, 'Government / Public Sector')),
  ...RURAL_VILLAGE_BANKS.map((b) => normalizeBank(b, 'Rural & Village Bank (RRB)')),
  ...LOCAL_COOP_BANKS.map((b) => normalizeBank(b, 'Local Community & Cooperative')),
  ...DIGITAL_BANKS.map((b) => normalizeBank(b, 'Digital / Neobank')),
];

// Master deduplication maps
const seenIds = new Set();
const seenNameCountry = new Set();

export const DEFAULT_BANKS = [];

// Helper to add bank if unique
const addBankIfUnique = (bank) => {
  if (!bank || !bank.id) return;
  const idKey = bank.id.toLowerCase().trim();
  const nameKey = `${(bank.country || '').toLowerCase().trim()}:::${(bank.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')}`;

  if (seenIds.has(idKey) || seenNameCountry.has(nameKey)) {
    return;
  }

  seenIds.add(idKey);
  seenNameCountry.add(nameKey);
  DEFAULT_BANKS.push(expandBank(bank));
};

// 1. First add curated high-detail banks (precedence)
CURATED_BANKS.forEach(addBankIfUnique);

// 2. Then add complete 25,000+ Worldwide Bank Directory
(allBanks25k || []).forEach(addBankIfUnique);

// Versioned LocalStorage key
const STORAGE_KEY = 'global_bank_directory_custom_banks_v3';

// Load stored custom banks or initialize
export const getInitialBanks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const customBanks = JSON.parse(saved);
      if (Array.isArray(customBanks)) {
        return [...DEFAULT_BANKS, ...customBanks];
      }
    }
  } catch (e) {
    console.error('Error reading saved banks from localStorage', e);
  }
  return DEFAULT_BANKS;
};

// Save a newly added bank
export const saveCustomBank = (newBank) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [newBank, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving bank to localStorage', e);
    return [];
  }
};

// Reset custom banks to defaults
export const resetToDefaultBanks = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting banks', e);
  }
  return DEFAULT_BANKS;
};

// Compute unique countries from bank list
export const getUniqueCountries = (banks) => {
  return Array.from(new Set(banks.map((b) => b.country))).sort();
};

// Unique regions
export const REGIONS = [
  'All',
  'Africa',
  'Asia-Pacific',
  'Europe',
  'Middle East',
  'North America',
  'Latin America'
];

// Bank Classifications / Categories
export const BANK_TYPES = [
  'All Types',
  'Government / Public Sector',
  'Commercial Bank',
  'Major Commercial & G-SIB',
  'Rural & Village Bank (RRB)',
  'Local Community & Cooperative',
  'Postal Savings Bank',
  'Digital / Neobank',
];

// Core payment rail standards
const GLOBAL_PAYMENT_RAILS = [
  'FedNow (US Real-Time)',
  'TCH RTP (The Clearing House)',
  'UPI (Unified Payments Interface)',
  'IMPS (Immediate Payment Service)',
  'NEFT (National Electronic Funds Transfer)',
  'RTGS (Real Time Gross Settlement)',
  'SEPA Instant Credit Transfer',
  'SEPA Credit Transfer (SCT)',
  'Faster Payments (UK FPS)',
  'CHAPS (UK RTGS)',
  'BACS (UK Direct Debit)',
  'Interac e-Transfer (Canada)',
  'Lynx (Canada RTGS)',
  'NPP / PayID (Australia)',
  'Pix (Brazil Instant)',
  'PayNow & FAST (Singapore)',
  'Zelle Interbank Network',
  'RuPay / National Card',
  'Visa & Mastercard Direct',
  'Nacha ACH (Same-Day / Batch)',
  'Fedwire Funds Service',
  'SWIFT gpi Cross-Border'
];

// Compute unique payment rails
export const getUniquePaymentRails = (banks) => {
  const rails = new Set(GLOBAL_PAYMENT_RAILS);
  banks.forEach((b) => {
    if (b.supportedRails) {
      b.supportedRails.forEach((r) => rails.add(r));
    }
  });
  return Array.from(rails).sort();
};

// Compute unique currencies
export const getUniqueCurrencies = (banks) => {
  const currencies = new Set();
  banks.forEach((b) => {
    if (b.currencies) {
      b.currencies.forEach((c) => currencies.add(c));
    }
  });
  return Array.from(currencies).sort();
};
