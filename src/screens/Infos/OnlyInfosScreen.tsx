import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { RootStackParamList } from '../../Router';
import { styles } from '../../styles/styles';
import { useGetContactsQuery, useGetPaymentQuery, useGetPolicyQuery } from '../../core/store/api/info.api';
import Loading from '../../components/ui/Loading/Loading';
import theme from '../../core/config/theme';
import React from 'react';

type OnlyInfosScreenProps = NativeStackScreenProps<RootStackParamList, 'OnlyInfos'>;

export default function OnlyInfosScreen({ navigation }: OnlyInfosScreenProps) {

    const route = (text: string, title: string) => {
        navigation.navigate("OnlyInfo", { text, title })
    }

    const { data: contacts, isLoading: contactsIsLoading } = useGetContactsQuery()
    const { data: policy, isLoading: policyIsLoading } = useGetPolicyQuery()
    const { data: payment, isLoading: paymentIsLoading } = useGetPaymentQuery()

    const isLoaded = (contacts && policy && payment) && (!contactsIsLoading && !policyIsLoading && !paymentIsLoading)

    return (
        <ImageBackground source={require('../../../assets/bgw.jpg')} style={styles.wrapper100}>
            {!isLoaded ? <Loading /> :
                <>
                    <Pressable style={nestedStyles.item} onPress={() => route(contacts.description, contacts.name)}>
                        <Text style={nestedStyles.itemText}>Контакты</Text>
                    </Pressable>
                    <Pressable style={nestedStyles.item} onPress={() => route(payment.description, payment.name)}>
                        <Text style={nestedStyles.itemText}>Данные оплаты</Text>
                    </Pressable>
                    <Pressable style={nestedStyles.item} onPress={() => route(policy.description, policy.name)}>
                        <Text style={nestedStyles.itemText}>Политика конфиденциальности</Text>
                    </Pressable>
                </>
            }
        </ImageBackground>
    );
}


const nestedStyles = StyleSheet.create({
    item: {
        paddingVertical: 20,
        borderBottomColor: theme.desc,
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 20,
        paddingLeft: 10
    }
})
