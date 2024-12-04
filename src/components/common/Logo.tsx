import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Logo: React.FC = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: "center", gap: "10px" }}>
        <Image
            priority
            src="/svg/logo.svg"
            height={30}
            width={30}
            alt="logo"
        />
        <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main, fontWeight: "600" }}>
            Attallah
        </Typography>

    </Box>
    );
};

export default Logo;