'use client';
import { Box, Typography, Link, Grid2} from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';

const LandingSection = () => {
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
                borderRadius: '20px',
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
                    style={{ width: '100%', height: 'auto' }}
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
                            [theme.breakpoints.down('sm')]: { fontSize: '1.3em' },

                        }}
                    >
                        Hello I'm
                    </Typography>
                    <Typography
                        component="h2"
                        sx={{
                            color: '#000000',
                            fontSize: '2rem',
                            [theme.breakpoints.down('sm')]: { fontSize: '1.3em' },
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
                            [theme.breakpoints.down('sm')]: { fontSize: '1.3em' },

                            fontWeight: '900'
                        }}
                    >
                        Full Stack
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            [theme.breakpoints.down('sm')]: { fontSize: '1.3em' },

                            fontWeight: '900',
                            color: 'black',
                            WebkitTextStroke: '1px black',
                            WebkitTextFillColor: 'white',
                        }}
                    >
                        Developer
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
                    <Typography variant="h4" sx={{

                        color: 'black',
                        [theme.breakpoints.down('sm')]: { fontSize: '1.3em' },

                    }}>
                        Based In
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: '900', color: 'black',

                            [theme.breakpoints.down('sm')]: { fontSize: '1.3em' },

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
                    Innovative, creative, and a powerful team player, I hold a BS in Computer Information Systems and have experience as a Full Stack JavaScript Developer. I'm currently working as a Software Engineer and am seeking to secure a new position.

                </Typography>

                <Grid2 container spacing={2}

                    sx={{
                        flexShrink: 1, alignItems: 'center',
                        maxWidth: '600px', width: '100%',
                        marginTop: { lg: '100px', md: '0', xs: '0' },

                    }}
                >
                    <Grid2 size={{ xs: 2.5, sm:1.5, md: 1,  }} >
                        <Link
                            sx={{
                                display: 'flex',
                                flexShrink: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 1,
                                borderColor: 'primary.main',
                                borderRadius: '5px',
                                padding: '5px',
                                backgroundColor: 'primary.main',
                            }}
                            href="https://www.linkedin.com/in/mohammad-mohmoud-attallah/"
                        >
                            <Image
                                src="/Images/icons/linkedin.png"
                                alt="hero"
                                width={30}
                                height={30}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Link>
                    </Grid2>
                    <Grid2 size={{ xs: 2.5,  sm:1.5, md: 1 }}>
                        <Link
                            sx={{
                                display: 'flex',
                                flexShrink: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 1,
                                borderColor: 'primary.main',
                                borderRadius: '5px',
                                padding: '5px',
                            }}
                            href="https://github.com/mohAttallah"
                        >
                            <Image
                                src="/Images/icons/github.png"
                                alt="hero"
                                width={30}
                                height={30}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Link>
                    </Grid2>
                    <Grid2 size={{ xs: 2.5,  sm:1.5, md: 1 }}>
                        <Link
                            sx={{
                                display: 'flex',
                                flexShrink: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 1,
                                borderColor: 'primary.main',
                                borderRadius: '5px',
                                padding: '5px',
                            }}
                            href="https://x.com/MohammadAttal13"
                        >
                            <Image
                                src="/Images/icons/twaitter.png"
                                alt="hero"
                                width={50}
                                height={50}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Link>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
};

export default LandingSection;
