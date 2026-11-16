
export type MatchStatus = "upcoming" | "live" | "finished" | "cancelled";

export interface Match{
    id: number;
    homeTeam: string;
    awayTeam: string;
    league: string;
    time?: string;
    status: MatchStatus;
}

