"use client";
import { Box, Typography } from '@mui/material';
import { Logo } from '../common';

const Footer =()=>{
    const currentYear = new Date().getFullYear();

    return(
           <Box mt={4} py={2} textAlign="center" bgcolor="#000" color="#fff"
           sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
           }}
           
           >
                <Logo />
             <Typography variant="body2">© 2020-{currentYear} Attallah</Typography>
          
           </Box>
    )
}

export default Footer;