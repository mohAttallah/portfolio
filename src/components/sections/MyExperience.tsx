'use client';

import { Card, CardContent, Typography, Box } from "@mui/material";
import {HeaderSections} from 'src/components/common';
import Image from "next/image";
const experiences = [
    {
        company: "Google",
        role: "Lead Software Engineer",
        description:
            "As a Senior Software Engineer at Google, I played a pivotal role in developing innovative solutions for Google's core search algorithms. Collaborating with a dynamic team of engineers, I contributed to the enhancement of search accuracy and efficiency, optimizing user experiences for millions of users worldwide.",
        icon: null,
        period: "Nov 2019 - Present",
    },
    {
        company: "Youtube",
        role: "Software Engineer",
        description:
            "At Youtube, I served as a Software Engineer, focusing on the design and implementation of backend systems for the social media giant's dynamic platform. Working on projects that involved large-scale data processing and user engagement features, I leveraged my expertise to ensure seamless functionality and scalability.",
        icon: null,
        period: "Jan 2017 - Oct 2019",
    },
    {
        company: "Apple",
        role: "Junior Software Engineer",
        description:
            "During my tenure at Apple, I held the role of Software Architect, where I played a key role in shaping the architecture of mission-critical software projects. Responsible for designing scalable and efficient systems, I provided technical leadership to a cross-functional team.",
        icon: null,
        period: "Jan 2016 - Dec 2017",
    },
];

const ExperienceSection = () => {
    return (
        <Box sx={{ bgcolor: "primary.main", color: "white", py: 2, px: 3 }}>

            <HeaderSections firstPart="My" secondPart="Experience" textColor={"secondary.main"} />

            <Box sx={{ maxWidth: 800, mx: "auto" }}>
                {experiences.map((exp, index) => (
                    <Card key={index} sx={{  mb: 2, p: 2, backgroundColor: index ===0? "#27272A":"transparent", border: "1px solid #71717A", borderRadius: 10 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" gap={1}>

                                <Image src='/Images/icons/ltuc.png' alt={exp.company} width={120} height={50} />

                                <Typography variant="h6" fontWeight={600}>
                                    {exp.role} at {exp.company}
                                </Typography>
                            </Box>
                            <Typography variant="body2" mt={1} mb={1}>
                                {exp.description}
                            </Typography>
                            <Typography variant="caption" color="gray">
                                {exp.period}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}


export default ExperienceSection;
