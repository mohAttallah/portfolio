'use client';

import { Box, Container, Grid2, Typography } from '@mui/material';
import Image from 'next/image';
import { HeaderSections } from '../common';
import { useScreenSize } from 'src/components/hooks/useScreenSize';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1, 
      ease: [0.6, 0.01, -0.05, 0.95]
    }
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.3, 
      ease: "easeInOut" 
    }
  }
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    } 
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    } 
  }
};

const AboutMe = () => {
    const { isDesktop } = useScreenSize();
    const imageSize = isDesktop ? 400 : 300;

    return (
        <Container 
          sx={{ gap: 4, py: 6 }}
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
            <Grid2 container spacing={6} alignItems="center">
                <Grid2
                    size={{ xs: 12, md: 6 }}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      mb: { xs: 4, md: 0 } 
                    }}
                    component={motion.div}
                    variants={fadeInUp}
                >
                    <motion.div
                      variants={imageVariants}
                      whileHover="hover"
                      style={{ 
                        borderRadius: '20px', 
                        overflow: 'hidden',
                        position: 'relative',
                        width: imageSize,
                        height: imageSize,
                        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <Image 
                        src='/Images/me.png' 
                        alt="Profile Image" 
                        fill
                        priority
                        style={{ 
                          objectFit: 'cover',
                          objectPosition: 'center top'
                        }}
                        sizes={`${imageSize}px`}
                      />
                    </motion.div>
                </Grid2>

                <Grid2 
                  size={{ xs: 12, md: 6 }} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'flex-start',
                    pl: { md: 4 },
                    pr: { md: 2 }
                  }}
                  component={motion.div}
                  variants={textContainerVariants}
                >
                    <motion.div variants={textVariants}>
                      <HeaderSections firstPart='About' secondPart='Me' />
                    </motion.div>

                    <motion.div variants={textVariants}>
                      <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                          I'm a passionate full-stack developer specializing in React Native, Next.js, and Node.js. I thrive on crafting seamless digital experiences by merging clean, efficient code with intuitive UI/UX design. Performance, accessibility, and maintainability are at the core of my development approach.
                      </Typography>
                    </motion.div>

                    <motion.div variants={textVariants}>
                      <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                          I started my journey at <strong>Tafila Technical University</strong>, earning a <strong>Bachelor's degree in Computer Information Systems</strong> (Jan 2020 - May 2023). After that, I joined the <strong>Abdul Aziz Al Ghurair School of Advanced Computing (ASAC)</strong> as a <strong>Full Stack Web Developer JavaScript Intern</strong> (Apr 2023 - Oct 2023), where I deepened my expertise in modern web technologies. Currently, I'm working as a <strong>Software Engineer at CSC Beyond</strong> (Nov 2023 - Present), contributing to building scalable applications and innovative digital solutions.
                      </Typography>
                    </motion.div>

                    <motion.div variants={textVariants}>
                      <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                          Beyond coding, I love engaging with the developer community, staying up to date with the latest tech trends, and sharing insights. You can find me refining my skills, contributing to projects, or discussing software architecture. Feel free to connect with me on GitHub or follow my journey on social media!
                      </Typography>
                    </motion.div>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default AboutMe;
