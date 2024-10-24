"use client";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { usePlayerStore } from "@/store/playerStore";

export default function PlayerProfile() {
  const params = useParams();
  const router = useRouter();

  const { player, loading, error, fetchPlayer } = usePlayerStore();

  useEffect(() => {
    const getPlayer = async () => {
      await fetchPlayer(params.id);
    };

    getPlayer();
  }, [params.id, fetchPlayer]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error} {/* Display error message */}
        </Alert>
      </Container>
    );
  }

  if (!player) {
    return (
      <Container>
        <Typography>Player not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        onClick={() => router.push("/")}
        variant="outlined"
        sx={{ mb: 4 }}
      >
        Back to Players
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Box
              component="img"
              src={player.avatar}
              alt={player.name}
              sx={{ width: "100%", borderRadius: 2 }}
            />
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
              {player.name}
            </Typography>
            <Chip
              label={`Ranking: ${player.ranking}`}
              color="primary"
              sx={{ mt: 1 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              About
            </Typography>
            <Typography paragraph>{player.bio}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
