import { View, Image, Text, Pressable } from 'react-native';
import { styles } from './GameActions.stylesheet';
import ListItem from '../ui/ListItem/ListItem';
import theme from '../../core/config/theme';
import GameActionsItem from './GameActionsItem';

import red from './icons/red'
import yellow from './icons/yellow'
import yellowred from './icons/yellow-red-card'
import switchIcon from './icons/switch'
import arrowRight from './icons/arrowRight'
import { GameAction } from '../../core/types/gameAction';
import { League } from '../../core/types/league';
import { SvgXml } from 'react-native-svg';
import { useGetNotificatorsQuery } from '../../core/store/api/auth.api';
import { Notification } from '../../core/types/notification';

type IGameActionsProps = {
    actions?: Notification[]
    navigation: any,
    league: League
}


export default function GameActions({ actions, navigation, league }: IGameActionsProps) {

    const firstTime = actions?.filter(action => parseInt(action.time) <= 45)
    const secondTime = actions?.filter(action => parseInt(action.time) > 45)

    return (
        <View>
            
            {(firstTime && firstTime.length > 0) &&
                <>
                    <ListItem title={'1-й тайм'} style={{ backgroundColor: theme.desc }} />
                    <ActionsList actions={firstTime} navigation={navigation} league={league}/>
                </>
            }
            {(secondTime && secondTime.length > 0) &&
                <>
                    <ListItem title={'2-й тайм'} style={{ backgroundColor: theme.desc }} />
                    <ActionsList actions={secondTime} navigation={navigation} league={league}/>
                </>
            }
        </View>
    );
}


const ActionsList = ({ actions, navigation, league }: IGameActionsProps) => {
    return (
        <>{(actions) &&
                actions.map((action, index) => {
                    const descIcon = action.actionType === 1 ? yellow :
                        action.actionType === 2 ? red :
                            action.actionType === 3 ? yellowred : switchIcon

                    const isPagedPlayer =  action.playerUrl !== ""

                    const isPagedPlayer2 = action.playerUrl2 != ""

                    const isPlayer2Exist = action.playerName2 != ""

                    const twoPlayersTitle = isPlayer2Exist &&
                        <View style={styles.twoPlayersTitle}>
                            {isPagedPlayer ?
                                <Pressable onPress={() => {
                                    navigation.navigate('Player', { playerUrl: action.playerUrl, league })
                                }}>
                                    <Text style={{ color: 'black' }}>{action.playerName}</Text>
                                </Pressable> : <Text style={{ color: 'black' }}>{action.playerName}</Text>}
                            <SvgXml
                                width="20px"
                                height="20px"
                                xml={arrowRight}
                            />
                            {isPagedPlayer2 ?
                                <Pressable onPress={() => {
                                    navigation.navigate('Player', { playerUrl: action.playerUrl2, league })
                                }}>
                                    <Text style={{ color: 'black' }}>{action.playerName2}</Text>
                                </Pressable> : <Text style={{ color: 'black' }}>{action.playerName2}</Text>}
                        </View>

                    const title = isPlayer2Exist ?
                        twoPlayersTitle :
                        isPagedPlayer ?
                            <Pressable onPress={() => {
                                navigation.navigate('Player', { playerUrl: action.playerUrl, league })
                            }}><Text style={{ color: 'black' }}>{action.playerName}</Text></Pressable> :

                            <Text style={{ color: 'gray' }}>{action.playerName}</Text>

                    return (<GameActionsItem isLeft={action.leftTeam} descIcon={descIcon} time={action.time} title={title} key={index} />)
                })
            }</>
    )
}
