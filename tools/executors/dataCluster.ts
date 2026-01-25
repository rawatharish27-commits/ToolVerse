
/**
 * ToolVerse Data Cluster Logic
 * High-performance browser-native data processing.
 */

export const cleanData = (rows: any[][], options: any) => {
  let cleaned = [...rows];
  
  if (options.removeEmpty) {
    cleaned = cleaned.filter(row => row.some(cell => cell !== null && cell !== undefined && String(cell).trim() !== ""));
  }
  
  if (options.trimText) {
    cleaned = cleaned.map(row => row.map(cell => typeof cell === 'string' ? cell.trim() : cell));
  }

  return cleaned;
};

export const deduplicate = (rows: any[][], caseSensitive = false) => {
  const seen = new Set();
  return rows.filter(row => {
    const serialized = caseSensitive ? JSON.stringify(row) : JSON.stringify(row).toLowerCase();
    if (seen.has(serialized)) return false;
    seen.add(serialized);
    return true;
  });
};

export const convertJsonToCsv = (json: any[]) => {
  if (!json || json.length === 0) return "";
  const headers = Object.keys(json[0]);
  const csvRows = [
    headers.join(','),
    ...json.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] || "")).join(','))
  ];
  return csvRows.join('\n');
};
