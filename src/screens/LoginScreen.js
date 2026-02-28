import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { isCollegeEmail } from '../services/authService';

export const LoginScreen = () => {
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (!isCollegeEmail(email)) {
      Alert.alert('Error', 'Please use a valid college email address ending with .edu');
      return;
    }

    if (isSignUp && (!name || !college)) {
      Alert.alert('Error', 'Please fill in your name and college');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await register(email, password, name, college);
      } else {
        await login(email, password);
      }
      // Navigation is handled automatically by AuthContext + AppNavigator
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please login instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please sign up.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Use at least 6 characters.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
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

            {/* Login/Signup Form */}
            <View className="mb-6">
              {isSignUp && (
                <>
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                  <Input
                    label="College"
                    placeholder="e.g., MIT, Stanford"
                    value={college}
                    onChangeText={setCollege}
                    autoCapitalize="words"
                  />
                </>
              )}

              <Input
                label="College Email"
                placeholder="student@college.edu"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Button
                onPress={handleSubmit}
                loading={loading}
                variant="primary"
                size="lg"
                className="mt-4"
              >
                {isSignUp ? 'Create Account' : 'Login'}
              </Button>
            </View>

            {/* Toggle Login/Signup */}
            <TouchableOpacity
              onPress={() => setIsSignUp(!isSignUp)}
              className="items-center py-2"
            >
              <Text className="text-blue-600 text-base">
                {isSignUp
                  ? 'Already have an account? Login'
                  : "Don't have an account? Sign Up"}
              </Text>
            </TouchableOpacity>

            {/* Info */}
            <View className="bg-blue-50 rounded-lg p-4 mt-4">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#2563eb" />
                <Text className="text-sm text-blue-800 ml-2 flex-1">
                  Only .edu college email addresses are accepted for registration.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
