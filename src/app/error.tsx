"use client";

import { Box, Typography } from "@mui/material";

export default function ErrorPage() {
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
        p: 4,
      }}
    >
      <Typography variant="h1" fontWeight="bold">
        500
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Our team has been notified. Please try again later.
      </Typography>
    </Box>
  );
}
