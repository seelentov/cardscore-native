import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import ListItem from '../../components/ui/ListItem/ListItem';
import { localizeReverseCountry } from '../../core/utils/countries/localizeCountries';
import getFlagByCountry from '../../core/utils/countries/getFlagByCountry';
import GameHeader from '../../components/GameHeader/GameHeader';
import GameActions from '../../components/GameActions/GameActions';
import { useGetGameQuery } from '../../core/store/api/parser.api';
import Loading from '../../components/ui/Loading/Loading';
import NotFound from '../../components/ui/NotFound/NotFound';
import { useContext, useEffect } from 'react';
import { encodeUrl } from '../../core/utils/url/encodeUrl';
import { NotifContext } from '../../provider/NotifProvider';
import LoadingMin from '../../components/ui/Loading/LoadingMin';
import theme from '../../core/config/theme';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

export default function GameScreen({ navigation, route }: HomeScreenProps) {

    const { league, gameUrl, gameInfo } = route.params;

    const { data: game, isLoading, refetch } = useGetGameQuery({
        leagueUrl: encodeUrl(league.url),
        gameUrl: encodeUrl(gameUrl)
    }, { pollingInterval: 10000 })

    useEffect(()=>{
        if(game?.teams == null){
            refetch()
        }
    }, [game])

    const { notificatorsData, isLoadingNotif } = useContext(NotifContext)

    const key = (gameInfo?.teams[0]?.name + gameInfo?.teams[1]?.name).replaceAll(" ", "").toUpperCase()

    const thisNotificators = notificatorsData ? notificatorsData?.filter(n => { return n.gameUrl.toUpperCase() === key})?.sort((a, b) => parseInt(a.time) - parseInt(b.time)) : []

    const status = game && game?.activeGame ? gameInfo.gameTime : ""

    const counts: [string?, string?] = game ? [game?.teams[0].count?.toString(), game?.teams[1].count?.toString()] : [gameInfo?.teams[0].count?.toString(), gameInfo?.teams[1].count?.toString()]

    return (
        <>
            <View style={styles.wrapper}>
                <>
                    <ListItem
                        title={league.title}
                        desc={league.country}
                        imageUrl={getFlagByCountry(localizeReverseCountry(league.country))}
                        navigation={navigation}
                        routeType={'League'}
                        routeProps={{ leagueUrl: league.url }}
                    />
                    <ScrollView>
                        {isLoading ?
                            <View style={{
                                padding: 20,
                                borderBottomColor: theme.desc,
                                borderBottomWidth: 1
                            }}>
                                <LoadingMin />
                            </View>
                            : <GameHeader teams={[game ? game.teams[0] : gameInfo.teams[0], game ? game.teams[1] : gameInfo.teams[1]]} status={status} counts={counts} date={new Date(gameInfo.dateTime)} />
                        }
                        {isLoadingNotif ? <Loading /> :
                            <GameActions league={league} actions={thisNotificators} navigation={navigation} />
                        }
                    </ScrollView>
                </>
            </View>
            <Footer navigation={navigation} />
        </>
    );
}
