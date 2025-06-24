'use client';

import { Card, CardContent, Typography, Box } from "@mui/material";
import { HeaderSections } from 'src/components/common';
import Image from "next/image";
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  },
  hover: {
    y: -5,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 }
  }
};

const experiences = [
    {
        company: "CSC Beyond",
        role: "Software Engineer",
        description:
            "<br/>  Plan, Design, Develop, and Deploy scalable web and mobile apps. <br/> <br/> After graduating, I started as a Junior Developer, gaining valuable experience in React, TypeScript, NestJS, and Node.js, including building mobile apps with React Native and web apps with Nodejs and Reactjs.",
        icon: "csc.jpg",
        period: "Oct 2023 - Present",
    },
    {
        company: "(ASAC)",
        role: "Full Stack Web Developer JavaScript Intern",
        description:
            "Completed three tasks weekly over a six-month period, focusing on problem-solving and web development tasks using Express and React,implementing unit tests with Jest. <br /><br />Achieved an average score of 95% on the tasks",
        icon: "ltuc.png",
        period: "Apr 2023 - Oct 2023",
    },
];

const ExperienceSection = () => {
    return (
        <Box 
          sx={{ bgcolor: "primary.main", color: "white", py: 4, px: 3 }}
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeaderSections firstPart="My" secondPart="Experience" textColor={"secondary.main"} />
            </motion.div>

            <Box sx={{ maxWidth: 800, mx: "auto", mt: 3 }}>
                {experiences.map((exp, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        mb: 3, 
                        p: 2, 
                        backgroundColor: index === 0 ? "#27272A" : "transparent", 
                        border: "1px solid", 
                        borderColor: index === 0 ? 'transparent' : "#71717A", 
                        borderRadius: 2,
                        transition: "all 0.3s ease"
                      }}
                      component={motion.div}
                      variants={cardVariants}
                      whileHover="hover"
                      custom={index}
                      transition={{ delay: index * 0.2 }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Box 
                                  sx={{ 
                                    position: 'relative',
                                    minWidth: index === 0 ? 100 : 150,
                                    height: 50,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Image 
                                    src={`/Images/icons/${exp.icon}`} 
                                    alt={exp.company}
                                    style={{
                                      objectFit: 'contain',
                                      maxWidth: '100%',
                                      maxHeight: '100%'
                                    }}
                                    width={index === 0 ? 100 : 150}
                                    height={50}
                                    priority
                                  />
                                </Box>

                                <Box sx={{ 
                                  display: "flex", 
                                  flexDirection: { xs: "column", sm: "row" }, 
                                  justifyContent: "space-between", 
                                  width: "100%", 
                                  alignItems: { xs: "flex-start", sm: "center" },
                                  gap: { xs: 1, sm: 0 }
                                }}>
                                    <Typography variant="h6" fontWeight={600}>
                                        {exp.role} at {exp.company}
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      color="gray"
                                      sx={{ 
                                        alignSelf: { xs: "flex-start", sm: "flex-end" },
                                        ml: { xs: 0, sm: 2 }
                                      }}
                                    >
                                        {exp.period}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography 
                              variant="body2" 
                              mt={2} 
                              mb={1} 
                              sx={{ lineHeight: 1.6 }}
                              dangerouslySetInnerHTML={{ __html: exp.description }} 
                            />
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default ExperienceSection;
