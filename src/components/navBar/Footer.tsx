"use client";
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const Footer = () => {
     const currentYear = new Date().getFullYear();

     return (
          <Box mt={4} py={2} textAlign="center" bgcolor="#000" color="#fff"
               sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
               }}
          >

               <Image src="/Images/icons/footer-logo.png" alt="logo" width={100} height={25} />

               <Typography variant="body2">© 2020-{currentYear} Mohammad Attallah</Typography>

          </Box>
     )
}

export default Footer;