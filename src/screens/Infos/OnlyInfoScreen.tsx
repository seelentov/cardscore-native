import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, ScrollView, Linking, ImageBackground } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import Header from '../../components/ui/Header/Header';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import HTMLView from 'react-native-htmlview';

type OnlyInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'OnlyInfo'>;

export default function OnlyInfoScreen({ navigation, route }: OnlyInfoScreenProps) {

    const { text, title } = route.params

    const handlePress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <ImageBackground source={require('../../../assets/bgw.jpg')}>
            <ScrollView style={{ ...styles.wrapper, ...styles.spaces }}>
                <Header>{title}</Header>
                <HTMLView
                    value={text}
                    onLinkLongPress={handlePress}
                />
            </ScrollView>
        </ImageBackground>
    );
}
