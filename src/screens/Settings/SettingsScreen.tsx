import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, TextInput, View, Text, StyleSheet, Pressable, Alert, ImageBackground } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import Checkbox from '../../components/ui/Checkbox/Checkbox';
import Header from '../../components/ui/Header/Header';
import { useEffect, useState } from 'react';
import { useEditNotificatorsMutation, useGetNotificatorsQuery } from '../../core/store/api/auth.api';
import Loading from '../../components/ui/Loading/Loading';
import Button from '../../components/ui/Button/Button';
import { EditUserNotificationOption } from '../../core/types/EditUserNotificationOption';
import theme from '../../core/config/theme';
import NotFound from '../../components/ui/NotFound/NotFound';
import React from 'react';
import { Profile } from '../../components/Profile/Profile';
import Br from '../../components/ui/Br/Br';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

type cardCountType = 'cardCount' | 'cardCountTwo' | 'cardCountThree' | "cardCountFour"
type cardCountTypes = ['cardCount', 'cardCountTwo', 'cardCountThree', "cardCountFour"]

export default function SettingsScreen({ navigation }: SettingsScreenProps) {

    const { data, isLoading: isLoadingGet } = useGetNotificatorsQuery()

    const [editNotificators, { isLoading: isLoadingMutation }] = useEditNotificatorsMutation()

    const [notificators, setNotificators] = useState<EditUserNotificationOption[]>()

    const isLoading = isLoadingMutation || isLoadingGet

    useEffect(() => {
        if (data) {
            setNotificators(data)
        }
    }, [data])

    const toggleNotif = (index: number) => {
        setNotificators(prevNotificators => {
            return prevNotificators?.map((notificator, i) => {
                if (i === index) {
                    return {
                        ...notificator,
                        active: !notificator.active,
                    };
                }
                return notificator;
            });
        });
    }



    const cardCountTypes: cardCountTypes = ['cardCount', 'cardCountTwo', 'cardCountThree', "cardCountFour"]

    const setNotifValue = (index: number, value: string, cardCountType: cardCountType) => {
        setNotificators(prevNotificators => {
            return prevNotificators?.map((notificator, i) => {
                if (i === index) {
                    return {
                        ...notificator,
                        [cardCountType]: value === "" ? 1 : parseInt(value, 10),
                    };
                }
                return notificator;
            });
        });
    }

    const handleUpdateNotifValue = (index: number, value: number, cardCountType: cardCountType) => {
        setNotificators(prevNotificators => {
            return prevNotificators?.map((notificator, i) => {
                if (i === index) {
                    return {
                        ...notificator,
                        [cardCountType]: notificator[cardCountType] + value === 0 ? 1 : notificator[cardCountType] + value,
                    };
                }
                return notificator;
            });
        });
    }

    const handleSubmit = () => {
        if (isLoadingMutation || !notificators) {
            return;
        }

        for (const notificator of notificators) {
            const values = [notificator.cardCount, notificator.cardCountTwo, notificator.cardCountThree];
            if (new Set(values).size !== values.length) {
                Alert.alert(`Ошибка при сохранении лиги ${notificator.name}`, "Первая, вторая и третья критические желтые карточки должны быть уникальны внутри лиги");
                return;
            }
        }

        editNotificators({ options: notificators }).then(() => {
            Alert.alert(`ОК!`, "Сохранение прошло успешно");
        });
    }

    return (
        <>
            <View style={styles.wrapper}>
                <ImageBackground style={styles.spacesHorizontal} source={require('../../../assets/bgy.jpg')}>
                    <Header>Настройки</Header>
                </ImageBackground>

                <ScrollView style={nestedStyle.list}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Header>Уведомления</Header>
                    </View>
                    {
                        isLoading ? <Loading /> :
                            notificators?.map((notificator, index) => {
                                return (
                                    <View key={index} style={nestedStyle.section}>
                                        <Text style={nestedStyle.itemHeader}>{notificator.name}</Text>
                                        <Checkbox text={'Push-уведомления'} check={notificator.active} setCheck={() => toggleNotif(index)} />
                                        {
                                            cardCountTypes.map((cdCntType) =>
                                                <View style={nestedStyle.item}>
                                                    <Text>{cdCntType === "cardCount" ? 'Первая' : cdCntType === "cardCountTwo" ? "Вторая" : cdCntType === "cardCountThree" ? "Третья" : "Четвёртая"} критическая желтая карточка при: </Text>
                                                    <Pressable style={nestedStyle.btn} onPress={() => handleUpdateNotifValue(index, 1, cdCntType)}>
                                                        <Text>+</Text>
                                                    </Pressable>
                                                    <Pressable style={{ ...nestedStyle.btn, opacity: notificator[cdCntType] === 1 ? 0.2 : 1 }} onPress={() => handleUpdateNotifValue(index, -1, cdCntType)}>
                                                        <Text>-</Text>
                                                    </Pressable>
                                                    <TextInput
                                                        value={notificator[cdCntType].toString()}
                                                        onChangeText={(value: string) => setNotifValue(index, value, cdCntType)}
                                                        inputMode={'numeric'}
                                                        style={nestedStyle.input}
                                                    />
                                                </View>
                                            )
                                        }
                                    </View>
                                )
                            })
                    }
                    {
                        notificators && notificators?.length < 1 && <NotFound title={"Пусто"} desc={"Нет ни одной избранной лиги"} />
                    }
                    <View style={{ paddingHorizontal: 10 }}>
                        <Header>Профиль</Header>
                    </View>
                    <Profile navigation={navigation} />
                    <Br />
                    <Br />
                    <Br />
                </ScrollView>

                <View style={styles.spaces}>
                    <Button onPress={() => handleSubmit()}>Сохранить</Button>
                </View>
            </View >
            <Footer navigation={navigation} />
        </>
    );
}


const nestedStyle = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: theme.desc,
    },
    input: {
        borderColor: theme.desc,
        borderWidth: 1,
        padding: 1,
        textAlign: 'center',
        borderRadius: 2
    },
    btn: {
        backgroundColor: theme.desc,
        padding: 1,
        textAlign: 'center',
        borderRadius: 2,
        width: 20,
        display: 'flex',
        alignItems: 'center'
    },
    section: {
        borderBottomWidth: 1,
        borderColor: theme.desc,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    itemHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 10
    },
    list: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.desc,
    }
})