import React, { useState, useMemo } from 'react';
import { 
  ArrowLeftRight, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Zap, 
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';
import { getBankPaymentOptions } from '../data/paymentOptionsHelper';

export default function TransferEstimator({ banks, preselectedBank, onSelectBank }) {
  const [sourceBankId, setSourceBankId] = useState(preselectedBank?.id || (banks[0]?.id ?? ''));
  const [targetBankId, setTargetBankId] = useState(banks[1]?.id ?? '');
  const [amount, setAmount] = useState('10000');
  const [sourceSearch, setSourceSearch] = useState('');
  const [targetSearch, setTargetSearch] = useState('');

  // Source & Target Bank objects
  const sourceBank = useMemo(() => banks.find((b) => b.id === sourceBankId), [banks, sourceBankId]);
  const targetBank = useMemo(() => banks.find((b) => b.id === targetBankId), [banks, targetBankId]);

  // Fast filtered options list for 11,000+ banks
  const availableSourceBanks = useMemo(() => {
    let list = banks;
    if (sourceSearch.trim()) {
      const q = sourceSearch.toLowerCase().trim();
      list = banks.filter(b => b.name.toLowerCase().includes(q) || b.country.toLowerCase().includes(q) || b.swiftBic?.toLowerCase().includes(q));
    }
    const sliced = list.slice(0, 100);
    if (sourceBank && !sliced.some(b => b.id === sourceBank.id)) {
      return [sourceBank, ...sliced];
    }
    return sliced;
  }, [banks, sourceSearch, sourceBank]);

  const availableTargetBanks = useMemo(() => {
    let list = banks;
    if (targetSearch.trim()) {
      const q = targetSearch.toLowerCase().trim();
      list = banks.filter(b => b.name.toLowerCase().includes(q) || b.country.toLowerCase().includes(q) || b.swiftBic?.toLowerCase().includes(q));
    }
    const sliced = list.slice(0, 100);
    if (targetBank && !sliced.some(b => b.id === targetBank.id)) {
      return [targetBank, ...sliced];
    }
    return sliced;
  }, [banks, targetSearch, targetBank]);

  // Swap banks
  const handleSwap = () => {
    const temp = sourceBankId;
    setSourceBankId(targetBankId);
    setTargetBankId(temp);
  };

  // Compute Route Logic
  const routeAnalysis = useMemo(() => {
    if (!sourceBank || !targetBank) return null;

    const isSameBank = sourceBank.id === targetBank.id;
    const isSameCountry = sourceBank.countryCode === targetBank.countryCode;
    const isBothEurozone = ['DE', 'FR', 'ES', 'IT', 'NL'].includes(sourceBank.countryCode) && 
                           ['DE', 'FR', 'ES', 'IT', 'NL'].includes(targetBank.countryCode);

    let routeType = 'international';
    let expectedTime = '1 - 3 Business Days';
    let recommendedRail = 'SWIFT gpi Network';
    let availableRails = ['SWIFT gpi', 'Correspondent Banking'];
    let estimatedFee = '$30 - $50 USD equivalent + FX spread';
    let limitWarning = null;

    if (isSameBank) {
      routeType = 'intrabank';
      expectedTime = 'Instant (Under 5 seconds)';
      recommendedRail = 'Internal Ledger Transfer (Intrabank Book Transfer)';
      availableRails = ['Internal Ledger', 'Proprietary Global Network'];
      estimatedFee = 'Free ($0.00)';
    } else if (isSameCountry) {
      routeType = 'domestic';
      // Determine national instant rails
      switch (sourceBank.countryCode) {
        case 'US':
          expectedTime = 'Instant (< 15s via FedNow/RTP) or Same-Day (Fedwire)';
          recommendedRail = 'FedNow / RTP (Real-Time Payments) & Fedwire';
          availableRails = ['FedNow', 'The Clearing House RTP', 'Fedwire', 'ACH'];
          estimatedFee = 'Free for ACH/RTP, $25-$35 for Fedwire';
          break;
        case 'GB':
          expectedTime = 'Instant (< 10 seconds)';
          recommendedRail = 'Faster Payments Service (FPS)';
          availableRails = ['Faster Payments (FPS)', 'CHAPS', 'BACS'];
          estimatedFee = 'Free via Faster Payments';
          break;
        case 'IN':
          expectedTime = 'Instant (1-3 seconds via UPI / IMPS) or RTGS Real-time';
          recommendedRail = 'UPI 24x7 / IMPS & RBI RTGS';
          availableRails = ['UPI', 'IMPS 24x7', 'RTGS (High Value)', 'NEFT'];
          estimatedFee = 'Free online';
          break;
        case 'CA':
          expectedTime = 'Instant (Under 30 mins via Interac) or Same-Day Lynx';
          recommendedRail = 'Interac e-Transfer & Payments Canada Lynx';
          availableRails = ['Interac e-Transfer', 'Lynx High-Value', 'ACSS'];
          estimatedFee = 'Free Interac / CAD $40 Lynx';
          break;
        case 'AU':
          expectedTime = 'Instant (< 60 seconds)';
          recommendedRail = 'New Payments Platform (NPP) / Osko 24x7';
          availableRails = ['NPP / Osko', 'PayID', 'RBA RITS RTGS', 'Direct Entry'];
          estimatedFee = 'Free via NPP/Osko';
          break;
        case 'SG':
          expectedTime = 'Instant (< 10 seconds)';
          recommendedRail = 'FAST (Fast and Secure Transfers) / PayNow';
          availableRails = ['FAST', 'PayNow', 'MEPS+ RTGS', 'GIRO'];
          estimatedFee = 'Free via FAST';
          break;
        case 'AE':
          expectedTime = 'Instant (< 15 seconds)';
          recommendedRail = 'Aani Instant Payment Platform & UAEFTS';
          availableRails = ['Aani', 'UAEFTS RTGS'];
          estimatedFee = 'AED 1.00 via Aani / AED 15 via UAEFTS';
          break;
        case 'BR':
          expectedTime = 'Instant (< 3 seconds)';
          recommendedRail = 'Pix 24/7 (Banco Central do Brasil)';
          availableRails = ['Pix 24/7', 'TED Same-Day', 'STR RTGS'];
          estimatedFee = 'Free for individuals via Pix';
          break;
        case 'MX':
          expectedTime = 'Instant (< 5 seconds)';
          recommendedRail = 'SPEI 24/7 Interbancario';
          availableRails = ['SPEI 24/7', 'SPID (USD)', 'DiMo'];
          estimatedFee = 'Free online';
          break;
        default:
          expectedTime = 'Instant to Same-Day';
          recommendedRail = 'National RTGS / Automated Clearing';
          availableRails = sourceBank.supportedRails || ['National Clearing'];
          estimatedFee = 'Free or standard domestic charge';
          break;
      }
    } else if (isBothEurozone) {
      routeType = 'sepa';
      expectedTime = 'Instant (< 10 seconds via SEPA Inst) or Next Day';
      recommendedRail = 'SEPA Instant Credit Transfer (SCT Inst) / TARGET2';
      availableRails = ['SEPA Instant (SCT Inst)', 'Standard SEPA (SCT)', 'TARGET2'];
      estimatedFee = 'Free / negligible under EU SEPA cross-border equality regulation';
    }

    // Check limits against input amount
    const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
    if (parsedAmount > 0) {
      if (routeType === 'international' && sourceBank.limits?.internationalOutboundAmount) {
        if (parsedAmount > sourceBank.limits.internationalOutboundAmount) {
          limitWarning = `Input amount exceeds standard digital outbound limit (${sourceBank.limits.internationalOutbound}). Requires branch wire room or institutional treasury clearance.`;
        }
      } else if (routeType === 'domestic' && sourceBank.limits?.domesticDailyAmount) {
        if (parsedAmount > sourceBank.limits.domesticDailyAmount) {
          limitWarning = `Input amount exceeds standard domestic digital daily cap (${sourceBank.limits.domesticDaily}). High-value RTGS or wire room clearance required.`;
        }
      }
    }

    return {
      routeType,
      expectedTime,
      recommendedRail,
      availableRails,
      estimatedFee,
      limitWarning,
      isSameBank,
      isSameCountry,
      isBothEurozone
    };
  }, [sourceBank, targetBank, amount]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Universal Interbank Route Simulator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Simulate Transfer Between Any Two Banks
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Select the Origin bank and Destination bank to compute expected completion times, clearing rails, and transaction limits.
        </p>
      </div>

      {/* Selector Box */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          
          {/* Sender Bank */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>1. Origin / Sender Bank</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {sourceBank?.country} • {sourceBank?.bankType}
              </span>
            </div>

            <input
              type="text"
              value={sourceSearch}
              onChange={(e) => setSourceSearch(e.target.value)}
              placeholder="🔍 Search 11,600+ banks (name, country, SWIFT)..."
              className="w-full px-3 py-1.5 bg-slate-950/70 border border-slate-700/70 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 mb-1"
            />

            <select
              value={sourceBankId}
              onChange={(e) => setSourceBankId(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-100 text-sm font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none shadow-inner"
            >
              {availableSourceBanks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.flag} {b.name} ({b.country}) - {b.swiftBic}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-4 md:pt-8">
            <button
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-cyan-400 hover:text-white border border-slate-600 transition shadow-md active:scale-95"
              title="Swap Origin and Destination"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Receiver Bank */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>2. Destination / Receiver Bank</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {targetBank?.country} • {targetBank?.bankType}
              </span>
            </div>

            <input
              type="text"
              value={targetSearch}
              onChange={(e) => setTargetSearch(e.target.value)}
              placeholder="🔍 Search 11,600+ banks (name, country, SWIFT)..."
              className="w-full px-3 py-1.5 bg-slate-950/70 border border-slate-700/70 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 mb-1"
            />

            <select
              value={targetBankId}
              onChange={(e) => setTargetBankId(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-2xl text-slate-100 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-inner"
            >
              {availableTargetBanks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.flag} {b.name} ({b.country}) - {b.swiftBic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transfer Amount Input */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Test Transfer Amount:
            </label>
            <div className="relative flex-1 sm:w-48">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-mono text-sm">
                $
              </span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Base Currencies: <strong className="text-cyan-300">{sourceBank?.limits?.currency}</strong> ➔ <strong className="text-emerald-300">{targetBank?.limits?.currency}</strong>
          </div>
        </div>
      </div>

      {/* Analysis Result Banner */}
      {routeAnalysis && sourceBank && targetBank && (
        <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* Top Route Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{sourceBank.flag}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-2xl">{targetBank.flag}</span>
              <div className="ml-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  {routeAnalysis.routeType === 'intrabank' && 'Internal Same-Bank Transfer'}
                  {routeAnalysis.routeType === 'domestic' && `Domestic Interbank Rail (${sourceBank.country})`}
                  {routeAnalysis.routeType === 'sepa' && 'Eurozone SEPA Cross-Border Rail'}
                  {routeAnalysis.routeType === 'international' && 'Global Cross-Border SWIFT Corridors'}
                </span>
                <span className="text-sm font-semibold text-white">
                  {sourceBank.name} to {targetBank.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                routeAnalysis.routeType === 'intrabank' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : routeAnalysis.routeType === 'domestic'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {routeAnalysis.routeType}
              </span>
            </div>
          </div>

          {/* Core Metrics: Speed, Limits, Rails, Fees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Completion Speed */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                <Clock className="w-4 h-4" />
                <span>Estimated Completion Time</span>
              </div>
              <div className="text-base font-bold text-white mt-1">
                {routeAnalysis.expectedTime}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Cut-off: {sourceBank.completionTimes?.cutOffTime || 'Standard banking hours'}
              </span>
            </div>

            {/* Recommended Clearing Rail */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
                <Zap className="w-4 h-4" />
                <span>Primary Clearing Rail</span>
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1 truncate" title={routeAnalysis.recommendedRail}>
                {routeAnalysis.recommendedRail}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                {routeAnalysis.availableRails.join(', ')}
              </span>
            </div>

            {/* Sender Maximum Limit */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Origin Outbound Limit</span>
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1 truncate" title={sourceBank.limits?.internationalOutbound}>
                {routeAnalysis.routeType === 'international' 
                  ? sourceBank.limits?.internationalOutbound 
                  : sourceBank.limits?.domesticDaily}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Instant cap: {sourceBank.limits?.domesticInstant || 'N/A'}
              </span>
            </div>

            {/* Indicative Transfer Fees */}
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
                <Layers className="w-4 h-4" />
                <span>Indicative Tariff</span>
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">
                {routeAnalysis.estimatedFee}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                Excludes intermediary correspondent deductions
              </span>
            </div>
          </div>

          {/* Limit Alert if triggered */}
          {routeAnalysis.limitWarning && (
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/50 flex items-start gap-3 text-xs text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Limit Advisory:</strong> {routeAnalysis.limitWarning}
              </div>
            </div>
          )}

          {/* Payment Methods Supported by Origin Bank */}
          <div className="pt-2 border-t border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Available Payment Methods from {sourceBank.name}</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                {getBankPaymentOptions(sourceBank).length} Payment Channels
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {getBankPaymentOptions(sourceBank).map((opt) => (
                <div 
                  key={opt.id} 
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-1.5 mb-1">
                    <span className="font-bold text-white text-xs truncate" title={opt.name}>
                      {opt.name}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 flex-shrink-0">
                      {opt.shortCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-amber-300/90 mb-1.5">
                    <span>Speed: {opt.speed}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="truncate mr-1">Limit: {opt.perTransactionLimit}</span>
                    <span className="truncate font-medium text-slate-300">{opt.typicalFee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bank Profiles Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Sender Bank Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Origin Institution
                </span>
                <button
                  onClick={() => onSelectBank(sourceBank)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  View Dossier
                </button>
              </div>
              <div className="font-bold text-white text-base">{sourceBank.name}</div>
              <div className="text-xs text-slate-300 font-mono">SWIFT: {sourceBank.swiftBic}</div>
              <div className="text-xs text-slate-400">{sourceBank.clearingCodeType}: {sourceBank.clearingCode}</div>
              <div className="text-xs text-slate-400">HQ: {sourceBank.city}, {sourceBank.country}</div>
            </div>

            {/* Receiver Bank Summary */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Destination Institution
                </span>
                <button
                  onClick={() => onSelectBank(targetBank)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  View Dossier
                </button>
              </div>
              <div className="font-bold text-white text-base">{targetBank.name}</div>
              <div className="text-xs text-slate-300 font-mono">SWIFT: {targetBank.swiftBic}</div>
              <div className="text-xs text-slate-400">{targetBank.clearingCodeType}: {targetBank.clearingCode}</div>
              <div className="text-xs text-slate-400">HQ: {targetBank.city}, {targetBank.country}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
