// Government & State-Owned Banks Worldwide
// Includes public sector, national development, and postal savings banks
export const GOVERNMENT_BANKS = [
  // ==================== INDIA (PUBLIC SECTOR / GOVERNMENT) ====================
  {
    id: "in-bank-of-baroda",
    name: "Bank of Baroda",
    legalName: "Bank of Baroda (Govt. of India Undertaking)",
    bankType: "Government / Public Sector",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "Vadodara / Mumbai",
    flag: "🇮🇳",
    tier: "Major Public Sector Undertaking (PSU)",
    swiftBic: "BARBINBB",
    clearingCodeType: "IFSC Code",
    clearingCode: "BARB0MUMBAI",
    website: "https://www.bankofbaroda.in",
    currencies: ["INR", "USD", "EUR", "GBP", "AED", "SGD"],
    limits: {
      domesticDaily: "₹10,00,000 (bob World App) / ₹50,00,000 (NetBanking)",
      domesticDailyAmount: 1000000,
      domesticInstant: "₹5,00,000 (IMPS) / ₹1,00,000 (UPI)",
      domesticInstantAmount: 500000,
      domesticMonthly: "₹50,00,000",
      internationalOutbound: "$250,000 (RBI LRS quota)",
      internationalOutboundAmount: 250000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "Unlimited (RTGS)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (1-2 seconds via UPI / IMPS 24x7)",
      domesticACH: "Within 30 mins (NEFT 24x7)",
      domesticWire: "Real-time (RTGS)",
      internationalSwift: "1 - 3 Business Days (Baroda Express Remit)",
      cutOffTime: "24x7 Digital; 16:30 IST Forex"
    },
    supportedRails: ["UPI", "IMPS", "NEFT", "RTGS", "SWIFT gpi", "NACH"],
    domesticPartnerBanks: ["State Bank of India", "Punjab National Bank", "Canara Bank"],
    internationalNetwork: "Extensive government network across UAE, UK, Kenya, Uganda, Fiji, Mauritius",
    typicalFees: {
      domesticACH: "Free online",
      domesticWire: "Free online",
      internationalOutbound: "₹500 flat + GST",
      internationalInbound: "Free"
    },
    features: ["Govt. Welfare / DBT Direct Credit", "bob World Digital", "International PSU Network"]
  },
  {
    id: "in-canara-bank",
    name: "Canara Bank",
    legalName: "Canara Bank (Govt. of India Undertaking)",
    bankType: "Government / Public Sector",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "Bengaluru",
    flag: "🇮🇳",
    tier: "Major Public Sector Undertaking (PSU)",
    swiftBic: "CNRBINBB",
    clearingCodeType: "IFSC Code",
    clearingCode: "CNRB0000001",
    website: "https://www.canarabank.com",
    currencies: ["INR", "USD", "EUR", "GBP"],
    limits: {
      domesticDaily: "₹10,00,000 (Canara ai1 App)",
      domesticDailyAmount: 1000000,
      domesticInstant: "₹5,00,000 (IMPS) / ₹1,00,000 (UPI)",
      domesticInstantAmount: 500000,
      domesticMonthly: "₹30,00,000",
      internationalOutbound: "$250,000 (LRS compliant)",
      internationalOutboundAmount: 250000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "Unlimited (RTGS)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (UPI & IMPS)",
      domesticACH: "30 minutes (NEFT)",
      domesticWire: "Real-time (RTGS)",
      internationalSwift: "1 - 3 Business Days",
      cutOffTime: "24x7 Digital"
    },
    supportedRails: ["UPI", "IMPS", "NEFT", "RTGS", "SWIFT"],
    domesticPartnerBanks: ["SBI", "Bank of Baroda", "Union Bank"],
    internationalNetwork: "Overseas branches in London, New York, Dubai",
    typicalFees: {
      domesticACH: "Free online",
      domesticWire: "Free online",
      internationalOutbound: "₹500 + GST",
      internationalInbound: "Free"
    },
    features: ["Canara ai1 Super App", "Sponsor Bank for Gramin Banks", "Agricultural Priority Credit"]
  },
  {
    id: "in-india-post-payments-bank",
    name: "India Post Payments Bank (IPPB)",
    legalName: "India Post Payments Bank (Dept of Posts, Govt. of India)",
    bankType: "Postal Savings Bank",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "New Delhi",
    flag: "🇮🇳",
    tier: "Government Postal Bank (136,000+ Village Access Points)",
    swiftBic: "IPPBINBB",
    clearingCodeType: "IFSC Code",
    clearingCode: "IPOS0000001",
    website: "https://www.ippbonline.com",
    currencies: ["INR"],
    limits: {
      domesticDaily: "₹2,00,000 (Statutory Payments Bank Account Cap)",
      domesticDailyAmount: 200000,
      domesticInstant: "₹50,000 (IMPS) / ₹1,00,000 (UPI)",
      domesticInstantAmount: 50000,
      domesticMonthly: "₹5,00,000",
      internationalOutbound: "Not supported (Domestic Payments Bank charter)",
      internationalOutboundAmount: 0,
      internationalInbound: "Incoming inward remittance via Western Union tie-up only",
      singleTransactionMax: "₹2,00,000 (Auto-sweep to Post Office Savings Bank for surplus)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (1-2 seconds via UPI / AePS Aadhaar Pay)",
      domesticACH: "30 minutes (NEFT)",
      domesticWire: "Real-time (IMPS/RTGS)",
      internationalSwift: "N/A (Domestic Only)",
      cutOffTime: "24x7 Digital; Doorstep Village Postal Hours"
    },
    supportedRails: ["UPI", "IMPS", "AePS (Aadhaar Enabled Payment)", "NEFT", "Daksha"],
    domesticPartnerBanks: ["State Bank of India", "Punjab National Bank"],
    internationalNetwork: "Connects 155,000 post offices in remote villages to national banking grid",
    typicalFees: {
      domesticACH: "Free",
      domesticWire: "₹5.00 via Doorstep Postman",
      internationalOutbound: "N/A",
      internationalInbound: "Free"
    },
    features: ["Doorstep Banking via Gramin Dak Sevaks", "AePS Biometric Village Cash-Out", "Direct Benefit Transfer (DBT)"]
  },

  // ==================== CHINA (GOVERNMENT POSTAL & POLICY) ====================
  {
    id: "cn-postal-savings-bank-of-china",
    name: "Postal Savings Bank of China (PSBC)",
    legalName: "Postal Savings Bank of China Co., Ltd.",
    bankType: "Postal Savings Bank",
    country: "China",
    countryCode: "CN",
    region: "Asia-Pacific",
    city: "Beijing",
    flag: "🇨🇳",
    tier: "State-Owned Major Bank (40,000+ Village Outlets)",
    swiftBic: "PSBCCNBB",
    clearingCodeType: "CNAPS Code",
    clearingCode: "403100000004",
    website: "https://www.psbc.com",
    currencies: ["CNY", "USD", "EUR", "HKD"],
    limits: {
      domesticDaily: "¥500,000 (Online / Mobile Banking)",
      domesticDailyAmount: 500000,
      domesticInstant: "¥50,000 (IBPS Super Bank Real-time)",
      domesticInstantAmount: 50000,
      domesticMonthly: "¥5,000,000",
      internationalOutbound: "$50,000 / year (SAFE personal limit)",
      internationalOutboundAmount: 50000,
      internationalInbound: "Unlimited (Subject to SAFE declaration)",
      singleTransactionMax: "Unlimited (HVPS)",
      currency: "CNY",
      minTransfer: "¥0.01"
    },
    completionTimes: {
      instantRail: "< 10 seconds (IBPS Real-Time)",
      domesticACH: "Same-Day (BEPS)",
      domesticWire: "Real-time (HVPS)",
      internationalSwift: "1 - 2 Business Days",
      cutOffTime: "17:00 CST"
    },
    supportedRails: ["CNAPS IBPS", "CNAPS HVPS", "BEPS", "CIPS", "SWIFT"],
    domesticPartnerBanks: ["ICBC", "Agricultural Bank of China", "Bank of China"],
    internationalNetwork: "70% of network located in rural counties and townships across China",
    typicalFees: {
      domesticACH: "Free on mobile app",
      domesticWire: "Free online",
      internationalOutbound: "¥80 + SWIFT fee",
      internationalInbound: "Free"
    },
    features: ["China's Largest Rural Outlet Footprint", "Agricultural Modernization Loans", "CIPS Interbank Direct"]
  },
  {
    id: "cn-agricultural-bank-of-china",
    name: "Agricultural Bank of China (ABC)",
    legalName: "Agricultural Bank of China Limited",
    bankType: "Government / Public Sector",
    country: "China",
    countryCode: "CN",
    region: "Asia-Pacific",
    city: "Beijing",
    flag: "🇨🇳",
    tier: "Tier 1 G-SIB (State-Owned Agricultural Leader)",
    swiftBic: "ABOCCNBJ",
    clearingCodeType: "CNAPS Code",
    clearingCode: "103100000026",
    website: "https://www.abchina.com",
    currencies: ["CNY", "USD", "EUR", "JPY", "GBP", "HKD"],
    limits: {
      domesticDaily: "¥1,000,000 (Personal Digital) / ¥50,000,000 (Corporate)",
      domesticDailyAmount: 1000000,
      domesticInstant: "¥50,000 (IBPS)",
      domesticInstantAmount: 50000,
      domesticMonthly: "¥10,000,000",
      internationalOutbound: "$50,000 / year (SAFE personal quota)",
      internationalOutboundAmount: 50000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "Unlimited (HVPS)",
      currency: "CNY",
      minTransfer: "¥0.01"
    },
    completionTimes: {
      instantRail: "< 10 seconds (IBPS)",
      domesticACH: "Same-Day (BEPS)",
      domesticWire: "Real-time (HVPS)",
      internationalSwift: "1 - 2 Business Days",
      cutOffTime: "17:00 CST"
    },
    supportedRails: ["CNAPS HVPS", "CNAPS IBPS", "CIPS", "SWIFT gpi"],
    domesticPartnerBanks: ["ICBC", "China Construction Bank", "PSBC"],
    internationalNetwork: "State-owned giant dedicated to agricultural, rural county, and township financing",
    typicalFees: {
      domesticACH: "Free on app",
      domesticWire: "Free online",
      internationalOutbound: "¥50 - ¥120",
      internationalInbound: "Free"
    },
    features: ["County Agriculture Financing", "CIPS Primary Clearing", "Rural Township Credit Service"]
  },

  // ==================== JAPAN (GOVERNMENT POSTAL SAVINGS) ====================
  {
    id: "jp-japan-post-bank",
    name: "Japan Post Bank (Yucho Bank)",
    legalName: "Japan Post Bank Co., Ltd.",
    bankType: "Postal Savings Bank",
    country: "Japan",
    countryCode: "JP",
    region: "Asia-Pacific",
    city: "Tokyo",
    flag: "🇯🇵",
    tier: "Government Postal Bank (24,000 Post Offices in every Japanese Village)",
    swiftBic: "JPPSJPJ1",
    clearingCodeType: "Zengin Bank Code",
    clearingCode: "9900",
    website: "https://www.jp-bank.japanpost.jp",
    currencies: ["JPY", "USD", "EUR"],
    limits: {
      domesticDaily: "¥5,000,000 (Yucho Direct Web Transfer)",
      domesticDailyAmount: 5000000,
      domesticInstant: "¥5,000,000 (Zengin More Time 24/7)",
      domesticInstantAmount: 5000000,
      domesticMonthly: "¥30,000,000",
      internationalOutbound: "¥2,000,000 (Yucho Remit Online) / ¥5,000,000 in Post Office",
      internationalOutboundAmount: 2000000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "¥10,000,000 (BOJ-NET)",
      currency: "JPY",
      minTransfer: "¥1"
    },
    completionTimes: {
      instantRail: "Instant (Within 10 seconds via Zengin System 24/7)",
      domesticACH: "Same-Day (Zengin core batch)",
      domesticWire: "Same-Day (BOJ-NET)",
      internationalSwift: "2 - 4 Business Days",
      cutOffTime: "15:00 JST"
    },
    supportedRails: ["Zengin System 24/7", "BOJ-NET", "SWIFT", "Yucho In-House Direct"],
    domesticPartnerBanks: ["MUFG", "SMBC", "Mizuho", "Regional Shinkin Banks"],
    internationalNetwork: "Deepest household penetration in Japan; covers 100% of rural islands and mountain towns",
    typicalFees: {
      domesticACH: "Free between Yucho accounts (5 times/mo) / ¥165 to other banks",
      domesticWire: "¥220",
      internationalOutbound: "¥3,000 (Online) / ¥7,500 (Branch Post Office)",
      internationalInbound: "Free"
    },
    features: ["Covers Every Remote Village & Island", "Yucho Pay App", "Direct Pension & Social Security Rails"]
  },

  // ==================== INDONESIA (STATE-OWNED & VILLAGE NETWORK) ====================
  {
    id: "id-bank-rakyat-indonesia",
    name: "Bank Rakyat Indonesia (BRI)",
    legalName: "PT Bank Rakyat Indonesia (Persero) Tbk",
    bankType: "Government & Rural Microfinance",
    country: "Indonesia",
    countryCode: "ID",
    region: "Asia-Pacific",
    city: "Jakarta",
    flag: "🇮🇩",
    tier: "World's Largest Microfinance & Village Banking Network",
    swiftBic: "BRINIDJA",
    clearingCodeType: "Bank Code / BI-FAST",
    clearingCode: "002",
    website: "https://bri.co.id",
    currencies: ["IDR", "USD", "SGD", "EUR"],
    limits: {
      domesticDaily: "Rp 100,000,000 (BRImo Mobile App)",
      domesticDailyAmount: 100000000,
      domesticInstant: "Rp 250,000,000 (BI-FAST Real-Time 24/7)",
      domesticInstantAmount: 250000000,
      domesticMonthly: "Rp 1,000,000,000",
      internationalOutbound: "Rp 200,000,000 (BRImo Fast Remit) / $50,000 SWIFT",
      internationalOutboundAmount: 200000000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "Unlimited (BI-RTGS)",
      currency: "IDR",
      minTransfer: "Rp 10,000"
    },
    completionTimes: {
      instantRail: "< 5 seconds (BI-FAST & QRIS 24/7/365)",
      domesticACH: "Same-Day (SKNBI National Clearing)",
      domesticWire: "Real-time (Bank Indonesia RTGS)",
      internationalSwift: "1 - 2 Business Days",
      cutOffTime: "24x7 BI-FAST; 15:30 WIB for RTGS"
    },
    supportedRails: ["BI-FAST 24/7", "QRIS", "BI-RTGS", "SKNBI", "AgenBRILink Village Rail", "SWIFT gpi"],
    domesticPartnerBanks: ["Bank Mandiri", "BCA", "BNI"],
    internationalNetwork: "650,000+ AgenBRILink village agents operating across 50,000 Indonesian villages",
    typicalFees: {
      domesticACH: "Rp 2,500 (BI-FAST 24/7)",
      domesticWire: "Rp 30,000 (BI-RTGS)",
      internationalOutbound: "Rp 150,000 + FX spread",
      internationalInbound: "Free"
    },
    features: ["AgenBRILink Village Cash Points", "BRImo Super App", "World Microfinance Pioneer"]
  },

  // ==================== GERMANY (STATE DEVELOPMENT & LANDESBANK) ====================
  {
    id: "de-kfw",
    name: "KfW Development Bank",
    legalName: "KfW (Kreditanstalt für Wiederaufbau - Federal Govt. Owned)",
    bankType: "Government / Public Sector",
    country: "Germany",
    countryCode: "DE",
    region: "Europe",
    city: "Frankfurt am Main",
    flag: "🇩🇪",
    tier: "AAA State Development Bank (100% Federal / State Owned)",
    swiftBic: "KFWDDEFF",
    clearingCodeType: "German BLZ",
    clearingCode: "50020400",
    website: "https://www.kfw.de",
    currencies: ["EUR", "USD", "GBP", "CHF"],
    limits: {
      domesticDaily: "€100,000,000+ (Institutional Public Clearing)",
      domesticDailyAmount: 100000000,
      domesticInstant: "€100,000 (SEPA Instant)",
      domesticInstantAmount: 100000,
      domesticMonthly: "Unlimited",
      internationalOutbound: "Unlimited (Development & Climate Financing)",
      internationalOutboundAmount: 100000000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "Unlimited (TARGET2 / Bundesbank clearing)",
      currency: "EUR",
      minTransfer: "€100.00"
    },
    completionTimes: {
      instantRail: "< 10 seconds (SEPA Instant)",
      domesticACH: "Same-Day to Next-Day (SEPA)",
      domesticWire: "Real-time (TARGET2 / Deutsche Bundesbank RTGS)",
      internationalSwift: "1 - 2 Business Days",
      cutOffTime: "17:00 CET"
    },
    supportedRails: ["TARGET2", "Deutsche Bundesbank Clearing", "SEPA Credit", "SWIFT gpi"],
    domesticPartnerBanks: ["Deutsche Bundesbank", "Sparkassen-Finanzgruppe", "DZ Bank"],
    internationalNetwork: "Financing global climate, infrastructure, and German municipal projects",
    typicalFees: {
      domesticACH: "Free",
      domesticWire: "Government clearing terms",
      internationalOutbound: "Institutional",
      internationalInbound: "Free"
    },
    features: ["Federal Promotional Bank", "AAA Sovereign Credit Rating", "Global Green Finance Leader"]
  },

  // ==================== BRAZIL (GOVERNMENT SAVINGS & AG BANK) ====================
  {
    id: "br-banco-do-brasil",
    name: "Banco do Brasil",
    legalName: "Banco do Brasil S.A. (Govt. of Brazil Controlled)",
    bankType: "Government / Public Sector",
    country: "Brazil",
    countryCode: "BR",
    region: "Latin America",
    city: "Brasília",
    flag: "🇧🇷",
    tier: "Oldest Bank in Brazil (Primary Agricultural Financier)",
    swiftBic: "BRASBRRJ",
    clearingCodeType: "Código do Banco",
    clearingCode: "001",
    website: "https://www.bb.com.br",
    currencies: ["BRL", "USD", "EUR"],
    limits: {
      domesticDaily: "R$ 60,000 (App Pix / TED limit)",
      domesticDailyAmount: 60000,
      domesticInstant: "R$ 30,000 (Pix daytime limit)",
      domesticInstantAmount: 30000,
      domesticMonthly: "R$ 300,000",
      internationalOutbound: "$30,000 (BB Câmbio Digital)",
      internationalOutboundAmount: 30000,
      internationalInbound: "Unlimited (SISBACEN compliant)",
      singleTransactionMax: "Unlimited (STR Banco Central)",
      currency: "BRL",
      minTransfer: "R$ 0.01"
    },
    completionTimes: {
      instantRail: "< 3 seconds (Pix 24/7)",
      domesticACH: "Same-Day (TED until 17:00 BRT)",
      domesticWire: "Real-time (STR Banco Central)",
      internationalSwift: "1 - 3 Business Days",
      cutOffTime: "17:00 BRT (TED) / 24x7 Pix"
    },
    supportedRails: ["Pix 24/7", "TED", "STR", "SWIFT gpi", "Boleto BB"],
    domesticPartnerBanks: ["Caixa Econômica Federal", "Itaú", "Bradesco"],
    internationalNetwork: "Finances 60% of Brazilian agribusiness; branches in Miami, London, Tokyo, Frankfurt",
    typicalFees: {
      domesticACH: "Free for individuals (Pix)",
      domesticWire: "Free online",
      internationalOutbound: "R$ 90 + IOF Tax",
      internationalInbound: "Free"
    },
    features: ["Primary Agribusiness Credit (Plano Safra)", "Pix 24/7 Super App", "Government Payroll & Treasury"]
  },

  // ==================== MEXICO (GOVERNMENT RURAL WELFARE BANK) ====================
  {
    id: "mx-banco-del-bienestar",
    name: "Banco del Bienestar",
    legalName: "Banco del Bienestar, Sociedad Nacional de Crédito",
    bankType: "Government & Rural Welfare",
    country: "Mexico",
    countryCode: "MX",
    region: "Latin America",
    city: "Mexico City",
    flag: "🇲🇽",
    tier: "Government Development Bank (2,700+ Rural Town Branches)",
    swiftBic: "BMSNMXMM",
    clearingCodeType: "CLABE (18 digits)",
    clearingCode: "166",
    website: "https://www.gob.mx/bancodelbienestar",
    currencies: ["MXN"],
    limits: {
      domesticDaily: "MXN $50,000 (ATM / SPEI App)",
      domesticDailyAmount: 50000,
      domesticInstant: "MXN $50,000 (SPEI 24/7)",
      domesticInstantAmount: 50000,
      domesticMonthly: "MXN $200,000",
      internationalOutbound: "Not supported (Domestic welfare charter)",
      internationalOutboundAmount: 0,
      internationalInbound: "International remittances accepted from USA via Telecomm / Direct Remit",
      singleTransactionMax: "MXN $100,000",
      currency: "MXN",
      minTransfer: "MXN $1.00"
    },
    completionTimes: {
      instantRail: "< 5 seconds (SPEI 24/7 Interbancario)",
      domesticACH: "Instant (SPEI)",
      domesticWire: "Real-time (SPEI)",
      internationalSwift: "1 - 2 Business Days (Via US Remittance Corridors)",
      cutOffTime: "24/7 SPEI; Branch hours 09:00 - 16:30 CST"
    },
    supportedRails: ["SPEI 24/7", "Banco de México Clearing", "US Remittance Corridors"],
    domesticPartnerBanks: ["BBVA México", "Banorte", "Santander México"],
    internationalNetwork: "Branches established in remote rural municipalities across Mexico without other banking services",
    typicalFees: {
      domesticACH: "Free for beneficiaries",
      domesticWire: "Free SPEI",
      internationalOutbound: "N/A",
      internationalInbound: "Free for family remittances"
    },
    features: ["Covers Remote Rural Indigenous Towns", "Direct Govt. Pension & Scholar Stipends", "SPEI Mobile Access"]
  }
];
