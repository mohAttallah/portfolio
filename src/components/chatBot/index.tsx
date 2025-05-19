import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Drawer,
    TextField,
    IconButton,
    Typography,
    Paper,
    Avatar,
    CircularProgress,
    Fade
} from '@mui/material';
import {
    Chat as ChatIcon,
    Send as SendIcon,
    Close as CloseIcon,
    SmartToy as BotIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import formatTime from 'src/lib/formatTime';
import BotButton from './ButtonBot';    
import BotLoading from './LoadingBot';
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const getMockResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const responses = [
                "Thanks for your message! This is a demo chat bot.",
                "I'm just a UI demo without backend integration.",
                "You can customize this component with real API calls later.",
                "Feel free to style this component however you like!",
                "What else would you like to chat about?",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            resolve(randomResponse);
        }, 1500);
    });
};

const ChatBot: React.FC = () => {
    
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

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

        const userMsg: Message = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);        
        setNewMessage('');
        setLoading(true);

        try {
            const response = await getMockResponse(newMessage);
            const botMsg: Message = {
                id: Date.now() + 1,
                text: response,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error getting response:', error);
        } finally {
            setLoading(false);
        }
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
                <Box
                    sx={{
                        p: 2,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: { xs: '16px 16px 0 0', sm: '16px 16px 0 0' },

                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="h6" component="div" sx={{ 
                        fontWeight: 600,
                        color: 'primary.main'
                    }}>
                        Chat Assistant
                    </Typography>
                    <IconButton
                        onClick={handleToggle}
                        sx={{ color: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

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
                            <Box
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'text.secondary',
                                    p: 2,
                                    textAlign: 'center',
                                }}
                            >
                                <ChatIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
                                <Typography variant="body1">
                                    Send a message to start chatting!
                                </Typography>
                            </Box>
                        ) : (
                            messages.map((message) => (
                                <Box
                                    key={message.id}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                        alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                    }}
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                        {message.sender === 'bot' && (
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    bgcolor: 'primary.main',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                              
                                                <BotIcon 
                                                    sx={{
                                                        fontSize: '1.5rem',
                                                        color: 'primary.light'
                                                    }}
                                                />

                                            </Avatar>
                                        )}
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                                                color: message.sender === 'user' ? 'white' : 'text.primary',
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ 
                                                
                                                color:  message.sender === 'user' ? 'primary.light': 'primary.main'


                                             }}>{message.text}</Typography>
                                        </Paper>
                                        {message.sender === 'user' && (
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    bgcolor: 'primary.main',
                                                    fontSize: '0.875rem',
                                                    color: 'primary.light'
                                                }}
                                            >
                                                U
                                            </Avatar>
                                        )}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 0.5,
                                            color: 'text.secondary',
                                            mr: message.sender === 'user' ? 4 : 0,
                                            ml: message.sender === 'bot' ? 4 : 0,
                                        }}
                                    >
                                        {formatTime(message.timestamp)}
                                    </Typography>
                                </Box>
                            ))
                        )}
                        {loading && (
                            <BotLoading loading={loading} />
                        )}
                        <div ref={messagesEndRef} />
                    </Box>
                </Fade>

                <Box
                    component="form"
                    onSubmit={handleSendMessage}
                    sx={{
                        p: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        bgcolor: 'primary.light',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
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
                            disabled={loading || newMessage.trim() === ''}
                            onClick={() => handleSendMessage()}
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
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                <SendIcon />
                            )}
                        </IconButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default ChatBot; 