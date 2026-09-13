import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import BankCard from './components/BankCard';
import BankDetailModal from './components/BankDetailModal';
import TransferEstimator from './components/TransferEstimator';
import TableView from './components/TableView';
import BankCompareModal from './components/BankCompareModal';
import AddBankModal from './components/AddBankModal';

import { 
  getInitialBanks, 
  saveCustomBank, 
  resetToDefaultBanks, 
  getUniqueCountries, 
  BANK_TYPES,
  getUniquePaymentRails, 
  getUniqueCurrencies 
} from './data';
import { getBankPaymentOptions } from './data/paymentOptionsHelper';

import { 
  Globe2, 
  SearchX, 
  Check
} from 'lucide-react';

export default function App() {
  // Main banks dataset (including Mega, Government, Village, Rural, Local Coop, Credit Unions, and Neobanks)
  const [banks, setBanks] = useState(getInitialBanks);

  // Active view tab
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'estimator' | 'table'

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Preset chips
  const [activeFilterPreset, setActiveFilterPreset] = useState('all');

  // Filter state
  const [selectedBankType, setSelectedBankType] = useState('All Types');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedRail, setSelectedRail] = useState('All');
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [sortBy, setSortBy] = useState('name_asc');

  // Pagination limit for directory view
  const [visibleCount, setVisibleCount] = useState(48);

  // Modals & Active selections
  const [selectedBankForModal, setSelectedBankForModal] = useState(null);
  const [estimatorPreselectBank, setEstimatorPreselectBank] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Dynamic filter options
  const uniqueCountries = useMemo(() => getUniqueCountries(banks), [banks]);
  const uniqueRails = useMemo(() => getUniquePaymentRails(banks), [banks]);
  const uniqueCurrencies = useMemo(() => getUniqueCurrencies(banks), [banks]);

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedBankType('All Types');
    setSelectedRegion('All');
    setSelectedCountry('All');
    setSelectedRail('All');
    setSelectedCurrency('All');
    setActiveFilterPreset('all');
    setSearchQuery('');
    setSortBy('name_asc');
    showToast('Filters reset to default');
  };

  const hasActiveFilters = 
    selectedBankType !== 'All Types' ||
    selectedRegion !== 'All' || 
    selectedCountry !== 'All' || 
    selectedRail !== 'All' || 
    selectedCurrency !== 'All' || 
    activeFilterPreset !== 'all' || 
    searchQuery.trim() !== '';

  // Universal Search & Filter Engine
  const filteredBanks = useMemo(() => {
    return banks.filter((bank) => {
      // 1. Text Search across whatever is in bank profile
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = bank.name?.toLowerCase().includes(q);
        const matchesLegalName = bank.legalName?.toLowerCase().includes(q);
        const matchesType = bank.bankType?.toLowerCase().includes(q);
        const matchesCountry = bank.country?.toLowerCase().includes(q);
        const matchesCity = bank.city?.toLowerCase().includes(q);
        const matchesSwift = bank.swiftBic?.toLowerCase().includes(q);
        const matchesClearingCode = bank.clearingCode?.toLowerCase().includes(q);
        const matchesClearingType = bank.clearingCodeType?.toLowerCase().includes(q);
        const matchesRegion = bank.region?.toLowerCase().includes(q);
        const matchesRails = bank.supportedRails?.some((r) => r.toLowerCase().includes(q));
        const matchesCurrencies = bank.currencies?.some((c) => c.toLowerCase().includes(q));
        const matchesDomesticDaily = bank.limits?.domesticDaily?.toLowerCase().includes(q);
        const matchesDomesticInstant = bank.limits?.domesticInstant?.toLowerCase().includes(q);
        const matchesOutbound = bank.limits?.internationalOutbound?.toLowerCase().includes(q);
        const matchesInstantSpeed = bank.completionTimes?.instantRail?.toLowerCase().includes(q);
        const matchesSwiftSpeed = bank.completionTimes?.internationalSwift?.toLowerCase().includes(q);
        const matchesFeatures = bank.features?.some((f) => f.toLowerCase().includes(q));
        
        // Match against all payment options provided by this bank
        const bankPaymentOpts = getBankPaymentOptions(bank);
        const matchesPaymentOpts = bankPaymentOpts.some(p => 
          p.name.toLowerCase().includes(q) ||
          p.shortCode.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.railProtocol.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );

        const anyMatch = 
          matchesName || matchesLegalName || matchesType || matchesCountry || matchesCity || 
          matchesSwift || matchesClearingCode || matchesClearingType || matchesRegion || 
          matchesRails || matchesCurrencies || matchesDomesticDaily || matchesDomesticInstant || 
          matchesOutbound || matchesInstantSpeed || matchesSwiftSpeed || matchesFeatures || 
          matchesPaymentOpts;

        if (!anyMatch) return false;
      }

      // 2. Bank Type Filter
      if (selectedBankType !== 'All Types' && bank.bankType !== selectedBankType) {
        return false;
      }

      // 3. Region Filter
      if (selectedRegion !== 'All' && bank.region !== selectedRegion) {
        return false;
      }

      // 4. Country Filter
      if (selectedCountry !== 'All' && bank.country !== selectedCountry) {
        return false;
      }

      // 5. Payment Rail / Option Filter
      if (selectedRail !== 'All') {
        const railLower = selectedRail.toLowerCase();
        const bankPaymentOpts = getBankPaymentOptions(bank);
        const matchesOption = bankPaymentOpts.some(p => 
          railLower.includes(p.id.toLowerCase()) ||
          p.shortCode.toLowerCase() === railLower ||
          p.name.toLowerCase().includes(railLower) ||
          railLower.includes(p.name.toLowerCase()) ||
          railLower.includes(p.shortCode.toLowerCase())
        );
        const matchesSupported = bank.supportedRails?.some(r => r.toLowerCase().includes(railLower) || railLower.includes(r.toLowerCase()));
        if (!matchesOption && !matchesSupported) {
          return false;
        }
      }

      // 6. Currency Filter
      if (selectedCurrency !== 'All' && !bank.currencies?.includes(selectedCurrency)) {
        return false;
      }

      // 7. Quick Presets
      if (activeFilterPreset === 'government') {
        const isGov = bank.bankType?.includes('Government') || bank.bankType?.includes('Public') || bank.bankType?.includes('Postal');
        if (!isGov) return false;
      }

      if (activeFilterPreset === 'village_rural') {
        const isRural = bank.bankType?.includes('Rural') || bank.bankType?.includes('Village') || bank.bankType?.includes('Agricultural');
        if (!isRural) return false;
      }

      if (activeFilterPreset === 'local_coop') {
        const isLocal = bank.bankType?.includes('Local') || bank.bankType?.includes('Cooperative') || bank.bankType?.includes('Credit Union') || bank.bankType?.includes('Building Society');
        if (!isLocal) return false;
      }

      if (activeFilterPreset === 'digital') {
        const isDigital = bank.bankType?.includes('Digital') || bank.bankType?.includes('Neobank');
        if (!isDigital) return false;
      }

      if (activeFilterPreset === 'instant') {
        const hasInstant = 
          bank.completionTimes?.instantRail?.includes('<') || 
          bank.completionTimes?.instantRail?.toLowerCase().includes('instant') ||
          bank.completionTimes?.instantRail?.toLowerCase().includes('seconds');
        if (!hasInstant) return false;
      }

      if (activeFilterPreset === 'gsib') {
        if (!bank.tier?.includes('Tier 1')) return false;
      }

      if (activeFilterPreset === 'high_limit') {
        const highDaily = (bank.limits?.domesticDailyAmount || 0) >= 100000;
        const highOutbound = (bank.limits?.internationalOutboundAmount || 0) >= 100000;
        if (!highDaily && !highOutbound) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name_asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'country_asc') {
        return (a.country || '').localeCompare(b.country || '');
      }
      if (sortBy === 'daily_limit_desc') {
        return (b.limits?.domesticDailyAmount || 0) - (a.limits?.domesticDailyAmount || 0);
      }
      if (sortBy === 'outbound_limit_desc') {
        return (b.limits?.internationalOutboundAmount || 0) - (a.limits?.internationalOutboundAmount || 0);
      }
      return 0;
    });
  }, [
    banks, 
    searchQuery, 
    selectedBankType,
    selectedRegion, 
    selectedCountry, 
    selectedRail, 
    selectedCurrency, 
    activeFilterPreset, 
    sortBy
  ]);

  // Safely adjust pagination when filter parameters change without cascading effect
  const filterKey = `${searchQuery}-${selectedBankType}-${selectedRegion}-${selectedCountry}-${selectedRail}-${selectedCurrency}-${activeFilterPreset}-${sortBy}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setVisibleCount(48);
  }

  // Slice for visible items in directory cards
  const displayedBanks = useMemo(() => {
    return filteredBanks.slice(0, visibleCount);
  }, [filteredBanks, visibleCount]);

  // Compare toggling
  const handleToggleCompare = (bank) => {
    const isAlready = compareList.some((b) => b.id === bank.id);
    if (isAlready) {
      setCompareList(compareList.filter((b) => b.id !== bank.id));
      showToast(`Removed ${bank.name} from comparison`);
    } else {
      if (compareList.length >= 4) {
        showToast('Maximum 4 banks can be compared simultaneously');
        return;
      }
      setCompareList([...compareList, bank]);
      showToast(`Added ${bank.name} to comparison`);
    }
  };

  const handleRemoveFromCompare = (bankId) => {
    setCompareList(compareList.filter((b) => b.id !== bankId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
    setIsCompareOpen(false);
  };

  // Add custom bank
  const handleAddBank = (newBank) => {
    saveCustomBank(newBank);
    setBanks((prev) => [newBank, ...prev]);
    showToast(`Successfully added ${newBank.name} to worldwide directory!`);
  };

  // Reset to default
  const handleResetData = () => {
    if (window.confirm('Reset directory to standard verified global banks dataset?')) {
      const def = resetToDefaultBanks();
      setBanks(def);
      setCompareList([]);
      showToast('Directory reset to default verified dataset.');
    }
  };

  // Navigate to estimator with preselected bank
  const handleSelectForEstimator = (bank) => {
    setEstimatorPreselectBank(bank);
    setActiveTab('estimator');
  };

  // Quick select country pill
  const handleQuickCountryClick = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry('All');
    } else {
      setSelectedCountry(country);
    }
  };

  // Prominent country pills for quick navigation
  const POPULAR_COUNTRIES = [
    { name: 'India', flag: '🇮🇳' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Switzerland', flag: '🇨🇭' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'United Arab Emirates', flag: '🇦🇪' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Bangladesh', flag: '🇧🇩' },
    { name: 'Pakistan', flag: '🇵🇰' },
    { name: 'Philippines', flag: '🇵🇭' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'South Africa', flag: '🇿🇦' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        banksCount={banks.length}
        countriesCount={uniqueCountries.length}
        filteredBanks={filteredBanks}
        onOpenAddModal={() => setIsAddOpen(true)}
        onResetData={handleResetData}
        compareList={compareList}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Section */}
        {activeTab === 'directory' && (
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Worldwide Mega Banks • Government Banks • Village & Rural Banks • Local Credit Unions</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Worldwide Banks <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Directory</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Complete database indexing <strong>small to small and large to large banks</strong>: Tier 1 multinationals, public sector government banks, rural village & Gramin banks, community credit unions, and digital neobanks across <strong>{uniqueCountries.length} countries</strong>.
              </p>

              {/* Quick Country Filters */}
              <div className="pt-3 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Browse by Country:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_COUNTRIES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleQuickCountryClick(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition ${
                        selectedCountry === c.name
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                  {selectedCountry !== 'All' && (
                    <button
                      onClick={() => setSelectedCountry('All')}
                      className="px-2.5 py-1 rounded-full text-xs text-rose-400 hover:text-rose-300 underline font-medium"
                    >
                      Clear ({selectedCountry})
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Directory Cards View */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            
            {/* Universal Search Bar */}
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredBanks.length}
              totalCount={banks.length}
              activeFilterPreset={activeFilterPreset}
              setActiveFilterPreset={setActiveFilterPreset}
              onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            />

            {/* Layout: Sidebar + Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block lg:col-span-1 sticky top-28">
                <FilterSidebar 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  bankTypes={BANK_TYPES}
                  selectedBankType={selectedBankType}
                  setSelectedBankType={setSelectedBankType}
                  countries={uniqueCountries}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  paymentRails={uniqueRails}
                  selectedRail={selectedRail}
                  setSelectedRail={setSelectedRail}
                  currencies={uniqueCurrencies}
                  selectedCurrency={selectedCurrency}
                  setSelectedCurrency={setSelectedCurrency}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onResetFilters={handleResetFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>

              {/* Mobile Filter Drawer */}
              {isMobileSidebarOpen && (
                <div className="lg:hidden col-span-1">
                  <FilterSidebar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    bankTypes={BANK_TYPES}
                    selectedBankType={selectedBankType}
                    setSelectedBankType={setSelectedBankType}
                    countries={uniqueCountries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    paymentRails={uniqueRails}
                    selectedRail={selectedRail}
                    setSelectedRail={setSelectedRail}
                    currencies={uniqueCurrencies}
                    selectedCurrency={selectedCurrency}
                    setSelectedCurrency={setSelectedCurrency}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onResetFilters={handleResetFilters}
                    hasActiveFilters={hasActiveFilters}
                  />
                </div>
              )}

              {/* Banks Grid */}
              <div className="lg:col-span-3 space-y-4">
                {filteredBanks.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayedBanks.map((bank) => (
                        <BankCard 
                          key={bank.id}
                          bank={bank}
                          onSelectBank={setSelectedBankForModal}
                          isCompared={compareList.some((b) => b.id === bank.id)}
                          onToggleCompare={handleToggleCompare}
                          onSelectForEstimator={handleSelectForEstimator}
                        />
                      ))}
                    </div>

                    {visibleCount < filteredBanks.length && (
                      <div className="pt-6 pb-2 text-center">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 48)}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition flex items-center gap-2.5 mx-auto active:scale-95"
                        >
                          <span>Load More Banks</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-black/25 text-xs text-blue-100 font-medium">
                            Showing {displayedBanks.length} of {filteredBanks.length}
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
                    <SearchX className="w-12 h-12 text-slate-600 mx-auto" />
                    <h3 className="text-lg font-bold text-white">No banks match your search criteria</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Try searching with different keywords, village names, bank types, or clearing codes.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interbank Route Estimator */}
        {activeTab === 'estimator' && (
          <TransferEstimator 
            banks={banks}
            preselectedBank={estimatorPreselectBank}
            onSelectBank={setSelectedBankForModal}
          />
        )}

        {/* Tab 3: Matrix Table View */}
        {activeTab === 'table' && (
          <div className="space-y-4">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalResults={filteredBanks.length}
              totalCount={banks.length}
              activeFilterPreset={activeFilterPreset}
              setActiveFilterPreset={setActiveFilterPreset}
              onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            />
            <TableView 
              banks={filteredBanks}
              onSelectBank={setSelectedBankForModal}
              onSelectForEstimator={handleSelectForEstimator}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-900/60 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong>Worldwide Bank Directory & Interbank Settlement System</strong> • {banks.length} Global, Government, Village, Rural & Local Banks
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>SWIFT gpi Tracker</span>
            <span>FedNow / RTP Active</span>
            <span>UPI / AePS Gramin Rails</span>
            <span>SEPA Instant</span>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedBankForModal && (
        <BankDetailModal 
          bank={selectedBankForModal}
          onClose={() => setSelectedBankForModal(null)}
          onSelectForEstimator={handleSelectForEstimator}
        />
      )}

      {/* Compare Modal */}
      {isCompareOpen && (
        <BankCompareModal 
          banks={compareList}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={handleRemoveFromCompare}
          onClearCompare={handleClearCompare}
        />
      )}

      {/* Add Bank Modal */}
      {isAddOpen && (
        <AddBankModal 
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAddBank={handleAddBank}
          existingCountries={uniqueCountries}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-800 border border-cyan-500/40 text-cyan-300 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
