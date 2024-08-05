import { StyleSheet } from 'react-native';
import theme from '../../core/config/theme';

export const styles = StyleSheet.create({
    main: {
     width: '100%',
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-between',
     padding:20,
     borderBottomColor: theme.desc,
     borderBottomWidth: 1
    },
    team:{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '33.33%'
    },
    teamImage:{
        width: 60,
        height: 60,
        objectFit: 'contain'
    },
    teamText:{
    },
    date:{
        fontSize: 12,
    },
    counts:{
        fontSize: 30,
    },
    status:{
        fontSize: 16,
    }
});
