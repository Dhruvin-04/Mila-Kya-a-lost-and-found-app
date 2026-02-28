import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../components/Input';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '../components/Button';
import { createItem } from '../services/itemService';
import { useAuth } from '../context/AuthContext';

const categories = ['Electronics', 'Clothing', 'Bag', 'Accessories', 'Books', 'Other'];
const types = ['lost', 'found'];

export const ReportScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [type, setType] = useState('lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await createItem(
        {
          title,
          description,
          type,
          location,
          category,
          reportedBy: user.uid,
        },
        imageUri
      );
      Alert.alert('Success', 'Item reported successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setCategory('');
      setImageUri(null);
      navigation.navigate('Feed');
    } catch (error) {
      console.error('Error reporting item:', error);
      Alert.alert('Error', 'Failed to report item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        {/* Header */}
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Report {type === 'lost' ? 'Lost' : 'Found'} Item
        </Text>

        {/* Type Selector */}
        <View className="flex-row mb-4">
          {types.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              className={`flex-1 py-3 rounded-lg mr-2 items-center ${type === t ? 'bg-blue-600' : 'bg-gray-200'
                }`}
            >
              <Text
                className={`font-semibold ${type === t ? 'text-white' : 'text-gray-700'
                  }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Image Upload */}
        <ImageUploader
          onImageSelected={setImageUri}
          imageUri={imageUri}
        />

        {/* Form Fields */}
        <Input
          label="Title *"
          placeholder="e.g., Lost: Black Backpack"
          value={title}
          onChangeText={setTitle}
        />

        <Input
          label="Description *"
          placeholder="Describe the item in detail..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          className="h-24"
        />

        <Input
          label="Location *"
          placeholder="e.g., Library, Cafeteria, Gym"
          value={location}
          onChangeText={setLocation}
        />

        {/* Category Selector */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Category
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full mr-2 ${category === cat
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                  }`}
              >
                <Text
                  className={`text-sm font-medium ${category === cat
                      ? 'text-white'
                      : 'text-gray-700'
                    }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Submit Button */}
        <Button
          onPress={handleSubmit}
          loading={loading}
          variant="primary"
          size="lg"
          className="mt-4 mb-6"
        >
          Submit Report
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};
