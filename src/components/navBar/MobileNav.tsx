"use client";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { Icons, Logo, ResumeButton } from '../common';

interface MobileNavProps {
    pages:  {id: string, name: string}[];
    drawerOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    scrollToSection: (page: {id: string, name: string}) => void;

}

const MobileNav = ({ pages, drawerOpen, onOpen, onClose ,  scrollToSection}: MobileNavProps) => {
    const theme = useTheme();


    return (
        <Box
            sx={{ paddingRight: "0px", minWidth: "100%", display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center' }}
        >
            <Logo />
            <Box>
                <Icons.IconButton
                    size="large"
                    aria-label="open drawer"
                    onClick={onOpen}
                    color="primary"
                >
                    <Icons.MenuIcon />
                </Icons.IconButton>

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={onClose}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: theme.palette.secondary.main,
                            width: 250,
                            alignItems: 'center',
                        },
                    }}
                >
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '20px' }}
                    >
                        <Logo />
                        <List>
                            {pages.map((page) => (
                                <ListItem component="a" key={page.id} onClick={()=>{scrollToSection(page)}} href={`#${page.name.toLowerCase().replace(' ', '-')}`}>
                                    <ListItemText primary={page.name} sx={{ textAlign: 'center', color: theme.palette.primary.main }} />
                                </ListItem>
                            ))}
                            <ListItem component="div" onClick={onClose}>
                                <ResumeButton />
                            </ListItem>
                        </List>

                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
};

export default MobileNav;