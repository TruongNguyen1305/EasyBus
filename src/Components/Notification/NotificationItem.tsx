import { View, Text } from "react-native"
import { Icon } from "@/Theme/Icon/Icon"
import { Divider } from "native-base"
import { FontSize, FontWeight } from "@/Theme/Variables"

export default function NotificationItem () {
    return (
        <View style={{ marginBottom: 0, alignItems: 'center', margin: 10}}>
            <View style={{
                flexDirection: 'row', position: 'relative', alignSelf: 'center',
                marginBottom: 10, marginLeft: 4, marginRight: 4,
                padding: 10,
            }}>
                <Icon name='bell' size={24} color='#000' />
                <View style={{ marginLeft: 5}}>
                    <Text style={{
                        fontSize: FontSize.BUTTON_NORMAL,
                        fontWeight: FontWeight.BUTTON_SMALL
                    }}>Tuyến xe 3 - Đổi lịch trình</Text>
                    <Text style={{
                        fontSize: FontSize.BODY_SMALL1,
                        fontWeight: FontWeight.BODY_SMALL,
                        marginTop: 5,
                    }}>Đường Nguyễn Thái Sơn - Đường Phạm Ngũ Lão - Đường Nguyễn Oanh có lộ trình thay thế là
                        Đường Nguyễn Thái Sơn - Đường Pha Văn Trị - Đường Thị Nghỉ - Đường Nguyễn Kiệm</Text>
                </View>
                <Text style={{
                    position: 'absolute', right: 20, top: 10,
                    fontSize: FontSize.BUTTON_SMALL1
                }}>Hôm qua</Text>
            </View>
            <Divider width="90%" orientation="horizontal" thickness={2} />
        </View>
    )
}
