'use client';

import { Box, Container, Grid2, Typography } from '@mui/material';
import Image from 'next/image';
import { HeaderSections } from '../common';
import { useScreenSize } from 'src/components/hooks/useScreenSize';

const AboutMe = () => {
    const {isDesktop} = useScreenSize();

    return (
        <Container sx={{ gap: 4, py: 6 }}>
            <Grid2 container spacing={4}>

                <Grid2
                    size={{ xs: 12, md: 6 }}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image src='/Images/me.png' alt="Profile Image" width={isDesktop? 400: 300} height={isDesktop? 400: 300} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <HeaderSections firstPart='About' secondPart='Me' />

                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        I'm a passionate full-stack developer specializing in React Native, Next.js, and Node.js. I thrive on crafting seamless digital experiences by merging clean, efficient code with intuitive UI/UX design. Performance, accessibility, and maintainability are at the core of my development approach.
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        I started my journey at <strong>Tafila Technical University</strong>, earning a <strong>Bachelor’s degree in Computer Information Systems</strong> (Jan 2020 - May 2023). After that, I joined the <strong>Abdul Aziz Al Ghurair School of Advanced Computing (ASAC)</strong> as a <strong>Full Stack Web Developer JavaScript Intern</strong> (Apr 2023 - Oct 2023), where I deepened my expertise in modern web technologies. Currently, I'm working as a <strong>Software Engineer at CSC Beyond</strong> (Nov 2023 - Present), contributing to building scalable applications and innovative digital solutions.
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        Beyond coding, I love engaging with the developer community, staying up to date with the latest tech trends, and sharing insights. You can find me refining my skills, contributing to projects, or discussing software architecture. Feel free to connect with me on GitHub or follow my journey on social media!
                    </Typography>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default AboutMe;
