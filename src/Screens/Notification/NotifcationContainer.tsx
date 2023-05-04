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
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
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