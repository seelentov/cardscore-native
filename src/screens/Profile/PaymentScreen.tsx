import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';

type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export default function PaymentScreen({ navigation }: PaymentScreenProps) {
    

    return (
        <View>
            <ScrollView style={styles.wrapper}>
                <Text>// страница для оплаты будет предоставляться платежным сервисом</Text>
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
}
