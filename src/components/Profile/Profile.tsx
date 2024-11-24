import { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import { useGetMeQuery, useUpdateNotifMutation } from "../../core/store/api/auth.api";
import DateToString from "../../core/utils/date/DateToString";
import parseDateFromApi from "../../core/utils/date/parseDateFromApi";
import { AuthContext } from "../../provider/AuthProvider";
import Footer from "../Footer/Footer";
import Br from "../ui/Br/Br";
import Loading from "../ui/Loading/Loading";
import Table from "../ui/Table/Table";
import TableHeader from "../ui/Table/TableHeader";
import TableLine from "../ui/Table/TableLine";
import TableText from "../ui/Table/TableText";
import { styles } from '../../styles/styles';
import React from "react";
import Button from '../../components/ui/Button/Button';


type IProfileProps = {
    navigation: any
}

export const Profile = ({ navigation }: IProfileProps) => {
    const { logout } = useContext(AuthContext);
    const { data: user, isLoading: isLoadingGet } = useGetMeQuery()
    const [updateExpoToken] = useUpdateNotifMutation()
    const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)
    const isLoading = isLoadingGet || isLoadingLogout

    const handleLogout = async () => {
        setIsLoadingLogout(true)
        logout().then(() => {
            updateExpoToken("")
            navigation.popToTop()
            navigation.replace("Login")
        })
    }

    return (
        <>
            {isLoading ? <Loading /> :
                <>
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
        </>
    );
}