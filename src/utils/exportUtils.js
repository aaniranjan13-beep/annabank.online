// Export banks dataset to CSV or JSON

export const exportToCSV = (banks, filename = 'worldwide_banks_directory.csv') => {
  if (!banks || !banks.length) return;

  const headers = [
    'Bank Name',
    'Legal Name',
    'Country',
    'Region',
    'City',
    'SWIFT/BIC',
    'Clearing Code Type',
    'Clearing Code',
    'Tier',
    'Domestic Daily Limit',
    'Domestic Instant Limit',
    'International Outbound Limit',
    'Instant Rail Speed',
    'Domestic ACH Speed',
    'Domestic Wire Speed',
    'International SWIFT Speed',
    'Daily Cut-Off Time',
    'Supported Rails',
    'Currencies',
    'Website'
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = banks.map((b) => [
    escapeCSV(b.name),
    escapeCSV(b.legalName || b.name),
    escapeCSV(b.country),
    escapeCSV(b.region),
    escapeCSV(b.city),
    escapeCSV(b.swiftBic),
    escapeCSV(b.clearingCodeType),
    escapeCSV(b.clearingCode),
    escapeCSV(b.tier),
    escapeCSV(b.limits?.domesticDaily),
    escapeCSV(b.limits?.domesticInstant),
    escapeCSV(b.limits?.internationalOutbound),
    escapeCSV(b.completionTimes?.instantRail),
    escapeCSV(b.completionTimes?.domesticACH),
    escapeCSV(b.completionTimes?.domesticWire),
    escapeCSV(b.completionTimes?.internationalSwift),
    escapeCSV(b.completionTimes?.cutOffTime),
    escapeCSV(b.supportedRails?.join(', ')),
    escapeCSV(b.currencies?.join(', ')),
    escapeCSV(b.website)
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (banks, filename = 'worldwide_banks_directory.json') => {
  const jsonContent = JSON.stringify(banks, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
