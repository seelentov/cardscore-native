import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View  } from 'react-native';
import { RootStackParamList } from '../../Router';
import { styles } from '../../styles/styles';
import Loading from '../../components/ui/Loading/Loading';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({ navigation }: LoginScreenProps) {

  

    return (
        <>
            <View style={styles.wrapperFull}>
              <Loading/>
            </View>
        </>
    );
}
