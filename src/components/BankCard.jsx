import React, { useState } from 'react';
import { 
  Globe2, 
  Zap, 
  Clock, 
  ArrowUpRight,
  Copy, 
  Check, 
  ArrowLeftRight,
  ExternalLink
} from 'lucide-react';
import { getBankPaymentOptions } from '../data/paymentOptionsHelper';

export default function BankCard({ 
  bank, 
  onSelectBank, 
  isCompared, 
  onToggleCompare, 
  onSelectForEstimator 
}) {
  const paymentOptions = getBankPaymentOptions(bank);
  const [copiedSwift, setCopiedSwift] = useState(false);

  const formatWebsiteUrl = (url) => {
    if (!url) return '#';
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  const handleCopySwift = (e) => {
    e.stopPropagation();
    if (bank.swiftBic) {
      navigator.clipboard.writeText(bank.swiftBic);
      setCopiedSwift(true);
      setTimeout(() => setCopiedSwift(false), 2000);
    }
  };

  // Badge styling depending on bankType
  const getBadgeStyle = (type = '') => {
    if (type.includes('Rural') || type.includes('Village')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (type.includes('Government') || type.includes('Public')) {
      return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
    if (type.includes('Cooperative') || type.includes('Credit Union') || type.includes('Mutual')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    if (type.includes('Postal')) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
    if (type.includes('Digital') || type.includes('Neobank')) {
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    }
    return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
  };

  return (
    <div 
      onClick={() => onSelectBank(bank)}
      className="group bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Accent Gradient on Hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header: Flag, Country & Bank Type */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={bank.country}>
              {bank.flag}
            </span>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {bank.country}
              </span>
              <span className="text-[11px] text-slate-500">{bank.city}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {/* Category / Type Badge */}
            <span className={`px-2 py-0.5 text-[10px] font-semibold border rounded-full ${getBadgeStyle(bank.bankType)}`}>
              {bank.bankType || 'Commercial'}
            </span>
            
            {/* Compare Checkbox Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(bank);
              }}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isCompared 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold' 
                  : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bank Title & Official Website Link */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {bank.name}
          </h3>
          <div className="flex items-center justify-between gap-2 mt-1">
            <p className="text-xs text-slate-400 font-normal line-clamp-1">
              {bank.legalName || bank.city}
            </p>
            {bank.website && (
              <a
                href={formatWebsiteUrl(bank.website)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium hover:underline flex-shrink-0 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-md"
                title={`Visit official website: ${bank.website}`}
              >
                <Globe2 className="w-3 h-3 text-cyan-400" />
                <span className="truncate max-w-[130px]">{bank.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                <ExternalLink className="w-2.5 h-2.5 text-cyan-400 opacity-80" />
              </a>
            )}
          </div>
        </div>

        {/* SWIFT & Clearing Identifiers Pill */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div 
            onClick={handleCopySwift}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-slate-600 transition"
            title="Click to copy SWIFT/BIC"
          >
            <div className="overflow-hidden">
              <span className="block text-[9px] text-slate-400 font-medium uppercase">SWIFT / BIC</span>
              <span className="font-mono text-xs font-semibold text-cyan-300 truncate block">
                {bank.swiftBic}
              </span>
            </div>
            {copiedSwift ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 flex-shrink-0" />
            )}
          </div>

          <div className="p-2 rounded-xl bg-slate-900/70 border border-slate-700/60 overflow-hidden">
            <span className="block text-[9px] text-slate-400 font-medium uppercase truncate">
              {bank.clearingCodeType || 'Clearing Code'}
            </span>
            <span className="font-mono text-xs font-semibold text-slate-200 truncate block">
              {bank.clearingCode}
            </span>
          </div>
        </div>

        {/* Transaction Limits Matrix */}
        <div className="space-y-2 mb-4 bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Domestic Daily Limit:
            </span>
            <span className="font-semibold text-slate-200 text-right truncate ml-2 max-w-[170px]" title={bank.limits?.domesticDaily}>
              {bank.limits?.domesticDaily || 'Standard'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Instant Rail Limit:
            </span>
            <span className="font-semibold text-amber-300 text-right truncate ml-2 max-w-[170px]" title={bank.limits?.domesticInstant}>
              {bank.limits?.domesticInstant || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Outbound Wire Limit:
            </span>
            <span className="font-semibold text-emerald-300 text-right truncate ml-2 max-w-[170px]" title={bank.limits?.internationalOutbound}>
              {bank.limits?.internationalOutbound || 'Unlimited'}
            </span>
          </div>
        </div>

        {/* Completion Speeds */}
        <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate" title={`Instant: ${bank.completionTimes?.instantRail}`}>
              {bank.completionTimes?.instantRail || 'Real-time'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate" title={`SWIFT: ${bank.completionTimes?.internationalSwift}`}>
              {bank.completionTimes?.internationalSwift || '1-3 Days'}
            </span>
          </div>
        </div>

        {/* Payment Options Provided by Bank */}
        <div className="mb-4 pt-2.5 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Payment Options ({paymentOptions.length})</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">
              {paymentOptions[0]?.shortCode} • {paymentOptions[1]?.shortCode}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {paymentOptions.slice(0, 5).map((opt) => (
              <span 
                key={opt.id} 
                className="px-2 py-0.5 text-[10px] font-medium bg-slate-900/90 text-slate-300 rounded-md border border-slate-700/60 hover:border-cyan-500/40 transition"
                title={`${opt.name} (${opt.category}): ${opt.speed} | Limit: ${opt.perTransactionLimit} | Fee: ${opt.typicalFee}`}
              >
                {opt.shortCode}
              </span>
            ))}
            {paymentOptions.length > 5 && (
              <span 
                className="px-1.5 py-0.5 text-[10px] bg-slate-900 text-slate-400 rounded-md border border-slate-700/60"
                title={`+${paymentOptions.length - 5} more payment methods`}
              >
                +{paymentOptions.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Card Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 text-xs">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectForEstimator(bank);
          }}
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Simulate Route</span>
        </button>

        <span className="text-slate-400 group-hover:text-white flex items-center gap-1 font-medium transition">
          <span>Full Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
        </span>
      </div>
    </div>
  );
}
