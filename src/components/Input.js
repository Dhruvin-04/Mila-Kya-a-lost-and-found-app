import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { classNames } from '../utils/classNames';

export const Input = ({ 
  label, 
  error, 
  className = '',
  containerClassName = '',
  ...props 
}) => {
  return (
    <View className={classNames('mb-4', containerClassName)}>
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={classNames(
          'border border-gray-300 rounded-lg px-4 py-3 text-base',
          'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
          error && 'border-red-500',
          className
        )}
        placeholderTextColor="#9ca3af"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};
