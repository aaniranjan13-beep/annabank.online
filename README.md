# Worldwide Bank Directory (GlobalBankDir)

A comprehensive, searchable, and interactive directory of worldwide banks organized country-by-country. It provides detailed transaction limits (domestic interbank & international wire), settlement completion times (instant rails, ACH, SWIFT), clearing codes (SWIFT/BIC, Routing, Sort Code, IFSC, BLZ), payment rails, and an automated interbank transfer route estimator.

---

## 🚀 Key Features

1. **Worldwide Bank Directory (Categorized by Country)**:
   - Covers premier banks across **North America, Europe, Asia-Pacific, Latin America, Middle East, and Africa**.
   - Includes United States (Chase, BofA, Wells Fargo, Citi, Goldman Sachs, Capital One), United Kingdom (HSBC, Barclays, Lloyds, NatWest, Standard Chartered), Germany (Deutsche Bank, Commerzbank), France (BNP Paribas, Crédit Agricole), Switzerland (UBS), India (SBI, HDFC, ICICI, Axis, PNB), Canada (RBC, TD, Scotiabank), Australia (CBA, ANZ, Westpac), Singapore (DBS, OCBC), UAE (Emirates NBD, FAB), Japan (MUFG, SMBC), China & Hong Kong (ICBC, HSBC HK), Brazil (Itaú), South Africa (Standard Bank), Mexico (BBVA México), South Korea (Hana Bank), Saudi Arabia (Al Rajhi), Qatar (QNB), Netherlands (ING), Spain (Santander, BBVA), and Italy (Intesa Sanpaolo).

2. **Comprehensive Transaction Limit & Speed Data**:
   - **Domestic Limits**: Daily digital limit, real-time instant limit (e.g. FedNow, UPI, Faster Payments, SEPA Instant, Pix), monthly aggregate limits.
   - **International Limits**: Outbound cross-border wire ceiling, inbound wire acceptance.
   - **Completion Speeds**: Instant rails (<10–15 seconds), standard batch clearing (1–2 days), high-value gross wires (same-day), and international SWIFT correspondent windows (1–3 days).
   - **Identifiers**: SWIFT/BIC codes (1-click copy), local clearing codes (Fedwire ABA, UK Sort Code, Indian IFSC, Australian BSB, German BLZ, Mexican CLABE).
   - **Tariff & Fees**: Breakdown of typical fees for ACH, domestic wires, and outbound/inbound SWIFT transfers.

3. **Universal Full-Text Search Option**:
   - Instantly searches **whatever is in the directory**: Bank name, country, city, SWIFT/BIC, clearing code, currency, payment rail (Fedwire, UPI, SEPA, FAST, Pix, etc.), or transaction limit terms.

4. **Interactive Interbank Route & Limit Estimator**:
   - Pick any **Origin / Sender Bank** and **Destination / Receiver Bank**.
   - Automatically computes route classification:
     - *Intrabank / Same Bank*: Instant 0-second book transfer with zero fees.
     - *Domestic Interbank*: Identifies national clearing rails (FedNow, RTP, Faster Payments, UPI/IMPS, SEPA Instant, Pix, SPEI) with exact completion speeds and bottleneck limits.
     - *Cross-Border International*: Details SWIFT gpi fast-lane tracking, correspondent paths, and cutoff time dependencies.
   - Allows testing any custom transfer amount against bank limits with warning alerts.

5. **Side-by-Side Comparison Matrix**:
   - Compare up to 4 banks simultaneously across limits, completion speeds, currencies, and clearing capabilities.

6. **Custom Bank Management (CRUD)**:
   - Add new bank records with custom limits, speeds, and codes.
   - Persisted automatically to browser `localStorage`.

7. **Data Export**:
   - 1-click export of filtered or full directory to **CSV** or **JSON**.

---

## 💻 How to Run

1. **Using the batch launcher**:
   - Double-click [`start.bat`](start.bat) to launch the development server and open `http://localhost:5173`.

2. **Using the command line**:
   ```bash
   cd d:\global-bank-directory
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```
