import { StyleSheet } from 'react-native';
import theme from '../core/config/theme';

export const styles = StyleSheet.create({
    wrapper: {
        height: "92%",
        width: '100%',
        backgroundColor: theme.background
    },
    wrapper100: {
        height: "100%",
        width: '100%',
        backgroundColor: theme.background
    },
    wrapperFull: {
        height: "100%",
        width: '100%',
        backgroundColor: theme.background,
        display: "flex",
        justifyContent: 'center',
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    spaces: {
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },
    spacesHorizontal: {
        paddingRight: 30,
        paddingLeft: 30,
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
    bg: {
        flex: 1,
        height: '100%',
    }
});
