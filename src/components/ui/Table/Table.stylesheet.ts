import { StyleSheet } from 'react-native';
import theme from '../../../core/config/theme';

export const styles = StyleSheet.create({
    main:{
      borderRadius: 10,
      borderColor: theme.desc,
      borderWidth: 1,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 30,
      paddingBottom: 30,
      marginTop: 20,

      marginBottom: 20,
    },
    line:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2
    },
    header:{
        color: theme.text,
        opacity: 0.7,
        fontSize: 16
    },
    text:{
        color: theme.text,
        fontSize: 16
    }
});
