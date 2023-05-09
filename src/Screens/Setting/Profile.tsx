import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingStackParamList } from "./SettingContainer";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Header from "@/Components/Header";
import { Status } from "@/Components/Header";
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { Button } from "native-base";

type ProfileScreenNavigationProps = NativeStackScreenProps<
    SettingStackParamList,
    'Profile'
>

export function Profile({route, navigation}: ProfileScreenNavigationProps) {
    return (
        <View style={styles.container}>
            <Header cover={Status.COVER2} leftTitle="Back" leftIconName="back" logoShow={false} navigation={navigation} isProfileScreen />

            <View style={styles.avatar}>
                <View style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.PRIMARY40
                }}>
                    <Icon name="person" size={30} color='black' />
                </View>
                <Text style={{ fontSize: FontSize.HEADLINE4, fontWeight: FontWeight.HEADLINE4, marginTop: 6 }}>Nguyễn Văn A</Text>
            </View>

            <View style={{ marginTop: 100, width: '100%', alignItems: 'center' }}>
                <View style={styles.profileItem}>
                    <Text style={styles.label}>Họ</Text>
                    <Text style={styles.value}>Nguyễn</Text>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Tên</Text>
                    <Text style={styles.value}>A</Text>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Giới tính</Text>
                    <Text style={styles.value}>Nam</Text>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Ngày sinh</Text>
                    <Text style={styles.value}>01/01/2000</Text>
                </View>
                
                <View style={styles.profileItem}>
                    <Text style={styles.label}>Số điện thoại</Text>
                    <Text style={styles.value}>0123456789</Text>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>123@gmail.com</Text>
                </View>
            </View>

            <Button style={{
                borderRadius: 10,
                width: '90%',
                marginTop: 10,
                backgroundColor: Colors.PRIMARY40
            }}
                onPress={()=>navigation.navigate('EditProfile')}
            >
                <Text style={{fontSize: FontSize.BUTTON_LARGE, fontWeight: FontWeight.BUTTON_LARGE, color: 'white'}}>
                    Chỉnh sửa thông tin
                </Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        backgroundColor: 'white',
        position: 'relative',
        alignItems: 'center'
    },
    avatar: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        top: Dimensions.get('window').width / 3.5 + 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
        height: 56,
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: Colors.SECONDARY20,
    },
    label: {
        color: Colors.BLACK60,
        fontSize: FontSize.SUBTITLES_SMALL,
        fontWeight: FontWeight.SUBTITLES_SMALL
    },
    value: {
        fontSize: FontSize.BUTTON_SMALL,
        fontWeight: FontWeight.BUTTON_SMALL
    }
})
