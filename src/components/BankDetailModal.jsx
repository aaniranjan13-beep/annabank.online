import React, { useState } from 'react';
import { 
  X, 
  Globe2, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  Zap, 
  DollarSign, 
  ShieldCheck, 
  ArrowLeftRight, 
  Layers, 
  AlertCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { getBankPaymentOptions, PAYMENT_CATEGORIES } from '../data/paymentOptionsHelper';

export default function BankDetailModal({ bank, onClose, onSelectForEstimator }) {
  const [copiedField, setCopiedField] = useState(null);
  const [selectedPaymentCategory, setSelectedPaymentCategory] = useState('all');

  if (!bank) return null;

  const paymentOptions = getBankPaymentOptions(bank);
  const filteredOptions = selectedPaymentCategory === 'all' 
    ? paymentOptions 
    : paymentOptions.filter(p => p.categoryType === selectedPaymentCategory);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatWebsiteUrl = (url) => {
    if (!url) return '#';
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-blue-900/60 via-slate-800/80 to-slate-900 border-b border-slate-700/60 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl shadow-sm" role="img" aria-label={bank.country}>
                {bank.flag}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {bank.country} • {bank.region}
                  </span>
                  {bank.bankType && (
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full">
                      {bank.bankType}
                    </span>
                  )}
                  {bank.tier && (
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full">
                      {bank.tier}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {bank.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  {bank.legalName} • {bank.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {bank.website && (
                <a
                  href={formatWebsiteUrl(bank.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 border border-blue-400/30 transition"
                  title="Open official bank website in new tab"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: Identifiers & Clearing Codes */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Bank Identifiers & National Clearing</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* SWIFT / BIC */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">SWIFT / BIC Code</span>
                  <span className="font-mono text-base font-bold text-cyan-300 block mt-0.5">
                    {bank.swiftBic}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(bank.swiftBic, 'swift')}
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition"
                  title="Copy SWIFT"
                >
                  {copiedField === 'swift' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* National Clearing Code */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">{bank.clearingCodeType || 'Clearing Code'}</span>
                  <span className="font-mono text-base font-bold text-slate-100 block mt-0.5">
                    {bank.clearingCode}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(bank.clearingCode, 'code')}
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition"
                  title="Copy Clearing Code"
                >
                  {copiedField === 'code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Official Website */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-xs text-slate-400 font-medium block">Official Website</span>
                  <a
                    href={formatWebsiteUrl(bank.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 hover:underline block truncate mt-0.5"
                    title={bank.website}
                  >
                    {bank.website ? bank.website.replace(/^https?:\/\//, '') : 'N/A'}
                  </a>
                </div>
                {bank.website && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => copyToClipboard(bank.website, 'website')}
                      className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy Website URL"
                    >
                      {copiedField === 'website' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={formatWebsiteUrl(bank.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 transition"
                      title="Open Official Website"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-400" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: All Payment Options Provided by Bank */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Payment Options & Supported Payment Methods ({paymentOptions.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  All domestic and international payment options provided by {bank.name}, including per-transaction limits, speeds, fees, and operational hours.
                </p>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {PAYMENT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedPaymentCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                    selectedPaymentCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/40'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Payment Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOptions.map((opt) => (
                <div 
                  key={opt.id} 
                  className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 relative overflow-hidden group shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/70 border border-cyan-800/50 px-2.5 py-0.5 rounded-full">
                        {opt.category}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-slate-300 flex-shrink-0">
                        {opt.shortCode}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {opt.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      Protocol: {opt.railProtocol}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  {/* Payment Details Specs Matrix */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/60 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Per-Tx Limit</span>
                      <span className="font-bold text-emerald-300 text-xs block mt-0.5 truncate" title={opt.perTransactionLimit}>
                        {opt.perTransactionLimit}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Settlement Speed</span>
                      <span className="font-bold text-amber-300 text-xs block mt-0.5 truncate" title={opt.speed}>
                        {opt.speed}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Fee / Tariff</span>
                      <span className="font-semibold text-slate-200 text-xs block mt-0.5 truncate" title={opt.typicalFee}>
                        {opt.typicalFee}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90">
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Availability</span>
                      <span className="font-semibold text-slate-300 text-xs block mt-0.5 truncate" title={opt.availability}>
                        {opt.availability}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Transaction Limits Matrix */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Transaction Limits & Cap Architecture</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <span className="text-xs text-slate-400 font-medium block">Domestic Daily Limit</span>
                <span className="text-sm font-bold text-white block mt-1">
                  {bank.limits?.domesticDaily || 'Standard'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Per business day clearing cap</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30">
                <span className="text-xs text-amber-300 font-medium block flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Instant Rail Limit
                </span>
                <span className="text-sm font-bold text-amber-200 block mt-1">
                  {bank.limits?.domesticInstant || 'N/A'}
                </span>
                <span className="text-[11px] text-amber-400/60 block mt-0.5">Real-time / Instant rails</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <span className="text-xs text-slate-400 font-medium block">Domestic Monthly Limit</span>
                <span className="text-sm font-bold text-white block mt-1">
                  {bank.limits?.domesticMonthly || 'Unlimited'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Rolling 30-day ceiling</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30">
                <span className="text-xs text-emerald-300 font-medium block">International Outbound Limit</span>
                <span className="text-sm font-bold text-emerald-200 block mt-1">
                  {bank.limits?.internationalOutbound || 'Unlimited'}
                </span>
                <span className="text-[11px] text-emerald-400/60 block mt-0.5">Cross-border wire digital cap</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <span className="text-xs text-slate-400 font-medium block">International Inbound Limit</span>
                <span className="text-sm font-bold text-white block mt-1">
                  {bank.limits?.internationalInbound || 'Unlimited'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Incoming cross-border wire</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
                <span className="text-xs text-slate-400 font-medium block">Single Transaction Ceiling</span>
                <span className="text-sm font-bold text-white block mt-1">
                  {bank.limits?.singleTransactionMax || 'Per channel policy'}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Maximum per transfer ceiling</span>
              </div>
            </div>
          </div>

          {/* Section 3: Settlement Speeds & Completion Times */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Settlement Times & Clearing Windows</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Instant / Real-Time Rails</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">
                    {bank.completionTimes?.instantRail || 'Real-time (seconds)'}
                  </span>
                  <span className="text-[11px] text-slate-500">24/7/365 immediate settlement</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Domestic ACH / Standard Clearing</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">
                    {bank.completionTimes?.domesticACH || '1 - 2 Business Days'}
                  </span>
                  <span className="text-[11px] text-slate-500">National batch clearing cycle</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Domestic Wire / RTGS Settlement</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">
                    {bank.completionTimes?.domesticWire || 'Same-Day (within 1-2 hours)'}
                  </span>
                  <span className="text-[11px] text-slate-500">Gross real-time settlement</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 font-medium block">International SWIFT Cross-Border</span>
                  <span className="text-sm font-semibold text-white block mt-0.5">
                    {bank.completionTimes?.internationalSwift || '1 - 3 Business Days'}
                  </span>
                  <span className="text-[11px] text-slate-500">Correspondent banking hops</span>
                </div>
              </div>
            </div>

            {/* Cut off time */}
            {bank.completionTimes?.cutOffTime && (
              <div className="mt-3 p-3 rounded-xl bg-slate-800/30 border border-slate-700/40 text-xs text-slate-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong>Daily Processing Cut-Off Time:</strong> {bank.completionTimes.cutOffTime}. Transfers initiated after cut-off settle next business day.
                </span>
              </div>
            )}
          </div>

          {/* Section 4: Supported Rails & Currencies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Supported Payment Rails</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {bank.supportedRails?.map((rail, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700 rounded-lg shadow-sm"
                  >
                    {rail}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Primary Settlement Currencies</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {bank.currencies?.map((curr, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs font-mono font-semibold bg-emerald-950/30 text-emerald-300 border border-emerald-800/40 rounded-lg"
                  >
                    {curr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Typical Fees & Network */}
          {bank.typicalFees && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-cyan-400" />
                <span>Fee Schedule & Indicative Tariffs</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Standard ACH</span>
                  <span className="font-semibold text-slate-200 block mt-1">{bank.typicalFees.domesticACH}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Domestic Wire</span>
                  <span className="font-semibold text-slate-200 block mt-1">{bank.typicalFees.domesticWire}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Outbound SWIFT</span>
                  <span className="font-semibold text-slate-200 block mt-1">{bank.typicalFees.internationalOutbound}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                  <span className="text-slate-400 block text-[11px]">Inbound Wire</span>
                  <span className="font-semibold text-slate-200 block mt-1">{bank.typicalFees.internationalInbound}</span>
                </div>
              </div>
            </div>
          )}

          {/* Global Network Notes */}
          {bank.internationalNetwork && (
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300">
              <strong className="text-blue-300 block mb-1">Clearing Network & Community Footprint:</strong>
              {bank.internationalNetwork}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition"
          >
            Close Dossier
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectForEstimator(bank);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-blue-500/20 transition"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Simulate Transfer with this Bank</span>
          </button>
        </div>
      </div>
    </div>
  );
}
