import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ItemCard } from '../components/ItemCard';
import { subscribeToItems } from '../services/itemService';

export const FeedScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const unsubscribe = subscribeToItems((fetchedItems) => {
      setItems(fetchedItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white px-4 py-3 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-3">
            Lost & Found
          </Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              placeholder="Search items..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-base"
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>

          {/* Filters */}
          <View className="flex-row mt-3">
            {['all', 'lost', 'found'].map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full mr-2 ${selectedFilter === filter
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                  }`}
              >
                <Text
                  className={`text-sm font-medium ${selectedFilter === filter
                      ? 'text-white'
                      : 'text-gray-700'
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Items List */}
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="text-gray-500 mt-4">Loading items...</Text>
          </View>
        ) : (
          <ScrollView className="flex-1 px-4 py-3">
            {filteredItems.length === 0 ? (
              <View className="items-center justify-center py-12">
                <Ionicons name="search-outline" size={64} color="#d1d5db" />
                <Text className="text-gray-500 text-lg mt-4">
                  No items found
                </Text>
                <Text className="text-gray-400 text-sm mt-2">
                  Try adjusting your search or filters
                </Text>
              </View>
            ) : (
              filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  {...item}
                  onPress={() => navigation.navigate('ItemDetails', { itemId: item.id, item })}
                />
              ))
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};
