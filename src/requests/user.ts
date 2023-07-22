import axios from 'axios'
import qs from 'qs'
import User from '../interfaces/user'

/* GETTING USERS */

interface UsersList {
    users: User[],
    allUsers: number
}

interface addAdminResponse {
    message: string,
    user: User
}

interface FetchUsersData {
    firstId: number;
    lastId: number;
    isAlive?: boolean | null;
    streak?: string,
    aliveSorter?: boolean | null;
}

async function fetchUsers(firstId: number, lastId: number, isActiveOnly?: boolean | null, streakFilter?: boolean | null, aliveSorter?: boolean | null): Promise<UsersList> {
    console.log(streakFilter)
    let data: FetchUsersData = {
        firstId: firstId,
        lastId: lastId,
    };


    if (isActiveOnly) {
        data.isAlive = isActiveOnly;
    }

    if (aliveSorter !== null) {
        data.aliveSorter = aliveSorter;
    }

    if (streakFilter !== null) {
        data.streak = streakFilter === true ? 'max' : 'min';
    }

    const users = await axios.post<UsersList>(process.env.REACT_APP_API_URL + '/api/v1/users', qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })

    return users.data
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

/* GET SINGLE USER DATA */

async function getUserByID(id: string): Promise<User> {

    const users = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/user/${id}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    return users.data.user
}

/* ADDING AN ADMIN */

async function getAdminList(): Promise<User[]> {

    const res = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/getAdmins`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    return res.data.user
}

/* ADDING AN ADMIN */

async function addAdmin(id: number, AdminStatus: number): Promise<addAdminResponse> {

    const res = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/setAdminStatus`, {
        userId: id,
        adminStatus: AdminStatus
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    return res.data
}

export default { fetchUsers, searchUsers, getUserByID, getAdminList, addAdmin };