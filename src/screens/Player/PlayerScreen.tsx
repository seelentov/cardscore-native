import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import TableLine from '../../components/ui/Table/TableLine';
import Table from '../../components/ui/Table/Table';
import TableText from '../../components/ui/Table/TableText';
import RoundImage from '../../components/ui/RoundImage/RoundImage';
import Header from '../../components/ui/Header/Header';
import ListItem from '../../components/ui/ListItem/ListItem';
import getFlagByCountry from '../../core/utils/countries/getFlagByCountry';
import { localizeReverseCountry } from '../../core/utils/countries/localizeCountries';

import red from '../../components/GameActions/icons/red'
import yellow from '../../components/GameActions/icons/yellow'
import yellowred from '../../components/GameActions/icons/yellow-red-card'
import ball from '../../components/GameActions/icons/ball'
import game from '../../components/GameActions/icons/game'
import foot from '../../components/GameActions/icons/foot'
import { SvgXml } from 'react-native-svg';
import { StyleSheet } from 'react-native';
import { useGetPlayerQuery } from '../../core/store/api/parser.api';
import Loading from '../../components/ui/Loading/Loading';
import { encodeUrl } from '../../core/utils/url/encodeUrl';
import { useEffect } from 'react';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Player'>;

export default function PlayerScreen({ navigation, route }: HomeScreenProps) {
    const { playerUrl, league } = route.params;

    const { data: player, isLoading, refetch } = useGetPlayerQuery({
        playerUrl: encodeUrl(playerUrl),
        leagueUrl: encodeUrl(league.url)
    })

    useEffect(()=>{
        if(player?.name == null){
            refetch()
        }

    },[player])

    const isHaveStats = player && (player.goal || player.assists || player.yellowCards || player.yellowRedCards || player.redCards || player.gameCount)

    return (
        <>
            <View style={styles.wrapper}>
                <ListItem
                    title={league.title}
                    desc={league.country}
                    imageUrl={getFlagByCountry(localizeReverseCountry(league.country))}
                    navigation={navigation}
                    routeType={'League'}
                    routeProps={{ leagueUrl: league.url }}
                />
                {isLoading ? <Loading /> :
                    player &&
                    <View style={styles.spaces}>
                        <Header>{player.name} {player.position && "(" + player.position + ")"}</Header>
                        {player.imageUrl  && <View style={{ display: 'flex', alignItems: 'center' }}>
                                <RoundImage width={150} src={player.imageUrl} />
                        </View>}
                        {
                            Boolean(isHaveStats) &&
                            <>
                                <Header>Статистика в этой лиге</Header>
                                <Table>
                                    <TableLine>
                                        {
                                            player.goal != null &&
                                            <TableText style={nestedStyles.counts}>
                                                <SvgXml
                                                    width="20px"
                                                    height="20px"
                                                    xml={ball}
                                                />
                                            </TableText>
                                        }
                                        {
                                            player.assists != null &&
                                            <TableText style={nestedStyles.counts}>
                                                <SvgXml
                                                    width="20px"
                                                    height="20px"
                                                    xml={foot}
                                                />
                                            </TableText>
                                        }
                                        {
                                            player.yellowCards != null &&
                                            <TableText style={nestedStyles.counts}>
                                                <SvgXml
                                                    width="20px"
                                                    height="20px"
                                                    xml={yellow}
                                                />
                                            </TableText>
                                        }
                                        {
                                            player.redCards != null &&
                                            <TableText style={nestedStyles.counts}>
                                                <SvgXml
                                                    width="20px"
                                                    height="20px"
                                                    xml={red}
                                                />
                                            </TableText>
                                        }
                                        {
                                            player.yellowRedCards != null &&
                                            <TableText style={nestedStyles.counts}>
                                                <SvgXml
                                                    width="20px"
                                                    height="20px"
                                                    xml={yellowred}
                                                />
                                            </TableText>
                                        }
                                        {
                                            player.gameCount != null &&
                                            <TableText style={nestedStyles.counts}>
                                                <SvgXml
                                                    width="20px"
                                                    height="20px"
                                                    xml={game}
                                                />
                                            </TableText>
                                        }
                                    </TableLine>
                                    <TableLine>
                                        {
                                            player.goal != null &&
                                            <TableText style={nestedStyles.counts}>{player.goal}</TableText>
                                        }
                                        {
                                            player.assists != null &&
                                            <TableText style={nestedStyles.counts}>{player.assists}</TableText>
                                        }
                                        {
                                            player.yellowCards != null &&
                                            <TableText style={nestedStyles.counts}>{player.yellowCards}</TableText>
                                        }
                                        {
                                            player.redCards != null &&
                                            <TableText style={nestedStyles.counts}>{player.redCards}</TableText>
                                        }
                                        {
                                            player.yellowRedCards != null &&
                                            <TableText style={nestedStyles.counts}>{player.yellowRedCards}</TableText>
                                        }
                                        {
                                            player.gameCount != null &&
                                            <TableText style={nestedStyles.counts}>{player.gameCount}</TableText>
                                        }
                                    </TableLine>
                                </Table>
                            </>
                        }
                    </View>}
            </View>
            <Footer navigation={navigation} />
        </>
    );
}

const nestedStyles = StyleSheet.create({
    counts: {
        textAlign: 'center',
        width: "16.666%"
    }
})
