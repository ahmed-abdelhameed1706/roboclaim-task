"use client";
import { Container, Grid, Typography, Box, TextField } from "@mui/material";
import { PlayerCard } from "@/components/PlayerCard";
import { players } from "@/lib/mockData";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom align="center">
        Pro Gaming Profiles
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search players or games"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredPlayers.map((player) => (
          <Grid item key={player.id} xs={12} sm={6} md={4}>
            <PlayerCard player={player} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
