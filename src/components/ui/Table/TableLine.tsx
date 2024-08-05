import { View } from "react-native";
import { styles } from "./Table.stylesheet";
import { PropsWithChildren } from "react";



export default function TableLine({ children }: PropsWithChildren) {

    return (
       <View style={styles.line}>
        {children}
       </View>
    );
}