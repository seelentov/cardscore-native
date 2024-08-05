import { View, Text, Pressable } from "react-native";
import { PropsWithChildren } from "react";
import { styles } from "./Header.stylesheet";

type IHeaderProps = {
    padding?: number
} & PropsWithChildren

export default function Header({ children, padding }: IHeaderProps) {

    return (
       <Text style={{...styles.main, padding}}>
        {children}
       </Text>
    );
}