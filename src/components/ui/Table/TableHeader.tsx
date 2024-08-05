import { Text} from "react-native";
import { styles } from "./Table.stylesheet";
import { PropsWithChildren } from "react";



export default function TableHeader({ children }: PropsWithChildren) {

    return (
       <Text style={styles.header}>
        {children}
       </Text>
    );
}