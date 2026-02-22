import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { ReportScreen } from '../screens/ReportScreen';
import { KeepersScreen } from '../screens/KeepersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ItemDetailsScreen } from '../screens/ItemDetailsScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { QRScannerScreen } from '../screens/QRScannerScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Keepers') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Keepers" component={KeepersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen 
          name="ItemDetails" 
          component={ItemDetailsScreen}
          options={{
            headerShown: true,
            headerTitle: 'Item Details',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="QRScanner" 
          component={QRScannerScreen}
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
