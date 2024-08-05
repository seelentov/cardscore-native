import { Game } from "../../types/game";
import DateToString from "../date/DateToString";
import moment from 'moment';
import 'moment-timezone';

function calcGame (game: Game) {

    const date = new Date(game.dateTime)
    const dateToString = DateToString(date)

    const activeTime = game.activeGame ? game.gameTime : 
    game.finishedToday ? "Завершен" : ""

    const renderedDate = dateToString

    let currentMoscowTime = null;

    if(!currentMoscowTime){
        currentMoscowTime = moment().tz("Europe/Moscow").format('YYYY-MM-DD HH:mm:ss').valueOf()
    }

    const momentFromGame = moment(game.dateTime).format('YYYY-MM-DD HH:mm:ss').valueOf()
    const showNotifsAndCounts = (currentMoscowTime > momentFromGame) || game.activeGame

    const counts: [string, string] = (showNotifsAndCounts) ? [game.teams[0].count.toString(), game.teams[1].count.toString()] : ["-","-"]

    const showNotifs = showNotifsAndCounts

    return {
        counts,
        activeTime,
        renderedDate,
        showNotifs,
        gameDate: date
    }
}

export default calcGame