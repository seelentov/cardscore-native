import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Linking, ImageBackground } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import Header from '../../components/ui/Header/Header';
import HTMLView from 'react-native-htmlview';
import React from 'react';

type InfoScreenProps = NativeStackScreenProps<RootStackParamList, 'Info'>;

export default function InfoScreen({ navigation, route }: InfoScreenProps) {

    const handlePress = (url: string) => {
        Linking.openURL(url);
    };

    const { text, title } = route.params

    return (
        <>
            <ImageBackground source={require('../../../assets/bgw.jpg')}>
                <ScrollView style={{ ...styles.wrapper, ...styles.spaces }}>
                    <Header>{title}</Header>
                    <HTMLView
                        value={text}
                        onLinkLongPress={handlePress}
                    />
                </ScrollView>
            </ImageBackground>
            <Footer navigation={navigation} />
        </>
    );
}
