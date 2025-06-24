import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Drawer,
} from '@mui/material';
import BotButton from './ButtonBot';    
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from '../hooks';

const ChatBot: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { 
        messages, 
        sendMessage, 
        addBotMessage,
        loading, 
        error, 
        chatbotInfo, 
        clearMessages, 
        isTyping 
    } = useChat();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleToggle = () => {
        setOpen(!open);
        setShowTooltip(false);
        if (!open) {
            setTimeout(() => setShowChat(true), 300);
        } else {
            setShowChat(false);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (newMessage.trim() === '') return;

        const messageText = newMessage;
        setNewMessage('');
        await sendMessage(messageText);
    };

    const handleDirectMessage = async (messageText: string) => {
        await sendMessage(messageText);
    };

    const handleTopicClick = (topic: string) => {
        setNewMessage(`Tell me about ${topic.toLowerCase()}`);
    };

    return (
        <>
            <BotButton 
                open={open}
                showTooltip={showTooltip}
                handleToggle={handleToggle}
                setShowTooltip={setShowTooltip}
            />

            <Drawer
                anchor="left"
                open={open}
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: '380px' },
                        height: { xs: '70vh', sm: '500px' },
                        borderRadius: { xs: '16px 16px 0 0', sm: '16px' },
                        bottom: { xs: '0', sm: '90px' },
                        left: { xs: '0', sm: '24px' },
                        right: { xs: '0', sm: 'auto' },
                        position: 'fixed',
                        m: { xs: 0, sm: 0 },
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        visibility: 'visible',
                        bgcolor: 'primary.light',
                        border: '1px solid',
                        borderColor: 'divider',
                    }
                }}
                sx={{
                    '& .MuiBackdrop-root': {
                        display: 'none',
                    },
                    '& .MuiDrawer-paper': {
                        visibility: 'visible',
                        position: 'fixed',
                    }
                }}
                onClose={() => setOpen(false)}
            >
                <ChatHeader
                    chatbotInfo={chatbotInfo}
                    messagesLength={messages.length}
                    onClose={handleToggle}
                    onClearMessages={clearMessages}
                />

                <ChatMessages
                    showChat={showChat}
                    messages={messages}
                    chatbotInfo={chatbotInfo}
                    isTyping={isTyping}
                    loading={loading}
                    error={error}
                    messagesEndRef={messagesEndRef}
                    onTopicClick={handleTopicClick}
                    onSendMessage={handleDirectMessage}
                    addBotMessage={addBotMessage}
                />

                <ChatInput
                    newMessage={newMessage}
                    loading={loading}
                    isTyping={isTyping}
                    chatbotInfo={chatbotInfo}
                    onMessageChange={setNewMessage}
                    onSendMessage={handleSendMessage}
                    onTopicClick={handleTopicClick}
                />
            </Drawer>
        </>
    );
};

export default ChatBot; 