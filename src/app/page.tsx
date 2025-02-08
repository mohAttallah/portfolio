import Image from "next/image";
import styles from "./page.module.css";
import { AboutMeSection,  MySkillsSection,  ExperienceSection } from 'src/components/sections';
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

      <AboutMeSection />
      <MySkillsSection/>
      <ExperienceSection/>
    </Box>
  );
}
