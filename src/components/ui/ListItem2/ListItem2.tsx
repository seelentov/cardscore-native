import { View, Image, Text, Pressable } from 'react-native';
import { RootStackParamList } from '../../../Router';
import { SvgUri } from 'react-native-svg';
import { styles } from './ListItem2.stylesheet';
import { PropsWithChildren } from 'react';
import RoundImage from '../RoundImage/RoundImage';

type ILeagueItemProps = {
    style?: any,
    navigation?: any,
    routeType?: keyof RootStackParamList,
    routeProps?: any,
    titles?: [string, string],
    iconUrls?: [string, string]
    counts?: [string, string],
    notifs?: [number, number],
    imageUrl?: string,
    descs?: [string, string]
} & PropsWithChildren


export default function ListItem({ navigation, routeType, routeProps, counts, titles, style, children, iconUrls, notifs, descs }: ILeagueItemProps) {

    const isHaveLink = routeType && routeProps && navigation

    const openPage = () => isHaveLink ? navigation.navigate(routeType, routeProps) : null


    return (
        <Pressable onPress={() => openPage()} style={style || null}>
            <View style={styles.item}>
                <View style={styles.info}>
                    {children}
                    <View style={styles.text}>
                        {(titles && iconUrls) && titles.map((title, index) =>
                            <View style={styles.info}>
                                <Image
                                style={styles.icons}
                    source={{
                        uri: iconUrls[index],
                    }}
                />
                                <Text>
                                    {title}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {(notifs && notifs.length > 0) &&
                    <View style={styles.notifs}>
                            <View style={notifs[0] < 1 ? styles.notifHide : styles.notif}>
                                <Text style={styles.notifText}>
                                    {notifs[0]}
                                </Text>
                            </View>
                            <View style={notifs[1] < 1 ? styles.notifHide : styles.notif}>
                                <Text style={styles.notifText}>
                                    {notifs[1]}
                                </Text>
                            </View>
                    </View>
                }
                {
                    descs &&
                    <View style={styles.descs}>
                        <Text style={styles.desc}>
                            {descs[0]}
                        </Text>
                        <Text style={styles.desc}>
                            {descs[1]}
                        </Text>
                    </View>
                }
                {
                    counts &&
                    <View style={styles.count}>
                        <Text>{counts[0]}</Text>
                        <Text>{counts[1]}</Text>
                    </View>
                }
            </View>
        </Pressable>
    );
}
