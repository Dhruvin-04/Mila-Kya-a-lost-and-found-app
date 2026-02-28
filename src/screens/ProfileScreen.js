import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export const ProfileScreen = () => {
  const { userProfile, user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Navigation is handled automatically by AuthContext + AppNavigator
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-6 border-b border-gray-200">
          <View className="items-center">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-3">
              <Ionicons name="person" size={40} color="white" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-1">
              {userProfile?.name || 'Student'}
            </Text>
            <Text className="text-gray-600">
              {user?.email || 'student@college.edu'}
            </Text>
            {userProfile?.college && (
              <Text className="text-gray-500 text-sm mt-1">
                {userProfile.college}
              </Text>
            )}
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mt-4 border-t border-b border-gray-200">
          <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-gray-100">
            <Ionicons name="document-text-outline" size={24} color="#2563eb" />
            <Text className="text-base text-gray-900 ml-3 flex-1">My Reports</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-gray-100">
            <Ionicons name="notifications-outline" size={24} color="#2563eb" />
            <Text className="text-base text-gray-900 ml-3 flex-1">Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-4 py-4 border-b border-gray-100">
            <Ionicons name="settings-outline" size={24} color="#2563eb" />
            <Text className="text-base text-gray-900 ml-3 flex-1">Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-4 py-4">
            <Ionicons name="help-circle-outline" size={24} color="#2563eb" />
            <Text className="text-base text-gray-900 ml-3 flex-1">Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View className="px-4 py-6">
          <Button onPress={handleLogout} variant="danger" size="lg">
            Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
