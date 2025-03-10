'use client';

import { Card, CardContent, Typography, Box } from "@mui/material";
import { HeaderSections } from 'src/components/common';
import Image from "next/image";
import { motion } from 'framer-motion';

const experiences = [

    {
        company: "CSC  Beyond",
        role: "Software Engineer",
        description:
            "<br/>  Plan, Design, Develop, and Deploy scalable web and mobile apps. <br/> <br/> After graduating, I started as a Junior Developer, gaining valuable experience in React, TypeScript, NestJS, and Node.js, including building mobile apps with React Native and web apps with Nodejs and Reactjs.",
        icon: "csc.jpg",
        period: "Oct 2023 - Present",
        iconStyle: { width: 100, height: 50 },

    },
    {
        company: "(ASAC)",
        role: "Full Stack Web Developer JavaScript Intern",
        description:
            "Completed three tasks weekly over a six-month period, focusing on problem-solving and web development tasks using Express and React,implementing unit tests with Jest. <br /><br />Achieved an average score of 95% on the tasks",
        icon: "ltuc.png",
        period: "Apr 2023 - Oct 2023",
        iconStyle: { width: 150, height: 50 },
    },
];

const ExperienceSection = () => {
    return (
        <Box sx={{ bgcolor: "primary.main", color: "white", py: 2, px: 3 }}>

            <HeaderSections firstPart="My" secondPart="Experience" textColor={"secondary.main"} />

            <Box sx={{ maxWidth: 800, mx: "auto" }}>
                {experiences.map((exp, index) => (
                    <Card key={index} sx={{ mb: 2, p: 2, backgroundColor: index === 0 ? "#27272A" : "transparent", border: "1px solid ", borderColor: index === 0 ? 'transparent' : "#71717A", borderRadius: 2 }}
                        component={motion.div}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}


                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>

                                <Image src={`/Images/icons/${exp.icon}`} alt={exp.company} width={exp.iconStyle.width} height={exp.iconStyle.height} />

                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", flexWrap: "wrap" }}>


                                    <Typography variant="h6" fontWeight={600}>
                                        {exp.role} at {exp.company}
                                    </Typography>
                                    <Typography variant="caption" color="gray">
                                        {exp.period}
                                    </Typography>
                                </Box>

                            </Box>
                            <Typography variant="body2" mt={1} mb={1} dangerouslySetInnerHTML={{ __html: exp.description }} />
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}


export default ExperienceSection;
