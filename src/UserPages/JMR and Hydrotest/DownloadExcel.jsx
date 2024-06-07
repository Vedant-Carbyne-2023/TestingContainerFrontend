import React from 'react';
import { base64 } from './Excelbase64';

const DownloadExcelFromBase64Button = () => {
const base64Data = base64;

  const handleDownloadExcel = () => {
    try {
      // Convert the base64 data to binary
      const binaryData = atob(base64Data);

      // Create a new array buffer
      const buffer = new ArrayBuffer(binaryData.length);

      // Create a view on the buffer
      const view = new Uint8Array(buffer);

      // Fill the view with the binary data
      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }

      // Create a blob from the buffer
      const blob = new Blob([view], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a data URL for the blob
      const dataURL = URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'data.xlsx';

      // Trigger the download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke the data URL to free up memory
      URL.revokeObjectURL(dataURL);
    } catch (error) {
      console.error('Error converting and downloading Excel:', error);
    }
  };

  return (
    <button type='button' className='btn my-4' onClick={handleDownloadExcel}>Download Excel</button>
  );
};

export default DownloadExcelFromBase64Button;
