import axios from "axios";
import Game from "../interfaces/game";

/* GET GAMES */

async function getGames(week: number): Promise<any> {

    const games = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/getWeek/' + week, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })

    let data: Game[] = games.data.map((game: any) => {
        console.log(game)
        return {
            DateTime: game.DateTime,
            Id: game.Id,
            MatchID: game.GlobalGameID,
            AwayTeamId: game.AwayTeamId,
            HomeTeamId: game.HomeTeamId,
            AwayTeamName: game.AwayTeam.FullName,
            HomeTeamName: game.HomeTeam.FullName,
            AwayTeamLogo: game.AwayTeam.WikipediaLogoURL,
            HomeTeamLogo: game.HomeTeam.WikipediaLogoURL,
        }
    });

    return data
}

export default getGames