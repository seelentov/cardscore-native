import { Pressable, View, Text, ScrollView } from "react-native";
import { styles } from "./DatePicker.stylesheet";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import getTwoWeeks from "../../core/utils/date/getTwoWeeks";
import DatePickerItem from "./DatePickerItem";
import compareDate from "../../core/utils/date/compareDate";

type IDatePickerProps = {
    setDate: Dispatch<SetStateAction<Date | null>>
    dateState: Date | null
}


export default function DatePicker({ dateState, setDate }: IDatePickerProps) {

    const viewRef = useRef(null);

    // useEffect(() => {
    //     const ref: any = viewRef.current
    //     ref.scrollTo({x: ((styles.item.width * 4) - (styles.item.width * 1.5))});
    // },[]);
    
    return (
        <View style={styles.main}>
            <ScrollView
                ref={viewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.list}
            >
                {getTwoWeeks().map((date, index) =>
                    <Pressable onPress={()=>setDate(date)} key={date.getDate()}>
                        <DatePickerItem date={date} active={dateState ? compareDate(dateState, date) : false}/>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
}