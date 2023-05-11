import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingStackParamList } from "./SettingContainer";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Header from "@/Components/Header";
import { Status } from "@/Components/Header";
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { LOGOUT } from "@/Store/reducers";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { CompositeScreenProps } from "@react-navigation/native";
import { useEffect } from "react";
import { Button } from "native-base";
import { User } from "@/Services";


type SettingScreenNavigationProps = NativeStackScreenProps<
    SettingStackParamList,
    'Setting'
>

type RootScreenNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.MAIN
>

type SettingScreenProps = CompositeScreenProps<
    SettingScreenNavigationProps,
    RootScreenNavigatorProps
>;
 

export function Setting({ route, navigation }: SettingScreenProps) {
    const {user} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()


    return (
        <View style={styles.container}>
            <Header cover={Status.COVER2} leftTitle="Thông tin" leftIconName="more" logoShow={false} isProfileScreen/>

            {user ? (
                <>
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
                        <Text style={{ fontSize: FontSize.HEADLINE4, fontWeight: FontWeight.HEADLINE4, marginTop: 6 }}>{(user as User).fullName}</Text>
                    </View>

                    <View style={{ marginTop: 100, width: '100%', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.settingItem}
                            onPress={() => navigation.navigate('Profile', {user})}
                        >
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Icon name="person" size={24} color="black" />
                                <Text style={styles.settingTitle}>Thông tin cá nhân</Text>
                            </View>
                            <Icon name='right' size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Icon name="location-full" size={24} color="black" />
                                <Text style={styles.settingTitle}>Địa điểm đã lưu</Text>
                            </View>
                            <Icon name='right' size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Icon name="setting" size={24} color="black" />
                                <Text style={styles.settingTitle}>Cài đặt</Text>
                            </View>
                            <Icon name='right' size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Icon name="location-full" size={24} color="black" />
                                <Text style={styles.settingTitle}>Thay đổi khu vực</Text>
                            </View>
                            <Icon name='right' size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Icon name="mail" size={24} color="black" />
                                <Text style={styles.settingTitle}>Gửi phản hồi</Text>
                            </View>
                            <Icon name='right' size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}
                            onPress={() => {
                                dispatch(LOGOUT({}))
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Icon name="logout" size={24} color="black" />
                                <Text style={styles.settingTitle}>Đăng xuất</Text>
                            </View>
                            <Icon name='right' size={24} color="black" />
                        </TouchableOpacity>

                    </View>
                </>
            ) : (
                <Button size='lg'
                    style={{
                        backgroundColor: Colors.PRIMARY40,
                        borderRadius: 10,
                        marginTop: 200
                    }}
                    onPress={() => navigation.navigate(RootScreens.AUTH)}
                >
                    <Text
                        style = {{
                            fontSize: FontSize.BUTTON_LARGE,
                            fontWeight: FontWeight.BUTTON_LARGE,
                            color: 'white'
                        }}
                    >
                            Đăng nhập để tiếp tục
                    </Text>
                
                </Button>
            )}
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
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 56,
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: Colors.SECONDARY40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    settingTitle: {
        fontSize: FontSize.BUTTON_NORMAL,
        fontWeight: FontWeight.BUTTON_NORMAL,
        marginLeft: 50,
    }
})