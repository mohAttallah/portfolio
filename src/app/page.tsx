import Image from "next/image";
import styles from "./page.module.css";
import { LandingSection,  MySkillsSection,  ExperienceSection, AboutMeSection,  ProjectsSection, TestimonialsSection, ContactSection } from 'src/components/sections';
import { Box } from "@mui/material";


export default function Home() {
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
    
    >

      <LandingSection />
      <MySkillsSection/>
      <ExperienceSection/>
      <AboutMeSection/>
      <ProjectsSection/>
      <TestimonialsSection/>
      <ContactSection/>
    </Box>
  );
}
