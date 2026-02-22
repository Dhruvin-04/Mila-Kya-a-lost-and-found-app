import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './Button';
import { classNames } from '../utils/classNames';

export const QRCodeScanner = ({ onScan, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return;
    
    setScanned(true);
    
    // Validate QR code format (you can customize this)
    if (data && data.length > 0) {
      Alert.alert(
        'QR Code Scanned',
        `Data: ${data}`,
        [
          {
            text: 'Verify',
            onPress: () => {
              onScan?.(data);
              setScanned(false);
            },
          },
          {
            text: 'Scan Again',
            onPress: () => setScanned(false),
          },
        ]
      );
    }
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Ionicons name="camera-outline" size={64} color="white" />
        <Text className="text-white text-lg mt-4 text-center mb-4">
          Camera permission is required to scan QR codes
        </Text>
        <Button onPress={requestPermission} variant="primary">
          Grant Permission
        </Button>
        {onClose && (
          <Button onPress={onClose} variant="outline" className="mt-3">
            Cancel
          </Button>
        )}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="bg-black/50 px-4 py-3 flex-row items-center">
            <TouchableOpacity
              onPress={onClose}
              className="bg-white/20 border border-white rounded-lg p-2"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold ml-4">
              Scan QR Code
            </Text>
          </View>

          {/* Scanner overlay */}
          <View className="flex-1 items-center justify-center">
            <View className="w-64 h-64 border-4 border-white rounded-lg">
              <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
              <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
              <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
              <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
            </View>
            <Text className="text-white mt-6 text-center px-6">
              Position the QR code within the frame
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
};
