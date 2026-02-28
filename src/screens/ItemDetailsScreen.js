import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { getUserById } from '../services/itemService';
import { useAuth } from '../context/AuthContext';

export const ItemDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params || {};
  const { user } = useAuth();
  const [reporter, setReporter] = useState(null);
  const [loadingReporter, setLoadingReporter] = useState(true);

  useEffect(() => {
    const fetchReporter = async () => {
      if (item?.reportedBy) {
        try {
          const userData = await getUserById(item.reportedBy);
          setReporter(userData);
        } catch (error) {
          console.error('Error fetching reporter:', error);
        }
      }
      setLoadingReporter(false);
    };

    fetchReporter();
  }, [item?.reportedBy]);

  if (!item) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500">Item not found</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Image */}
        {item.imageUri ? (
          <Image
            source={{ uri: item.imageUri }}
            className="w-full h-64"
            resizeMode="cover"
          />
        ) : null}

        {/* Content */}
        <View className="px-4 py-4">
          {/* Type Badge */}
          <View className={`self-start px-3 py-1 rounded-full mb-3 ${item.type === 'lost' ? 'bg-orange-100' : 'bg-green-100'
            }`}>
            <Text className={`text-sm font-semibold ${item.type === 'lost' ? 'text-orange-700' : 'text-green-700'
              }`}>
              {item.type?.toUpperCase()}
            </Text>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {item.title}
          </Text>

          {/* Meta Info */}
          <View className="flex-row flex-wrap mb-4">
            {item.location && (
              <View className="flex-row items-center mr-4 mb-2">
                <Ionicons name="location" size={16} color="#6b7280" />
                <Text className="text-sm text-gray-600 ml-1">{item.location}</Text>
              </View>
            )}
            {item.timestamp && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="time" size={16} color="#6b7280" />
                <Text className="text-sm text-gray-600 ml-1">
                  {formatDate(item.timestamp)}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-base text-gray-700 leading-6">
              {item.description}
            </Text>
          </View>

          {/* Reported By */}
          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <Text className="text-sm text-gray-600 mb-1">Reported by</Text>
            {loadingReporter ? (
              <ActivityIndicator size="small" color="#2563eb" />
            ) : reporter ? (
              <>
                <Text className="text-base font-semibold text-gray-900">
                  {reporter.name}
                </Text>
                <Text className="text-sm text-gray-600">{reporter.email}</Text>
              </>
            ) : (
              <Text className="text-base text-gray-500">Unknown user</Text>
            )}
          </View>

          {/* Action Buttons */}
          <View>
            {item.reportedBy !== user?.uid && (
              <Button
                onPress={() => navigation.navigate('Chat', {
                  itemId: item.id,
                  otherUserId: item.reportedBy
                })}
                variant="primary"
                size="lg"
                className="mb-3"
              >
                <Ionicons name="chatbubble" size={20} color="white" style={{ marginRight: 8 }} />
                Start Chat
              </Button>
            )}

            {item.type === 'found' && (
              <Button
                onPress={() => navigation.navigate('QRScanner', { itemId: item.id })}
                variant="outline"
                size="lg"
              >
                <Ionicons name="qr-code" size={20} color="#2563eb" style={{ marginRight: 8 }} />
                Verify Transfer
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
