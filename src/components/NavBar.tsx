'use client';
import { useState, MouseEvent } from 'react';
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

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.secondary.main,
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