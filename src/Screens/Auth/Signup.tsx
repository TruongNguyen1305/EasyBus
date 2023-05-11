import React, {useRef, useState} from 'react'
import { Text, View, StyleSheet, Pressable } from "react-native";
import LottieView from 'lottie-react-native';
import { Input, Button, Checkbox} from 'native-base';

import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { Icon } from '@/Theme/Icon/Icon';
import ButtonEB from '@/Components/ButtonEB';
import { useLazySignupQuery } from '@/Services';
import { LOGIN } from '@/Store/reducers/user';
import { useAppDispatch } from '@/Hooks/redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/Navigation/Auth';
import { RootStackParamList } from '@/Navigation';
import { RootScreens } from '..';
import { CompositeScreenProps } from '@react-navigation/native';

type AuthScreenNavigatorProps = NativeStackScreenProps<
    AuthStackParamList,
    'Signup'
>;

type RootScreenNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.AUTH
>

type SignupScreenProps = CompositeScreenProps<
    AuthScreenNavigatorProps,
    RootScreenNavigatorProps
>;

export default function SignUp({ navigation }: SignupScreenProps){
    const dispatch = useAppDispatch()
    const [info, setInfo] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        isCheckVerify: false,
    }) 

    const [isShow, setIsShow] = useState({
        pass1: false,
        pass2: false,
    })
    
    const animation = useRef(null)

    // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    //     useLazySignupQuery();

    const handleSubmit = async() => {
        // fetchOne({
        //     email: info.username,
        //     password: info.password,
        //     fullName: info.name
        // })
        // while (isFetching) {
        //     //cc
        // }
        // console.log(data)
    }
    
    return (
        <View style = {styles.container}>
            <View style={{flexDirection:'row', width:'100%'}}>
                <View style={{marginRight: 16, marginBottom: 20}}>
                    <Text style={[styles.tHeadline1, { color: Colors.PRIMARY40 }]}>Tạo tài khoản</Text>
                    <Text style={[styles.tHeadline2, { color: Colors.BLACK60}]}
                    >Đăng kí để sử dụng </Text>
                </View>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 60,
                        height:60,
                    }}
                    source={require('@/../assets/Lottie/test.json')}
                />
            </View>
            <View style={{ alignItems:'center', justifyContent:'center', marginBottom: 24}}>
                <Input mx="3" placeholder="Tên" w="100%" size="lg" padding={4} marginBottom={4}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{ marginLeft: 16, marginRight: -3 }}><Icon name='personthin' size={28} color={Colors.BLACK60} /></View>}
                    value={info.name}
                    onChangeText={(val) => setInfo(info => ({ ...info, name: val }))}
                />
                <Input mx="3" placeholder="Địa chỉ email" w="100%" size="lg" padding={4} marginBottom={4}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{ marginLeft: 16, marginRight: 3 }}><Icon name='envelop' size={24} color={Colors.BLACK60} /></View>}
                    value={info.username}
                    onChangeText={(val) => setInfo(info => ({ ...info, username: val }))}
                />
                
                <Input mx="3" placeholder="Mật khẩu" w="100%" size="lg" padding={4} marginBottom={4}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{marginLeft: 16}}><Icon name = 'lock' size={26} color={Colors.BLACK60} /></View>}
                    rightElement={
                        <View style={{ marginRight: 10 }}>
                            <Pressable onPress={() => setIsShow({...isShow, pass1: !isShow.pass1})}>
                                {
                                    isShow.pass1 ?
                                    <Icon name='eye-notshow' size={24} color={Colors.PRIMARY40} />
                                        :
                                    <Icon name='eyeshow' size={24} color={Colors.PRIMARY40} />
                                }
                            </Pressable>
                            
                        </View>}
                    value={info.password}
                    type = {isShow.pass1 ? 'text' : 'password'}
                    onChangeText={(val) => setInfo(info => ({ ...info, password: val }))}
                />
                
                <Input mx="3" placeholder="Xác nhận mật khẩu" w="100%" size="lg" padding={4} marginBottom={2}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{marginLeft: 16}}><Icon name = 'lock' size={26} color={Colors.BLACK60} /></View>}
                    rightElement={
                        <View style={{ marginRight: 10 }}>
                            <Pressable onPress={() => setIsShow({ ...isShow, pass2: !isShow.pass2 })}>
                                {
                                    isShow.pass2 ?
                                    <Icon name='eye-notshow' size={24} color={Colors.PRIMARY40} />
                                        :
                                    <Icon name='eyeshow' size={24} color={Colors.PRIMARY40} />
                                }
                            </Pressable>
                        </View>
                    }
                    value={info.confirmPassword}
                    type={isShow.pass2 ? 'text' : 'password'}
                    onChangeText={(val) => setInfo(info => ({ ...info, confirmPassword: val }))}
                />

                <View style={{ flexDirection: 'row', alignItems:'flex-start'}}>
                    <Checkbox value="danger" colorScheme="green"
                        style={{ marginTop: 4, marginRight: 8, marginLeft: 12 }}
                        accessibilityLabel="Đồng ý với điều khoản sử dụng"
                        isChecked={info.isCheckVerify}
                        onChange={(val) => setInfo(info => ({ ...info, isCheckVerify: val }))}
                    />
                    <Pressable onPress={() => setInfo(info => ({ ...info, isCheckVerify: !info.isCheckVerify }))}>
                        <Text>
                            Bằng việc tiếp tục, bạn đã chấp nhận Điều khoản sử dụng của EasyBus
                        </Text>
                    </Pressable>
                </View>
            </View>

            <ButtonEB title='Đăng ký' onPress={handleSubmit}/>
                    
            <Text style={{
                textAlign: 'center',
                fontWeight: FontWeight.BODY_LARGE,
                fontSize: FontSize.BODY_LARGE,
                margin: 20
            }}>Hoặc tiếp tục với</Text>

            <View style={{flexDirection:'row', justifyContent:'space-between', width: '100%', marginBottom: 20}}>
                <Button width={'45%'} bg={'#F8F8F8'} borderWidth={2} borderColor={'#DDDDDD'} paddingTop={2} paddingBottom={2}>
                    <Icon name='google' size={24} color={'black'} /> 
                </Button>
                <Button width={'45%'} bg={'#F8F8F8'} borderWidth={2} borderColor={'#DDDDDD'} paddingTop={2} paddingBottom={2}>
                    <Icon name='facebook' size={24} color={'black'} /> 
                </Button>
            </View>
            
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    active: {
        width: 12,
        height: 6,
        borderRadius: 4,
        backgroundColor: Colors.BLACK100,
        margin: 4
    },
    inactive: {
        width: 6,
        height: 6,
        borderRadius: 40,
        backgroundColor: Colors.BLACK30,
        margin: 4
    },
    tHeadline1: {
        fontSize: FontSize.HEADLINE1,
        fontWeight: FontWeight.HEADLINE1,
        lineHeight: FontSize.HEADLINE1 + 10,
    },
    tHeadline2: {
        fontSize: FontSize.HEADLINE2,
        fontWeight: FontWeight.HEADLINE2,
    },
    tBodyLarge: {
        fontWeight: FontWeight.BODY_LARGE,
        fontSize: FontSize.BODY_LARGE,       
    },
})