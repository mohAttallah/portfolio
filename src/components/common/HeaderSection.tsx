import React from 'react';
import { Box, Typography } from '@mui/material';

interface HeaderSectionsProps {
    firstPart: string;
    secondPart: string;
    textColor?: string;
    style ?: React.CSSProperties;
    
}


const HeaderSections: React.FC<HeaderSectionsProps> = ({ firstPart, secondPart,  textColor="primary.main", style={} }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '20px',
                ...style
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    color: textColor,
                    textAlign: 'center',
                    fontSize: '2rem',
                    fontWeight: '500',
                }}
            >
                {firstPart}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    color:textColor,
                    fontWeight: '900',
                    textAlign: 'center',
                    fontSize: '2rem',
                }}
            >
               {secondPart}
            </Typography>
        </Box>
    );
};

export default HeaderSections;