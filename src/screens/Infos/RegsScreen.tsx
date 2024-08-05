import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, View, Text, StyleSheet, ScrollView } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import Loading from '../../components/ui/Loading/Loading';
import theme from '../../core/config/theme';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { useGetReglamentsQuery } from '../../core/store/api/reglaments.api';
import NotFound from '../../components/ui/NotFound/NotFound';

type RegsScreenProps = NativeStackScreenProps<RootStackParamList, 'Regs'>;

export default function RegsScreen({ navigation }: RegsScreenProps) {


    const route = (text: string, title: string) => {
        navigation.navigate("Info", { text, title })
    }

    const { data: reglaments, isLoading } = useGetReglamentsQuery()


    return (
        <>
            <View style={styles.wrapper}>
                {isLoading ? <Loading /> :
                    reglaments ?
                        <ScrollView>
                            {reglaments.map(reglament =>
                                <Pressable style={nestedStyles.item} onPress={() => route(reglament.text, reglament.name)}>
                                    <Text style={nestedStyles.itemText}>{reglament.name}</Text>
                                </Pressable>)}
                        </ScrollView>
                        :
                        <NotFound title={"Пусто..."} desc={"Ошибка при загрузке"} />
                }
            </View>
            <Footer navigation={navigation} />
        </>
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
