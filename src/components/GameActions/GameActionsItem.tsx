import { View, Image, Text, ImageSourcePropType } from 'react-native';
import { styles } from './GameActions.stylesheet';
import { SvgXml } from 'react-native-svg';

type IGameActionsItemProps = {
    isLeft: boolean,
    descIcon: ImageSourcePropType,
    descText?: string,
    title: any,
    time: string
}


export default function GameActionsItem({ isLeft, time, title, descIcon, descText }: IGameActionsItemProps) {
    const flexDirection = isLeft ? 'row' : 'row-reverse'
    const margin: any = {
        marginLeft: isLeft ? 0 : 'auto',
        marginRight: isLeft ? 'auto' : 0
    }

    return (
        <View
            style={{
                ...styles.itemMain,
                flexDirection,
                ...margin
            }}>
            <Text>{time}</Text>
            <View style={styles.desc}>
                <Image
                    style={{ width: 30, height: 30 }}
                    source={descIcon}
                />
                {descText && <Text >{descText}</Text>}
            </View>
            <View>
                {title}
            </View>
        </View>
    );
}
