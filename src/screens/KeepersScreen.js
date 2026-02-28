import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { KeeperCard } from '../components/KeeperCard';

export const KeepersScreen = ({ navigation }) => {
  const [keepers, setKeepers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeepers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'keepers'));
        const keepersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setKeepers(keepersList);
      } catch (error) {
        console.error('Error fetching keepers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeepers();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-3 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Campus Keepers
          </Text>
          <Text className="text-gray-600 text-sm">
            Contact these staff members for assistance
          </Text>
        </View>

        {/* Keepers List */}
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="text-gray-500 mt-4">Loading keepers...</Text>
          </View>
        ) : keepers.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 text-lg">No keepers available</Text>
            <Text className="text-gray-400 text-sm mt-2">Check back later</Text>
          </View>
        ) : (
          <ScrollView className="flex-1 px-4 py-3">
            {keepers.map((keeper) => (
              <KeeperCard
                key={keeper.id}
                {...keeper}
                onPress={() => {
                  console.log('Contact keeper:', keeper.name);
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
