// src/app/(pages)/player/[id]/page.tsx
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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Player } from "@/types";

export default function PlayerProfile() {
  const params = useParams();
  const router = useRouter();
  const [player, setPlayer] = useState<Player | null>(null); // Initialize player state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPlayer = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/${params.id}`
      ); // Update with the correct endpoint
      const data = await response.json();

      // Map the fetched data to your Player interface
      const fetchedPlayer: Player = {
        id: data.id,
        name: data.title,
        game: data.category,
        avatar: data.thumbnail,
        ranking: data.price, // Assuming price is used for ranking
        bio: data.description,
      };

      setPlayer(fetchedPlayer);
      setLoading(false); // Set loading to false after fetching
    };

    fetchPlayer();
  }, [params.id]);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
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
