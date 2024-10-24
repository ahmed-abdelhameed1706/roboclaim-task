export interface Player {
  id: number;
  name: string;
  game: string;
  avatar: string;
  team?: string;
  ranking: number;
  bio: string;
  stats: {
    winRate: number;
    tournaments: number;
    achievements: string[];
  };
}
