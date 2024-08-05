import { StyleSheet } from 'react-native';
import theme from '../../core/config/theme';

export const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: theme.desc,
        paddingRight: 20
    },
});
