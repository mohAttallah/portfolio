'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

const AboutMe = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row-reverse' },
                alignItems: 'center',
                justifyContent: 'space-evenly',
                gap: { xs: '15px', md: '20px' },
                padding: '20px',
                backgroundColor: '#f7f7f7',
                borderRadius: '20px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                margin: '40px',
                marginTop: '100px',
            }}
        >
            <Box sx={{
                flexShrink: 1, alignItems: 'center',
                maxWidth: '600px', width: '100%'
            }}>
                <Image
                    src="/Images/developer.png"
                    alt="hero"
                    width={600}
                    height={600}
                    layout="responsive"
                />
            </Box>

            <Box margin={2}
                sx={
                    {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        [theme.breakpoints.down('sm')]: { gap: '10px' },
                    }
                }
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Typography
                        component="h2"
                        sx={{
                            color: '#000000',
                            fontSize: '2rem',
                            [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' },

                        }}
                    >
                        Hello I'm
                    </Typography>
                    <Typography
                        component="h2"
                        sx={{
                            color: '#000000',
                            fontSize: '2rem',
                            [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' },
                            fontWeight: '900'
                        }}
                    >
                        Mohammad
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'black',
                            [theme.breakpoints.down('sm')]: { fontSize: '1.5em' },

                            fontWeight: '900'
                        }}
                    >
                        Full Stack
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' },

                            fontWeight: '900',
                            color: 'black',
                            WebkitTextStroke: '1px black',
                            WebkitTextFillColor: 'white',
                        }}
                    >
                        Developer
                    </Typography>
                </Box>

                {/* Based In Jordan */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Typography variant="h4" sx={{

                        color: 'black',
                        [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' },

                    }}>
                        Based In
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: '900', color: 'black',

                            [theme.breakpoints.down('sm')]: { fontSize: '1.5rem' },

                        }}
                    >
                        Jordan
                    </Typography>
                </Box>

                <Typography
                    variant="h6"
                    sx={{
                        color: theme.palette.grey[700],
                        [theme.breakpoints.down('sm')]: { fontSize: '1rem' },
                        maxWidth: '600px',
                    }}
                >
                    Innovative, creative, and a powerful team player, I hold a BS in Computer Information Systems and have experience as a Full Stack JavaScript Developer intern. I am currently working as a Full Stack Developer and am seeking to secure a new position.
                </Typography>

            </Box>
        </Box>
    );
};

export default AboutMe;
