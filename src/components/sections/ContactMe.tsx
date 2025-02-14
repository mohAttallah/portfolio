import React from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';

const ContactSection = () => {
  return (
    <Box sx={{ 
        width: '100%',
      p: 4,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Get in Touch
      </Typography>

      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Your name"
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your website (if exists)"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="How can I help?*"
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ 
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': { transform: 'translateY(-2px)' },
                transition: 'transform 0.2s'
              }}
            >
              Get in Touch
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ContactSection;