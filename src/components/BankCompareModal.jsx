import React from 'react';
import { X, ArrowLeftRight, Globe2, ExternalLink } from 'lucide-react';
import { getBankPaymentOptions } from '../data/paymentOptionsHelper';

export default function BankCompareModal({ banks, onClose, onRemoveFromCompare, onClearCompare }) {
  if (!banks || banks.length === 0) return null;

  const formatWebsiteUrl = (url) => {
    if (!url) return '#';
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-800/80 border-b border-slate-700/60 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Compare Worldwide Banks</h2>
              <p className="text-xs text-slate-400">
                Comparing {banks.length} bank{banks.length > 1 ? 's' : ''} on transaction limits, speeds, and clearing capabilities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearCompare}
              className="px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-xs text-slate-300 transition"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Comparison Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          <div className="min-w-[700px]">
            <div 
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${banks.length + 1}, minmax(0, 1fr))` }}
            >
              
              {/* Labels Column */}
              <div className="space-y-6 pt-24 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="h-8 flex items-center">SWIFT / BIC</div>
                <div className="h-8 flex items-center">Clearing Code</div>
                <div className="h-8 flex items-center">Official Website</div>
                <div className="h-8 flex items-center">Tier Status</div>
                <div className="h-8 flex items-center text-cyan-400">Domestic Daily Limit</div>
                <div className="h-8 flex items-center text-amber-400">Instant Rail Limit</div>
                <div className="h-8 flex items-center text-emerald-400">Outbound Wire Limit</div>
                <div className="h-8 flex items-center text-amber-300">Instant Speed</div>
                <div className="h-8 flex items-center text-blue-300">Domestic ACH Speed</div>
                <div className="h-8 flex items-center text-cyan-300">SWIFT Wire Speed</div>
                <div className="h-8 flex items-center">Daily Cut-off</div>
                <div className="h-16 flex items-center">Payment Rails</div>
              </div>

              {/* Bank Columns */}
              {banks.map((bank) => {
                const paymentOpts = getBankPaymentOptions(bank);
                return (
                  <div 
                    key={bank.id} 
                    className="space-y-6 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 relative"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveFromCompare(bank.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-700/60 hover:bg-rose-600/80 text-slate-300 hover:text-white transition"
                      title="Remove from compare"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    {/* Bank Header */}
                    <div className="h-20 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{bank.flag}</span>
                        <span className="text-xs text-slate-400 font-semibold">{bank.country}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm line-clamp-1">{bank.name}</h4>
                    </div>

                    {/* Attributes */}
                    <div className="h-8 flex items-center font-mono text-cyan-300 text-xs font-bold truncate">
                      {bank.swiftBic}
                    </div>
                    <div className="h-8 flex items-center font-mono text-slate-200 text-xs truncate">
                      {bank.clearingCode}
                    </div>
                    <div className="h-8 flex items-center text-xs truncate">
                      {bank.website ? (
                        <a
                          href={formatWebsiteUrl(bank.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1"
                        >
                          <Globe2 className="w-3 h-3" />
                          <span className="truncate max-w-[120px]">{bank.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-slate-500">N/A</span>
                      )}
                    </div>
                    <div className="h-8 flex items-center text-xs text-slate-300 truncate">
                      {bank.tier || 'Commercial'}
                    </div>
                    <div className="h-8 flex items-center text-xs font-semibold text-cyan-300 truncate" title={bank.limits?.domesticDaily}>
                      {bank.limits?.domesticDaily || 'Standard'}
                    </div>
                    <div className="h-8 flex items-center text-xs font-semibold text-amber-300 truncate" title={bank.limits?.domesticInstant}>
                      {bank.limits?.domesticInstant || 'N/A'}
                    </div>
                    <div className="h-8 flex items-center text-xs font-semibold text-emerald-300 truncate" title={bank.limits?.internationalOutbound}>
                      {bank.limits?.internationalOutbound || 'Unlimited'}
                    </div>
                    <div className="h-8 flex items-center text-xs text-amber-200 truncate">
                      {bank.completionTimes?.instantRail || 'Real-time'}
                    </div>
                    <div className="h-8 flex items-center text-xs text-slate-300 truncate">
                      {bank.completionTimes?.domesticACH || '1-2 Days'}
                    </div>
                    <div className="h-8 flex items-center text-xs text-cyan-200 truncate">
                      {bank.completionTimes?.internationalSwift || '1-3 Days'}
                    </div>
                    <div className="h-8 flex items-center text-xs text-slate-400 truncate">
                      {bank.completionTimes?.cutOffTime || '16:00 Local'}
                    </div>
                    <div className="h-16 flex flex-wrap gap-1 items-center overflow-hidden">
                      {paymentOpts.slice(0, 4).map((opt) => (
                        <span key={opt.id} className="px-1.5 py-0.5 text-[9px] bg-slate-900 text-cyan-300 rounded border border-slate-700 font-medium">
                          {opt.shortCode}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
