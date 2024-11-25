import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, View, StyleSheet, Text, Dimensions, ImageBackground, ViewStyle } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import { styles as footerStyles } from '../../components/Footer/Footer.stylesheet';
import { useContext, useEffect, useMemo, useState } from 'react';
import Loading from '../../components/ui/Loading/Loading';
import getFlagByCountry from '../../core/utils/countries/getFlagByCountry';
import { localizeReverseCountry } from '../../core/utils/countries/localizeCountries';
import ListItem from '../../components/ui/ListItem/ListItem';
import NotFound from '../../components/ui/NotFound/NotFound';
import theme from '../../core/config/theme';
import ListItem2 from '../../components/ui/ListItem2/ListItem2';
import calcGame from '../../core/utils/game/calcGame';
import DatePicker from '../../components/DatePicker/DatePicker';
import { FavoritesContext } from '../../provider/FavoritesProvider';
import isToday from '../../core/utils/date/isToday';
import { SvgXml } from 'react-native-svg';
import close from '../../components/ui/Icons/close'
import { NotifContext } from '../../provider/NotifProvider';
import React from 'react';
import Picker, { PickerOption } from '../../components/Picker/Picker';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation, route }: HomeScreenProps) {

    const params = route?.params;

    const hotModeOptions = useMemo(() => [
        {
            value: 2,
            label: 'Более 2-х событий'
        },
        {
            value: 3,
            label: 'Более 3-х событий'
        }
    ], [])

    const [hotMode, setHotMode] = useState<PickerOption | null>(null)

    const [date, setDate] = useState<Date | null>(null)

    const { favorites, isLoading } = useContext(FavoritesContext);

    const { notificatorsData } = useContext(NotifContext)

    const filtredFavorites = useMemo(() => favorites?.filter(({ game }) => {
        const isHotShow = () => {
            if (!params?.hot) {
                return true
            }

            const value = !hotMode ? 1 : hotMode.value

            const notifKey = (game.teams[0].name + game.teams[1].name).replaceAll(" ", "").toUpperCase()

            const notificators = notificatorsData?.filter(n => n.gameUrl.toUpperCase() === notifKey)

            const notificatorsLeft = notificators?.filter(n => n.leftTeam).length || 0
            const notificatorsRight = notificators?.filter(n => !n.leftTeam).length || 0

            return (notificatorsLeft >= value || notificatorsRight >= value)
        }

        if (!date) {
            return isHotShow();
        }

        const checkTime = new Date(game.dateTime)

        const isNeededDate = (date.getDate() === checkTime.getDate()) && (date.getMonth() === checkTime.getMonth()) && (date.getFullYear() === checkTime.getFullYear())

        return isNeededDate && isHotShow();
    }), [date, favorites, hotMode, params?.hot])

    const [showGames, setShowGames] = useState<number>(15)

    const clearDate = () => {
        setDate(null)
        setShowGames(15)
    }

    const clearHot = () => {
        setHotMode(null)
        setShowGames(15)
    }

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 100) {
            setShowGames(prev => prev + 10)
        }
    };

    const day = useMemo(() => date?.getDate(), [date])
    const month = useMemo(() => date && ((date?.getMonth() + 1) < 10 ? `0${date?.getMonth() + 1}` : date?.getMonth() + 1), [date])

    const weekDay = useMemo(() => date && (isToday(date) ? "СЕГОДНЯ" : `${day}.${month}`), [date])

    const titleDate = useMemo(() => !date ? 'Все игры' : weekDay ? weekDay : "", [date])

    return (
        <>
            <View style={styles.wrapper}>
                <ImageBackground source={require('../../../assets/bgy.jpg')}>
                    <View style={{ ...nestedStyles.datePicker, paddingLeft: date ? 50 : 0 }}>
                        <DatePicker dateState={date} setDate={setDate} />
                        <Pressable onPress={clearDate} style={{ ...nestedStyles.datePickerBtn, opacity: date ? 1 : 0 }}>
                            <SvgXml
                                width="20px"
                                height="20px"
                                xml={close}
                            />
                        </Pressable>
                    </View>
                    {params?.hot && <View style={{ ...nestedStyles.picker }}>
                        <Picker setState={setHotMode} state={hotMode} options={hotModeOptions} />
                        <Pressable onPress={clearHot} style={{ ...nestedStyles.datePickerBtn, opacity: hotMode ? 1 : 0 }}>
                            <SvgXml
                                width="20px"
                                height="20px"
                                xml={close}
                            />
                        </Pressable>
                    </View>}
                </ImageBackground>
                {!isLoading && <ListItem title={titleDate} style={{ backgroundColor: theme.desc }} />}
                <ImageBackground source={require('../../../assets/bgw.jpg')} style={{ height: params?.hot ? '83%' : '89%' }}>
                    <ScrollView
                        onScroll={handleScroll}
                        style={nestedStyles.scrollView}
                    >

                        {isLoading ? <Loading /> :
                            (filtredFavorites && filtredFavorites?.length > 0) ?
                                (date ? filtredFavorites : filtredFavorites.slice(0, showGames)).map(({ league, game }) => {
                                    const {
                                        counts,
                                        activeTime,
                                        renderedDate,
                                        showNotifs,
                                    } = calcGame(game)

                                    const leagueData = {
                                        title: league?.title,
                                        country: league?.country,
                                        url: league?.url
                                    }

                                    const notifKey = (game.teams[0].name + game.teams[1].name).replaceAll(" ", "").toUpperCase()

                                    const notificators = notificatorsData?.filter(n => n.gameUrl.toUpperCase() === notifKey)

                                    const notificatorsLeft = showNotifs ? notificators?.filter(n => n.leftTeam).length || 0 : 0
                                    const notificatorsRight = showNotifs ? notificators?.filter(n => !n.leftTeam).length || 0 : 0

                                    const titles = game.teams.map(team => team.name?.length > 20 ? team.name.slice(0, 20) + "..." : team.name) as [string, string]

                                    return (
                                        <View style={{ borderTopWidth: 2, borderColor: theme.desc }} key={game.teams.map(t => t.name).join("") + game.dateTime}>
                                            <ListItem
                                                title={league.title?.length > 30 ? league.title.slice(0, 30) + "..." : league.title}
                                                imageUrl={getFlagByCountry(localizeReverseCountry(league.country))}
                                                style={{ borderBottomWidth: 1, paddingVertical: 0 }}
                                            />
                                            <ListItem2
                                                navigation={navigation}
                                                titles={titles}
                                                iconUrls={game.teams.map(team => team.iconUrl) as [string, string]}
                                                counts={counts}
                                                notifs={[notificatorsLeft || 0, notificatorsRight || 0]}
                                                descs={[activeTime, renderedDate]}
                                                routeType={'Game'}
                                                routeProps={{ league: leagueData, gameUrl: game.url, gameInfo: game }}
                                            />
                                        </View>
                                    )
                                }) :
                                <NotFound title={'Пусто..'} desc={'Игр не найдено'} />}
                    </ScrollView>
                </ImageBackground>
            </View>
            <Footer navigation={navigation} />
        </>
    );
}

const pickerStyles: ViewStyle = {
    position: 'relative',
    overflow: 'visible',
    height: 45
}

const nestedStyles = StyleSheet.create({
    datePicker: {
        ...pickerStyles
    },
    picker: {
        ...pickerStyles
    },
    datePickerBtn: {
        height: '100%',
        width: 50,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: theme.background,
        borderColor: theme.desc,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    scrollView: {

    }
})