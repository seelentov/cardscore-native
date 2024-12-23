import { StyleSheet } from 'react-native';
import theme from '../../core/config/theme';


export const styles = StyleSheet.create({
    main: {

    },
    list: {
        paddingTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: theme.desc
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 110
    },
    itemWrapper: {
        alignItems: 'center',
    }
});
