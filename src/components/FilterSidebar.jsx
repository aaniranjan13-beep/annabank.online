import React, { useState, useMemo } from 'react';
import { Filter, RotateCcw, Search, X, DollarSign, Layers, ArrowUpDown, Landmark } from 'lucide-react';

export default function FilterSidebar({
  searchQuery = '',
  setSearchQuery = () => {},
  bankTypes = [],
  selectedBankType = 'All Types',
  setSelectedBankType = () => {},
  countries = [],
  selectedCountry = 'All',
  setSelectedCountry = () => {},
  paymentRails = [],
  selectedRail = 'All',
  setSelectedRail = () => {},
  currencies = [],
  selectedCurrency = 'All',
  setSelectedCurrency = () => {},
  sortBy = 'name_asc',
  setSortBy = () => {},
  onResetFilters = () => {},
  hasActiveFilters = false
}) {
  const [countrySearch, setCountrySearch] = useState('');

  // Filter 170+ countries by search term
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return countries;
    const q = countrySearch.toLowerCase().trim();
    return countries.filter((c) => c.toLowerCase().includes(q));
  }, [countries, countrySearch]);

  return (
    <aside className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Directory Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => {
              onResetFilters();
              setCountrySearch('');
            }}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Quick Universal Search Filter (Replaces Region) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search Filter</span>
          </label>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 transition font-medium"
            >
              Clear
            </button>
          )}
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bank, country, code..."
            className="w-full pl-8.5 pr-8 py-2 bg-slate-900/90 border border-slate-700 focus:border-cyan-500 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-slate-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Bank Category / Classification */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-cyan-400" />
          <span>Bank Type / Category</span>
        </label>
        <select
          value={selectedBankType}
          onChange={(e) => setSelectedBankType(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          {bankTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'All Types' ? '🏦 All Bank Categories' : type}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Country Filter with Search Option */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>🏳️ Country ({countries.length})</span>
          </label>
          {selectedCountry !== 'All' && (
            <button
              onClick={() => setSelectedCountry('All')}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 transition font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Search input to filter 170+ countries */}
        <div className="relative">
          <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
            placeholder="Search countries..."
            className="w-full pl-7 pr-7 py-1.5 bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-lg text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none placeholder-slate-500"
          />
          {countrySearch && (
            <button
              onClick={() => setCountrySearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="All">All Countries ({countries.length})</option>
          {filteredCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Rails */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Payment Rail / Network</span>
        </label>
        <select
          value={selectedRail}
          onChange={(e) => setSelectedRail(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="All">All Clearing Rails</option>
          {paymentRails.map((rail) => (
            <option key={rail} value={rail}>
              {rail}
            </option>
          ))}
        </select>
      </div>

      {/* Currencies */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>Settlement Currency</span>
        </label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="All">All Currencies</option>
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="space-y-2 pt-2 border-t border-slate-700/60">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sort By</span>
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          <option value="name_asc">Bank Name (A - Z)</option>
          <option value="country_asc">Country (A - Z)</option>
          <option value="daily_limit_desc">Highest Domestic Daily Limit</option>
          <option value="outbound_limit_desc">Highest Outbound Wire Limit</option>
        </select>
      </div>

      {/* Quick helper note */}
      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-300/80 leading-relaxed">
        💡 <strong>Directory covers:</strong> Mega banks, Government / State-Owned, Village & Rural (Gramin), Cooperative, Credit Unions, and Neobanks.
      </div>
    </aside>
  );
}
