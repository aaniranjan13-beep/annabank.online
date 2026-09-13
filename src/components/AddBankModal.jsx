import React, { useState } from 'react';
import { X, PlusCircle, Building2, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export default function AddBankModal({ isOpen, onClose, onAddBank, existingCountries }) {
  const [formData, setFormData] = useState({
    name: '',
    legalName: '',
    bankType: 'Rural & Village Bank (RRB)',
    country: existingCountries[0] || 'United States',
    countryCode: 'US',
    region: 'North America',
    city: '',
    flag: '🏦',
    tier: 'Village / Rural Institution',
    swiftBic: '',
    clearingCodeType: 'Local Routing / Clearing',
    clearingCode: '',
    website: '',
    domesticDaily: '$50,000',
    domesticInstant: '$10,000',
    internationalOutbound: '$50,000',
    instantRail: '< 15 seconds (Real-time)',
    domesticACH: '1 - 2 Business Days',
    internationalSwift: '1 - 3 Business Days',
    cutOffTime: '16:00 Local',
    supportedRails: 'SWIFT, National RTGS, ACH',
    currencies: 'USD'
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Bank name is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.swiftBic.trim()) newErrors.swiftBic = 'SWIFT/BIC or Clearing ID is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newBank = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      legalName: formData.legalName || formData.name,
      bankType: formData.bankType,
      country: formData.country,
      countryCode: formData.countryCode || 'XX',
      region: formData.region,
      city: formData.city || 'Local Branch',
      flag: formData.flag || '🏦',
      tier: formData.tier,
      swiftBic: formData.swiftBic.toUpperCase(),
      clearingCodeType: formData.clearingCodeType,
      clearingCode: formData.clearingCode,
      website: formData.website,
      currencies: formData.currencies.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean),
      limits: {
        domesticDaily: formData.domesticDaily,
        domesticInstant: formData.domesticInstant,
        domesticMonthly: '$250,000',
        internationalOutbound: formData.internationalOutbound,
        internationalInbound: 'Unlimited',
        singleTransactionMax: '$500,000',
        currency: formData.currencies.split(',')[0]?.trim() || 'USD',
        minTransfer: '$1.00'
      },
      completionTimes: {
        instantRail: formData.instantRail,
        domesticACH: formData.domesticACH,
        domesticWire: 'Same-Day',
        internationalSwift: formData.internationalSwift,
        cutOffTime: formData.cutOffTime
      },
      supportedRails: formData.supportedRails.split(',').map((s) => s.trim()).filter(Boolean),
      typicalFees: {
        domesticACH: 'Free',
        domesticWire: '$20.00',
        internationalOutbound: '$30.00',
        internationalInbound: 'Free'
      }
    };

    onAddBank(newBank);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-800/80 border-b border-slate-700/60 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add Bank to Worldwide Directory</h2>
              <p className="text-xs text-slate-400">Add any village bank, rural gramin bank, local coop, or government bank</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* General Information */}
          <div className="space-y-3">
            <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              General Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Bank Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Baroda UP Gramin Bank / Metro Bank"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                {errors.name && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.name}</span>}
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Bank Type / Category *</label>
                <select
                  name="bankType"
                  value={formData.bankType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="Rural & Village Bank (RRB)">🌾 Rural & Village Bank (Gramin / Microcredit)</option>
                  <option value="Government / Public Sector">🏛️ Government / Public Sector Bank</option>
                  <option value="Postal Savings Bank">📬 Postal Savings Bank</option>
                  <option value="Local Community & Cooperative">🤝 Local Community & Cooperative / Credit Union</option>
                  <option value="Major Commercial & G-SIB">🛡️ Major Commercial & G-SIB</option>
                  <option value="Digital / Neobank">⚡ Digital / Neobank</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. India, United States, Philippines..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                {errors.country && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.country}</span>}
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Flag & City / Village District</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="flag"
                    value={formData.flag}
                    onChange={handleChange}
                    className="w-14 px-2 py-2 bg-slate-800 border border-slate-700 rounded-xl text-center text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Gorakhpur / San Antonio"
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Identifiers */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Codes & Identifiers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">SWIFT / BIC Code *</label>
                <input
                  type="text"
                  name="swiftBic"
                  value={formData.swiftBic}
                  onChange={handleChange}
                  placeholder="e.g. BARB0BUPGBX"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 font-mono uppercase focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                {errors.swiftBic && <span className="text-rose-400 text-[10px] mt-0.5 block">{errors.swiftBic}</span>}
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Clearing Type</label>
                <input
                  type="text"
                  name="clearingCodeType"
                  value={formData.clearingCodeType}
                  onChange={handleChange}
                  placeholder="e.g. IFSC / Sort Code / Routing"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Clearing Code Value</label>
                <input
                  type="text"
                  name="clearingCode"
                  value={formData.clearingCode}
                  onChange={handleChange}
                  placeholder="e.g. BARB0BUPGBX"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Official Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. https://www.bank.com"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              Transaction Limits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Domestic Daily Limit</label>
                <input
                  type="text"
                  name="domesticDaily"
                  value={formData.domesticDaily}
                  onChange={handleChange}
                  placeholder="e.g. ₹2,00,000 / $50,000"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Instant Rail Limit</label>
                <input
                  type="text"
                  name="domesticInstant"
                  value={formData.domesticInstant}
                  onChange={handleChange}
                  placeholder="e.g. ₹1,00,000 (UPI) / $10,000"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Outbound Wire Limit</label>
                <input
                  type="text"
                  name="internationalOutbound"
                  value={formData.internationalOutbound}
                  onChange={handleChange}
                  placeholder="e.g. $250,000 / Via Sponsor"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Speeds */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Settlement Speeds
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Instant Speed</label>
                <input
                  type="text"
                  name="instantRail"
                  value={formData.instantRail}
                  onChange={handleChange}
                  placeholder="e.g. Instant (1-2s via UPI)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Domestic Standard / ACH</label>
                <input
                  type="text"
                  name="domesticACH"
                  value={formData.domesticACH}
                  onChange={handleChange}
                  placeholder="e.g. 30 mins (NEFT) / 1 Day"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">SWIFT Cross-Border</label>
                <input
                  type="text"
                  name="internationalSwift"
                  value={formData.internationalSwift}
                  onChange={handleChange}
                  placeholder="e.g. 1 - 3 Business Days"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Rails & Currencies */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Supported Rails (comma separated)</label>
              <input
                type="text"
                name="supportedRails"
                value={formData.supportedRails}
                onChange={handleChange}
                placeholder="UPI, IMPS, NEFT, RTGS, AePS"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Currencies (comma separated)</label>
              <input
                type="text"
                name="currencies"
                value={formData.currencies}
                onChange={handleChange}
                placeholder="INR, USD"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/20 transition"
            >
              Save Bank to Directory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
