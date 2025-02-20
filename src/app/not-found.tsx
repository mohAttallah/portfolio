"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

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
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        The page you are looking for doesn&apos;t exist.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "primary.main",
          color: "secondary.main",
          "&:hover": { backgroundColor: "text.secondary" },
        }}
        onClick={() => router.push("/")}
      >
        Return to Home
      </Button>
    </Box>
  );
}
