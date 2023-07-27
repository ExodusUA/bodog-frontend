import axios from 'axios'
import Statistic from '../interfaces/statistic'

/* GET HOMEPAGE STATS */


async function getStatistic(): Promise<Statistic> {

    const res = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/getStatistic`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    return res.data
}

export default getStatistic