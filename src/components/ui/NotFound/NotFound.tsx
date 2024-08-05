import { View, Text, Image } from 'react-native';
import { styles } from './NotFound.stylesheet';

type ILeagueItemProps = {
    title?: string,
    desc?: string,
    imageUrl?: string
}


export default function NotFound({ title, desc, imageUrl }: ILeagueItemProps) {

    return (
        <View style={styles.main}>
            {title && <Text style={styles.title}>{title}</Text>}
            {desc && <Text style={styles.desc}>{desc}</Text>}
            {imageUrl &&
                <Image
                    source={{
                        uri: imageUrl,
                    }}
                />
            }
        </View>
    );
}
