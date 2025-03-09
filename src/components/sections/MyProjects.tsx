'use client';

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { HeaderSections } from '../common';
import Link from 'next/link';
import { motion } from 'framer-motion';

const projectData = [
    {
        id: 1,
        title: 'Facilitor - Real State Website',
        description:
            'An online real estate facilitator acts as a bridge between property buyers and sellers, ensuring seamless transactions while offering expert guidance',
        image: '/Images/facilitor.png',
        link: 'https://facilitor.com/',
    },
    {
        id: 2,
        title: 'Radio Paradise - Music Website',
        description:
            'Radio Paradise streams highly curated, eclectic mixes of music -- chosen by real humans -- with unparalleled audio quality.',
        image: '/Images/radioParadise.png',
        link: 'https://radioparadise.com/',
    },
    {
        id: 3,
        title: 'Barrel hub - Oil and Gas Price Website',
        description:
            'Barrel Hub is an oil and gas data platform focused on granular transaction data between Texas oil and purchasers and producers.',
        image: '/Images/barrelhub.png',
        link: 'https://barrelhub.co/',
    },
];

const ProjectsSection: React.FC = () => {
    return (
        <Box
            component="section"
            sx={{
                backgroundColor: '#000',
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <HeaderSections firstPart="My" secondPart="Projects" textColor={"secondary.main"} />

                {projectData.map((project, index) => (
                    <Grid
                        container
                        spacing={4}
                        sx={{ mb: 8, alignItems: 'center', flexDirection: index % 2 === 1 ? 'row-reverse' : 'row' }}
                        key={project.id}
                        component={motion.div}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Grid item xs={12} md={6}>
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 0,
                                        paddingBottom: '56.25%',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                    }}
                                    component={motion.div}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </Box>
                            </Link>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#666',
                                    fontWeight: 'bold',
                                    mb: 2,
                                }}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    mb: 2,
                                }}
                            >
                                {project.title}
                            </Typography>

                            <Typography variant="body1" sx={{ color: '#aaa' }}>
                                {project.description}
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Container>
        </Box>
    );
};

export default ProjectsSection;
