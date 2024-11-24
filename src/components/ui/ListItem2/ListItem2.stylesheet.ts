
import { StyleSheet } from 'react-native';
import theme from '../../../core/config/theme';

export const styles = StyleSheet.create({
    icons: {
        width: 20,
        height: 20
    },

    item: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: theme.desc,
        padding: 10
    },
    info: {
        display: "flex",
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    notifText: {
        color: theme.background
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,

    },
    desc: {
        fontSize: 10,
        textAlign: 'right'
    },
    notif: {
        backgroundColor: '#CC0000',
        paddingHorizontal: 2,
        borderRadius: 3
    },
    notifHide: {
        backgroundColor: theme.background,
        paddingHorizontal: 2,
        borderRadius: 3,
        opacity: 0
    },
    notifs: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        maxHeight: '100%',
        marginRight: 20,
        marginLeft: 'auto',

    },
    descs: {
        display: 'flex',
        maxHeight: '100%',
        marginLeft: 'auto',
        marginTop: 'auto',
    },

    count: {
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
});
