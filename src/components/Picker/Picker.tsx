import { Pressable, View, Text, ScrollView, Dimensions } from "react-native";
import { styles } from "./Picker.stylesheet";
import { Dispatch, SetStateAction, useRef } from "react";
import theme from "../../core/config/theme";

type IPickerProps = {
    setState: Dispatch<SetStateAction<PickerOption | null>>
    state: PickerOption | null
    options: PickerOption[]
}

export type PickerOption = {
    label: string,
    value: number
}

const { width: screenWidth } = Dimensions.get('window');

export default function Picker({ state, setState, options }: IPickerProps) {

    return (
        <View style={styles.main}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.list}
            >
                {options.map((el) => {
                    const active = (state && el.label === state.label)
                    const color = active ? theme.color : theme.text
                    const borderBottomWidth = active ? 4 : 0
                    const paddingBottom = active ? 0 : 4
                    return (
                        <Pressable onPress={() => setState(el)} key={el.label} style={{ width: screenWidth / options.length, ...styles.itemWrapper }}>
                            <View style={{ ...styles.item, borderBottomColor: theme.color, borderBottomWidth, paddingBottom }}>
                                <Text style={{ color }}>
                                    {el.label}
                                </Text>
                            </View>
                        </Pressable>)
                }
                )}
            </ScrollView>
        </View>
    );
}