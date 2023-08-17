import axios from "axios";

/* GET GAMES */

async function getWeeksList(): Promise<any> {

    const weeks = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/getWeeksStatistic', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })

    let data = weeks.data.map((week: any) => {
        return {
            id: week.Week,
            time: week.CutOffTime,
            players: week.PlayersPicks,
            playersProgressed: week.PlayersProgressed,
            season: week.Season
        }
    });

    console.log(weeks.data)

    return data
}

export default getWeeksList