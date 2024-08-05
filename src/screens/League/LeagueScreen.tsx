import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import { StyleSheet } from 'react-native';
import getFlagByCountry from '../../core/utils/countries/getFlagByCountry';
import ListItem from '../../components/ui/ListItem/ListItem';
import ListItem2 from '../../components/ui/ListItem2/ListItem2';
import iconFavorite from '../../components/ui/Icons/favorites'
import text from '../../components/ui/Icons/text'
import iconEmptyStar from '../../components/ui/Icons/empty_star'
import { SvgXml } from 'react-native-svg';
import theme from '../../core/config/theme';
import { useGetGamesQuery } from '../../core/store/api/parser.api';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/ui/Loading/Loading';
import { useCreateNotificatorMutation, useDeleteNotificatorMutation, useGetFavoritesQuery } from '../../core/store/api/auth.api';
import NotFound from '../../components/ui/NotFound/NotFound';
import { encodeUrl } from '../../core/utils/url/encodeUrl';
import { localizeReverseCountry } from '../../core/utils/countries/localizeCountries';
import calcGame from '../../core/utils/game/calcGame';
import { useGetReglamentByNameQuery } from '../../core/store/api/reglaments.api';
import { NotifContext } from '../../provider/NotifProvider';

type LeagueScreenProps = NativeStackScreenProps<RootStackParamList, 'League'>;

export default function LeagueScreen({ navigation, route }: LeagueScreenProps) {

    const { leagueUrl, leagueName } = route.params;

    const { data: league, isLoading } = useGetGamesQuery({ url: encodeUrl(leagueUrl) }, {
        pollingInterval: 30000
    })

    const {notificatorsData} = useContext(NotifContext)

    const { data: reglament, isLoading: isLoadingReglament } = useGetReglamentByNameQuery({ name: leagueName })

    const { data: favorites, isLoading: isLoadingFavorites } = useGetFavoritesQuery()

    const [isFavorite, setIsFavorite] = useState<boolean>()

    useEffect(() => {
        setIsFavorite(league && favorites?.some(l => l.url === league.url))
    }, [league])

    const [createNotificator, { isLoading: isLoadingCreateNotif, }] = useCreateNotificatorMutation()
    const [deleteNotificator, { isLoading: isLoadingDeleteNotif }] = useDeleteNotificatorMutation()
    const [isLoadingNotifactionVisual, setIsLoadingNotifaction] = useState<boolean>(false);

    const isLoadingNotifaction = isLoadingCreateNotif || isLoadingDeleteNotif || isLoadingNotifactionVisual

    const toggleFavorite = async () => {
        setIsLoadingNotifaction(true)

        if (!league || isLoadingNotifaction) {
            return
        }

        if (isFavorite) {
            await deleteNotificator(league.title).then(() => {
                setIsFavorite(false)
            })
        }
        else {
            await createNotificator(league.title).then(() => {
                setIsFavorite(true)
            })
        }

        setIsLoadingNotifaction(false)
    }

    const [showGames, setShowGames] = useState<number>(15)

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 100) {
            setShowGames(prev => prev + 10)
        }
    };

    const leagueData = {
        title: league?.title,
        country: league?.country,
        url: league?.url
    }

    const handleToReglament = () => {
        if (isLoadingReglament || !reglament) {
            return
        }

        navigation.navigate("Info", { text: reglament.text, title: leagueName })
    }

    const isNoHaveGames = !isLoading && league && (league?.games?.length < 1)

    const title = league && (league.title?.length > 20 ? league.title.slice(0,20) + "..." : league.title);
    const country = league && (league.country?.length > 20 ? league.country.slice(0,20) + "..." : league.country);

    return (
        <>

            <View style={styles.wrapper}>
                {isLoading ? <Loading /> :
                    (!isLoading && league) ?
                        <>
                            <View style={stylesNested.header}>
                                <ListItem
                                    title={title}
                                    desc={country}
                                    imageUrl={getFlagByCountry(localizeReverseCountry(league.country))}
                                    style={{ borderBottomWidth: 0 }}
                                />
                                {
                                    reglament && 
                                    <Pressable onPress={handleToReglament} style={{ marginLeft: 'auto', marginRight: 20 }}>
                                        {isLoadingReglament ? <ActivityIndicator color={theme.color} size={30} /> : reglament ?
                                            <SvgXml xml={text} width="30" height="30" /> : ""
                                        }
                                    </Pressable>
                                }
                                {
                                    !isLoadingFavorites &&
                                    <Pressable onPress={toggleFavorite}>
                                        {isLoadingNotifaction ? <ActivityIndicator color={theme.color} size={30} /> :
                                            isFavorite ?
                                                <SvgXml xml={iconFavorite} width="30" height="30" />
                                                :
                                                <SvgXml xml={iconEmptyStar} width="30" height="30" />
                                        }
                                    </Pressable>
                                }
                            </View>
                            {
                                league?.games &&
                                <>
                                    <ListItem title={'Все игры'} style={{ backgroundColor: theme.desc }} />
                                    <ScrollView
                                        onScroll={handleScroll}
                                    >
                                        {league?.games && league.games?.slice(0, showGames).map((game, index) => {
                                            const {
                                                counts,
                                                activeTime,
                                                renderedDate,
                                                showNotifs
                                            } = calcGame(game)

                                            const notifKey = (game.teams[0].name + game.teams[1].name).replaceAll(" ", "").toUpperCase()


                                const notificators = notificatorsData?.filter(n => n.gameUrl.toUpperCase() === notifKey)

                                            

                                            const notificatorsLeft = showNotifs ? notificators?.filter(n => n.leftTeam)?.length : 0
                                            const notificatorsRight = showNotifs ? notificators?.filter(n => !n.leftTeam)?.length : 0

                                            const titles = game.teams.map(team => team.name?.length > 20 ? team.name.slice(0,20) + "..." : team.name) as [string, string]

                                            return (
                                                <ListItem2
                                                    key={index}
                                                    navigation={navigation}
                                                    titles={titles}
                                                    iconUrls={game.teams.map(team => team.iconUrl) as [string, string]}
                                                    counts={counts}
                                                    notifs={[notificatorsLeft || 0, notificatorsRight || 0]}
                                                    descs={[activeTime, renderedDate]}
                                                    routeType={'Game'}
                                                    routeProps={{ league: leagueData, gameUrl: game.url, gameInfo: game }}
                                                />)
                                        }
                                        )}
                                        {isNoHaveGames && <NotFound title={'Пусто..'} desc={'Игр этой лиги не найдено'} />}
                                    </ScrollView>
                                </>
                            }
                            

                        </> :
                        <NotFound title={'Пусто..'} desc={'Ошибка при загрузке лиги'} />
                }
            </View>
            <Footer navigation={navigation} />
        </>
    );
}

const stylesNested = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomColor: theme.desc,
        borderBottomWidth: 1
    }
});

