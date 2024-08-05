import { View, Image } from "react-native";
import { PropsWithChildren } from "react";
import { styles } from "./RoundImage.stylesheet";
type IRoundImageProps = {
    width: number,
    src: string
}

export default function RoundImage({ width, src }: IRoundImageProps) {

    const style: any = {
        width,
        height: width,
        borderRadius: width / 2,
    }

    return (
        <View style={style}>
            <Image
                style={{...styles.img, ...style}}
                source={{
                    uri: src,
                }}
            />
        </View>
    );
}