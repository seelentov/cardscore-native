import { View, Text } from "react-native";
import { styles } from "./DatePicker.stylesheet";
import convertToWeekDay from "../../core/utils/date/convertToWeekDay";
import isToday from "../../core/utils/date/isToday";
import theme from '../../core/config/theme'
import getTwoWeeks from "../../core/utils/date/getTwoWeeks";
type IDatePickerItemProps = {
    date: Date,
    active: boolean
}

export default function DatePickerItem({ active, date }: IDatePickerItemProps) {
 
    const borderBottomColor = active ? theme.color : theme.background
    const color = active ? theme.color : theme.text

    const weekDay = isToday(date) ? "СЕГОДНЯ" : convertToWeekDay(date)

    const day = date.getDate()
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1

    return (
        <View style={{...styles.item, borderBottomColor}}>
            <Text style={{color}}>
                {weekDay}
            </Text>
            <Text style={{color}}>
                {day}.{month}
            </Text>
        </View>
    )
}