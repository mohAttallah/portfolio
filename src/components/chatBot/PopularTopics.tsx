import React from 'react';
import {
    Box,
    Chip,
    Typography,
} from '@mui/material';
import {
    AutoAwesome as SparkleIcon,
    TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface PopularTopicsProps {
    topics: string[];
    onTopicClick: (topic: string) => void;
    show: boolean;
}

const PopularTopics: React.FC<PopularTopicsProps> = ({
    topics,
    onTopicClick,
    show,
}) => {
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: -15,
            height: 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            height: 'auto',
            transition: {
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.04,
            },
        },
        exit: {
            opacity: 0,
            y: -15,
            height: 0,
            transition: {
                duration: 0.25,
                ease: [0.4, 0.6, 1, 1],
            },
        },
    };

    const chipVariants = {
        hidden: {
            opacity: 0,
            scale: 0.85,
            y: 8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ 
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}
                >
                    <Box
                        sx={(theme) => ({
                            p: 1.5,
                            pb: 1,
                            backgroundColor: theme.palette.primary.light,
                            backdropFilter: 'blur(16px)',
                            borderTop: '1px solid',
                            borderLeft: '1px solid',
                            borderRight: '1px solid',
                            borderColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '8px 8px 0 0',
                            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.08)',
                        })}
                    >
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1, 
                            mb: 1 
                        }}>
                            <SparkleIcon sx={(theme) => ({ 
                                fontSize: '0.9rem', 
                                color: theme.palette.primary.main,
                                opacity: 0.7
                            })} />
                            <Typography variant="caption" sx={(theme) => ({ 
                                color: theme.palette.primary.main,
                                fontWeight: 500,
                                fontSize: '0.7rem',
                                opacity: 0.8
                            })}>
                                Quick Topics
                            </Typography>
                        </Box>
                        
                        <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 0.75
                        }}>
                            {topics.slice(0, 8).map((topic, index) => (
                                <motion.div
                                    key={topic}
                                    variants={chipVariants}
                                    whileHover={{ 
                                        scale: 1.05,
                                        transition: { duration: 0.12 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Box
                                        onClick={() => onTopicClick(topic)}
                                        sx={(theme) => ({
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.light,
                                            fontSize: '0.65rem',
                                            fontWeight: 500,
                                            height: '22px',
                                            px: 1,
                                            borderRadius: '11px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: `1px solid ${theme.palette.primary.main}`,
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: theme.palette.primary.main,
                                                borderColor: theme.palette.primary.main,
                                                transform: 'translateY(-1px)',
                                                boxShadow: `0 2px 8px ${theme.palette.primary.main}20`,
                                            },
                                            '&:active': {
                                                transform: 'translateY(0px)',
                                            },
                                        })}
                                    >
                                        #{topic.replace(/\s+/g, '_').toLowerCase()}
                                    </Box>
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PopularTopics;
