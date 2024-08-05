import { View } from "react-native";
import { styles } from "./Table.stylesheet";
import { PropsWithChildren } from "react";



export default function Table({ children }: PropsWithChildren) {

    return (
       <View style={styles.main}>
        {children}
       </View>
    );
}