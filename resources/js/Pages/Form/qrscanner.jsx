import React, { useState } from 'react';
import BarcodeScanner from './BarcodeComponent';
import DefaultLayout from '@/Custom/Layout/DefaultLayout';

const QRCode = () => {
  const [scannedCode, setScannedCode] = useState('');

  const handleBarcodeScanned = (code) => {
    setScannedCode(code);
  };

  return (
    <DefaultLayout>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onDetected={handleBarcodeScanned} />
      {scannedCode && <p>Barcode: {scannedCode}</p>}
    </DefaultLayout>
  );
};

export default QRCode;
