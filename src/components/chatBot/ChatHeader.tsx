import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    Button,
} from '@mui/material';
import {
    Close as CloseIcon,
    SmartToy as BotIcon,
} from '@mui/icons-material';

interface ChatHeaderProps {
    chatbotInfo: any;
    messagesLength: number;
    onClose: () => void;
    onClearMessages: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    chatbotInfo,
    messagesLength,
    onClose,
    onClearMessages,
}) => {
    return (
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
                {messagesLength > 0 && (
                    <Button
                        onClick={onClearMessages}
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
                    onClick={onClose}
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
    );
};

export default ChatHeader;
