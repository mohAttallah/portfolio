'use client';

import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
  highlight: boolean;
  rating: number | string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Evren Shah',
    role: 'Designer',
    message:
      'I recently had to jump on 10+ different calls across eight different countries to find the right owner.',
    avatar: '/Images/user.png',
    highlight: false,
    rating: 79,
  },
  {
    name: 'Flora Sheen',
    role: 'Designer',
    message:
      'I recently had to jump on 10+ different calls across eight different countries to find the right owner.',
    avatar: '/Images/user.png', 
    highlight: true, 
    rating: 79,
  },
  {
    name: 'Evren Shah',
    role: 'Designer',
    message:
      'I recently had to jump on 10+ different calls across eight different countries to find the right owner.',
    avatar: '/Images/user.png', 
    highlight: false,
    rating: 79,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        >
          My <span style={{ color: '#000' }}>Testimonial</span>
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: testimonial.highlight ? '#000' : '#fff',
                  color: testimonial.highlight ? '#fff' : '#000',
                  transition: 'all 0.3s ease',
                  boxShadow: testimonial.highlight
                    ? '0px 8px 20px rgba(0,0,0,0.2)'
                    : '0px 8px 20px rgba(0,0,0,0.05)',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: testimonial.highlight
                      ? '0px 12px 24px rgba(0,0,0,0.4)'
                      : '0px 12px 24px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {/* Avatar + Rating Container */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  {/* Avatar Image */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      margin: '0 auto',
                    }}
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                    />
                  </Box>

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: '50%',
                      transform: 'translateX(50%)',
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: testimonial.highlight ? '#fff' : '#000',
                      color: testimonial.highlight ? '#000' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      border: testimonial.highlight ? '2px solid #000' : '2px solid #fff',
                    }}
                  >
                    {testimonial.rating}
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                  {testimonial.message}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {testimonial.name}
                </Typography>

                <Typography variant="body2" sx={{ color: testimonial.highlight ? '#ccc' : '#666' }}>
                  {testimonial.role}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
