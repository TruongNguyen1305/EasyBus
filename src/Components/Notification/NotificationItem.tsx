import { View, Text } from "react-native"
import { Icon } from "@/Theme/Icon/Icon"
import { Divider } from "native-base"
import { FontSize, FontWeight } from "@/Theme/Variables"

interface INotiProps {
    title: string,
    content: string,
    time: string,

}


export default function NotificationItem (props: INotiProps) {
    return (
        <View style={{ marginBottom: 0, alignItems: 'center', margin: 10}}>
            <View style={{
                flexDirection: 'row', position: 'relative', alignSelf: 'center',
                marginBottom: 10, marginLeft: 4, marginRight: 4,
                padding: 10,
            }}>
                <Icon name='bell' size={24} color='#000' />
                <View style={{ marginLeft: 5, width:'90%'}}>
                    <Text style={{
                        fontSize: FontSize.BUTTON_NORMAL,
                        fontWeight: FontWeight.BUTTON_SMALL,
                        width: 230,
                    }}>{props.title}</Text>
                    <Text style={{
                        fontSize: FontSize.BODY_SMALL1,
                        fontWeight: FontWeight.BODY_SMALL,
                        marginTop: 5,
                    }}>{props.content}</Text>
                </View>
                <Text style={{
                    position: 'absolute', right: 20, top: 10,
                    fontSize: FontSize.BUTTON_SMALL1
                }}>{props.time}</Text>
            </View>
            <Divider width="90%" orientation="horizontal" thickness={2} />
        </View>
    )
}
