import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { classNames } from '../utils/classNames';

export const Card = ({ children, onPress, className = '' }) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      onPress={onPress}
      className={classNames(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-3',
        onPress && 'active:bg-gray-50',
        className
      )}
    >
      {children}
    </Component>
  );
};
