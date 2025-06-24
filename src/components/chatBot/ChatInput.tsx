import React from 'react';
import {
    Box,
    TextField,
    IconButton,
    CircularProgress,
} from '@mui/material';
import {
    Send as SendIcon,
} from '@mui/icons-material';
import PopularTopics from './PopularTopics';
import { usePopularTopics } from '../hooks';

interface ChatInputProps {
    newMessage: string;
    loading: boolean;
    isTyping: boolean;
    chatbotInfo: any;
    onMessageChange: (value: string) => void;
    onSendMessage: (e?: React.FormEvent) => void;
    onTopicClick: (topic: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
    newMessage,
    loading,
    isTyping,
    chatbotInfo,
    onMessageChange,
    onSendMessage,
    onTopicClick,
}) => {
    const {
        showPopularTopics,
        handleInputFocus,
        handleInputBlur,
        handleInputChange,
        setShowPopularTopics,
    } = usePopularTopics();

    const handleMessageChange = (value: string) => {
        onMessageChange(value);
        handleInputChange(value);
    };

    const handleTopicSelect = (topic: string) => {
        setShowPopularTopics(false);
        
        if (topic === "Send Email to Mohammad") {
            onTopicClick(topic);
        } else {
            const message = `Tell me about ${topic.toLowerCase()}`;
            onMessageChange(message);
            handleInputChange(message);
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                bgcolor: 'primary.light',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <PopularTopics
                    topics={chatbotInfo?.availableTopics || []}
                    onTopicClick={handleTopicSelect}
                    show={showPopularTopics}
                />
            </Box>
            
            <Box
                component="form"
                onSubmit={onSendMessage}
                sx={{
                    p: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'primary.light',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => handleMessageChange(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        size="small"
                        autoComplete="off"
                        disabled={loading}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                            },
                            '& .MuiInputBase-input': {
                                color: 'primary.main',
                            }
                        }}
                    />
                    <IconButton
                        color="primary"
                        disabled={loading || isTyping || newMessage.trim() === ''}
                        onClick={() => onSendMessage()}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                            },
                            '&.Mui-disabled': {
                                bgcolor: 'action.disabledBackground',
                                color: 'action.disabled',
                            }
                        }}
                    >
                        {loading || isTyping ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            <SendIcon />
                        )}
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatInput;
