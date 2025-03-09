'use client';

import { Box, Typography, Grid2 } from '@mui/material';
import Image from 'next/image';
import { HeaderSections } from "src/components/common"
import { motion } from 'framer-motion';

const MySlills = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };




    const skills = [
        {
            id: 2,
            name: "TypeScript",
            icon: '/svg/typescript.svg',
        },

        {
            id: 1,
            name: 'JavaScript',
            icon: '/svg/javascript.svg',
        },
        {
            id: 3,
            name: "Node",
            icon: '/svg/node.svg',
        },
        {
            id: 4,
            name: "Nest",
            icon: '/svg/nest.svg',
        }, {
            id: 5,
            name: "Express.",
            icon: "/svg/expressjs.svg"

        },
        {
            id: 6,
            name: "Next",
            icon: "/svg/nextjs.svg"
        },
        {
            id: 7,
            name: "React",
            icon: "/svg/react.svg"
        },
        {
            id: 8,
            name: "React Native",
            icon: "/svg/reactnative.svg"
        },
        {
            id: 9,
            name: "Socket.io",
            icon: "/svg/socketio.svg"
        },
        {
            id: 10,
            name: "PostgreSQL",
            icon: "/svg/postgresql.svg"
        },
        {
            id: 11,
            name: "MySQL",
            icon: "/svg/mysql.svg"
        },
        {
            id: 12,
            name: "Mongodb",
            icon: "/svg/mongodb.svg"
        },
        {
            id: 13,
            name: "Sass",
            icon: "/svg/sass.svg"
        },
        {
            id: 14,
            name: "MUI",
            icon: "/svg/mui.svg"
        },
        {
            id: 15,
            name: "Tailwind",
            icon: "/svg/tailwind.svg"
        },
        {
            id: 16,
            name: "Git",
            icon: "/svg/git.svg"
        },
        {
            id: 17,
            name: "Github",
            icon: "/svg/github.svg"
        },
        {
            id: 18,
            name: "Firebase",
            icon: "/svg/firebase.svg"
        },






    ]


    return (

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
        >
            <Box

                sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    gap: { xs: '15px', md: '20px' },
                    padding: '20px',
                }}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <HeaderSections firstPart="My" secondPart="Skills" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    style={{ width: '100%' }}
                >

                    <Grid2
                        container
                        width={"100%"}
                        spacing={5}
                        justifyContent="center"
                        alignItems="center"

                    >
                        {skills.map((skill) => (

                            <Grid2
                                key={skill.id}
                                component={motion.div}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
        
                            >
                                <Box

                                    sx={{
                                        minWidth: { xs: '120px', sm: '150px' },
                                        maxWidth: { xs: '120px', },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        padding: '20px',
                                        gap: '10px',
                                        border: '2px solid #000000',
                                        borderRadius: '10px',
                                        backgroundColor: skill.id === 1 ? '#000000' : 'white',
                                    }}
                                >

                                    <Image
                                        src={skill.icon}
                                        alt={skill.name}
                                        layout="responsive"
                                        width={45}
                                        height={45}

                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '0.7rem',
                                            fontWeight: '600',
                                            color: skill.id === 1 ? 'white' : 'black',
                                        }}
                                    >
                                        {skill.name}
                                    </Typography>
                                </Box>
                            </Grid2>


                        ))}
                    </Grid2>
                </motion.div>



            </Box>
        </motion.div>


    );
};

export default MySlills;
