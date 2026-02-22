import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ChatBubble } from '../components/ChatBubble';

// Mock messages
const mockMessages = [
  { id: '1', message: 'Hi! I think I found your item.', isOwn: false, timestamp: '10:30 AM' },
  { id: '2', message: 'That\'s great! Can you describe it?', isOwn: true, timestamp: '10:32 AM' },
  { id: '3', message: 'It\'s a black backpack with a laptop inside.', isOwn: false, timestamp: '10:33 AM' },
];

export const ChatScreen = ({ route, navigation }) => {
  const { itemId } = route.params || {};
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      message: inputText,
      isOwn: true,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">
              Chat
            </Text>
            <Text className="text-sm text-gray-500">Active now</Text>
          </View>
        </View>

        {/* Messages */}
        <View className="flex-1 px-4 py-4">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} {...msg} />
          ))}
        </View>

        {/* Input */}
        <View className="bg-white border-t border-gray-200 px-4 py-3 flex-row items-center">
          <TextInput
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
            placeholderTextColor="#9ca3af"
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            className="bg-blue-600 rounded-full w-10 h-10 items-center justify-center"
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
