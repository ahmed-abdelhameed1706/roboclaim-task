"use client";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/player/${player.id}`)} // Changed from `/player/${player.id}` to use backticks
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={player.avatar}
        alt={player.name}
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {player.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">{player.game}</Typography>
          {player.team && (
            <Typography color="text.secondary">{player.team}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
