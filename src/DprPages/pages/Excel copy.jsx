import React from 'react';
import ExcelJS from 'exceljs';

const Excel = () => {
  const generateExcel = async () => {
    const headers = [
      'S. No.',
      'Block',
      'GP Name',
      'Site Status',
      'Boring Work',
      "",
      'PIPE-LINE WORK',
      "",
      'FHTC',  // 'FHTC' header spans two cells
      "",
      'BOUNDARY WALL',
      "",
      'PUMP HOUSE',
      "",
      'OHT',
      "",
      // Add other headers as needed
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Set column widths and styles
    headers.forEach((header, index) => {
      const column = worksheet.getColumn(index + 1);
      column.width = 15;
      column.alignment = { horizontal: 'center' };
      column.font = { bold: true };
    });

    worksheet.addRow(headers);
    // Merging cells for the headers
    worksheet.mergeCells('E1:F1');  // Merge 'boring'
    worksheet.mergeCells('G1:H1');  // Merge 'Pipe'
    worksheet.mergeCells('I1:J1');  // Merge 'BOUNDARY WALL'
    worksheet.mergeCells('K1:L1');  // Merge 'PUMP HOUSE'
    worksheet.mergeCells('M1:N1');  // Merge 'OHT'
    worksheet.mergeCells('O1:P1');  // Merge 'OHT'

    // Set values for the headers

    // Save the file
    const fileName = 'your_excel_file.xlsx';
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  return (
    <div>
      <button onClick={generateExcel}>Download Excel</button>
    </div>
  );
};

export default Excel;
