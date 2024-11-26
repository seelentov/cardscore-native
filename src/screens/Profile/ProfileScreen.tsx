import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View, Image, ImageBackground } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import React from 'react';
import { Profile } from '../../components/Profile/Profile';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <>
      <ImageBackground source={require('../../../assets/bgw.jpg')}>
        <ScrollView style={{ ...styles.wrapper, ...styles.spaces }}>
          <Profile navigation={navigation} />
        </ScrollView >
      </ImageBackground>
      <Footer navigation={navigation} />
    </ >)
}


