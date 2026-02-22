import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeeperCard } from '../components/KeeperCard';

// Mock data
const mockKeepers = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Campus Security',
    location: 'Main Building, Room 101',
    contact: 'security@college.edu',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Student Affairs',
    location: 'Student Center, Room 205',
    contact: 'sarah.j@college.edu',
  },
  {
    id: '3',
    name: 'Mike Davis',
    role: 'Library Staff',
    location: 'Library, Front Desk',
    contact: 'library@college.edu',
  },
  {
    id: '4',
    name: 'Emily Chen',
    role: 'Campus Admin',
    location: 'Administration Building',
    contact: 'admin@college.edu',
  },
];

export const KeepersScreen = ({ navigation }) => {
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
        <ScrollView className="flex-1 px-4 py-3">
          {mockKeepers.map((keeper) => (
            <KeeperCard
              key={keeper.id}
              {...keeper}
              onPress={() => {
                // Could navigate to keeper details or initiate contact
                console.log('Contact keeper:', keeper.name);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
