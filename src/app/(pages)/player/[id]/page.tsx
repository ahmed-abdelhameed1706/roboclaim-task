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
import { players } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function PlayerProfile() {
  const params = useParams();
  const router = useRouter();
  const player = players.find((p) => p.id === Number(params.id));

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
            <Typography color="text.secondary" gutterBottom>
              {player.team}
            </Typography>
            <Chip
              label={`Ranking: ${player.ranking}`}
              color="primary"
              sx={{ mt: 1 }}
            />{" "}
            {/* Fixed template string */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              About
            </Typography>
            <Typography paragraph>{player.bio}</Typography>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">{player.stats.winRate}%</Typography>
                  <Typography color="text.secondary">Win Rate</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="h6">
                    {player.stats.tournaments}
                  </Typography>
                  <Typography color="text.secondary">Tournaments</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Achievements
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {player.stats.achievements.map((achievement, index) => (
                <Chip key={index} label={achievement} color="secondary" />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
