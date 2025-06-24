import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Paper,
} from '@mui/material';
import {
    SmartToy as BotIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import formatTime from 'src/lib/formatTime';

interface Message {
    id: string;
    message: string;
    isUser: boolean;
    timestamp: string;
    confidence?: number;
    intent?: string;
}

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    return (
        <Box
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
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: message.isUser ? 'primary.light': 'primary.main',
                            '& a': {
                                color: message.isUser ? '#90CAF9' : '#1976D2',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                }
                            },
                            '& strong': {
                                fontWeight: 600,
                            },
                            '& em': {
                                fontStyle: 'italic',
                            },
                            '& code': {
                                backgroundColor: message.isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                padding: '2px 4px',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                fontSize: '0.875em',
                            },
                            '& pre': {
                                backgroundColor: message.isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                padding: '8px',
                                borderRadius: '4px',
                                overflow: 'auto',
                                fontFamily: 'monospace',
                                fontSize: '0.875em',
                                margin: '4px 0',
                            },
                            '& ul, & ol': {
                                marginLeft: '16px',
                                marginTop: '4px',
                                marginBottom: '4px',
                            },
                            '& li': {
                                marginBottom: '2px',
                            },
                            '& p': {
                                margin: '4px 0',
                            },
                            '& h1, & h2, & h3, & h4, & h5, & h6': {
                                margin: '8px 0 4px 0',
                                fontWeight: 600,
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: message.message }}
                    />
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
    );
};

export default MessageBubble;
