import axios from "axios";

/* CHANGE WEEK & YEAR */

async function changeWeekYear(week: string | number, year: string | number): Promise<any> {

    let data = JSON.stringify({
        week: Number(week),
        season: year
    });

    const res = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/setCurrentSeasonOrWeek`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    return res.data
}

/* GET RESULTS */

async function getResults(): Promise<any> {

    const res = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/getResults`, [], {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    })

    return res
}

export default { changeWeekYear, getResults };