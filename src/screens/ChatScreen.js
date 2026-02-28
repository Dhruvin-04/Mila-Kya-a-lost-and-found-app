import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ChatBubble } from '../components/ChatBubble';
import { getOrCreateChat, subscribeToMessages, sendMessage } from '../services/chatService';
import { useAuth } from '../context/AuthContext';

export const ChatScreen = ({ route, navigation }) => {
  const { itemId, otherUserId } = route.params || {};
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initChat = async () => {
      if (!itemId || !user?.uid || !otherUserId) {
        setLoading(false);
        return;
      }

      try {
        const chat = await getOrCreateChat(itemId, user.uid, otherUserId);
        setChatId(chat.id);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing chat:', error);
        Alert.alert('Error', 'Failed to load chat. Please try again.');
        setLoading(false);
      }
    };

    initChat();
  }, [itemId, user?.uid, otherUserId]);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = subscribeToMessages(chatId, (fetchedMessages) => {
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatId) return;

    const messageText = inputText.trim();
    setInputText('');

    try {
      await sendMessage(chatId, user.uid, messageText);
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
      setInputText(messageText); // Restore the message on failure
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-500 mt-4">Loading chat...</Text>
      </SafeAreaView>
    );
  }

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
        <ScrollView className="flex-1 px-4 py-4">
          {messages.length === 0 ? (
            <View className="items-center justify-center py-12">
              <Ionicons name="chatbubbles-outline" size={48} color="#d1d5db" />
              <Text className="text-gray-400 text-sm mt-4">
                No messages yet. Start the conversation!
              </Text>
            </View>
          ) : (
            messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.text}
                isOwn={msg.senderId === user?.uid}
                timestamp={msg.timestamp}
              />
            ))
          )}
        </ScrollView>

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
