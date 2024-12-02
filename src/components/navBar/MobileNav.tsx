import { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { Icons } from '../common';
interface MobileNavProps {
    pages: string[];
    anchorElNav: HTMLElement | null;
    onOpen: (event: MouseEvent<HTMLElement>) => void;
    onClose: () => void;
}

const MobileNav = ({ pages, anchorElNav, onOpen, onClose }: MobileNavProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={ { minWidth:"100%", display: { xs: 'flex',  md:'none' }, justifyContent: 'space-between', alignItems: 'center' }}
        >
            <Box  sx={{  display: 'flex', flexDirection:"row", alignItems:"center",  gap:"10px" }}>
                <Image
                    priority
                    src="/svg/logo.svg"
                    height={30}
                    width={30}
                    alt="logo"
                />
                <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main, fontWeight:"600" }}>
                     Attallah
                </Typography>

            </Box>

            <Box >

                <Icons.IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={onOpen}
                    color="primary"
                >
                    <Icons.MenuIcon />

                </Icons.IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={onClose}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiPaper-root': {
                            backgroundColor: theme.palette.secondary.main,
                        },

                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={onClose}>
                            <Typography sx={{ textAlign: 'center', color: theme.palette.primary.main }}>
                                {page}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

export default MobileNav;
