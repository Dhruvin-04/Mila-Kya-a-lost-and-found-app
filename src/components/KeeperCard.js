import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { classNames } from '../utils/classNames';

export const KeeperCard = ({ 
  name, 
  role, 
  location, 
  contact, 
  onPress 
}) => {
  return (
    <Card onPress={onPress} className="mb-3">
      <View className="flex-row items-start">
        <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
          <Ionicons name="person" size={24} color="#2563eb" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {name}
          </Text>
          <Text className="text-sm text-gray-600 mb-2">{role}</Text>
          {location && (
            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text className="text-sm text-gray-600 ml-1">{location}</Text>
            </View>
          )}
          {contact && (
            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={16} color="#6b7280" />
              <Text className="text-sm text-blue-600 ml-1">{contact}</Text>
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </View>
    </Card>
  );
};
