// Global Payment Options & Rails Helper
// Provides comprehensive details for all payment methods offered by banks worldwide

export const PAYMENT_CATEGORIES = [
  { id: 'all', label: 'All Payment Methods', icon: 'Layers' },
  { id: 'instant', label: '⚡ Instant & Real-Time (24/7)', icon: 'Zap' },
  { id: 'rtgs', label: '🏛️ High-Value Wire & RTGS', icon: 'Landmark' },
  { id: 'ach', label: '🔄 Standard ACH & Batch Clearing', icon: 'RefreshCw' },
  { id: 'crossborder', label: '🌐 Cross-Border & SWIFT gpi', icon: 'Globe2' },
  { id: 'card', label: '💳 Cards & Digital Tokenization', icon: 'CreditCard' },
  { id: 'qr', label: '📱 QR Code & Mobile NetBanking', icon: 'QrCode' },
  { id: 'cheque', label: '📜 Cheque & Paper Clearing', icon: 'FileText' }
];

// Master list of searchable payment options for filtering
export const SEARCHABLE_PAYMENT_OPTIONS = [
  { id: 'fednow', name: 'FedNow (US Instant)', countries: ['United States'] },
  { id: 'rtp', name: 'TCH RTP (US Real-Time)', countries: ['United States'] },
  { id: 'zelle', name: 'Zelle (US P2P)', countries: ['United States'] },
  { id: 'fedwire', name: 'Fedwire (US RTGS)', countries: ['United States'] },
  { id: 'ach', name: 'Nacha ACH (US Batch)', countries: ['United States'] },
  { id: 'upi', name: 'UPI (India Instant)', countries: ['India'] },
  { id: 'imps', name: 'IMPS (India Instant)', countries: ['India'] },
  { id: 'neft', name: 'NEFT (India Batch 24/7)', countries: ['India'] },
  { id: 'rtgs', name: 'RTGS (High-Value Gross)', countries: [] },
  { id: 'rupay', name: 'RuPay (National Card)', countries: ['India'] },
  { id: 'sepa_inst', name: 'SEPA Instant (Europe)', countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Austria', 'Belgium', 'Ireland', 'Portugal', 'Finland', 'Greece', 'Luxembourg'] },
  { id: 'sepa_sct', name: 'SEPA Credit Transfer', countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Austria', 'Belgium', 'Ireland', 'Portugal', 'Finland'] },
  { id: 'target2', name: 'TARGET2 (Euro RTGS)', countries: ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Austria', 'Belgium'] },
  { id: 'fps', name: 'Faster Payments (UK FPS)', countries: ['United Kingdom'] },
  { id: 'chaps', name: 'CHAPS (UK RTGS)', countries: ['United Kingdom'] },
  { id: 'bacs', name: 'BACS (UK Direct Debit)', countries: ['United Kingdom'] },
  { id: 'interac', name: 'Interac e-Transfer (Canada)', countries: ['Canada'] },
  { id: 'lynx', name: 'Lynx (Canada RTGS)', countries: ['Canada'] },
  { id: 'npp', name: 'NPP / PayID (Australia)', countries: ['Australia'] },
  { id: 'pix', name: 'Pix (Brazil Instant)', countries: ['Brazil'] },
  { id: 'paynow', name: 'PayNow & FAST (Singapore)', countries: ['Singapore'] },
  { id: 'zengin', name: 'Zengin System (Japan)', countries: ['Japan'] },
  { id: 'cnaps', name: 'CNAPS & IBPS (China)', countries: ['China'] },
  { id: 'swift_gpi', name: 'SWIFT gpi Cross-Border', countries: [] },
  { id: 'visa_mc', name: 'Visa & Mastercard Direct', countries: [] },
  { id: 'qr_pay', name: 'National QR Scan-to-Pay', countries: [] },
  { id: 'cts_cheque', name: 'Cheque Truncation (CTS / Check 21)', countries: [] }
];

/**
 * Derives comprehensive payment options for any bank worldwide
 */
export function getBankPaymentOptions(bank) {
  if (!bank) return [];

  // If already attached, return it
  if (Array.isArray(bank.paymentOptions) && bank.paymentOptions.length > 0) {
    return bank.paymentOptions;
  }

  const country = (bank.country || '').trim().toLowerCase();
  const cCode = (bank.countryCode || '').trim().toUpperCase();
  const currency = bank.limits?.currency || (country === 'india' ? 'INR' : country === 'united states' ? 'USD' : country === 'united kingdom' ? 'GBP' : 'USD');
  const instantLimit = bank.limits?.domesticInstant || '$100,000';
  const dailyLimit = bank.limits?.domesticDaily || '$100,000';
  const outboundLimit = bank.limits?.internationalOutbound || '$250,000';
  const instantSpeed = bank.completionTimes?.instantRail || '< 15 seconds (Real-time)';
  const swiftSpeed = bank.completionTimes?.internationalSwift || '1 - 3 Business Days';
  const achSpeed = bank.completionTimes?.domesticACH || '1 - 2 Business Days';
  const wireSpeed = bank.completionTimes?.domesticWire || 'Same-Day (within 30 mins)';
  const cutoff = bank.completionTimes?.cutOffTime || '17:00 Local Time';

  // 1. INDIA
  if (country === 'india' || cCode === 'IN') {
    return [
      {
        id: 'upi',
        name: 'UPI (Unified Payments Interface)',
        shortCode: 'UPI 2.0',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 5 seconds (Real-Time)',
        perTransactionLimit: '₹1,00,000 (₹5,00,000 for hospitals / IPOs)',
        dailyLimit: '₹1,00,000 - ₹5,00,000 / day',
        typicalFee: 'Free (₹0.00)',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (24/7 Continuous)',
        railProtocol: 'NPCI UPI / VPA & Mobile Number',
        description: 'Instant mobile peer-to-peer and merchant payments verified via UPI PIN, supporting QR code scan, Autopay mandates, and RuPay credit integration.'
      },
      {
        id: 'imps',
        name: 'IMPS (Immediate Payment Service)',
        shortCode: 'IMPS',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 10 seconds (Immediate)',
        perTransactionLimit: '₹5,00,000 per transfer',
        dailyLimit: '₹5,00,000 - ₹10,00,000 / day',
        typicalFee: '₹2.50 - ₹15.00 + GST',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (24/7/365)',
        railProtocol: 'NPCI IMPS Switch / Account + IFSC',
        description: 'Immediate 24x7 interbank electronic fund transfer service across Mobile Banking, Internet Banking, and ATM channels.'
      },
      {
        id: 'neft',
        name: 'NEFT (National Electronic Funds Transfer)',
        shortCode: 'NEFT',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: 'Within 30 minutes (Half-hourly batches)',
        perTransactionLimit: 'No Minimum / No Maximum Ceiling',
        dailyLimit: '₹25,00,000 (Retail Digital) / Unlimited in-branch',
        typicalFee: 'Free Online (₹0.00) / Nominal in branch',
        availability: '24/7/365 Round-the-Clock',
        cutoffTime: 'None (48 half-hourly batches/day)',
        railProtocol: 'Reserve Bank of India (RBI) NEFT',
        description: 'Nationwide batch payment system operating continuous half-hourly settlements across all scheduled commercial and rural banks.'
      },
      {
        id: 'rtgs',
        name: 'RTGS (Real Time Gross Settlement)',
        shortCode: 'RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Immediate Gross Settlement (< 15 mins)',
        perTransactionLimit: 'Min ₹2,00,000 / No Upper Ceiling',
        dailyLimit: 'Unlimited (Account Balance & KYC)',
        typicalFee: 'Free Online / ₹20 - ₹50 at branch',
        availability: '24/7/365 Continuous',
        cutoffTime: 'None (24/7/365 Live RBI RTGS)',
        railProtocol: 'RBI RTGS Central Bank Rail (ISO 20022)',
        description: 'Continuous individual gross settlement of large-value interbank and customer transactions directly in central bank reserve accounts.'
      },
      {
        id: 'rupay',
        name: 'RuPay Debit, Credit & Contactless',
        shortCode: 'RuPay / NFC',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Point-of-Sale / ATM Cash',
        perTransactionLimit: '₹25,000 - ₹1,00,000 POS / ₹40,000 ATM',
        dailyLimit: '₹1,00,000 - ₹2,00,000 / day',
        typicalFee: 'Free POS / 5 Free ATM transactions monthly',
        availability: '24/7/365 Worldwide (Discover/JCB/Diners)',
        cutoffTime: 'None',
        railProtocol: 'NPCI RuPay Network / EMV Contactless',
        description: 'National card payment network offering RuPay Global debit, credit, Kisan Credit Cards (KCC), and prepaid cards.'
      },
      {
        id: 'qr_upi',
        name: 'Interoperable QR Code (BharatQR / UPI QR)',
        shortCode: 'UPI QR',
        category: 'QR Code & Mobile NetBanking',
        categoryType: 'qr',
        speed: '< 3 seconds (Real-Time Confirmation)',
        perTransactionLimit: '₹1,00,000',
        dailyLimit: '₹1,00,000',
        typicalFee: 'Free for consumers / 0% MDR',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'EMVCo & NPCI Dynamic / Static QR',
        description: 'Scan-and-pay interoperable QR code payment accepted at millions of merchants, retailers, utility billers, and e-commerce checkouts.'
      },
      {
        id: 'swift_out',
        name: 'SWIFT gpi Outbound Cross-Border Remittance',
        shortCode: 'SWIFT LRS',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days (SWIFT gpi Tracker)',
        perTransactionLimit: 'Up to $250,000 / financial year (RBI LRS)',
        dailyLimit: '$50,000 online portal / higher in branch',
        typicalFee: '₹500 - ₹1,500 + 0.5% - 1.2% FX Spread',
        availability: 'Banking Business Days',
        cutoffTime: '15:30 IST for same-day dispatch',
        railProtocol: 'SWIFT MT103 / ISO 20022 pacs.008 (gpi)',
        description: 'Outbound foreign currency wire transfers under the Reserve Bank of India Liberalised Remittance Scheme for education, medical, and trade.'
      },
      {
        id: 'cts_cheque',
        name: 'CTS-2010 Cheque Clearing & Demand Draft',
        shortCode: 'CTS Cheque',
        category: 'Cheque & Paper Clearing',
        categoryType: 'cheque',
        speed: '1 - 2 Business Days',
        perTransactionLimit: 'No Upper Ceiling',
        dailyLimit: 'Account Balance',
        typicalFee: 'Free for standard cheques / Nominal DD fee',
        availability: 'Clearing Sessions (Monday to Saturday)',
        cutoffTime: '14:00 IST for same-day presentation',
        railProtocol: 'NPCI Cheque Truncation System (CTS Grid)',
        description: 'Digital image and magnetic ink character recognition (MICR) cheque truncation processed across Northern, Western, and Southern grids.'
      }
    ];
  }

  // 2. UNITED STATES
  if (country === 'united states' || country === 'usa' || cCode === 'US') {
    return [
      {
        id: 'fednow',
        name: 'FedNow Service',
        shortCode: 'FedNow',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 10 seconds (Immediate Clearing)',
        perTransactionLimit: '$500,000 default (up to $1,000,000)',
        dailyLimit: '$500,000 - $1,000,000',
        typicalFee: 'Free ($0.00) or nominal $0.50',
        availability: '24/7/365 Non-Stop Around the Clock',
        cutoffTime: 'None (Continuous 24/7/365)',
        railProtocol: 'Federal Reserve Bank / ISO 20022',
        description: 'Instant payment service developed by the Federal Reserve enabling businesses and individuals to send and receive payments within seconds.'
      },
      {
        id: 'rtp',
        name: 'The Clearing House RTP (Real-Time Payments)',
        shortCode: 'TCH RTP',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 5 seconds (Immediate)',
        perTransactionLimit: '$1,000,000 per transaction',
        dailyLimit: '$1,000,000',
        typicalFee: 'Free ($0.00) or $0.25 - $1.00',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (Real-Time)',
        railProtocol: 'The Clearing House RTP (ISO 20022)',
        description: 'Core real-time gross settlement rail operated by The Clearing House with instant settlement, payment acknowledgment, and rich messaging.'
      },
      {
        id: 'zelle',
        name: 'Zelle Interbank Network',
        shortCode: 'Zelle P2P',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 1 minute (Instant P2P)',
        perTransactionLimit: '$1,000 - $3,500 per transfer',
        dailyLimit: '$2,500 - $5,000 / day',
        typicalFee: 'Free ($0.00)',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'Early Warning Services (EWS)',
        description: 'Fast person-to-person and small business payment network linked directly to bank deposit accounts using mobile number or email.'
      },
      {
        id: 'fedwire',
        name: 'Fedwire Funds Service (Domestic Wire)',
        shortCode: 'Fedwire',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Same-Day (Settled within 15 - 30 minutes)',
        perTransactionLimit: 'No Upper Ceiling ($100M+)',
        dailyLimit: 'Unlimited (Institutional Wire Room)',
        typicalFee: '$20.00 - $35.00 outbound / $0 - $15 inbound',
        availability: 'Business Days (09:00 - 18:30 EST)',
        cutoffTime: '18:00 EST for customer transfers',
        railProtocol: 'Federal Reserve Fedwire (ISO 20022 pacs)',
        description: 'High-value real-time gross settlement system operated by the 12 Federal Reserve Banks for critical commercial, corporate, and real estate transfers.'
      },
      {
        id: 'same_day_ach',
        name: 'Nacha Same-Day ACH',
        shortCode: 'Same-Day ACH',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: 'Same-Day (3 daily processing windows)',
        perTransactionLimit: '$1,000,000 per payment',
        dailyLimit: '$1,000,000',
        typicalFee: 'Free or $1.00 - $5.00',
        availability: 'Business Days (Morning, Noon & Afternoon windows)',
        cutoffTime: '16:45 EST (Third ACH Window)',
        railProtocol: 'Nacha Network / FedACH / EPN',
        description: 'Accelerated ACH clearing providing same-day payroll, vendor disbursements, bill payments, and consumer account funding.'
      },
      {
        id: 'standard_ach',
        name: 'Standard ACH (Direct Deposit & Direct Pay)',
        shortCode: 'Standard ACH',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '$25,000 - $100,000 (Consumer) / $500k+ (Business)',
        dailyLimit: '$100,000 - $250,000',
        typicalFee: 'Free ($0.00)',
        availability: 'Business Days Overnight Batch',
        cutoffTime: '20:00 EST for next-day processing',
        railProtocol: 'Nacha Automated Clearing House',
        description: 'Traditional nationwide batch clearing infrastructure used for recurring bill pay, government benefits, payroll, and inter-institution transfers.'
      },
      {
        id: 'visa_mastercard',
        name: 'Visa Direct, Mastercard Send & Tokenized Debit',
        shortCode: 'Visa / MC / NFC',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Push-to-Card (< 30 seconds)',
        perTransactionLimit: '$2,500 - $10,000 POS / $1,000 - $2,500 ATM',
        dailyLimit: '$5,000 - $15,000 / day',
        typicalFee: 'Free for retail purchases / $0 domestic ATM',
        availability: '24/7/365 Worldwide',
        cutoffTime: 'None',
        railProtocol: 'VisaNet / Banknet / Apple Pay / Google Wallet',
        description: 'Debit and credit card payments featuring zero liability protection, contactless tap-to-pay, and real-time push payouts to eligible cards.'
      },
      {
        id: 'swift_crossborder',
        name: 'SWIFT gpi Cross-Border International Wire',
        shortCode: 'SWIFT gpi',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days (gpi Tracker)',
        perTransactionLimit: '$250,000 online / Unlimited in branch',
        dailyLimit: 'Unlimited with authorized wire agreement',
        typicalFee: '$35.00 - $50.00 + 0.5% - 1.8% FX Spread',
        availability: 'Business Days (Foreign Exchange Clearing)',
        cutoffTime: '16:00 EST for same-day value date',
        railProtocol: 'SWIFT gpi MT103 / ISO 20022 pacs.008',
        description: 'Global cross-border wire transfers in 40+ currencies routed via correspondent banks with real-time SWIFT gpi tracking.'
      },
      {
        id: 'check_21',
        name: 'Check 21 Mobile Deposit & Cashier’s Checks',
        shortCode: 'Check 21',
        category: 'Cheque & Paper Clearing',
        categoryType: 'cheque',
        speed: 'Same-Day to 1 Business Day (Mobile Snap)',
        perTransactionLimit: '$5,000 - $50,000 mobile / Unlimited branch',
        dailyLimit: '$10,000 - $50,000 mobile deposit',
        typicalFee: 'Free for mobile check deposit / $10 for Cashier’s Check',
        availability: 'Business Days Clearing',
        cutoffTime: '19:00 EST for next-day funds release',
        railProtocol: 'Federal Reserve Check 21 Image Clearing',
        description: 'Digital check processing compliant with Check 21, allowing instant smartphone camera check capture and official cashier’s draft issuances.'
      }
    ];
  }

  // 3. UNITED KINGDOM
  if (country === 'united kingdom' || country === 'uk' || cCode === 'GB') {
    return [
      {
        id: 'fps',
        name: 'Faster Payments System (FPS)',
        shortCode: 'FPS Instant',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 15 seconds (Immediate)',
        perTransactionLimit: '£1,000,000 scheme limit (£25,000 - £250,000 digital)',
        dailyLimit: '£50,000 - £250,000 / day',
        typicalFee: 'Free (£0.00)',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (Continuous)',
        railProtocol: 'Pay.UK Faster Payments Scheme',
        description: 'Immediate electronic funds transfer between UK bank accounts available round the clock with Confirmation of Payee (CoP) fraud verification.'
      },
      {
        id: 'chaps',
        name: 'CHAPS (Clearing House Automated Payment System)',
        shortCode: 'CHAPS RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Same-Day Real-Time Gross Settlement',
        perTransactionLimit: 'No Upper Limit (£100M+)',
        dailyLimit: 'Unlimited',
        typicalFee: '£15.00 - £25.00 per transfer',
        availability: 'Business Days (06:00 - 18:00 UK Time)',
        cutoffTime: '16:00 UK Time for customer payments',
        railProtocol: 'Bank of England RTGS (ISO 20022 pacs)',
        description: 'High-value wholesale and retail payment system operated by the Bank of England for property purchases, corporate loans, and critical transfers.'
      },
      {
        id: 'bacs',
        name: 'BACS Direct Credit & Direct Debit',
        shortCode: 'BACS Direct',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: '3 Business Days Cycle',
        perTransactionLimit: '£20,000,000 per payment file',
        dailyLimit: 'Unlimited corporate limits',
        typicalFee: 'Free (£0.00) for consumer direct debits',
        availability: 'Business Days',
        cutoffTime: '22:30 UK Time (Day 1 submission)',
        railProtocol: 'Pay.UK BACS Clearing Infrastructure',
        description: 'Traditional bulk clearing system used for UK salary disbursements, direct debits, state pensions, and utility bill collections.'
      },
      {
        id: 'open_banking',
        name: 'Open Banking PISP & Confirmation of Payee',
        shortCode: 'Open Banking API',
        category: 'QR Code & Mobile NetBanking',
        categoryType: 'qr',
        speed: '< 10 seconds (App-to-App)',
        perTransactionLimit: '£10,000 - £50,000',
        dailyLimit: '£50,000',
        typicalFee: 'Free (£0.00)',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'UK Open Banking Standard (FAPI / PISP)',
        description: 'Instant account-to-account payments initiated directly through merchant checkout apps and QR codes without card details.'
      },
      {
        id: 'visa_mc_uk',
        name: 'Visa Debit, Mastercard & Apple Pay / Google Pay',
        shortCode: 'Visa / MC Debit',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Contactless / ATM',
        perTransactionLimit: '£100 contactless tap / £500 - £1,000 ATM',
        dailyLimit: '£5,000 - £10,000 POS',
        typicalFee: 'Free POS / Free UK cash withdrawals (LINK network)',
        availability: '24/7/365 Worldwide',
        cutoffTime: 'None',
        railProtocol: 'VisaNet / Mastercard / LINK ATM Network',
        description: 'Chip & PIN and tokenized mobile wallet payments with nationwide surcharge-free ATM access via the UK LINK network.'
      },
      {
        id: 'swift_gpi_uk',
        name: 'SWIFT gpi International Cross-Border Wire',
        shortCode: 'SWIFT Outbound',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '£100,000 digital / Unlimited branch',
        dailyLimit: 'Unlimited with authorized wire facility',
        typicalFee: '£10.00 - £25.00 + 0.4% - 1.5% FX Spread',
        availability: 'Business Days',
        cutoffTime: '15:30 UK Time',
        railProtocol: 'SWIFT MT103 / ISO 20022 (SWIFT gpi Tracker)',
        description: 'Cross-border currency payments in EUR, USD, and 30+ foreign currencies routed through correspondent banking networks.'
      },
      {
        id: 'ics_cheque',
        name: 'Image Clearing System (ICS Cheques)',
        shortCode: 'ICS Cheque',
        category: 'Cheque & Paper Clearing',
        categoryType: 'cheque',
        speed: 'Next Business Day (by 23:59)',
        perTransactionLimit: '£5,000 mobile snap / Unlimited branch',
        dailyLimit: '£10,000 mobile capture',
        typicalFee: 'Free (£0.00)',
        availability: 'Business Days Clearing',
        cutoffTime: '15:30 UK Time for next-day clearance',
        railProtocol: 'Pay.UK Image Clearing System',
        description: 'Digital image exchange clearing system replacing physical paper transport across England, Scotland, and Northern Ireland.'
      }
    ];
  }

  // 4. EUROZONE (Germany, France, Italy, Spain, Austria, Netherlands, etc.)
  const isEurozone = [
    'germany', 'france', 'italy', 'spain', 'netherlands', 'austria', 
    'belgium', 'ireland', 'portugal', 'finland', 'greece', 'luxembourg', 
    'slovakia', 'slovenia', 'estonia', 'latvia', 'lithuania', 'cyprus', 'malta', 'croatia'
  ].includes(country) || ['DE', 'FR', 'IT', 'ES', 'NL', 'AT', 'BE', 'IE', 'PT', 'FI', 'GR', 'LU'].includes(cCode);

  if (isEurozone) {
    return [
      {
        id: 'sepa_inst',
        name: 'SEPA Instant Credit Transfer (SCT Inst)',
        shortCode: 'SEPA Instant',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 10 seconds (Guaranteed 24/7/365)',
        perTransactionLimit: '€100,000 default (up to €1,000,000 by bilateral agreement)',
        dailyLimit: '€100,000 - €250,000',
        typicalFee: 'Free (€0.00) under EU Instant Payments Regulation',
        availability: '24/7/365 Continuous',
        cutoffTime: 'None (24/7 Live Settlement)',
        railProtocol: 'EPC SCT Inst / EBA CLEARING RT1 / TIPS',
        description: 'Pan-European real-time credit transfer executing across 36 SEPA member countries within 10 seconds under ECB TIPS and EBA RT1.'
      },
      {
        id: 'sepa_sct',
        name: 'SEPA Credit Transfer (SCT Core)',
        shortCode: 'SEPA SCT',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: '1 Business Day (Next-day settlement)',
        perTransactionLimit: '€999,999,999.99',
        dailyLimit: 'Unlimited',
        typicalFee: 'Free (€0.00)',
        availability: 'SEPA Business Days',
        cutoffTime: '16:00 CET',
        railProtocol: 'European Payments Council (EPC) Rulebook',
        description: 'Standard euro electronic funds transfer providing uniform clearing times and fees across all European Union member states.'
      },
      {
        id: 'sepa_sdd',
        name: 'SEPA Direct Debit (SDD Core & B2B)',
        shortCode: 'SEPA SDD',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: 'D-1 Business Day Pre-notification',
        perTransactionLimit: 'Per mandate limit',
        dailyLimit: 'Unlimited corporate mandates',
        typicalFee: 'Free for consumers (€0.00)',
        availability: 'Business Days',
        cutoffTime: '14:00 CET',
        railProtocol: 'EPC SDD Interbank Clearing',
        description: 'Automated recurring direct debits across the Eurozone with standard 8-week consumer refund rights for unauthorized debits.'
      },
      {
        id: 'target2',
        name: 'TARGET2 / TARGET Services (Gross RTGS)',
        shortCode: 'TARGET2 RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Immediate Gross Settlement (Within 15 mins)',
        perTransactionLimit: 'No Upper Limit (€100M+)',
        dailyLimit: 'Unlimited',
        typicalFee: '€5.00 - €15.00',
        availability: 'TARGET Business Days (07:00 - 18:00 CET)',
        cutoffTime: '17:00 CET for customer payments',
        railProtocol: 'Eurosystem Central Banks (ISO 20022 pacs)',
        description: 'Trans-European real-time gross settlement system owned and operated by the Eurosystem for large-scale euro transactions.'
      },
      {
        id: 'giro_carte',
        name: 'Girocard / Cartes Bancaires / Visa & Mastercard',
        shortCode: 'National Card & Debit',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Point-of-Sale / ATM',
        perTransactionLimit: '€50 contactless without PIN / €2,500 - €5,000 POS',
        dailyLimit: '€5,000 - €10,000 / day',
        typicalFee: 'Free POS / Domestic fee-free ATM network',
        availability: '24/7/365 Worldwide',
        cutoffTime: 'None',
        railProtocol: 'Domestic Switch (Girocard / CB) + EMV Co',
        description: 'Domestic debit card scheme combined with co-badged Visa/Mastercard functionality and NFC mobile contactless integration.'
      },
      {
        id: 'wero_bizum',
        name: 'Wero / Bizum / European Mobile QR & P2P',
        shortCode: 'Wero / QR',
        category: 'QR Code & Mobile NetBanking',
        categoryType: 'qr',
        speed: '< 5 seconds (Real-Time)',
        perTransactionLimit: '€1,000 - €2,500 per payment',
        dailyLimit: '€2,000 - €5,000 / day',
        typicalFee: 'Free (€0.00)',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'European Payments Initiative (EPI) / SCT Inst',
        description: 'Mobile peer-to-peer wallet and merchant QR scan payments powered by European digital payment alliances.'
      },
      {
        id: 'swift_gpi_euro',
        name: 'SWIFT gpi Cross-Border International Wire',
        shortCode: 'SWIFT Cross-Border',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '€250,000 digital / Unlimited branch',
        dailyLimit: 'Unlimited with authorized wire mandate',
        typicalFee: '€15.00 - €35.00 + 0.3% - 1.2% FX Spread',
        availability: 'Banking Business Days',
        cutoffTime: '16:00 CET',
        railProtocol: 'SWIFT gpi pacs.008 / ISO 20022',
        description: 'International wire transfer routed via correspondent banks with end-to-end SWIFT gpi tracker transparency.'
      }
    ];
  }

  // 5. CANADA
  if (country === 'canada' || cCode === 'CA') {
    return [
      {
        id: 'interac',
        name: 'Interac e-Transfer',
        shortCode: 'Interac Instant',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 30 seconds (Immediate Notification)',
        perTransactionLimit: '$3,000 - $10,000 per transfer',
        dailyLimit: '$3,000 - $10,000 (Consumer) / $25k (Business)',
        typicalFee: 'Free or $0.50 - $1.00',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (24/7)',
        railProtocol: 'Interac Association Switch',
        description: 'Universal Canadian interbank funds transfer using recipient email address or mobile phone number with Autodeposit support.'
      },
      {
        id: 'lynx',
        name: 'Lynx High-Value Settlement (Wire)',
        shortCode: 'Lynx RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Real-Time Gross Settlement (Immediate)',
        perTransactionLimit: 'No Upper Limit ($100M+)',
        dailyLimit: 'Unlimited',
        typicalFee: '$20.00 - $35.00 CAD',
        availability: 'Business Days (08:00 - 18:00 EST)',
        cutoffTime: '17:00 EST',
        railProtocol: 'Payments Canada Lynx (ISO 20022)',
        description: 'High-value wholesale payment system designated systemically important by the Bank of Canada for wire settlements.'
      },
      {
        id: 'eft_acss',
        name: 'EFT Direct Deposit & Pre-Authorized Debit (ACSS)',
        shortCode: 'EFT / ACSS',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '$50,000 - $250,000',
        dailyLimit: '$250,000',
        typicalFee: 'Free ($0.00)',
        availability: 'Business Days',
        cutoffTime: '18:00 EST',
        railProtocol: 'Automated Clearing Settlement System (ACSS)',
        description: 'Electronic funds transfer network clearing retail batch transactions including government benefits, corporate payroll, and bills.'
      },
      {
        id: 'interac_debit',
        name: 'Interac Debit, Visa & Mastercard / Apple Pay',
        shortCode: 'Interac Debit',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Point-of-Sale / ATM',
        perTransactionLimit: '$250 contactless tap / $1,000 - $2,500 ATM',
        dailyLimit: '$3,000 - $10,000',
        typicalFee: 'Free domestic purchases',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'Interac Debit Network / Visa / Mastercard',
        description: 'Pin-authenticated chip debit and contactless mobile wallet transactions across point-of-sale and ABM networks.'
      },
      {
        id: 'swift_gpi_ca',
        name: 'SWIFT gpi Cross-Border International Wire',
        shortCode: 'SWIFT Outbound',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '$100,000 digital / Unlimited branch',
        dailyLimit: 'Unlimited with wire mandate',
        typicalFee: '$30.00 - $45.00 CAD + 0.6% - 1.8% FX Spread',
        availability: 'Business Days',
        cutoffTime: '16:00 EST',
        railProtocol: 'SWIFT MT103 / ISO 20022 pacs.008',
        description: 'Outbound global payments in USD, EUR, GBP, and 30+ currencies with real-time SWIFT gpi tracking.'
      }
    ];
  }

  // 6. AUSTRALIA
  if (country === 'australia' || cCode === 'AU') {
    return [
      {
        id: 'npp_payid',
        name: 'NPP (New Payments Platform) / PayID / Osko',
        shortCode: 'PayID / Osko',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 15 seconds (Immediate)',
        perTransactionLimit: '$10,000 - $50,000 per transfer',
        dailyLimit: '$20,000 - $100,000',
        typicalFee: 'Free ($0.00 AUD)',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (Continuous Clearing)',
        railProtocol: 'NPP Australia / Osko (ISO 20022)',
        description: 'National fast payments rail enabling real-time fund transfers using mobile numbers, email addresses, or Australian Business Numbers (ABN).'
      },
      {
        id: 'rits_rtgs',
        name: 'RITS / Austraclear High-Value Wire (RTGS)',
        shortCode: 'RITS RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Immediate Gross Settlement (< 15 mins)',
        perTransactionLimit: 'No Upper Limit',
        dailyLimit: 'Unlimited',
        typicalFee: '$15.00 - $30.00 AUD',
        availability: 'RBA Business Days (07:30 - 18:30 AEST)',
        cutoffTime: '16:30 AEST',
        railProtocol: 'Reserve Bank Information and Transfer System (RITS)',
        description: 'Australia’s real-time gross settlement system operated by the Reserve Bank of Australia for large-value institutional transactions.'
      },
      {
        id: 'becs_direct',
        name: 'BECS Direct Entry (Direct Credit & Direct Debit)',
        shortCode: 'BECS Direct',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '$100,000 per entry',
        dailyLimit: '$250,000',
        typicalFee: 'Free ($0.00)',
        availability: 'Business Days Batch Cycles',
        cutoffTime: '18:00 AEST',
        railProtocol: 'Bulk Electronic Clearing System (BECS / BSB)',
        description: 'Electronic batch system routing payments via Bank State Branch (BSB) numbers for salaries, dividends, and recurring bill deductions.'
      },
      {
        id: 'eftpos_au',
        name: 'EFTPOS, Visa & Mastercard / Apple Pay',
        shortCode: 'EFTPOS / Card',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Point-of-Sale / ATM',
        perTransactionLimit: '$100 tap without PIN / $1,000 - $2,500 ATM',
        dailyLimit: '$5,000 - $10,000',
        typicalFee: 'Free POS / Free Big-4 ATM withdrawals',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'EFTPOS Payments Australia / EMV Chip',
        description: 'Domestic debit card network with dual-network debit cards supporting least-cost routing and tokenized phone wallets.'
      },
      {
        id: 'swift_gpi_au',
        name: 'SWIFT gpi Cross-Border International Wire',
        shortCode: 'SWIFT Outbound',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '$50,000 digital / Unlimited branch',
        dailyLimit: 'Unlimited with authorized corporate mandate',
        typicalFee: '$15.00 - $30.00 AUD + 0.5% - 1.5% FX Spread',
        availability: 'Business Days',
        cutoffTime: '15:00 AEST',
        railProtocol: 'SWIFT MT103 / ISO 20022 pacs.008',
        description: 'International outward telegraphic transfers routed via correspondent banks with SWIFT gpi tracking.'
      }
    ];
  }

  // 7. BRAZIL
  if (country === 'brazil' || cCode === 'BR') {
    return [
      {
        id: 'pix',
        name: 'Pix (Banco Central do Brasil)',
        shortCode: 'Pix Instant',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 10 seconds (Immediate Settlement)',
        perTransactionLimit: 'R$ 20,000 daytime / R$ 1,000 nocturnal safety limit',
        dailyLimit: 'R$ 50,000 (Adjustable in app)',
        typicalFee: 'Free (R$ 0.00) for individuals',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (20:00 - 06:00 nocturnal limit applies)',
        railProtocol: 'Banco Central do Brasil / SPI (ISO 20022)',
        description: 'Revolutionary instant payment ecosystem supporting CPF/CNPJ, email, phone, random keys, and dynamic/static QR codes.'
      },
      {
        id: 'ted',
        name: 'TED (Transferência Eletrônica Disponível)',
        shortCode: 'TED RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Same-Day Gross Settlement (< 30 mins)',
        perTransactionLimit: 'No Upper Limit',
        dailyLimit: 'Unlimited',
        typicalFee: 'R$ 0.00 (Digital) or R$ 10 - R$ 20 in branch',
        availability: 'Business Days (06:30 - 17:00 Brasília Time)',
        cutoffTime: '17:00 Brasília Time',
        railProtocol: 'Sistema de Pagamentos Brasileiro (SPB)',
        description: 'Gross electronic funds transfer system clearing high-value transfers between Brazilian financial institutions.'
      },
      {
        id: 'boleto',
        name: 'Boleto Bancário (NPC Registrado)',
        shortCode: 'Boleto',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: 'Same-Day (D+0) or Next Business Day (D+1)',
        perTransactionLimit: 'Per invoice limit',
        dailyLimit: 'R$ 50,000',
        typicalFee: 'Free for payer',
        availability: 'Business Days',
        cutoffTime: '16:00 Brasília Time',
        railProtocol: 'CIP / Nova Plataforma de Cobrança (NPC)',
        description: 'Official regulated barcode and Pix QR payment voucher widely used for commerce, rent, utility, and municipal tax collection.'
      },
      {
        id: 'elo_visa_br',
        name: 'Elo, Visa, Mastercard & Contactless',
        shortCode: 'Elo / Visa / MC',
        category: 'Cards & Digital Tokenization',
        categoryType: 'card',
        speed: 'Instant Point-of-Sale / ATM',
        perTransactionLimit: 'R$ 200 contactless / R$ 5,000 POS',
        dailyLimit: 'R$ 10,000 / day',
        typicalFee: 'Free POS purchases',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'Elo Switch / Rede / Cielo / EMV Chip',
        description: 'Domestic Elo card scheme alongside Visa and Mastercard supporting debit, installment credit, and tokenized mobile wallets.'
      },
      {
        id: 'swift_br',
        name: 'SWIFT gpi Câmbio Cross-Border Remittance',
        shortCode: 'SWIFT Câmbio',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days',
        perTransactionLimit: '$50,000 digital / Unlimited with contract',
        dailyLimit: 'Unlimited subject to IOF tax & contract registration',
        typicalFee: '$20.00 - $40.00 + 0.38% - 1.1% IOF + FX Spread',
        availability: 'Business Days (Câmbio desk)',
        cutoffTime: '16:00 Brasília Time',
        railProtocol: 'SWIFT MT103 / SISBACEN Câmbio',
        description: 'Foreign exchange wire transfer registered with the Central Bank of Brazil for international commerce and capital transfers.'
      }
    ];
  }

  // 8. SINGAPORE
  if (country === 'singapore' || cCode === 'SG') {
    return [
      {
        id: 'paynow_fast',
        name: 'PayNow & FAST (Fast And Secure Transfers)',
        shortCode: 'PayNow / FAST',
        category: 'Instant & Real-Time',
        categoryType: 'instant',
        speed: '< 15 seconds (Immediate)',
        perTransactionLimit: 'SGD 200,000 per transfer',
        dailyLimit: 'SGD 200,000',
        typicalFee: 'Free (SGD 0.00)',
        availability: '24/7/365 Non-Stop',
        cutoffTime: 'None (24/7/365)',
        railProtocol: 'Banking Computer Services (BCS) / FAST',
        description: 'Instant funds transfer linked to NRIC/FIN, mobile phone number, or corporate Unique Entity Number (UEN) with SGQR scan-and-pay.'
      },
      {
        id: 'meps_plus',
        name: 'MEPS+ (MAS Electronic Payment System)',
        shortCode: 'MEPS+ RTGS',
        category: 'High-Value Wire & RTGS',
        categoryType: 'rtgs',
        speed: 'Immediate Gross Settlement',
        perTransactionLimit: 'No Upper Limit (SGD 100M+)',
        dailyLimit: 'Unlimited',
        typicalFee: 'SGD 15.00 - 30.00',
        availability: 'Business Days (09:00 - 18:30 SGT)',
        cutoffTime: '17:00 SGT',
        railProtocol: 'Monetary Authority of Singapore MEPS+ (ISO 20022)',
        description: 'Real-time gross settlement system owned and operated by MAS for systemic interbank fund transfers and high-value payments.'
      },
      {
        id: 'giro_sg',
        name: 'GIRO (General Interbank Recurring Order)',
        shortCode: 'Interbank GIRO',
        category: 'Standard ACH & Batch Clearing',
        categoryType: 'ach',
        speed: '1 - 2 Business Days',
        perTransactionLimit: 'SGD 50,000 - 250,000',
        dailyLimit: 'SGD 250,000',
        typicalFee: 'Free (SGD 0.00)',
        availability: 'Business Days',
        cutoffTime: '18:00 SGT',
        railProtocol: 'Singapore Automated Clearing House (SACH)',
        description: 'Paperless automated billing and direct credit mechanism for utilities, taxes, insurance premiums, and salaries.'
      },
      {
        id: 'sgqr',
        name: 'SGQR (Singapore Quick Response Code)',
        shortCode: 'SGQR Code',
        category: 'QR Code & Mobile NetBanking',
        categoryType: 'qr',
        speed: '< 3 seconds',
        perTransactionLimit: 'SGD 1,000 - 5,000',
        dailyLimit: 'SGD 10,000',
        typicalFee: 'Free for consumers',
        availability: '24/7/365',
        cutoffTime: 'None',
        railProtocol: 'MAS Interoperable SGQR Standard',
        description: 'Single unified national QR label combining PayNow, GrabPay, NETS, and credit cards for frictionless retail payments.'
      },
      {
        id: 'swift_sg',
        name: 'SWIFT gpi Cross-Border Outbound Remittance',
        shortCode: 'SWIFT Remit',
        category: 'Cross-Border & SWIFT gpi',
        categoryType: 'crossborder',
        speed: '1 - 2 Business Days',
        perTransactionLimit: 'SGD 250,000 digital / Unlimited branch',
        dailyLimit: 'Unlimited with commercial wire facility',
        typicalFee: 'SGD 20.00 - 35.00 + 0.3% - 1.0% FX Spread',
        availability: 'Business Days',
        cutoffTime: '16:00 SGT',
        railProtocol: 'SWIFT MT103 / ISO 20022 pacs.008',
        description: 'International telegraphic transfers connecting Singapore to major financial hubs with real-time SWIFT gpi tracker transparency.'
      }
    ];
  }

  // 9. GENERAL / UNIVERSAL FALLBACK FOR ALL OTHER 170+ COUNTRIES
  return [
    {
      id: 'national_instant',
      name: `National Fast & Instant Payment Rail (${country || 'Domestic'})`,
      shortCode: 'Instant Rail',
      category: 'Instant & Real-Time',
      categoryType: 'instant',
      speed: instantSpeed,
      perTransactionLimit: instantLimit,
      dailyLimit: instantLimit,
      typicalFee: `${currency} 0.00 - 1.00 (Minimal)`,
      availability: '24/7/365 Round-the-Clock',
      cutoffTime: 'None (24/7 Continuous)',
      railProtocol: 'ISO 20022 Real-Time Fast Payment Rail',
      description: `Instant interbank fund transfers settled immediately with 24/7/365 availability across ${bank.name}'s digital banking channels.`
    },
    {
      id: 'national_rtgs',
      name: `National RTGS / High-Value Wire (${country || 'Central Bank'})`,
      shortCode: 'RTGS / Wire',
      category: 'High-Value Wire & RTGS',
      categoryType: 'rtgs',
      speed: wireSpeed,
      perTransactionLimit: `No Minimum / High Ceiling (${dailyLimit})`,
      dailyLimit: 'Unlimited in branch / Subject to account tier',
      typicalFee: `${currency} 5.00 - 25.00`,
      availability: `Business Days (Cut-off: ${cutoff})`,
      cutoffTime: cutoff,
      railProtocol: `${bank.clearingCodeType || 'Central Bank RTGS'} (ISO 20022)`,
      description: `Large-value gross settlement processed immediately in central bank reserves for time-sensitive commercial and high-net-worth payments.`
    },
    {
      id: 'national_ach',
      name: `Automated Clearing House (ACH Batch / Direct Debit)`,
      shortCode: 'Standard ACH',
      category: 'Standard ACH & Batch Clearing',
      categoryType: 'ach',
      speed: achSpeed,
      perTransactionLimit: dailyLimit,
      dailyLimit: dailyLimit,
      typicalFee: 'Free or nominal fee',
      availability: 'Business Days Clearing Sessions',
      cutoffTime: cutoff,
      railProtocol: 'National Automated Clearing House (ACH)',
      description: `Batch payment system clearing recurring payroll, supplier disbursements, corporate payments, and utility direct debits.`
    },
    {
      id: 'cards_tokenized',
      name: `Visa, Mastercard & Tokenized Debit / Credit`,
      shortCode: 'Visa / MC Cards',
      category: 'Cards & Digital Tokenization',
      categoryType: 'card',
      speed: 'Instant Authorization (< 2 seconds)',
      perTransactionLimit: 'POS Purchase Limits / ATM daily limits',
      dailyLimit: `${currency} 5,000 - 15,000 / day`,
      typicalFee: 'Free POS / Standard network ATM fee',
      availability: '24/7/365 Global Network',
      cutoffTime: 'None',
      railProtocol: 'EMV Chip & PIN / VisaNet / Banknet',
      description: `Contactless and chip-authenticated payment cards with international point-of-sale acceptance, ATM cash access, and mobile tokenization.`
    },
    {
      id: 'mobile_qr_bank',
      name: 'Mobile NetBanking & National QR Code Payment',
      shortCode: 'Mobile QR / API',
      category: 'QR Code & Mobile NetBanking',
      categoryType: 'qr',
      speed: '< 5 seconds (Real-Time)',
      perTransactionLimit: `${currency} 1,000 - 5,000`,
      dailyLimit: `${currency} 5,000 - 10,000`,
      typicalFee: 'Free for retail users',
      availability: '24/7/365',
      cutoffTime: 'None',
      railProtocol: 'Interoperable QR Code & Open Banking API',
      description: `Frictionless scan-and-pay merchant checkouts, bill payments, and biometric in-app authorizations via ${bank.name}'s mobile portal.`
    },
    {
      id: 'swift_gpi_universal',
      name: 'SWIFT gpi Cross-Border International Wire',
      shortCode: 'SWIFT gpi',
      category: 'Cross-Border & SWIFT gpi',
      categoryType: 'crossborder',
      speed: swiftSpeed,
      perTransactionLimit: outboundLimit,
      dailyLimit: outboundLimit,
      typicalFee: `${currency} 15.00 - 45.00 + FX Spread (0.5% - 2.0%)`,
      availability: 'Banking Business Days',
      cutoffTime: cutoff,
      railProtocol: `SWIFT BIC ${bank.swiftBic || 'SWIFT gpi'} (pacs.008)`,
      description: `Outbound foreign exchange remittance and corporate wire transfer routed through correspondent banking chains with real-time tracking.`
    },
    {
      id: 'cheque_paper',
      name: 'Cheque Truncation & Banker’s Draft Clearing',
      shortCode: 'Cheque / Draft',
      category: 'Cheque & Paper Clearing',
      categoryType: 'cheque',
      speed: '1 - 2 Business Days',
      perTransactionLimit: 'No Upper Ceiling',
      dailyLimit: 'Account Balance',
      typicalFee: 'Free for standard cheques / Nominal draft fee',
      availability: 'Banking Business Days',
      cutoffTime: cutoff,
      railProtocol: 'National Cheque Truncation System (CTS)',
      description: `Physical and digitalized paper clearing for cheques, banker’s orders, demand drafts, and institutional certified payments.`
    }
  ];
}
