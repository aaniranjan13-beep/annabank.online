import React from 'react';
import { Search, X, Zap, ShieldCheck, ArrowUpRight, Sparkles, Filter, Landmark, Trees, Users, Smartphone } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  totalResults,
  totalCount,
  activeFilterPreset,
  setActiveFilterPreset,
  onToggleSidebarMobile
}) {
  const PRESETS = [
    { id: 'all', label: 'All Banks', icon: Sparkles },
    { id: 'government', label: '🏛️ Government Banks', icon: Landmark },
    { id: 'village_rural', label: '🌾 Village & Rural Banks', icon: Trees },
    { id: 'local_coop', label: '🤝 Local & Cooperative', icon: Users },
    { id: 'digital', label: '⚡ Digital / Neobanks', icon: Smartphone },
    { id: 'instant', label: '🚀 Instant Rails (<10s)', icon: Zap },
    { id: 'gsib', label: '🛡️ Tier 1 (G-SIB)', icon: ShieldCheck },
    { id: 'high_limit', label: '💰 High Limit ($100k+)', icon: ArrowUpRight },
  ];

  return (
    <div className="space-y-3">
      {/* Primary Search Input */}
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-cyan-400" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search whatever is in directory... local banks, village banks, government banks, commercial, SWIFT, clearing code, rail, limit..."
          className="w-full pl-12 pr-28 py-3.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base shadow-lg transition-all"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center text-xs font-semibold px-2.5 py-1 bg-slate-900/80 text-cyan-400 rounded-lg border border-slate-700/70">
            {totalResults} / {totalCount}
          </div>

          <button
            onClick={onToggleSidebarMobile}
            className="md:hidden flex items-center gap-1 p-2 bg-slate-700/80 text-slate-200 rounded-lg text-xs"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap text-xs flex items-center gap-1">
          Quick Filters:
        </span>
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isActive = activeFilterPreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setActiveFilterPreset(isActive && preset.id !== 'all' ? 'all' : preset.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
