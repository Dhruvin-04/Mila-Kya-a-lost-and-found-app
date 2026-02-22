import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { classNames } from '../utils/classNames';

export const Button = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-3 rounded-lg items-center justify-center flex-row';
  
  const variantStyles = {
    primary: 'bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-200 active:bg-gray-300',
    outline: 'border-2 border-blue-600 bg-transparent',
    danger: 'bg-red-600 active:bg-red-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const textVariantStyles = {
    primary: 'text-white',
    secondary: 'text-gray-800',
    outline: 'text-blue-600',
    danger: 'text-white',
  };

  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const isTextChild = typeof children === 'string';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'opacity-50',
        className
      )}
      {...props}
    >
      {loading && <ActivityIndicator size="small" color={variant === 'outline' ? '#2563eb' : '#fff'} style={{ marginRight: 8 }} />}
      {isTextChild ? (
        <Text className={classNames('font-semibold', textVariantStyles[variant], textSizeStyles[size])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
