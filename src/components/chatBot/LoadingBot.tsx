import { motion } from "framer-motion";

import { Box, Avatar  } from "@mui/material";
import { SmartToy as BotIcon  } from "@mui/icons-material";
interface BotLoadingProps {
    loading: boolean;
}

const BotLoading: React.FC<BotLoadingProps> = ({ loading }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                alignSelf: 'flex-start',
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Avatar
                sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem'
                }}
            >

                <BotIcon
                    sx={{
                        fontSize: '1.5rem',
                        color: 'primary.light'
                    }}
                />

            </Avatar>
            <Box
                sx={{
                    display: 'flex',
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: 'grey.100',
                }}
            >
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 0 }}
                    style={{ margin: '0 2px' }}
                >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'grey.500' }} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2, repeatDelay: 0 }}
                    style={{ margin: '0 2px' }}
                >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'grey.500' }} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4, repeatDelay: 0 }}
                    style={{ margin: '0 2px' }}
                >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'grey.500' }} />
                </motion.div>
            </Box>
        </Box>
    );
};

export default BotLoading;