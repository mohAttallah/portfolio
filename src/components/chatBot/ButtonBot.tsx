import React from 'react';
import { Box, Tooltip, Zoom, Fab } from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';

interface BotButtonProps {
  open: boolean;
  showTooltip: boolean;
  handleToggle: () => void;
  setShowTooltip: (show: boolean) => void;
}

const BotButton: React.FC<BotButtonProps> = ({
  open,
  showTooltip,
  handleToggle,
  setShowTooltip
}) => {

  return (
    <Zoom in={true}>
      <Box
        sx={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 1000,
        }}
      >
        <Tooltip
          title="How can I help?"
          placement="right"
          open={showTooltip}
          arrow
          sx={{
            fontWeight: 900,
            fontSize: '1.5rem',
            animation: showTooltip ? 'pulse 1.5s infinite' : 'none',
            '@keyframes pulse': {
              '0%': { opacity: 0.7 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.7 },
            }
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Fab
              color="primary"
              aria-label="chat"
              onClick={handleToggle}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => !open && setShowTooltip(false)}
              sx={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                border: '2px dashed',
                borderColor: 'primary.light',
                outline: "0.5px solid",
                outlineColor: 'primary.main',
              }}
            >
              {open ? <CloseIcon /> : <ChatIcon />}
            </Fab>
          </motion.div>
        </Tooltip>
      </Box>
    </Zoom>
  );
};

export default BotButton;