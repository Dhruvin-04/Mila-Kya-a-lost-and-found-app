import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { classNames } from '../utils/classNames';

export const ItemCard = ({ 
  id,
  title, 
  description, 
  imageUri, 
  type, // 'lost' or 'found'
  timestamp, 
  location,
  category,
  onPress 
}) => {
  const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card onPress={onPress}>
      <View className="flex-row">
        {imageUri && (
          <Image 
            source={{ uri: imageUri }} 
            className="w-24 h-24 rounded-lg mr-3"
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <View className={classNames(
              'px-2 py-1 rounded',
              type === 'lost' ? 'bg-orange-100' : 'bg-green-100'
            )}>
              <Text className={classNames(
                'text-xs font-semibold',
                type === 'lost' ? 'text-orange-700' : 'text-green-700'
              )}>
                {type?.toUpperCase()}
              </Text>
            </View>
            {category && (
              <Text className="text-xs text-gray-500 ml-2">{category}</Text>
            )}
          </View>
          
          <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={1}>
            {title}
          </Text>
          
          {description && (
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
              {description}
            </Text>
          )}
          
          <View className="flex-row items-center">
            {location && (
              <View className="flex-row items-center mr-3">
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text className="text-xs text-gray-600 ml-1">{location}</Text>
              </View>
            )}
            {timestamp && (
              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#6b7280" />
                <Text className="text-xs text-gray-600 ml-1">
                  {formatTime(timestamp)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Card>
  );
};
