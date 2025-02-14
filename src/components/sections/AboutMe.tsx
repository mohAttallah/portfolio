'use client';

import { Box, Container, Grid2, Typography } from '@mui/material';
import Image from 'next/image';
import { HeaderSections } from '../common';
const AboutMe = () => {
    return (
        <Container sx={{ gap: 4, py: 6 }} >
            <Grid2 container spacing={4}>

                <Grid2
                    size={{ xs: 12, md: 5 }}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image src='/Images/me.png' alt="Profile Image" width={400} height={400} />
                </Grid2>

                <Grid2 size={{ xs: 12, md: 7 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <HeaderSections firstPart='About' secondPart='Me'
                        style={{

                        }}
                    />

                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        I&apos;m a passionate, self-proclaimed designer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matters to me.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        I began my journey as a web developer in 2015, and since then, I&apos;ve continued to grow and evolve as a developer, taking on new challenges and learning the latest technologies along the way. Now, in my early thirties, I&apos;m building cutting-edge web applications using modern technologies such as Next.js, TypeScript, NestJS, Tailwindcss, Supabase, and much more.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        When I&apos;m not in full-on developer mode, you can find me hovering around on Twitter or Indie Hacker, witnessing the journey of early startups, or enjoying some free time. You can follow me on Twitter where I share tech-related bites and build in public, or you can follow me on GitHub.
                    </Typography>
                </Grid2>
            </Grid2>


        </Container>
    );
};

export default AboutMe;
