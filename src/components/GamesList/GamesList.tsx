
import { ScrollView, View } from 'react-native';
import getFlagByCountry from '../../core/utils/countries/getFlagByCountry';
import { localizeReverseCountry } from '../../core/utils/countries/localizeCountries';
import { styles } from './GamesList.stylesheet';

import ListItem from '../ui/ListItem/ListItem';
import NotFound from '../ui/NotFound/NotFound';
import { League } from '../../core/types/league';
import theme from '../../core/config/theme';
import React from 'react';

type IGamesListProps = {
    navigation: any,
    leaguesData: League[] | undefined,
    leaguesData2?: League[] | undefined,
}


export default function GamesList({ navigation, leaguesData, leaguesData2 }: IGamesListProps) {


    const leaguesData2Filtred = leaguesData?.filter((league) => !leaguesData2?.some(league2 => league2.title === league.title))

    const isLeaguesDataExist = leaguesData2Filtred && leaguesData2Filtred.length > 0
    const isLeaguesData2Exist = leaguesData2 && leaguesData2.length > 0

    const isEmpty = !isLeaguesDataExist && !isLeaguesData2Exist

    return (
        <>
            <ScrollView>
                <>
                    {isLeaguesData2Exist &&
                        <>
                            <ListItem title={'Избранные'} style={{ backgroundColor: theme.desc }} />
                            <View style={styles.list}>
                                {leaguesData2 && leaguesData2.map(league => <ListItem title={league.title?.length > 30 ? league.title.slice(0, 30) + "..." : league.title} key={league.url} desc={league.country?.length > 30 ? league.country.slice(0, 30) + "..." : league.country} count={league.gamesCount} imageUrl={getFlagByCountry(localizeReverseCountry(league.country))} navigation={navigation} routeType={'League'} routeProps={
                                    {
                                        leagueUrl: league.url,
                                        leagueName: league.title
                                    }
                                } />)}
                            </View>
                        </>
                    }
                    {
                        leaguesData2Filtred && leaguesData2Filtred?.length > 0 && <ListItem title={'Все лиги'} style={{ backgroundColor: theme.desc }} />
                    }

                    <View style={styles.list}>
                        {leaguesData2Filtred && leaguesData2Filtred.map(league => <ListItem key={league.url} title={league.title} desc={league.country} count={league.gamesCount} imageUrl={getFlagByCountry(localizeReverseCountry(league.country))} navigation={navigation} routeType={'League'} routeProps={
                            {
                                leagueUrl: league.url,
                                leagueName: league.title
                            }
                        } />)}
                    </View>
                </>
                {isEmpty &&
                    <NotFound title={'Пусто..'} desc={'Игр на данную дату не найдено'} />
                }
            </ScrollView>
        </>
    );
}
