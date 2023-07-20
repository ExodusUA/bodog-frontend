import axios from 'axios'
import qs from 'qs'
import User from '../interfaces/user'

/* GETTING USERS */

interface UsersList {
    users: Array<User>
}

async function fetchUsers(firstId: number, lastId: number): Promise<User[]> {

    let data = qs.stringify({
        firstId: firstId,
        lastId: lastId
    })

    const users = await axios.post<UsersList>(process.env.REACT_APP_API_URL + '/api/v1/users', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })

    return users.data.users
}


/* SEARCH USERS */


async function searchUsers(keyword: string): Promise<User[]> {

    let data = qs.stringify({
        searchTerm: keyword
    })

    const users = await axios.post<Array<User>>(process.env.REACT_APP_API_URL + '/api/v1/searchUser', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })

    return users.data
}

export default { fetchUsers, searchUsers };