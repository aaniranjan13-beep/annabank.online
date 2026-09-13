import React, { useState } from 'react';
import { ExternalLink, ArrowLeftRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBankPaymentOptions } from '../data/paymentOptionsHelper';

export default function TableView({ banks, onSelectBank, onSelectForEstimator }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [prevBanks, setPrevBanks] = useState(banks);

  // Safely adjust page to 1 if banks array reference changes
  if (banks !== prevBanks) {
    setPrevBanks(banks);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(banks.length / pageSize));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * pageSize;
  const currentBanks = banks.slice(startIndex, startIndex + pageSize);

  const formatWebsiteUrl = (url) => {
    if (!url) return '#';
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

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
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden space-y-0">
      {/* Table Header Bar with Pagination summary */}
      <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-white">{banks.length === 0 ? 0 : startIndex + 1}</span> to{' '}
          <span className="font-semibold text-white">{Math.min(startIndex + pageSize, banks.length)}</span> of{' '}
          <span className="font-semibold text-white">{banks.length}</span> institutions
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs outline-none focus:border-cyan-500"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validPage <= 1}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 text-xs text-slate-300 bg-slate-800/60 border border-slate-750 rounded-lg">
              Page <span className="text-white font-semibold">{validPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validPage >= totalPages}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-700 uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4">Bank Name</th>
              <th className="py-3.5 px-4">Type / Category</th>
              <th className="py-3.5 px-4">Country & Region</th>
              <th className="py-3.5 px-4">SWIFT / BIC</th>
              <th className="py-3.5 px-4">Clearing Code</th>
              <th className="py-3.5 px-4">Payment Options</th>
              <th className="py-3.5 px-4">Domestic Daily Limit</th>
              <th className="py-3.5 px-4">Instant Rail Limit</th>
              <th className="py-3.5 px-4">Outbound Wire Limit</th>
              <th className="py-3.5 px-4">Instant Speed</th>
              <th className="py-3.5 px-4">SWIFT Speed</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 text-slate-200">
            {currentBanks.map((bank) => (
              <tr 
                key={bank.id} 
                onClick={() => onSelectBank(bank)}
                className="hover:bg-slate-700/40 cursor-pointer transition-colors"
              >
                {/* Bank Name */}
                <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{bank.flag}</span>
                    <div>
                      <span className="font-bold text-white hover:text-cyan-300 block">{bank.name}</span>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-normal">
                        <span>{bank.city}</span>
                        {bank.website && (
                          <>
                            <span>•</span>
                            <a
                              href={formatWebsiteUrl(bank.website)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-0.5"
                              title={bank.website}
                            >
                              <span>{bank.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold border rounded-full ${getBadgeStyle(bank.bankType)}`}>
                    {bank.bankType || 'Commercial'}
                  </span>
                </td>

                {/* Country */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-medium text-slate-300">{bank.country}</span>
                  <span className="block text-[10px] text-slate-500">{bank.region}</span>
                </td>

                {/* SWIFT */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-mono text-cyan-300 font-semibold bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60">
                    {bank.swiftBic}
                  </span>
                </td>

                {/* Clearing Code */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-mono text-slate-300 block">{bank.clearingCode}</span>
                  <span className="text-[10px] text-slate-500">{bank.clearingCodeType}</span>
                </td>

                {/* Payment Options */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {getBankPaymentOptions(bank).slice(0, 3).map((opt) => (
                      <span
                        key={opt.id}
                        className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-900 border border-slate-700/80 rounded text-cyan-300"
                        title={`${opt.name} (${opt.category}): ${opt.speed} | Limit: ${opt.perTransactionLimit}`}
                      >
                        {opt.shortCode}
                      </span>
                    ))}
                    {getBankPaymentOptions(bank).length > 3 && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        +{getBankPaymentOptions(bank).length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Domestic Daily Limit */}
                <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-200">
                  {bank.limits?.domesticDaily || 'Standard'}
                </td>

                {/* Instant Limit */}
                <td className="py-3.5 px-4 whitespace-nowrap font-medium text-amber-300">
                  {bank.limits?.domesticInstant || 'N/A'}
                </td>

                {/* Outbound Limit */}
                <td className="py-3.5 px-4 whitespace-nowrap font-medium text-emerald-300">
                  {bank.limits?.internationalOutbound || 'Unlimited'}
                </td>

                {/* Instant Speed */}
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 text-[11px]">
                  {bank.completionTimes?.instantRail || 'Real-time'}
                </td>

                {/* SWIFT Speed */}
                <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 text-[11px]">
                  {bank.completionTimes?.internationalSwift || '1-3 Days'}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    {bank.website && (
                      <a
                        href={formatWebsiteUrl(bank.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-700/80 hover:bg-blue-600 text-blue-300 hover:text-white transition flex items-center justify-center"
                        title={`Visit official portal: ${bank.website}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => onSelectForEstimator(bank)}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-cyan-400 hover:text-white transition"
                      title="Simulate Transfer"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectBank(bank)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-medium transition"
                    >
                      Dossier
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-5 py-3.5 bg-slate-900/90 border-t border-slate-700/80 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Showing <span className="font-medium text-white">{startIndex + 1}</span> - <span className="font-medium text-white">{Math.min(startIndex + pageSize, banks.length)}</span> of <span className="font-semibold text-white">{banks.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={validPage <= 1}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validPage <= 1}
              className="px-3 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <span className="text-xs text-slate-300 px-2 font-medium">
              Page {validPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validPage >= totalPages}
              className="px-3 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={validPage >= totalPages}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
