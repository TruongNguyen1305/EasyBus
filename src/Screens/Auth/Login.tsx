import React, { useState, useRef } from 'react'
import { Button, Pressable, Text, View } from "native-base";
import { StyleSheet } from 'react-native'

import { Input } from "native-base";
import { Icon as IconNative } from 'native-base';
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight} from '@/Theme/Variables';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/Navigation/Auth';
import LottieView from 'lottie-react-native';
import ButtonEB from '@/Components/ButtonEB';


type AuthScreenNavigatorProps = NativeStackScreenProps<
    AuthStackParamList
>;

export const Login = ({ navigation }: AuthScreenNavigatorProps) => {
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    
    const [isShow, setIsShow] = useState(false)

    const animation = useRef(null)

    const handleClickShow = () => {
        setIsShow(!isShow)
    }

    console.log(isShow)
    return (
        <View style = {styles.container}>
            <View style={styles.containnerLottie}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={styles.lottie}
                    source={require('@/../assets/Lottie/test.json')}
                />
            </View>

            <Text style={[styles.tHeadline1, { color: Colors.PRIMARY40 }]}>Xin chào</Text>
            <Text style={[styles.tHeadline2, { color: Colors.BLACK60, margin: 10 }]}
            >Hãy đăng nhập để tiếp tục !</Text>
        
            <View>
                <Input mx="3" placeholder="Địa chỉ email" w="100%" size="lg" padding={4} marginBottom={4}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{ marginLeft: 16, marginRight: 3 }}><Icon name='envelop' size={24} color={Colors.BLACK60} /></View>}
                    value={data.username}
                    onChangeText={(val) => setData({ ...data, username: val })}
                />
                <Input mx="3" placeholder="Mật khẩu" w="100%" size="lg" padding={4} marginBottom={2}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{marginLeft: 16}}><Icon name = 'lock' size={26} color={Colors.BLACK60} /></View>}
                    rightElement={
                        <View style={{ marginRight: 10 }}>
                            <Pressable onPress = {handleClickShow}>
                                {
                                    isShow ?
                                    <Icon name='eye-notshow' size={24} color={Colors.PRIMARY40} />
                                        :
                                    <Icon name='eyeshow' size={24} color={Colors.PRIMARY40} />
                                }
                            </Pressable>
                        </View>}
                    value={data.password}
                    type={isShow ? 'text' : 'password'}
                    onChangeText={(val) => setData({ ...data, password: val })}
                />
                <View style={{marginLeft: 20}}>
                    <Pressable>
                        <Text style={{
                            fontSize: FontSize.BODY_LARGE,
                            fontWeight: FontWeight.BODY_LARGE,
                            color: Colors.PRIMARY40,
                            marginBottom: 10
                        }}>Quên mật khẩu?</Text>
                    </Pressable>
                </View>
            </View>

            <ButtonEB title='Đăng nhập' onPress={() => alert(data.password + data.username)}/>

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
            
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.tBodyLarge, { textAlign: 'center' }]}>Bạn chưa có tài khoản? </Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text
                        style={[styles.tBodyLarge, {textAlign: 'center', color: Colors.PRIMARY40}]}
                    >Đăng ký ngay !</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    containnerLottie: {
        width: 350,
        height: 259,
        backgroundColor: Colors.SECONDARY20,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    lottie: {
        width: 150,
        height: 150,
        // position: 'relative',
        backgroundColor: Colors.SECONDARY20,
        marginBottom: 6
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
    }
})