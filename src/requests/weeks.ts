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
            id: week.Id,
            time: week.CutOffTime,
            players: week.PlayersPicks,
            playersProgressed: week.PlayersProgressed
        }
    });

    console.log(weeks.data)

    return data
}

export default getWeeksList