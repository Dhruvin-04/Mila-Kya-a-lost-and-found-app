import React from 'react';
import { View } from 'react-native';
import { QRCodeScanner } from '../components/QRCodeScanner';

export const QRScannerScreen = ({ route, navigation }) => {
  const { itemId } = route.params || {};

  const handleScan = (data) => {
    // Handle QR code scan
    console.log('QR Code scanned:', data);
    // Navigate back or show success message
    navigation.goBack();
    // You could show an alert or navigate to a success screen
  };

  return (
    <QRCodeScanner
      onScan={handleScan}
      onClose={() => navigation.goBack()}
    />
  );
};
