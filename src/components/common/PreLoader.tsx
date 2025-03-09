import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import SplitType from "split-type";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const loadingText = new SplitType(".loading-text.initial", { types: "chars" });
    const completeText = new SplitType(".loading-text.complete", { types: "chars" });

    gsap.set(".loading-text.complete", { y: "100%" });
    gsap.set(loadingText.chars, { opacity: 0, y: 100 });
    gsap.set(completeText.chars, { opacity: 0, y: 100 });

    gsap.to(loadingText.chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out"
    });

    const tl = gsap.timeline({
      onUpdate: function(this: gsap.core.Timeline) {
        setProgress(Math.round(this.progress() * 100));
      },
      onComplete: onComplete
    });

    tl.to(".progress-bar", {
      width: "100%",
      duration: 5,
      ease: "power1.inOut"
    })
      .to(".loading-text.initial", { y: "-100%", duration: 0.5 })
      .to(".loading-text.complete", { y: "0%", duration: 0.5 }, "<")
      .to(completeText.chars, { opacity: 1, y: 0, duration: 0.3, stagger: 0.03 }, "<0.2")
      .to(".preloader", { y: "-100vh", duration: 1, ease: "power2.inOut", delay: 0.8 });
  }, [onComplete]);

  return (
    <Box
      className="preloader"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "secondary.main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <Box className="progress-container" sx={{ width: 300, height: 3, backgroundColor: "rgba(0,0,0,0.1)", mb: 2, borderRadius: 1 }}>
        <Box className="progress-bar" sx={{ height: "100%", width: `${progress}%`, backgroundColor: "background.default", borderRadius: 1 }} />
      </Box>
      <Box className="text-container" sx={{ height: 48, overflow: "hidden", position: "relative", width: 200 }}>
        <Typography className="loading-text initial" sx={{ position: "absolute", width: "100%", textAlign: "center", color: "primary.main" }}>
          Loading
        </Typography>
        <Typography className="loading-text complete" sx={{ position: "absolute", width: "100%", textAlign: "center", color: "primary.main" }}>
          Complete
        </Typography>
      </Box>
      <Typography 
        className="percentage" 
        sx={{ 
          position: "absolute",
          fontSize: "15rem", 
          fontWeight: "bold",
          color: "background.default",
          opacity: 0.07, 
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none"
        }}
      >
        {progress}%
      </Typography>
    </Box>
  );
};

export default Preloader;