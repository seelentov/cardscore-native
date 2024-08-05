import { View, Text, Pressable } from 'react-native';
import { RootStackParamList } from '../../../Router';
import { SvgUri } from 'react-native-svg';
import { styles } from './ListItem.stylesheet';

type ILeagueItemProps = {
    style?: any,
    navigation?: any,
    routeType?: keyof RootStackParamList,
    routeProps?: any,
    desc?: string,
    title?: string,
    count?: number | string,
    imageUrl?: string
}


export default function ListItem({ navigation, imageUrl, routeType, routeProps, count, desc, title, style }: ILeagueItemProps) {

    const isHaveLink = routeType && routeProps && navigation

    const openPage = () => isHaveLink ? navigation.navigate(routeType, routeProps) : null

    return (
        <Pressable onPress={()=>openPage()}>
            <View style={{...styles.item, ...style}}>
                <View style={styles.left}>
                    {
                        imageUrl &&
                        <SvgUri
                            style={styles.itemLogo}
                            width="30px"
                            height="30px"
                            uri={imageUrl}
                        />
                    }
                    <View style={styles.text}>
                        {
                            desc &&
                            <Text style={styles.desc}>{desc}</Text>
                        }
                        {
                            title &&
                            <Text style={styles.title}>{title}</Text>
                        }
                    </View>
                </View>
                {
                    count &&
                    <View style={styles.count}>
                        <Text>{count}</Text>
                    </View>
                }
            </View>
        </Pressable>
    );
}
