import React from 'react';
import { 
  Building2, 
  Globe2, 
  ArrowLeftRight, 
  PlusCircle, 
  Download, 
  FileSpreadsheet, 
  Layers, 
  RotateCcw
} from 'lucide-react';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';

import metadata from '../data/metadata.json';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  banksCount, 
  countriesCount, 
  filteredBanks,
  onOpenAddModal,
  onResetData,
  compareList,
  onOpenCompare
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('directory')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white">
                  Anna <span className="text-cyan-400">Directory</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                  {countriesCount ? `${countriesCount} Countries` : 'Worldwide'}
                </span>
                <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Auto-Sync Active ({metadata.lastUpdatedFormatted || 'Daily'})
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Interbank Limits, Settlement Speeds & Global Clearing Codes
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="hidden md:flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'directory'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Bank Directory</span>
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-slate-900/40 text-slate-200">
                {banksCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('estimator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'estimator'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4 text-cyan-400" />
              <span>Interbank Route Estimator</span>
            </button>

            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'table'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Matrix Table</span>
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Compare Badge */}
            {compareList.length > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-semibold animate-pulse transition"
              >
                <span>Compare</span>
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-full font-bold">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Add Bank Button */}
            <button
              onClick={onOpenAddModal}
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition shadow-sm"
              title="Add Custom Bank"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Add Bank</span>
            </button>

            {/* Export Dropdown / Actions */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => exportToCSV(filteredBanks)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition"
                title="Download Filtered Results as CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">CSV</span>
              </button>
              <span className="w-[1px] h-4 bg-slate-700"></span>
              <button
                onClick={() => exportToJSON(filteredBanks)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition"
                title="Download Filtered Results as JSON"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">JSON</span>
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={onResetData}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition"
              title="Reset Dataset to Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-md ${
              activeTab === 'directory' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Directory ({banksCount})
          </button>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-md ${
              activeTab === 'estimator' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Route Estimator
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-md ${
              activeTab === 'table' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Table
          </button>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 py-1 px-3 rounded-md text-emerald-400"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </header>
  );
}
