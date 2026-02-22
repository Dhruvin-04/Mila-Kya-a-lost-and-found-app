import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ItemCard } from '../components/ItemCard';

// Mock data
const mockItems = [
  {
    id: '1',
    title: 'Lost: Black Backpack',
    description: 'Lost my black backpack near the library. Contains laptop and textbooks.',
    imageUri: 'https://via.placeholder.com/150',
    type: 'lost',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    location: 'Library',
    category: 'Bag',
  },
  {
    id: '2',
    title: 'Found: Blue Water Bottle',
    description: 'Found a blue water bottle in the cafeteria. Contact me if it\'s yours.',
    imageUri: 'https://via.placeholder.com/150',
    type: 'found',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    location: 'Cafeteria',
    category: 'Accessories',
  },
  {
    id: '3',
    title: 'Lost: iPhone 13',
    description: 'Lost my iPhone 13 with a blue case. Last seen in the gym.',
    imageUri: 'https://via.placeholder.com/150',
    type: 'lost',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    location: 'Gym',
    category: 'Electronics',
  },
];

export const FeedScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
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
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedFilter === filter
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedFilter === filter
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
                onPress={() => navigation.navigate('ItemDetails', { item })}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
