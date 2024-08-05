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

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState<boolean>(false)
  const { logout } = useContext(AuthContext);
  const { data: user, isLoading: isLoadingGet } = useGetMeQuery()
  const [updateExpoToken] = useUpdateNotifMutation()
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)
  const isLoading = isLoadingGet || isLoadingLogout 

  const handleLogout = async () => {
    setIsLoadingLogout(true)
    logout().then(()=>{
        updateExpoToken("")
        navigation.popToTop()
        navigation.replace("Login")
    })
  }

  return (
    <View>

      <ScrollView style={{ ...styles.wrapper, ...styles.spaces }}>
        {isLoading ? <Loading /> :
          <>
            <ChangePassModal isOpen={isChangePassModalOpen} setIsOpen={setIsChangePassModalOpen} />
            <Table>
              <TableLine>
                <TableHeader>ID</TableHeader>
                <TableText>{user?.id}</TableText>
              </TableLine>
              <TableLine>
                <TableHeader>Имя: </TableHeader>
                <TableText>{user?.name}</TableText>
              </TableLine>
              <TableLine>
                <TableHeader>E-mail: </TableHeader>
                <TableText>{user?.email}</TableText>
              </TableLine>
              <TableLine>
                <TableHeader>Номер телефона: </TableHeader>
                <TableText>{user?.phone}</TableText>
              </TableLine>
              <TableLine>
                <TableHeader>Роль: </TableHeader>
                <TableText>{user?.roleId == 2 ? "Пользователь" : "Администратор"}</TableText>
              </TableLine>
            </Table>
            <Br />
            <Table>
              <TableLine>
                <TableHeader>Тип подписки</TableHeader>
                <TableText>{user?.subStatus === 0 ? "Тестовый период" : "Полный доступ"}</TableText>
              </TableLine>
              <TableLine>
                <TableHeader>Подписка истекает: </TableHeader>
                <TableText>{user?.subData && DateToString(parseDateFromApi(user?.subData))}</TableText>
              </TableLine>
            </Table>
            <Br />
            <Button onPress={handleLogout} color='#CC0000'>Выйти</Button>
          </>
        }
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}


