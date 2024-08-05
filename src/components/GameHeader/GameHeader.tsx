import { View, Image, Text } from 'react-native';
import { styles } from './GameHeader.stylesheet';
import isToday from '../../core/utils/date/isToday';
import convertTimeToString from '../../core/utils/time/convertTimeToString';
import convertToWeekDay from '../../core/utils/date/convertToWeekDay';
import { Team } from '../../core/types/team';

export enum GamesListType {
    all,
    favorites
}

type IGameHeaderProps = {
    teams: [Team, Team],
    status?: string,
    counts: [string?, string?],
    date: Date
}


export default function GameHeader({ teams, status, counts, date }: IGameHeaderProps) {

    const weekDay = isToday(date) ? "СЕГОДНЯ" : convertToWeekDay(date)

    const day = date.getDate()
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1

    return (
        <View style={styles.main}>
            <View style={styles.team}>
                <Image
                    style={styles.teamImage}
                    source={{
                        uri: teams[0].iconUrl,
                    }}
                />
                <Text style={styles.teamText}>
                    {teams[0].name}
                </Text>
            </View>
            <View style={styles.team}>
                <Text style={styles.date}>
                    {`${weekDay} ${day}.${month}`}
                </Text>
                <Text style={styles.counts}>{counts[0]} - {counts[1]}</Text>
                <Text style={styles.status}>{status}</Text>
            </View>
            <View style={styles.team}>
                <Image
                    style={styles.teamImage}
                    source={{
                        uri: teams[1].iconUrl,
                    }}
                />
                <Text style={styles.teamText}>
                    {teams[1].name}
                </Text>
            </View>
        </View>
    );
}
