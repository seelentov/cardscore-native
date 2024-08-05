import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, ScrollView, Linking } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import Header from '../../components/ui/Header/Header';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import HTMLView from 'react-native-htmlview';

type InfoScreenProps = NativeStackScreenProps<RootStackParamList, 'Info'>;

export default function InfoScreen({ navigation, route }: InfoScreenProps) {

    const handlePress = (url: string) => {
        Linking.openURL(url);
    };

    const { text, title } = route.params

    return (
        <>
            <ScrollView style={{ ...styles.wrapper, ...styles.spaces }}>
                <Header>{title}</Header>
                <HTMLView
                    value={text}
                    onLinkLongPress={handlePress}
                />
            </ScrollView>
            <Footer navigation={navigation} />
        </>
    );
}
