import React from 'react';
import { Box, Tooltip, Zoom, Fab, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';

interface BotButtonProps {
  open: boolean;
  showTooltip: boolean;
  handleToggle: () => void;
  setShowTooltip: (show: boolean) => void;
}
const RobotBotIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <motion.g
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <rect x="6" y="8" width="12" height="10" rx="2" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <rect x="8" y="15" width="8" height="1" rx="0.5" />
      <rect x="11" y="5" width="2" height="3" rx="1" />
      <motion.circle
        cx="12"
        cy="4"
        r="1.5"
        animate={{
          fill: ["#ffffff", "#ffeb3b", "#ffffff"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </motion.g>
  </svg>
);


const SparkBotIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <motion.g
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <motion.path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </motion.g>
  </svg>
);

const ChatBubbleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <motion.g
      animate={{
        y: [0, -2, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H6L10 22L14 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" />
      <motion.circle
        cx="8"
        cy="10"
        r="1"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0
        }}
      />
      <motion.circle
        cx="12"
        cy="10"
        r="1"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2
        }}
      />
      <motion.circle
        cx="16"
        cy="10"
        r="1"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4
        }}
      />
    </motion.g>
  </svg>
);

const BotButton: React.FC<BotButtonProps> = ({
  open,
  showTooltip,
  handleToggle,
  setShowTooltip
}) => {

  const botMessages = [
    "👋 Hey! Need help?",
    "🤖 I'm here to assist!",
    "💡 Got questions?",
    "⚡ Let's chat!",
    "🚀 How can I help?"
  ];

  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % botMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const botIcons = [RobotBotIcon, SparkBotIcon,ChatBubbleIcon];
  const [currentIcon, setCurrentIcon] = React.useState(0);

  React.useEffect(() => {  
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % botIcons.length);
    }, 2000);
    return () => clearInterval(iconInterval);
  }, []);

  const CurrentBotIcon = botIcons[currentIcon];

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
        {/* Floating Messages */}
        <AnimatePresence>
          {!open && showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '70px',
                left: '0px',
                zIndex: 1001,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-8px',
                      left: '20px',
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid',
                      borderTopColor: 'primary.main',
                    }
                  }}
                >
                  <motion.div
                    key={currentMessage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {botMessages[currentMessage]}
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Tooltip
          title="AI Assistant"
          placement="right"
          open={false}
          arrow
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { rotate: { repeat: Infinity, duration: 0.5 } }
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }
            }}
          >
            <Fab
              color="primary"
              aria-label="chat"
              onClick={handleToggle}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => !open && setShowTooltip(false)}
              sx={{
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                border: '3px solid',
                borderColor: 'primary.light',
                background: 'linear-gradient(135deg, primary.main 0%, primary.dark 100%)',
                overflow: 'hidden',
                position: 'relative',
                width: 64,
                height: 64,
                '&:hover': {
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.3)',
                }
              }}
            >
              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="close"
                    initial={{
                      rotate: -180,
                      scale: 0,
                      opacity: 0
                    }}
                    animate={{
                      rotate: 0,
                      scale: 1,
                      opacity: 1
                    }}
                    exit={{
                      rotate: 180,
                      scale: 0,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "backOut"
                    }}
                    whileHover={{
                      rotate: [0, 90, 180, 270, 360],
                      transition: { duration: 0.8 }
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 28 }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="bot"
                    initial={{
                      scale: 0,
                      rotate: 180,
                      opacity: 0
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                      opacity: 1
                    }}
                    exit={{
                      scale: 0,
                      rotate: -180,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "backOut"
                    }}
                    whileHover={{
                      scale: [1, 1.3, 1],
                      rotate: [0, -15, 15, 0],
                      transition: {
                        duration: 0.6,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  >
                    <motion.div
                      key={currentIcon}
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CurrentBotIcon />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{
                  scale: [0, 2, 3],
                  opacity: [0.4, 0.2, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Secondary ripple */}
              <motion.div
                initial={{ scale: 0, opacity: 0.4 }}
                animate={{
                  scale: [0, 1.5, 2.5],
                  opacity: [0.3, 0.1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  left: '-5px',
                  right: '-5px',
                  bottom: '-5px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
            </Fab>
          </motion.div>
        </Tooltip>
      </Box>
    </Zoom>
  );
};

export default BotButton;