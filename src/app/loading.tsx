"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingPage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        color: "text.primary",
        textAlign: "center",
      }}
    >
      <CircularProgress
        size={80}
        thickness={4}
        sx={{
          color: "primary.main",
          mb: 2,
        }}
      />
      <Typography variant="h6" fontWeight="bold">
        Loading, please wait...
      </Typography>
    </Box>
  );
}
