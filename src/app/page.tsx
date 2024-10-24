"use client";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { PlayerCard } from "@/components/PlayerCard";
import { useState, useEffect } from "react";
import { Player, DummyProduct } from "@/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      const mappedPlayers = data.products.map((product: DummyProduct) => ({
        id: product.id,
        name: product.title,
        game: product.category,
        avatar: product.thumbnail,
        ranking: product.price,
        bio: product.description,
      }));
      setPlayers(mappedPlayers);
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.game.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom align="center">
        Players Data
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

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredPlayers.map((player) => (
            <Grid item key={player.id} xs={12} sm={6} md={4}>
              <PlayerCard player={player} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
