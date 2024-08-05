import { Text, TextStyle} from "react-native";
import { styles } from "./Table.stylesheet";
import { PropsWithChildren } from "react";



export default function TableHeader({ children, style = {} }: PropsWithChildren & {style?: TextStyle}) {

    return (
       <Text style={{...styles.text, ...style}}>
        {children}
       </Text>
    );
}