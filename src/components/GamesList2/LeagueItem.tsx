import { Pressable, ScrollView, View } from "react-native";
import testApi from "../../core/store/api/test/test.api";
import ListItem from "../ui/ListItem/ListItem";
import localizeCountry from "../../core/utils/countries/localizeCountries";
import getFlagByCountry from "../../core/utils/countries/getFlagByCountry";
import ListItem2 from "../ui/ListItem2/ListItem2";
import { useState } from "react";
import theme from "../../core/config/theme";
import { styles } from "./GamesList2.stylesheet";
import arrow from '../ui/Icons/arrow'
import { SvgXml } from "react-native-svg";
import convertToWeekDay from "../../core/utils/date/convertToWeekDay";
import isToday from "../../core/utils/date/isToday";
import convertTimeToString from "../../core/utils/time/convertTimeToString";


type ILeagueItemProps = {
    leagueId: number,
    navigation: any,
    startIsOpen?: boolean
}

export default function LeagueItem({ navigation, leagueId, startIsOpen = false }: ILeagueItemProps) {

    const [isOpen, setIsOpen] = useState<boolean>(startIsOpen)
    const league = testApi.leagues.find(leagueItem => leagueItem.id === leagueId)
    const games = testApi.games.sort((a, b) => a.date.getTime() - b.date.getTime());

    if (!league) {
        return
    }

    const rotate = isOpen ? '270 deg' : '0 deg'
    const display = isOpen ? 'flex' : 'none'

    return (
        <View>
            <Pressable onPress={() => setIsOpen(prev => !prev)}>
                <View style={styles.header}>
                    <ListItem title={league.name} desc={localizeCountry(league.country)} imageUrl={getFlagByCountry(league.country)} style={{ borderBottomWidth: 0 }} />
                    <SvgXml xml={arrow} width="20" height="20" style={{ transform: [{ rotate }] }} />
                </View>
            </Pressable>
            <ScrollView style={{ display }}>
                {games && games.map(game => {

                    const weekDay = isToday(game.date) ? "СЕГОДНЯ" : convertToWeekDay(game.date)

                    const day = game.date.getDate()
                    const month = (game.date.getMonth() + 1) < 10 ? `0${game.date.getMonth() + 1}` : game.date.getMonth() + 1

                    const startTime = game.date.getMilliseconds()

                    const date = `${convertTimeToString(startTime)} ${weekDay} ${day}.${month}`

                    let time = game.time ? convertTimeToString(game.time) : ""

                    return (
                        <ListItem2 navigation={navigation}
                            titles={game.teams.map(team => team.name) as [string, string]}
                            iconUrls={game.teams.map(team => team.iconUrl) as [string, string]}
                            counts={game.count}
                            notifs={[4, 6]}
                            descs={[time, date]}
                            routeType={'Game'}
                            routeProps={{ gameId: game.id }}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}