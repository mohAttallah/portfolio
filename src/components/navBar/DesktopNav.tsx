import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

interface DesktopNavProps {
  pages: string[];
  onClose: () => void;
}

const DesktopNav = ({ pages, onClose }: DesktopNavProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { md: 'flex' },
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      {pages.map((page) => (
        <Button
          key={page}
          onClick={onClose}
          sx={{ my: 2, color: theme.palette.primary.main, display: 'block' }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNav;
