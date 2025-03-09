"use client";

import { useState, useEffect } from "react";
import {
  LandingSection,
  MySkillsSection,
  ExperienceSection,
  AboutMeSection,
  ProjectsSection,
  TestimonialsSection,
  ContactSection
} from 'src/components/sections';

import { PreLoader } from "src/components/common";
import { Box, Fade } from "@mui/material";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <PreLoader onComplete={() => setLoading(false)} />
      ) : (
        <Fade in timeout={800}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            <Box id="home"><LandingSection /></Box>
            <Box id="skills"><MySkillsSection /></Box>
            <Box id="experience"><ExperienceSection /></Box>
            <Box id="aboutme"><AboutMeSection /></Box>
            <Box id="projects"><ProjectsSection /></Box>
            {/* <Box id="testimonials"><TestimonialsSection /></Box> */}
            <Box id="contact"><ContactSection /></Box>
          </Box>
        </Fade>
      )}
    </Box>
  );
}
