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
    Fade,
    Button,
    Chip
} from '@mui/material';
import {
    Chat as ChatIcon,
    Send as SendIcon,
    Close as CloseIcon,
    SmartToy as BotIcon,
    AutoAwesome as SparkleIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import formatTime from 'src/lib/formatTime';
import BotButton from './ButtonBot';    
import BotLoading from './LoadingBot';
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
                <Box
                    sx={{
                        p: 2,
                        background: 'linear-gradient(135deg, #000000 0%, #27272A 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: { xs: '16px 16px 0 0', sm: '16px 16px 0 0' },
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 50%, #FFFFFF 100%)',
                            opacity: 0.6,
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <BotIcon sx={{ color: '#000000', fontSize: '1.2rem' }} />
                        </Box>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ 
                                fontWeight: 600,
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                                Chat Assistant
                            </Typography>
                            {chatbotInfo && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box
                                        sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: '50%',
                                            bgcolor: '#00FF88',
                                            boxShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
                                        }}
                                    />
                                    <Typography variant="caption" sx={{ 
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        fontSize: '0.75rem'
                                    }}>
                                        {chatbotInfo.status}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {messages.length > 0 && (
                            <Button
                                onClick={clearMessages}
                                sx={{ 
                                    color: 'rgba(255, 255, 255, 0.8)', 
                                    fontSize: '0.75rem',
                                    minWidth: 'auto',
                                    px: 1.5,
                                    py: 0.5,
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                    }
                                }}
                                size="small"
                                title="Clear chat"
                            >
                                Clear
                            </Button>
                        )}
                        <IconButton
                            onClick={handleToggle}
                            sx={{ 
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.05)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
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
                                    p: 3,
                                    textAlign: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #000000 0%, #27272A 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3,
                                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                                        position: 'relative',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            inset: -2,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                                            zIndex: -1,
                                        }
                                    }}
                                    component={motion.div}
                                    animate={{
                                        rotateY: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    <ChatIcon sx={{ fontSize: 32, color: 'white' }} />
                                </Box>
                                <Typography variant="h6" sx={{ 
                                    mb: 1,
                                    color: 'primary.main',
                                    fontWeight: 600
                                }}>
                                    Hi! I'm Mohammad's AI Assistant
                                </Typography>
                                <Typography variant="body2" sx={{
                                    color: 'text.secondary',
                                    mb: 3,
                                    maxWidth: '280px'
                                }}>
                                    I'm here to help you learn more about Mohammad's skills, experience, and projects. What would you like to know?
                                </Typography>
                                {chatbotInfo?.availableTopics && (
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant="body2" sx={{ 
                                            mb: 2, 
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1
                                        }}>
                                            <SparkleIcon sx={{ fontSize: '1rem' }} />
                                            Popular Topics
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            gap: 1,
                                            width: '100%'
                                        }}>
                                            {chatbotInfo.availableTopics.slice(0, 4).map((topic, index) => (
                                                <Button
                                                    key={index}
                                                    onClick={() => handleTopicClick(topic)}
                                                    variant="outlined"
                                                    sx={{
                                                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(39, 39, 42, 0.8) 100%)',
                                                        backdropFilter: 'blur(10px)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                                        color: 'white',
                                                        textTransform: 'none',
                                                        borderRadius: 3,
                                                        py: 1.5,
                                                        px: 2,
                                                        fontSize: '0.85rem',
                                                        fontWeight: 500,
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        '&::before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: '-100%',
                                                            width: '100%',
                                                            height: '100%',
                                                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                                                            transition: 'left 0.5s ease',
                                                        },
                                                        '&:hover': {
                                                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(39, 39, 42, 0.9) 100%)',
                                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                                                            '&::before': {
                                                                left: '100%',
                                                            }
                                                        },
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                    component={motion.div}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ 
                                                        duration: 0.3, 
                                                        delay: index * 0.1 
                                                    }}
                                                    whileHover={{ 
                                                        scale: 1.02,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <SparkleIcon sx={{ 
                                                        fontSize: '0.9rem', 
                                                        mr: 1,
                                                        opacity: 0.7
                                                    }} />
                                                    {topic}
                                                </Button>
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            messages.map((message) => (
                                <Box
                                    key={message.id}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: message.isUser ? 'flex-end' : 'flex-start',
                                        alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%',
                                    }}
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                        {!message.isUser && (
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    background: 'linear-gradient(135deg, #000000 0%, #27272A 100%)',
                                                    fontSize: '0.875rem',
                                                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
                                                <BotIcon 
                                                    sx={{
                                                        fontSize: '1.2rem',
                                                        color: 'white'
                                                    }}
                                                />
                                            </Avatar>
                                        )}
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                background: message.isUser 
                                                    ? 'linear-gradient(135deg, #000000 0%, #27272A 100%)'
                                                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 248, 0.95) 100%)',
                                                color: message.isUser ? 'white' : 'text.primary',
                                                border: message.isUser 
                                                    ? '1px solid rgba(255, 255, 255, 0.1)'
                                                    : '1px solid rgba(0, 0, 0, 0.05)',
                                                backdropFilter: 'blur(10px)',
                                                boxShadow: message.isUser 
                                                    ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                                                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                                                position: 'relative',
                                                '&::before': message.isUser ? {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '1px',
                                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                                } : {}
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ 
                                                color: message.isUser ? 'primary.light': 'primary.main'
                                            }}>
                                                {message.message}
                                            </Typography>
                                            {!message.isUser && message.confidence !== undefined && (
                                                <Box sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                    mt: 1,
                                                    pt: 1,
                                                    borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                                                }}>
                                                    <Box
                                                        sx={{
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: '50%',
                                                            background: message.confidence > 0.8 
                                                                ? 'linear-gradient(45deg, #4CAF50, #8BC34A)'
                                                                : message.confidence > 0.6
                                                                ? 'linear-gradient(45deg, #FF9800, #FFC107)'
                                                                : 'linear-gradient(45deg, #F44336, #FF5722)',
                                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                                        }}
                                                    />
                                                    <Typography variant="caption" sx={{ 
                                                        color: 'text.secondary',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 500
                                                    }}>
                                                        Confidence: {Math.round(message.confidence * 100)}%
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Paper>
                                        {message.isUser && (
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                                                    fontSize: '0.875rem',
                                                    color: 'black',
                                                    fontWeight: 600,
                                                    border: '2px solid rgba(0, 0, 0, 0.1)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
                                            mr: message.isUser ? 4 : 0,
                                            ml: !message.isUser ? 4 : 0,
                                        }}
                                    >
                                        {formatTime(new Date(message.timestamp))}
                                    </Typography>
                                </Box>
                            ))
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
                                <Typography variant="body2" sx={{ 
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
                                    {error}
                                </Typography>
                            </Box>
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
                            disabled={loading || isTyping || newMessage.trim() === ''}
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
                            {loading || isTyping ? (
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