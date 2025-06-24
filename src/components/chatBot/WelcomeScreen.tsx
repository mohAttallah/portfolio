import React from 'react';
import {
    Box,
    Typography,
    Button,
} from '@mui/material';
import {
    Chat as ChatIcon,
    AutoAwesome as SparkleIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
    chatbotInfo: any;
    onTopicClick: (topic: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
    chatbotInfo,
    onTopicClick,
}) => {
    return (
        <Box
            sx={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                color: 'text.secondary',
                p: 3,
                pb: 6,
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
                    mb: 2,
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
                mb: 2,
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
                        width: '100%',
                        mb: 4
                    }}>
                        {chatbotInfo.availableTopics.map((topic: string, index: number) => {
                            const isEmailTopic = topic === "Send Email to Mohammad";
                            return (
                                <Button
                                    key={index}
                                    onClick={() => {
                                        if (isEmailTopic) {
                                            onTopicClick("send email");
                                        } else {
                                            onTopicClick(topic);
                                        }
                                    }}
                                    variant="outlined"
                                    sx={{
                                        background: isEmailTopic 
                                            ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.8) 0%, rgba(63, 81, 181, 0.8) 100%)'
                                            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(39, 39, 42, 0.8) 100%)',
                                        backdropFilter: 'blur(10px)',
                                        border: isEmailTopic 
                                            ? '1px solid rgba(33, 150, 243, 0.3)'
                                            : '1px solid rgba(255, 255, 255, 0.1)',
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
                                            background: isEmailTopic
                                                ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.9) 0%, rgba(63, 81, 181, 0.9) 100%)'
                                                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(39, 39, 42, 0.9) 100%)',
                                            borderColor: isEmailTopic 
                                                ? 'rgba(33, 150, 243, 0.5)'
                                                : 'rgba(255, 255, 255, 0.3)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: isEmailTopic 
                                                ? '0 8px 25px rgba(33, 150, 243, 0.3)'
                                                : '0 8px 25px rgba(0, 0, 0, 0.3)',
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
                            );
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default WelcomeScreen;
