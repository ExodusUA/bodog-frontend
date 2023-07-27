import UserWeek from "./userWeek";

interface User {
    Id: number,
    Username: string,
    Fullname: string,
    Email: string,
    AdminStatus: number,
    IsAlive: boolean,
    Streak: number,
    createdAt: string,
    LastPick?: null | {
        FullName: string,
        WikipediaLogoURL: string
    },
    Weeks?: UserWeek[] | undefined,
}

export default User;