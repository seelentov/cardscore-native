
import { StyleSheet } from 'react-native';
import theme from '../../../core/config/theme';

export const styles = StyleSheet.create({
    item:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: theme.desc,
        padding: 10
    },
    left:{
        display: "flex",
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    itemLogo:{
    },
    text:{
        display: 'flex',
        flexDirection: 'column',
    },
    desc:{
        color: theme.desc
    },
    title:{
    
    },
    count:{
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
