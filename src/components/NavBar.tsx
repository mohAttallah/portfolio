'use client';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Icons } from './common';
import { DesktopNav, MobileNav } from "./navBar";

export { Icons };

const pages = ['About Me', 'Skills', 'Projects', 'Contact me'];

function NavBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
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
            <DesktopNav pages={pages} onClose={handleCloseDrawer} />
          ) : (
            <MobileNav
              pages={pages}
              drawerOpen={drawerOpen}
              onOpen={handleOpenDrawer}
              onClose={handleCloseDrawer}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;