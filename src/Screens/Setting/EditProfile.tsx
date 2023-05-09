import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingStackParamList } from "./SettingContainer";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Header from "@/Components/Header";
import { Status } from "@/Components/Header";
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { Button, Input, Select } from "native-base";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type EditProfileScreenNavigationProps = NativeStackScreenProps<
    SettingStackParamList,
    'EditProfile'
>

export function EditProfile({route, navigation}: EditProfileScreenNavigationProps) {
    const [userInfo, setUserInfo] = useState({
        firstName: 'Nguyen',
        lastName: 'A',
        gender: true,
        birth: new Date(),
        phone: '0123456789',
        email: '123@gmail.com'
    })

    const [show, setShow] = useState(false)
    const [isDataChanged, setIsDataChanged] = useState(false)

    const formatDate = (val: Date) => {
        let fDate = val.getDate() + '/' + (val.getMonth() + 1) + '/' + val.getFullYear();
        return fDate
    }

    const [date, setDate] = useState(formatDate(userInfo.birth))

    const handleSave = async () => {
        //call api
        console.log(userInfo)
        setIsDataChanged(false)
        alert('Thay đổi thành công')
    }

    const handleDataChanged = (key: string, value: any) => {
        setUserInfo(prev => ({
            ...prev,
            [key]: value
        }))
        setIsDataChanged(true)
    }

    const handleConfirm = (selectedValue:any) => {
        const currentDate = selectedValue || userInfo.birth
        setShow(false)
        setUserInfo(prev => ({
            ...prev,
            birth: currentDate
        }))
        setDate(formatDate(currentDate))
        setIsDataChanged(true)
    }

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
                    <Input borderRadius={10} size="sm" value={userInfo.firstName} backgroundColor='white' w='60%'
                        onChangeText={(val) => handleDataChanged('firstName', val)}
                    />
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Tên</Text>
                    <Input borderRadius={10} size="sm" value={userInfo.lastName} backgroundColor='white' w='60%' 
                        onChangeText={(val) => handleDataChanged('lastName', val)}
                    />
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Giới tính</Text>
                    <Select selectedValue={userInfo.gender ? 'Nam' : 'Nữ'} w={100} backgroundColor='white' _selectedItem={{
                        bg: "white",
                        endIcon: <Icon color={Colors.BLACK60} name='down' size={5} />
                    }} borderRadius={10} onValueChange={itemValue => {
                        setUserInfo(prev => ({
                            ...prev,
                            gender: itemValue === 'Nam'
                        }))
                        setIsDataChanged(true)
                    }}>
                        <Select.Item label="Nam" value='Nam' />
                        <Select.Item label="Nữ" value='Nữ' />
                    </Select>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Ngày sinh</Text>
                    <TouchableOpacity onPress={()=>setShow(true)} style={{width: '60%'}}>
                        <Input isReadOnly borderRadius={10} size="sm" value={date} backgroundColor='white' 
                            InputRightElement={<View style={{marginRight: 8}}>
                                <Icon name="calendar" size={20} color="black"/>
                            </View>}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Số điện thoại</Text>
                    <Input borderRadius={10} size="sm" value={userInfo.phone} backgroundColor='white' w='60%' 
                        onChangeText={(val) => handleDataChanged('phone', val)}
                    />
                </View>

                <View style={styles.profileItem}>
                    <Text style={styles.label}>Email</Text>
                    <Input borderRadius={10} size="sm" value={userInfo.email} backgroundColor='white' w='60%' 
                        onChangeText={(val) => handleDataChanged('email', val)}
                    />
                </View>
            </View>

            <Button style={{
                borderRadius: 10,
                width: '90%',
                marginTop: 10,
                backgroundColor: isDataChanged ? Colors.PRIMARY40 : Colors.PRIMARY20
            }}
                onPress={handleSave}
                disabled={!isDataChanged}
            >
                <Text style={{ fontSize: FontSize.BUTTON_LARGE, fontWeight: FontWeight.BUTTON_LARGE, color: 'white' }}>
                    Lưu thông tin
                </Text>
            </Button>

            <DateTimePickerModal
                isVisible={show}
                mode="date"
                onConfirm={handleConfirm}
                date={userInfo.birth}
                onCancel={()=>setShow(false)}
            />
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