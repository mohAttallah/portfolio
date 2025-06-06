"use client";

import { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Container, 
  Grid2, 
  TextField, 
  Typography, 
  IconButton,
  Snackbar,
  Alert,
  Slide,
  SlideProps
} from "@mui/material";
import { Facebook, GitHub, Twitter } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEmail } from "../hooks";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { 
    sendEmail, 
    loading, 
    error: emailError, 
    success: emailSuccess, 
    response: emailResponse, 
    reset: resetEmail 
  } = useEmail();

  useEffect(() => {
    if (emailSuccess && emailResponse) {
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({ name: "", email: "", message: "" });
    }
  }, [emailSuccess, emailResponse]);

  useEffect(() => {
    if (emailError) {
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  }, [emailError]);

  

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      message: ""
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await sendEmail({ name, email, message });
    } else {
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    // Reset email hook state when snackbar closes
    if (emailError || emailSuccess) {
      resetEmail();
    }
  };

  return (
    <Container sx={{ gap: 4, py: 6 }} component={motion.div} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={staggerContainer}
    >
      <Grid2 container spacing={4} alignItems="center">
        {/* Left side - Contact information */}
        <Grid2 size={{ xs: 12, md: 6 }} component={motion.div} variants={fadeInUp} transition={{ duration: 0.5 }}>
          <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
            <Typography variant="h4" fontWeight={700} color="primary">
              Let's <strong>talk</strong> for
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp} transition={{ duration: 0.7 }}>
            <Typography variant="h4" fontWeight={700} color="primary">
              Something special
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
            <Typography variant="body1" mt={2} color="#71717A">
              I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp} transition={{ duration: 0.9 }}>
            <Typography variant="h6" fontWeight={600} mt={2} color="primary">
              mohammad.attallah1@outlook.com
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp} transition={{ duration: 1.0 }}>
            <Typography variant="h6" fontWeight={600} color="primary">
              +962789500764
            </Typography>
          </motion.div>

          {/* Social Icons */}
          <Box display="flex" gap={2} mt={2} component={motion.div} variants={fadeInUp} transition={{ duration: 1.1 }}>
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <IconButton color="primary"><Facebook /></IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <IconButton color="primary"><GitHub /></IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
              <IconButton color="primary"><Twitter /></IconButton>
            </motion.div>
          </Box>
        </Grid2>

        {/* Right side - Contact form */}
        <Grid2 size={{ xs: 12, md: 6 }} component={motion.div} variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
          <Box 
            component="form"
            display="flex" 
            flexDirection="column" 
            gap={2}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <TextField
                label="Your name"
                variant="outlined"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                type="name"
                value={name}
                color="primary"
                helperText={errors.name}
                sx={{
                  input: { color: 'primary.main' },
                  '& .MuiInputBase-input': { color: 'primary.main' }
                }}
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                helperText={errors.email}
                sx={{
                  input: { color: 'primary.main' },
                  '& .MuiInputBase-input': { color: 'primary.main' }
                }}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <TextField
                label="How can I help?"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                helperText={errors.message}
                sx={{
                  input: { color: 'primary.main' },
                  '& .MuiInputBase-input': { color: 'primary.main' }
                }}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                onClick={handleSubmit}
                sx={{ position: "relative", overflow: "hidden" }}
              >
                {loading ? "Sending..." : "Get In Touch"}
              </Button>
            </motion.div>
          </Box>
        </Grid2>
      </Grid2>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={SlideTransition}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {emailError || emailResponse?.message || "Please correct the errors in the form."}
        </Alert>
      </Snackbar>
    </Container>
  );
}