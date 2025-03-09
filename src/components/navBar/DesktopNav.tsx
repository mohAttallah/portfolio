"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { Icons, Logo, ResumeButton } from '../common';

interface DesktopNavProps {
  pages:  {id: string, name: string}[];
  scrollToSection: (page: {id: string, name: string}) => void;
}

const DesktopNav = ({ pages, scrollToSection }: DesktopNavProps) => {
  const theme = useTheme();




  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { md: 'flex' },
        backgroundColor: "secondary.main",
        flexDirection: "row", alignItems: "center", gap: "10px",
        justifyContent: 'space-evenly',
        boxShadow: 'none',
      }}
    >


      <Logo />
      <Box
      sx={{
        
        display: { xs: 'none', md: 'flex' },
        flexDirection: "row", alignItems: "center", gap: "10px",
        justifyContent: 'space-between',
      }}
      >
        {pages.map((page) => (
          <Button
          key={page.id}
          onClick={() => scrollToSection(page)}

            sx={{ my: 2, color: theme.palette.primary.main, display: 'block', fontSize: '0.9rem', textTransform: 'none', fontWeight: '600' }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
      <ResumeButton />
    </Box>
  );
};

export default DesktopNav;
