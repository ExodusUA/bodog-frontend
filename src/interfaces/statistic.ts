import Team from "./team";

interface Statistic {
    currentWeek: number,
    allUsers: number,
    team: null | undefined | Team,
    currentSeason: number,
    survivors: number
}

export default Statistic;