import { Pressable, View, Image, ImageSourcePropType, ImageBackground } from "react-native";
import { styles } from "./Footer.stylesheet";
import { styles as baseStyles } from "../../styles/styles";
import home from "../ui/Icons/home";
import routing from '../../core/config/routing'
import { SvgXml } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../Router";
type IHeaderProps = {
    navigation: any
}


export default function Footer({ navigation }: IHeaderProps) {


    const actialRoute = useRoute();

    const navigate = (
        name: keyof RootStackParamList,
        props?: {
            [key: string]: any;
        }
            | undefined,
    ) => {
        const actual = (name === actialRoute.name)
        if (actual) {
            navigation.push(name, props)
        }
        else {
            navigation.navigate(name, props)
        }
    }

    return (
        <View style={{ ...styles.main, ...baseStyles.bg }}>
            <View style={styles.list}>
                {routing.map((route, key) => {
                    const actual = ((route.name === actialRoute.name) && route.props === actialRoute.params)
                    const opacity = actual ? 1 : 0.5
                    const pointerEvents = actual ? 'none' : undefined
                    return (<Pressable key={key} style={{ ...styles.item, opacity, pointerEvents }} onPress={() => navigate(route.name, route.props)}>
                        {typeof route.icon === 'string'
                            ? <SvgXml xml={route.icon as string} width="30" height="30" />
                            : <Image style={{ width: 40, height: 40 }} source={route.icon as ImageSourcePropType} />
                        }
                    </Pressable>)
                })}

            </View>
        </View>
    );
}