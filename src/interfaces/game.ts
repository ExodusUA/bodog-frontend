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
}


export default Game;