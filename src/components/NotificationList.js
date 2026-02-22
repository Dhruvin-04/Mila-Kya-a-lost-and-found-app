import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { classNames } from '../utils/classNames';

export const NotificationList = ({ notifications = [], onNotificationPress }) => {
  if (notifications.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-12">
        <Ionicons name="notifications-outline" size={64} color="#d1d5db" />
        <Text className="text-gray-500 text-lg mt-4">No notifications</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          onPress={() => onNotificationPress?.(notification)}
          className={classNames(
            'mb-2',
            !notification.read && 'bg-blue-50'
          )}
        >
          <View className="flex-row items-start">
            <View className={classNames(
              'w-10 h-10 rounded-full items-center justify-center mr-3',
              notification.type === 'match' ? 'bg-green-100' : 'bg-blue-100'
            )}>
              <Ionicons
                name={notification.type === 'match' ? 'checkmark-circle' : 'information-circle'}
                size={20}
                color={notification.type === 'match' ? '#16a34a' : '#2563eb'}
              />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900 mb-1">
                {notification.title}
              </Text>
              <Text className="text-sm text-gray-600 mb-2">
                {notification.message}
              </Text>
              <Text className="text-xs text-gray-400">
                {notification.timestamp}
              </Text>
            </View>
            {!notification.read && (
              <View className="w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};
