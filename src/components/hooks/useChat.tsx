'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const CHAT_MUTATION = gql`
  mutation Chat($message: String!) {
    chat(message: $message) {
      message
      confidence
      intent
      timestamp
    }
  }
`;

const CHATBOT_INFO_QUERY = gql`
  query ChatbotInfo {
    chatbotInfo {
      status
      availableTopics
      website
    }
  }
`;

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
  confidence?: number;
  intent?: string;
}

interface ChatResponse {
  message: string;
  confidence: number;
  intent: string;
  timestamp: string;
}

interface ChatbotInfo {
  status: string;
  availableTopics: string[];
  website: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (message: string) => Promise<void>;
  addBotMessage: (message: string) => void;
  loading: boolean;
  error: string | null;
  chatbotInfo: ChatbotInfo | null;
  clearMessages: () => void;
  isTyping: boolean;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const [chatMutation] = useMutation(CHAT_MUTATION);
  const { data: chatbotInfoData } = useQuery(CHATBOT_INFO_QUERY);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setIsTyping(true);

      const userMessage: ChatMessage = {
        id: generateId(),
        message: messageText,
        isUser: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, userMessage]);

      const result = await chatMutation({
        variables: { message: messageText },
        errorPolicy: 'all' 
      });

      const chatResponse: ChatResponse = result.data?.chat;

      if (chatResponse && chatResponse.message) {
        const botMessage: ChatMessage = {
          id: generateId(),
          message: chatResponse.message,
          isUser: false,
          timestamp: chatResponse.timestamp || new Date().toISOString(),
          confidence: chatResponse.confidence || 0,
          intent: chatResponse.intent || 'unknown'
        };

        setMessages(prev => [...prev, botMessage]);
      } else if (result.errors && result.errors.length > 0) {
        console.error('GraphQL errors:', result.errors);
        throw new Error('GraphQL query failed');
      } else {
        throw new Error('No response received from chat service');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
      
      let userFriendlyMessage = 'Sorry, I encountered an error. Please try again.';
      if (errorMsg.includes('NetworkError') || errorMsg.includes('fetch')) {
        userFriendlyMessage = 'Network error. Please check your connection and try again.';
      } else if (errorMsg.includes('timeout')) {
        userFriendlyMessage = 'Request timed out. Please try again.';
      }
      
      const errorMessage: ChatMessage = {
        id: generateId(),
        message: userFriendlyMessage,
        isUser: false,
        timestamp: new Date().toISOString(),
        intent: 'error'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  const addBotMessage = (messageText: string) => {
    const botMessage: ChatMessage = {
      id: generateId(),
      message: messageText,
      isUser: false,
      timestamp: new Date().toISOString(),
      confidence: 1,
      intent: 'system'
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  return {
    messages,
    sendMessage,
    addBotMessage,
    loading,
    error,
    chatbotInfo: chatbotInfoData?.chatbotInfo || null,
    clearMessages,
    isTyping
  };
};
