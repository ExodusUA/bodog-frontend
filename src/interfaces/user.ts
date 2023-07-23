interface User {
    Id: number,
    Username: string,
    Fullname: string,
    Email: string,
    AdminStatus: number,
    EmailConfirm: boolean,
    IsAlive: boolean,
    createdAt: string,
    Streak: number,
    LastPick: string
}

export default User;