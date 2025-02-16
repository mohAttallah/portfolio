"use client";

import { Box, Button, Container, Grid2, TextField, Typography, IconButton } from "@mui/material";
import { Facebook, GitHub, Twitter, } from "@mui/icons-material";

export default function ContactSection() {

  return (
    <Container sx={{ gap: 4, py: 6 }} >
      <Grid2 container spacing={4} alignItems="center">
        
        <Grid2 size={{ xs: 12, md: 6 }} >
          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField label="Your name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField label="Your website (If exists)" variant="outlined" fullWidth />
            <TextField label="How can I help?" variant="outlined" fullWidth multiline rows={4} />
            <Button variant="contained" color="primary">Get In Touch</Button>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight={700}
            color="primary"
          >
            Let’s <strong>talk</strong> for
          </Typography>
          <Typography variant="h4" fontWeight={700}
            color="primary"
          >
            Something special
          </Typography>
          <Typography variant="body1" mt={2}
            color="#71717A"
          >
            I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.
          </Typography>
          <Typography variant="h6" fontWeight={600} mt={2}

            color="primary"
          >
            mohammad.attallah1@outlook.com

          </Typography>
          <Typography variant="h6" fontWeight={600}
            color="primary"
          >+962789500764</Typography>

          {/* Social Icons */}
          <Box display="flex" gap={2} mt={2}>
            <IconButton color="primary"><Facebook /></IconButton>
            <IconButton color="primary"><GitHub /></IconButton>
            <IconButton color="primary"><Twitter /></IconButton>
          </Box>
        </Grid2>
      </Grid2>


    </Container>
  );
}
