import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, View } from 'react-native';
import { RootStackParamList } from '../../Router';
import Footer from '../../components/Footer/Footer';
import { styles } from '../../styles/styles';
import GamesList from '../../components/GamesList/GamesList';
import { useGetLeaguesQuery } from '../../core/store/api/parser.api';
import Loading from '../../components/ui/Loading/Loading';
import { useGetFavoritesQuery } from '../../core/store/api/auth.api';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {

    const {data: leagues, isLoading: isLoadingLeagues} = useGetLeaguesQuery()
    const {data: favorites, isLoading: isLoadingFavorites} = useGetFavoritesQuery()

    const isLoading = isLoadingLeagues && isLoadingFavorites

    return (
        <>
            <View style={styles.wrapper}>
                {isLoading ? <Loading/> : 
                <GamesList navigation={navigation} leaguesData={leagues} leaguesData2={favorites}/>}
            </View>
            <Footer navigation={navigation} />
        </>
    );
}
