'use client';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Icons } from './common';
import { DesktopNav, MobileNav } from "./navBar";
import { useScreenSize } from './hooks/useScreenSize';
export { Icons };

const pages = [
  { id: 'aboutme', name: 'About Me' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact me' }
];
function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDesktop } = useScreenSize();
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const scrollToSection = (section: {id: string, name: string}) => {
    const element = document.getElementById(section.id);
    
    if (element) {
      const navbarHeight = document.querySelector('header')?.offsetHeight || 80;
      
      const elementPosition = element.getBoundingClientRect().top;
      
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    handleCloseDrawer();
  };




  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "secondary.main",
        boxShadow: scrolled ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isDesktop ? (
            <DesktopNav pages={pages} scrollToSection={scrollToSection} />
          ) : (
            <MobileNav
              pages={pages}
              drawerOpen={drawerOpen}
              onOpen={handleOpenDrawer}
              onClose={handleCloseDrawer}
              scrollToSection={scrollToSection}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;