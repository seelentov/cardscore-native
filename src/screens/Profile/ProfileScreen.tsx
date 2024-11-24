import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View, Image } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import Table from '../../components/ui/Table/Table';
import TableLine from '../../components/ui/Table/TableLine';
import TableHeader from '../../components/ui/Table/TableHeader';
import TableText from '../../components/ui/Table/TableText';
import DateToString from '../../core/utils/date/DateToString';
import Button from '../../components/ui/Button/Button';
import { useContext, useEffect, useState } from 'react';
import Br from '../../components/ui/Br/Br';
import ChangePassModal from '../../components/ChangePassModal/ChangePassModal';
import { useGetMeQuery, useUpdateNotifMutation } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import { AuthContext } from '../../provider/AuthProvider';
import parseDateFromApi from '../../core/utils/date/parseDateFromApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Profile } from '../../components/Profile/Profile';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View>
      <ScrollView style={{ ...styles.wrapper, ...styles.spaces }}>
        <Profile navigation={navigation} />
      </ScrollView >
      <Footer navigation={navigation} />
    </View >)
}


