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

const pages = ['About Me', 'Skills', 'Projexts', 'Contact me'];

function NavBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
          <Icons.AdbIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: theme.palette.primary.main,
            }}
          />
          {isDesktop ? (
            <DesktopNav pages={pages} onClose={handleCloseNavMenu} />
          ) : (
            <MobileNav
              pages={pages}
              anchorElNav={anchorElNav}
              onOpen={handleOpenNavMenu}
              onClose={handleCloseNavMenu}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;