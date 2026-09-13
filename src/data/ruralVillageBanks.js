// Rural, Village & Gramin Banks Worldwide
// Dedicated to agricultural communities, small farmers, rural villages, and microcredit
export const RURAL_VILLAGE_BANKS = [
  // ==================== INDIA (REGIONAL RURAL BANKS / GRAMIN BANKS) ====================
  {
    id: "in-baroda-up-bank",
    name: "Baroda UP Bank (Gramin Bank)",
    legalName: "Baroda UP Bank (Sponsored by Bank of Baroda)",
    bankType: "Rural & Village Bank (RRB)",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "Gorakhpur, Uttar Pradesh",
    flag: "🇮🇳",
    tier: "Regional Rural Bank (1,980+ Village & Rural Branches)",
    swiftBic: "BARBINBBUPB", // Clears via sponsor bank Bank of Baroda
    clearingCodeType: "IFSC Code",
    clearingCode: "BARB0BUPGBX",
    website: "https://www.barodaupbank.in",
    currencies: ["INR"],
    limits: {
      domesticDaily: "₹2,00,000 (M-Banking) / ₹10,00,000 (Branch RTGS/NEFT)",
      domesticDailyAmount: 200000,
      domesticInstant: "₹1,00,000 (UPI) / ₹2,00,000 (IMPS)",
      domesticInstantAmount: 100000,
      domesticMonthly: "₹10,00,000",
      internationalOutbound: "Via sponsor Bank of Baroda branch",
      internationalOutboundAmount: 25000,
      internationalInbound: "Supported via sponsor Bank of Baroda SWIFT correspondent routing",
      singleTransactionMax: "Unlimited (RTGS via Sponsor Bank)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (1-2 seconds via UPI 24x7)",
      domesticACH: "Within 30 mins (NEFT 24x7)",
      domesticWire: "Real-time (RTGS via RBI settlement)",
      internationalSwift: "2 - 4 Business Days (Via BoB Forex desk)",
      cutOffTime: "24x7 Digital Channels; 16:00 IST Branch"
    },
    supportedRails: ["UPI", "IMPS", "NEFT", "RTGS", "AePS Village Biometric Pay", "Kisan Credit Card (KCC)"],
    domesticPartnerBanks: ["Bank of Baroda (Sponsor)", "State Bank of India", "Punjab National Bank"],
    internationalNetwork: "International inward foreign remittances routed via Bank of Baroda treasury",
    typicalFees: {
      domesticACH: "Free online",
      domesticWire: "Free online / ₹15 branch",
      internationalOutbound: "Standard sponsor bank fee",
      internationalInbound: "Free"
    },
    features: ["Covers 1,980+ Remote Villages", "Kisan Credit Card (KCC) Agri Loans", "Aadhaar Micro-ATM Village Cash-Out"]
  },
  {
    id: "in-aryavart-bank",
    name: "Aryavart Bank (Gramin Bank)",
    legalName: "Aryavart Bank (Sponsored by Bank of India)",
    bankType: "Rural & Village Bank (RRB)",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "Lucknow, Uttar Pradesh",
    flag: "🇮🇳",
    tier: "Regional Rural Bank (1,365+ Village Branches across 26 Districts)",
    swiftBic: "BKIDINBBLKO",
    clearingCodeType: "IFSC Code",
    clearingCode: "BKID0ARYAGB",
    website: "https://aryavart-rrb.com",
    currencies: ["INR"],
    limits: {
      domesticDaily: "₹2,00,000 (Aryavart m-Banking)",
      domesticDailyAmount: 200000,
      domesticInstant: "₹1,00,000 (UPI) / ₹2,00,000 (IMPS)",
      domesticInstantAmount: 100000,
      domesticMonthly: "₹5,00,000",
      internationalOutbound: "Via sponsor Bank of India",
      internationalOutboundAmount: 25000,
      internationalInbound: "Supported via sponsor bank correspondent gateway",
      singleTransactionMax: "Unlimited (RTGS)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (1-2 seconds via UPI / IMPS)",
      domesticACH: "30 minutes (NEFT)",
      domesticWire: "Real-time (RTGS)",
      internationalSwift: "2 - 4 Business Days",
      cutOffTime: "24x7 Digital; 16:00 IST Branch"
    },
    supportedRails: ["UPI", "IMPS", "NEFT", "RTGS", "AePS", "PMJDY Rupay Debit"],
    domesticPartnerBanks: ["Bank of India (Sponsor)", "SBI"],
    internationalNetwork: "Rural clearing network spanning 26 agricultural districts in North India",
    typicalFees: {
      domesticACH: "Free online",
      domesticWire: "Free online",
      internationalOutbound: "₹500 via sponsor",
      internationalInbound: "Free"
    },
    features: ["Bank Sakhi (Women Village Agents)", "SHG (Self-Help Group) Micro-credit", "PM Kisan Samman Nidhi DBT Direct Credit"]
  },
  {
    id: "in-kerala-gramin-bank",
    name: "Kerala Gramin Bank (KGB)",
    legalName: "Kerala Gramin Bank (Sponsored by Canara Bank)",
    bankType: "Rural & Village Bank (RRB)",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "Malappuram, Kerala",
    flag: "🇮🇳",
    tier: "India's Largest State-Wide Regional Rural Bank (630+ Branches)",
    swiftBic: "CNRBINBBKGB",
    clearingCodeType: "IFSC Code",
    clearingCode: "KLGB0040001",
    website: "https://keralagbank.com",
    currencies: ["INR"],
    limits: {
      domesticDaily: "₹2,00,000 (KGB m-Pay)",
      domesticDailyAmount: 200000,
      domesticInstant: "₹1,00,000 (UPI) / ₹2,00,000 (IMPS)",
      domesticInstantAmount: 100000,
      domesticMonthly: "₹10,00,000",
      internationalOutbound: "Via Canara Bank Forex",
      internationalOutboundAmount: 25000,
      internationalInbound: "High Gulf/NRI inward remittances routed via Canara Bank gateway",
      singleTransactionMax: "Unlimited (RTGS)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (UPI & IMPS 24x7)",
      domesticACH: "30 minutes (NEFT)",
      domesticWire: "Real-time (RTGS)",
      internationalSwift: "1 - 2 Business Days (Direct Gulf remittance partnership)",
      cutOffTime: "24x7 Digital; 16:30 IST Branch"
    },
    supportedRails: ["UPI", "IMPS", "NEFT", "RTGS", "KGB m-Pay", "AePS"],
    domesticPartnerBanks: ["Canara Bank (Sponsor)", "Federal Bank", "SBI"],
    internationalNetwork: "High NRI inflow from UAE, Saudi Arabia, Kuwait, Oman routed directly to rural Kerala families",
    typicalFees: {
      domesticACH: "Free online",
      domesticWire: "Free online",
      internationalOutbound: "₹500 via Canara Bank",
      internationalInbound: "Free"
    },
    features: ["NRI Remittance Hub to Villages", "KGB m-Pay Modern Banking", "Rubber & Spice Plantation Loans"]
  },
  {
    id: "in-prathama-up-gramin-bank",
    name: "Prathama UP Gramin Bank",
    legalName: "Prathama UP Gramin Bank (Sponsored by Punjab National Bank)",
    bankType: "Rural & Village Bank (RRB)",
    country: "India",
    countryCode: "IN",
    region: "Asia-Pacific",
    city: "Moradabad, Uttar Pradesh",
    flag: "🇮🇳",
    tier: "India's First Rural Bank (Founded 1975, 940+ Branches)",
    swiftBic: "PUNBINBBPRT",
    clearingCodeType: "IFSC Code",
    clearingCode: "PUNB0PRTB01",
    website: "https://www.prathamaupbank.com",
    currencies: ["INR"],
    limits: {
      domesticDaily: "₹2,00,000 (Prathama Mobile Banking)",
      domesticDailyAmount: 200000,
      domesticInstant: "₹1,00,000 (UPI) / ₹2,00,000 (IMPS)",
      domesticInstantAmount: 100000,
      domesticMonthly: "₹5,00,000",
      internationalOutbound: "Via sponsor PNB",
      internationalOutboundAmount: 25000,
      internationalInbound: "Supported via PNB international gateway",
      singleTransactionMax: "Unlimited (RTGS)",
      currency: "INR",
      minTransfer: "₹1.00"
    },
    completionTimes: {
      instantRail: "Instant (UPI & IMPS)",
      domesticACH: "30 minutes (NEFT)",
      domesticWire: "Real-time (RTGS)",
      internationalSwift: "2 - 3 Business Days",
      cutOffTime: "24x7 Digital"
    },
    supportedRails: ["UPI", "IMPS", "NEFT", "RTGS", "AePS"],
    domesticPartnerBanks: ["Punjab National Bank (Sponsor)", "SBI"],
    internationalNetwork: "Rural western UP coverage with sponsor PNB clearing gateway",
    typicalFees: {
      domesticACH: "Free online",
      domesticWire: "Free online",
      internationalOutbound: "Standard PNB tariff",
      internationalInbound: "Free"
    },
    features: ["Historic 1st Gramin Bank in India", "Artisan & Brass Craft Rural Credit", "Micro-ATM Cash Delivery"]
  },

  // ==================== BANGLADESH (GRAMEEN BANK & KRISHI BANK) ====================
  {
    id: "bd-grameen-bank",
    name: "Grameen Bank (Village Bank)",
    legalName: "Grameen Bank (Nobel Peace Prize Laureate)",
    bankType: "Rural & Village Microfinance",
    country: "Bangladesh",
    countryCode: "BD",
    region: "Asia-Pacific",
    city: "Dhaka / Rural Branches",
    flag: "🇧🇩",
    tier: "Global Pioneer of Village Microcredit (2,568 Rural Village Branches)",
    swiftBic: "GRMNBDDH",
    clearingCodeType: "Bangladesh Routing No",
    clearingCode: "100",
    website: "https://grameenbank.org.bd",
    currencies: ["BDT"],
    limits: {
      domesticDaily: "৳ 100,000 (Grameen Village Cash / Mobile)",
      domesticDailyAmount: 100000,
      domesticInstant: "৳ 50,000 (bKash / Nagad Mobile Financial Link)",
      domesticInstantAmount: 50000,
      domesticMonthly: "৳ 500,000",
      internationalOutbound: "Not supported (Rural microcredit charter)",
      internationalOutboundAmount: 0,
      internationalInbound: "Accepts foreign worker remittances from abroad into village accounts",
      singleTransactionMax: "৳ 200,000",
      currency: "BDT",
      minTransfer: "৳ 10.00"
    },
    completionTimes: {
      instantRail: "< 10 seconds (via bKash / NPSB National Payment Switch)",
      domesticACH: "1 Business Day (BEFTN Bangladesh Electronic Funds Transfer)",
      domesticWire: "Same-Day (Bangladesh Bank RTGS)",
      internationalSwift: "2 - 3 Business Days (Inward remittance for village families)",
      cutOffTime: "15:00 BST"
    },
    supportedRails: ["NPSB", "BEFTN", "bKash Mobile Link", "Grameen Village Center System"],
    domesticPartnerBanks: ["Sonali Bank", "Bangladesh Krishi Bank", "BRAC Bank"],
    internationalNetwork: "Over 9 million village borrowers (97% women) in 81,000 villages across Bangladesh",
    typicalFees: {
      domesticACH: "Free",
      domesticWire: "Free for micro-borrowers",
      internationalOutbound: "N/A",
      internationalInbound: "Free"
    },
    features: ["Nobel Peace Prize Winner 2006", "Collateral-Free Village Microcredit", "Group Lending Model in 81,000 Villages"]
  },
  {
    id: "bd-bangladesh-krishi-bank",
    name: "Bangladesh Krishi Bank (BKB)",
    legalName: "Bangladesh Krishi Bank (Govt. Agricultural Bank)",
    bankType: "Rural & Agricultural Bank",
    country: "Bangladesh",
    countryCode: "BD",
    region: "Asia-Pacific",
    city: "Dhaka",
    flag: "🇧🇩",
    tier: "100% State-Owned Specialized Agricultural Bank (1,038 Branches)",
    swiftBic: "BKRIBDAA",
    clearingCodeType: "Bangladesh Routing No",
    clearingCode: "050",
    website: "https://www.krishibank.org.bd",
    currencies: ["BDT", "USD"],
    limits: {
      domesticDaily: "৳ 200,000 (Krishi Digital)",
      domesticDailyAmount: 200000,
      domesticInstant: "৳ 50,000 (NPSB Instant)",
      domesticInstantAmount: 50000,
      domesticMonthly: "৳ 1,000,000",
      internationalOutbound: "$10,000 (Approved trade)",
      internationalOutboundAmount: 10000,
      internationalInbound: "Unlimited (Worker Remittances)",
      singleTransactionMax: "Unlimited (RTGS)",
      currency: "BDT",
      minTransfer: "৳ 100.00"
    },
    completionTimes: {
      instantRail: "< 10 seconds (NPSB)",
      domesticACH: "Same-Day (BEFTN)",
      domesticWire: "Real-time (RTGS)",
      internationalSwift: "1 - 3 Business Days",
      cutOffTime: "15:30 BST"
    },
    supportedRails: ["NPSB", "BEFTN", "RTGS", "SWIFT"],
    domesticPartnerBanks: ["Sonali Bank", "Janata Bank", "Agrani Bank"],
    internationalNetwork: "Primary institution financing food grain production and rural farming in Bangladesh",
    typicalFees: {
      domesticACH: "Free",
      domesticWire: "৳ 100",
      internationalOutbound: "৳ 500 + SWIFT fee",
      internationalInbound: "Free"
    },
    features: ["Crop & Fertilizer Subsidized Credit", "NPSB 24/7", "Rural Farmer Remittance Outlet"]
  },

  // ==================== PAKISTAN (RURAL & VILLAGE AGRI BANK) ====================
  {
    id: "pk-zarai-taraqiati-bank",
    name: "Zarai Taraqiati Bank Limited (ZTBL)",
    legalName: "Zarai Taraqiati Bank Limited (Agricultural Development Bank of Pakistan)",
    bankType: "Rural & Agricultural Bank",
    country: "Pakistan",
    countryCode: "PK",
    region: "Asia-Pacific",
    city: "Islamabad",
    flag: "🇵🇰",
    tier: "Premier Agricultural Village Bank (500+ Rural Branches)",
    swiftBic: "ZTBLPKKA",
    clearingCodeType: "State Bank of Pakistan Clearing",
    clearingCode: "045",
    website: "https://www.ztbl.com.pk",
    currencies: ["PKR"],
    limits: {
      domesticDaily: "Rs 100,000 (Mobile Banking)",
      domesticDailyAmount: 100000,
      domesticInstant: "Rs 50,000 (Raast Instant Payment System)",
      domesticInstantAmount: 50000,
      domesticMonthly: "Rs 500,000",
      internationalOutbound: "Via National Bank of Pakistan",
      internationalOutboundAmount: 10000,
      internationalInbound: "Unlimited (Home Remittances via PRISM)",
      singleTransactionMax: "Rs 5,000,000 (PRISM RTGS)",
      currency: "PKR",
      minTransfer: "Rs 10.00"
    },
    completionTimes: {
      instantRail: "< 5 seconds (Raast Instant 24/7 / 1LINK)",
      domesticACH: "Same-Day (NIFT Clearing)",
      domesticWire: "Real-time (PRISM RTGS)",
      internationalSwift: "2 - 3 Business Days",
      cutOffTime: "15:00 PKT"
    },
    supportedRails: ["Raast Instant 24/7", "1LINK", "PRISM RTGS", "NIFT"],
    domesticPartnerBanks: ["National Bank of Pakistan", "Habib Bank (HBL)", "United Bank (UBL)"],
    internationalNetwork: "Financing tractors, solar tube wells, and crops for small village farmers across Pakistan",
    typicalFees: {
      domesticACH: "Free via Raast",
      domesticWire: "Rs 200 (PRISM)",
      internationalOutbound: "Standard SBP rates",
      internationalInbound: "Free via Pakistan Remittance Initiative (PRI)"
    },
    features: ["Raast 24/7 Real-Time Rail", "Kissan Support Schemes", "Farm Mechanization Credit"]
  },

  // ==================== PHILIPPINES (RURAL & LAND BANK) ====================
  {
    id: "ph-land-bank",
    name: "Land Bank of the Philippines",
    legalName: "Land Bank of the Philippines (Government Universal Bank)",
    bankType: "Government & Rural Village Bank",
    country: "Philippines",
    countryCode: "PH",
    region: "Asia-Pacific",
    city: "Manila",
    flag: "🇵🇭",
    tier: "Government Bank Serving Farmers & Fisherfolk in 81 Provinces",
    swiftBic: "TLBPPHMM",
    clearingCodeType: "BRSTN / Clearing Code",
    clearingCode: "010350025",
    website: "https://www.landbank.com",
    currencies: ["PHP", "USD"],
    limits: {
      domesticDaily: "₱50,000 (iAccess / Mobile App)",
      domesticDailyAmount: 50000,
      domesticInstant: "₱50,000 (InstaPay per transaction ceiling)",
      domesticInstantAmount: 50000,
      domesticMonthly: "₱500,000",
      internationalOutbound: "$10,000 (Digital) / Unlimited (Trade Wire)",
      internationalOutboundAmount: 10000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "Unlimited (PhilPaSSplus RTGS)",
      currency: "PHP",
      minTransfer: "₱1.00"
    },
    completionTimes: {
      instantRail: "< 5 seconds (InstaPay 24/7)",
      domesticACH: "Same-Day (PESONet cut-off 15:00 PHT)",
      domesticWire: "Real-time (PhilPaSSplus RTGS)",
      internationalSwift: "1 - 2 Business Days (OFW Overseas Filipino Remittances)",
      cutOffTime: "15:00 PHT"
    },
    supportedRails: ["InstaPay 24/7", "PESONet", "PhilPaSSplus RTGS", "SWIFT gpi"],
    domesticPartnerBanks: ["BDO Unibank", "BPI", "Metrobank"],
    internationalNetwork: "Present in all 81 Philippine provinces; official depository of agrarian reform programs",
    typicalFees: {
      domesticACH: "₱15 - ₱25 (InstaPay)",
      domesticWire: "₱50 (PhilPaSSplus)",
      internationalOutbound: "$15 + SWIFT fee",
      internationalInbound: "Free"
    },
    features: ["InstaPay 24/7", "Covers Remote Rural Islands", "OFW Remittance Direct Credit", "Agrarian Fisherfolk Credit"]
  },

  // ==================== KENYA / EAST AFRICA (RURAL AGENCY BANKING) ====================
  {
    id: "ke-equity-bank",
    name: "Equity Bank (Kenya)",
    legalName: "Equity Bank Kenya Limited",
    bankType: "Rural & Village Agency Banking",
    country: "Kenya",
    countryCode: "KE",
    region: "Africa",
    city: "Nairobi",
    flag: "🇰🇪",
    tier: "Pioneer of Village Agency Banking (60,000+ Rural Village Agents)",
    swiftBic: "EQBLKENA",
    clearingCodeType: "Bank / Branch Code",
    clearingCode: "68001",
    website: "https://equitygroupholdings.com",
    currencies: ["KES", "USD", "EUR", "GBP", "UGX", "RWF"],
    limits: {
      domesticDaily: "KSh 300,000 (Equity Mobile / Equitel)",
      domesticDailyAmount: 300000,
      domesticInstant: "KSh 150,000 (Pesalink Instant / M-PESA link)",
      domesticInstantAmount: 150000,
      domesticMonthly: "KSh 1,500,000",
      internationalOutbound: "$20,000 (Online Wire / Western Union)",
      internationalOutboundAmount: 20000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "KSh 10,000,000 (KEPSS RTGS)",
      currency: "KES",
      minTransfer: "KSh 10.00"
    },
    completionTimes: {
      instantRail: "< 10 seconds (PesaLink & M-PESA Paybill 24/7)",
      domesticACH: "1 Business Day (EFT)",
      domesticWire: "Real-time (KEPSS Central Bank RTGS)",
      internationalSwift: "1 - 2 Business Days",
      cutOffTime: "15:00 EAT"
    },
    supportedRails: ["PesaLink 24/7", "M-PESA Integration", "KEPSS RTGS", "Equitel", "SWIFT gpi"],
    domesticPartnerBanks: ["KCB Bank", "Co-operative Bank of Kenya", "Absa Kenya"],
    internationalNetwork: "Operations across Kenya, Uganda, Rwanda, South Sudan, DRC; 60,000 village agency dukas",
    typicalFees: {
      domesticACH: "Free / KSh 30",
      domesticWire: "KSh 500 (KEPSS)",
      internationalOutbound: "KSh 1,500 + FX margin",
      internationalInbound: "Free"
    },
    features: ["Equitel Village Micro-Banking", "Direct M-PESA Interoperability", "60,000+ Village Agents (Equity Taifa)"]
  },

  // ==================== UNITED STATES (RURAL AGRICULTURAL COOPERATIVE) ====================
  {
    id: "us-agfirst-farm-credit",
    name: "AgFirst Farm Credit Bank",
    legalName: "AgFirst Farm Credit Bank (Farm Credit System)",
    bankType: "Rural & Agricultural Credit",
    country: "United States",
    countryCode: "US",
    region: "North America",
    city: "Columbia, SC",
    flag: "🇺🇸",
    tier: "Federal Farm Credit System Bank (Serving Rural Farming Communities in 15 States)",
    swiftBic: "AGFCUS33",
    clearingCodeType: "ABA Routing",
    clearingCode: "053201487",
    website: "https://www.agfirst.com",
    currencies: ["USD"],
    limits: {
      domesticDaily: "$250,000 (AgriLine ACH) / $1,000,000+ (Wire)",
      domesticDailyAmount: 250000,
      domesticInstant: "$100,000 (RTP / FedNow via correspondent)",
      domesticInstantAmount: 100000,
      domesticMonthly: "Unlimited",
      internationalOutbound: "Institutional agricultural wire only",
      internationalOutboundAmount: 500000,
      internationalInbound: "Unlimited",
      singleTransactionMax: "$50,000,000 (Fedwire Institutional)",
      currency: "USD",
      minTransfer: "$100.00"
    },
    completionTimes: {
      instantRail: "< 15 seconds (RTP / FedNow Participant)",
      domesticACH: "1 - 2 Business Days",
      domesticWire: "Same-Day (within 1 hour via Fedwire)",
      internationalSwift: "1 - 2 Business Days",
      cutOffTime: "16:00 EST"
    },
    supportedRails: ["Fedwire", "ACH", "Farm Credit System Wholesale", "RTP"],
    domesticPartnerBanks: ["CoBank", "AgBank", "Farm Credit Bank of Texas"],
    internationalNetwork: "Chartered by US Congress to finance rural agriculture, timber, rural housing, and farmers",
    typicalFees: {
      domesticACH: "Free",
      domesticWire: "$20.00",
      internationalOutbound: "Institutional",
      internationalInbound: "Free"
    },
    features: ["US Congress Chartered Farm Credit", "Rural Farm & Agribusiness Loans", "AgriLine Remote Deposit"]
  }
];
