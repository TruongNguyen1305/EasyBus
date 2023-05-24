import { View, Text, StyleSheet, ScrollView
 } from "react-native"
import Header from "@/Components/Header"
import { Status } from "@/Components/Header"
import NotificationItem from "@/Components/Notification/NotificationItem"
export default function NotificationContainer() {
    return (
        <View style = {styles.container}>
            <Header cover={Status.COVER2} leftTitle='Thông báo' leftIconName='notification' logoShow={false} />
            <ScrollView style = {{width: '90%', marginTop: 20, backgroundColor:'white'}}>
                <NotificationItem title="Tuyến xe 3 - Đổi lịch trình"
                content="Đường Nguyễn Thái Sơn - Đường Phạm Ngũ Lão - Đường Nguyễn Oanh có lộ trình thay thế là
                Đường Nguyễn Thái Sơn - Đường Pha Văn Trị - Đường Thị Nghỉ - Đường Nguyễn Kiệm"
                time ="Hôm qua"
                />
                <NotificationItem
                    title="Công bố mở tuyến kết nối Bến xe Miền Đông cũ và Bến xe Miền Đông mới"
                    content="Công bố mở tuyến xe buýt không trợ giá kết nối Bến xe Miền Đông cũ và Bến xe Miền Đông mới"
                    time="Tuần trước"
                />
                <NotificationItem
                    title="Công bố mở tuyến xe buýt kết nối Bến xe Miền Đông cũ và Bến xe Miền Đông mới"
                    content="Kể từ ngày 15 tháng 03 năm 2023, Trung tâm Quản lý Giao thông công cộng thông báo điều chỉnh lộ trình hoạt động trên tuyến xe buýt có trợ giá số 71 (Bến xe An Sương – Phật Cô Đơn)"
                    time="Tuần trước"
                />
                                <NotificationItem title="Tuyến xe 3 - Đổi lịch trình"
                content="Đường Nguyễn Thái Sơn - Đường Phạm Ngũ Lão - Đường Nguyễn Oanh có lộ trình thay thế là
                Đường Nguyễn Thái Sơn - Đường Pha Văn Trị - Đường Thị Nghỉ - Đường Nguyễn Kiệm"
                time ="Hôm qua"
                />
                <NotificationItem
                    title="Công bố mở tuyến kết nối Bến xe Miền Đông cũ và Bến xe Miền Đông mới"
                    content="Công bố mở tuyến xe buýt kết nối Bến xe Miền Đông cũ và Bến xe Miền Đông mới"
                    time="Tuần trước"
                />
                <NotificationItem
                    title="Công bố mở tuyến xe buýt kết nối Bến xe Miền Đông cũ và Bến xe Miền Đông mới"
                    content="Kể từ ngày 15 tháng 03 năm 2023, Trung tâm Quản lý Giao thông công cộng thông báo điều chỉnh lộ trình hoạt động trên tuyến xe buýt có trợ giá số 71 (Bến xe An Sương – Phật Cô Đơn)"
                    time="Tuần trước"
                />

            </ScrollView>
        
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
    }
})