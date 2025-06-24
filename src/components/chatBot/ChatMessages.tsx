import React, { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Typography,
} from '@mui/material';
import MessageBubble from './MessageBubble';
import WelcomeScreen from './WelcomeScreen';
import EmailForm from './EmailForm';
import BotLoading from './LoadingBot';

interface Message {
    id: string;
    message: string;
    isUser: boolean;
    timestamp: string;
    confidence?: number;
    intent?: string;
}

interface ChatMessagesProps {
    showChat: boolean;
    messages: Message[];
    chatbotInfo: any;
    isTyping: boolean;
    loading: boolean;
    error: string | null;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    onTopicClick: (topic: string) => void;
    onSendMessage: (message: string) => void;
    addBotMessage: (message: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
    showChat,
    messages,
    chatbotInfo,
    isTyping,
    loading,
    error,
    messagesEndRef,
    onTopicClick,
    onSendMessage,
    addBotMessage,
}) => {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [emailFormDismissed, setEmailFormDismissed] = useState(false);

    const lastBotMessage = messages.filter(m => !m.isUser).pop();
    const shouldShowEmailForm = lastBotMessage?.intent === 'contact.email' && !emailFormDismissed;

    useEffect(() => {
        const lastMessageId = messages[messages.length - 1]?.id;
        if (lastMessageId && lastBotMessage?.intent !== 'contact.email') {
            setEmailFormDismissed(false);
        }
    }, [messages, lastBotMessage?.intent]);

    const handleEmailSent = (successMessage: string) => {
        setShowEmailForm(false);
        setEmailFormDismissed(true);
        setTimeout(() => {
            addBotMessage(successMessage);
        }, 600);
    };

    const handleEmailCancel = () => {
        setShowEmailForm(false);
        setEmailFormDismissed(true);
        setTimeout(() => {
            addBotMessage("Email cancelled. Is there anything else I can help you with?");
        }, 100);
    };
    return (
        <Fade in={showChat}>
            <Box
                sx={{
                    p: 2,
                    height: 'calc(100% - 120px)',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    bgcolor: 'primary.light',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'divider',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'divider',
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: '#666666',
                        },
                    },
                }}
            >
                {messages.length === 0 ? (
                    <WelcomeScreen 
                        chatbotInfo={chatbotInfo}
                        onTopicClick={onTopicClick}
                    />
                ) : (
                    <>
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        
                        {shouldShowEmailForm && (
                            <Box sx={{ mt: 2 }}>
                                <EmailForm 
                                    onEmailSent={handleEmailSent}
                                    onCancel={handleEmailCancel}
                                />
                            </Box>
                        )}
                    </>
                )}
                {(isTyping || loading) && (
                    <BotLoading loading={isTyping || loading} />
                )}
                {error && (
                    <Box
                        sx={{
                            p: 1.5,
                            background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(255, 87, 34, 0.1) 100%)',
                            color: 'error.main',
                            borderRadius: 2,
                            mb: 1,
                            border: '1px solid rgba(244, 67, 54, 0.2)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Box sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Box
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'error.main',
                                    flexShrink: 0
                                }}
                            />
                            <Typography variant="body2">
                                {error}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Box>
        </Fade>
    );
};

export default ChatMessages;
