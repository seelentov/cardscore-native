export interface Player {
    name: string;
    position?: string;
    goal?: number | null;
    assists?: number | null;
    yellowCards?: number | null;
    redCards?: number | null;
    yellowRedCards?: number | null;
    gameCount?: number | null;
    imageUrl?: string;
    url?: string;
}