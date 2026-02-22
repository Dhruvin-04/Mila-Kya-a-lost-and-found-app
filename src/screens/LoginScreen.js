import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid college email address');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app on success
      navigation.replace('MainTabs');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 px-6 justify-center">
            {/* Logo/Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-4">
                <Ionicons name="search" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Foundit
              </Text>
              <Text className="text-gray-600 text-center">
                Lost & Found for College Students
              </Text>
            </View>

            {/* Login Form */}
            <View className="mb-6">
              <Input
                label="College Email"
                placeholder="student@college.edu"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Button
                onPress={handleSendCode}
                loading={loading}
                variant="primary"
                size="lg"
                className="mt-4"
              >
                Send Verification Code
              </Button>
            </View>

            {/* Info */}
            <View className="bg-blue-50 rounded-lg p-4 mt-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#2563eb" />
                <Text className="text-sm text-blue-800 ml-2 flex-1">
                  We'll send a verification code to your college email address
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
