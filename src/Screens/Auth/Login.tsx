import React, { useState, useRef } from 'react'
import { Button, Pressable, Text, View } from "native-base";
import { StyleSheet } from 'react-native'

import { Input } from "native-base";
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight} from '@/Theme/Variables';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Progress, Box, Center } from "native-base";
import { AuthStackParamList } from '@/Navigation/Auth';
import LottieView from 'lottie-react-native';

type AuthScreenNavigatorProps = NativeStackScreenProps<
    AuthStackParamList
>;

export const Login = ({ navigation }: AuthScreenNavigatorProps) => {
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    
    const animation = useRef(null)
    return (
        <View style = {styles.container}>
            <View style={{
                width: 350, height: 259, backgroundColor: Colors.SECONDARY20, borderRadius: 24, justifyContent: 'center', alignItems:'center', marginBottom: 10
            }}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 150,
                    height: 150,
                    // position: 'relative',
                    backgroundColor: Colors.SECONDARY20,
                    marginBottom: 6
                }}
                source={require('@/../assets/Lottie/test.json')}
            />
            </View>

            <Text style={{
                fontSize: FontSize.HEADLINE1, fontWeight: FontWeight.HEADLINE1, lineHeight: FontSize.HEADLINE1 + 10,color: Colors.PRIMARY40
            }}
            >Xin chào</Text>
            <Text style={{
                fontSize: FontSize.HEADLINE2, fontWeight: FontWeight.HEADLINE2, color: Colors.BLACK60, margin: 10
            }}>Hãy đăng nhập để tiếp tục !</Text>
        
            <View>
                <Input mx="3" placeholder="Địa chỉ email" w="100%" size="lg" padding={4} marginBottom={4}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{marginLeft: 10}}><Icon name = 'envelop' size={24} color='black'/></View>}
                />
                <Input mx="3" placeholder="Mật khẩu" w="100%" size="lg" padding={4} marginBottom={4}
                    borderRadius={10} borderWidth={0} backgroundColor={'#F8F8F8'}
                    leftElement={<View style={{marginLeft: 10}}><Icon name = 'lock' size={24} color='black'/></View>}
                    rightElement={<View style={{marginRight: 10}}><Icon name = 'eyeshow' size={24} color='black'/></View>}
                />
                <View>
                    <Pressable>
                        <Text style={{
                            fontSize: FontSize.BODY_LARGE,
                            fontWeight: FontWeight.BODY_LARGE,
                            color: Colors.PRIMARY40
                        }}>Quên mật khẩu?</Text>
                    </Pressable>
                </View>
            </View>

            <Button>Đăng nhập</Button>

            <Text style={{
                textAlign: 'center',
                fontWeight: FontWeight.BODY_LARGE,
                fontSize: FontSize.BODY_LARGE,
            }}>Hoặc tiếp tục với</Text>
            <Text style={{
                textAlign: 'center',
                fontWeight: FontWeight.BODY_LARGE,
                fontSize: FontSize.BODY_LARGE,                
            }}>Bạn chưa có tài khoản?
                <Pressable>
                    <Text style={{ color: Colors.PRIMARY40, fontWeight: FontWeight.BODY_LARGE,
                        fontSize: FontSize.BODY_LARGE,
                        margin:'auto'
                    }}>Đăng ký ngay!</Text>
                </Pressable>
            </Text>


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

})