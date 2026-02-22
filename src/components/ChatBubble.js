import React from 'react';
import { View, Text } from 'react-native';
import { classNames } from '../utils/classNames';

export const ChatBubble = ({ message, isOwn = false, timestamp }) => {
  return (
    <View className={classNames('mb-3', isOwn ? 'items-end' : 'items-start')}>
      <View
        className={classNames(
          'max-w-[80%] rounded-2xl px-4 py-2',
          isOwn 
            ? 'bg-blue-600 rounded-tr-sm' 
            : 'bg-gray-200 rounded-tl-sm'
        )}
      >
        <Text className={classNames(
          'text-base',
          isOwn ? 'text-white' : 'text-gray-900'
        )}>
          {message}
        </Text>
        {timestamp && (
          <Text className={classNames(
            'text-xs mt-1',
            isOwn ? 'text-blue-100' : 'text-gray-500'
          )}>
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
};
