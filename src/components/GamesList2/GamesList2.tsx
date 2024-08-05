import { View } from "react-native";
import { styles } from "../../styles/styles";
import LeagueItem from "./LeagueItem";
import ListItem from "../ui/ListItem/ListItem";

type IGamesList2Props = {
    navigation: any
    leaguesId: number[]
}

export default function GamesList2({ navigation, leaguesId }: IGamesList2Props) {

    return (
        <View style={styles.wrapper}>
            {leaguesId.map((leagueId, index) => <LeagueItem navigation={navigation} leagueId={leagueId} startIsOpen={index === 0}/>)}
        </View>
    );
}