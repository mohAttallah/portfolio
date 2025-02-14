import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { HeaderSections } from '../common';
const projectData = [
    {
        id: 1,
        title: 'Facilitor - Real State Website',
        description:
            'Lorem ipsum is simply dummy text of the printing and typesetting industry since the 1500s...',
        image: '/Images/facilitor.png',
    },
    {
        id: 2,
        title: 'Radio Paradise - Music Website',
        description:
            'From the Euphoria Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
        image: '/Images/radioParadise.png',
    },
    {
        id: 3,
        title: 'My Tenant Connect - Real State Website',
        description:
            'Lorem ipsum is simply dummy text of the printing and typesetting industry since the 1500s...',
        image: '/Images/MyTenant.png',
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
                    >
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 0,
                                    paddingBottom: '56.25%',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
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
