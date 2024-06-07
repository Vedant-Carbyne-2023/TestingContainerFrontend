import Papa from 'papaparse';
export default function exportToCSV(data, headers,formatItemToRow,fileName = 'data.csv') {
    const csvData = [];
  
    // Add header row
    csvData.push(headers);
  
    // Add data rows
    data.forEach((item, index) => {
        csvData.push(formatItemToRow(item, index));
    });
  
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
    URL.revokeObjectURL(url);
  }