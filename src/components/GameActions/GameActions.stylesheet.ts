import { StyleSheet } from 'react-native';
import theme from '../../core/config/theme';

export const styles = StyleSheet.create({
    itemMain: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        width: '100%',
        borderColor: theme.desc,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    twoPlayersTitle:{
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    desc:{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        borderColor: theme.desc,
        borderWidth: 1,
        padding:3,
        borderRadius: 10
    },
});
