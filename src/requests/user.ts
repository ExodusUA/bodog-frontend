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
    page: number;
    isAlive?: boolean | null;
    streak?: string,
    aliveSorter?: boolean | null;
}


async function fetchUsers(page: number, isActiveOnly?: boolean | null, streakFilter?: boolean | null, aliveSorter?: boolean | null): Promise<UsersList> {
    let data: FetchUsersData = {
        page: page,
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

    const users = await axios.post(process.env.REACT_APP_API_URL + '/api/v1/users', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    let usersData = users.data;

    usersData.users.map((user: any) => {

        let pickData;

        if (user.LastPick !== 'test') {
            pickData = JSON.parse(user.LastPick)
        }

        user.LastPick = user.LastPick !== 'test' ? {
            FullName: pickData ? pickData.FullName : null,
            WikipediaLogoURL: pickData ? pickData.WikipediaLogoURL : null
        } : null
    });

    return usersData
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

    let usersData = users.data;

    usersData.map((user: any) => {

        let pickData;

        if (user.LastPick !== 'test') {
            pickData = JSON.parse(user.LastPick)
        }

        user.LastPick = user.LastPick !== 'test' ? {
            FullName: pickData ? pickData.FullName : null,
            WikipediaLogoURL: pickData ? pickData.WikipediaLogoURL : null
        } : null
    });

    return usersData
}

/* GET SINGLE USER DATA */

async function getUserByID(id: string): Promise<User> {

    const users = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/user/${id}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    let user = users.data.user
    console.log(user.picks)
    let userData = {
        Id: user.Id,
        Username: user.Username,
        Fullname: user.Fullname,
        Email: user.Email,
        IsAlive: user.IsAlive,
        AdminStatus: user.AdminStatus,
        createdAt: user.createdAt,
        Streak: user.Streak,
        Weeks: user.picks.map((week: any) => {
            return {
                Week: week.Week,
                status: week.Status,
                teamName: week.weekData[0].AwayTeam.TeamID === week.TeamPickId ? week.weekData[0].AwayTeam.FullName : week.weekData[0].HomeTeam.FullName,
                teamLogo: week.weekData[0].AwayTeam.TeamID === week.TeamPickId ? week.weekData[0].AwayTeam.WikipediaLogoURL : week.weekData[0].HomeTeam.WikipediaLogoURL,
            }
        })
    };

    console.log(userData)
    return userData
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

/* EXPORT USERS */

async function exportUsers(): Promise<any> {

    const res = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/generateUserList`, [], {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    return res.data
}

export default { fetchUsers, searchUsers, getUserByID, getAdminList, addAdmin, exportUsers };