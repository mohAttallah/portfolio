"use client";

import { useState } from "react";
import { Box, Button, Container, Grid2, TextField, Typography, IconButton } from "@mui/material";
import { Facebook, GitHub, Twitter, } from "@mui/icons-material";
import { useMutation, gql } from "@apollo/client";

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($name: String!, $email: String!, $message: String!) {
    sendMessage(name: $name, email: $email, message: $message) {
      success
      message
    }
  }
`;

export default function ContactSection() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE_MUTATION, {
    onCompleted: (data) => {
      setFormStatus(data.sendMessage.message);
      if (data.sendMessage.success) {
        setName("");
        setEmail("");
        setMessage("");
      }
    },
    onError: (err) => {
      setFormStatus("An error occurred. Please try again.");
      console.error("Mutation error:", err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({
      variables: { name, email, message },
    });
  };

  return (
    <Container sx={{ gap: 4, py: 6 }} >
      <Grid2 container spacing={4} alignItems="center">

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

        <Grid2 size={{ xs: 12, md: 6 }} >
          <Box component="form" display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Your name"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              type="name"
              value={name}
              color="primary"
              sx={{
                input: { color: 'primary.main' },
                '& .MuiInputBase-input': { color: 'primary.main' }
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required              
              sx={{
                input: { color: 'primary.main' },
                '& .MuiInputBase-input': { color: 'primary.main' }
              }}

            />


            <TextField
              label="How can I help?"
              variant="outlined"
              fullWidth multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              sx={{
                input: { color: 'primary.main' },
                '& .MuiInputBase-input': { color: 'primary.main' }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Sending..." : "Get In Touch"}
            </Button>

            {formStatus && (
              <Typography
                variant="body2"
                color={error ? "error" : "success.main"}
              >
                {formStatus}
              </Typography>
            )}

            {error && (
              <Typography variant="body2" color="error">
                Error: {error.message}
              </Typography>
            )}
          </Box>
        </Grid2>


      </Grid2>


    </Container>
  );
}
