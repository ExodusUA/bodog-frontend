interface Game {
    DateTime: string,
    Id: number,
    AwayTeamName: string,
    HomeTeamName: string,
    AwayTeamLogo: string,
    HomeTeamLogo: string,
    AwayTeamId?: number,
    HomeTeamId?: number,
    MatchID?: number,
    AwayTeamCity?: string,
    HomeTeamCity?: string,
}


export default Game;