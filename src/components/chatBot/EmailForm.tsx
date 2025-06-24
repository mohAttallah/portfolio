import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from '@mui/material';
import {
    Send as SendIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useChatbotEmail } from '../hooks';

interface EmailFormProps {
    onEmailSent: (message: string) => void;
    onCancel: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSent, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
    });

    const { sendChatbotEmail, loading, error, success } = useChatbotEmail();

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            message: '',
        };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            const emailSent = await sendChatbotEmail(formData);
            
            if (emailSent) {
                setFormData({ name: '', email: '', message: '' });
                setErrors({ name: '', email: '', message: '' });
                
                setTimeout(() => {
                    onEmailSent("✅ Your message has been sent to Mohammad successfully! He will get back to you soon.");
                }, 500);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
                p: 2,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 248, 0.95) 100%)',
                borderRadius: 2,
                border: '1px solid rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EmailIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    Send Email to Mohammad
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Message sent successfully!
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Your Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={loading}
                    sx={{
                        '& .MuiInputBase-input': { color: 'primary.main' }
                    }}
                />

                <TextField
                    label="Your Email"
                    variant="outlined"
                    size="small"
                    type="email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={loading}
                    sx={{
                        '& .MuiInputBase-input': { color: 'primary.main' }
                    }}
                />

                <TextField
                    label="Your Message"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                    fullWidth
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    error={!!errors.message}
                    helperText={errors.message}
                    disabled={loading}
                    sx={{
                        '& .MuiInputBase-input': { color: 'primary.main' }
                    }}
                />

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={16} /> : <SendIcon />}
                        sx={{
                            flex: 1,
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >
                        {loading ? 'Sending...' : 'Send Email'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onCancel}
                        disabled={loading}
                        sx={{ minWidth: 'auto', px: 2 }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EmailForm;
