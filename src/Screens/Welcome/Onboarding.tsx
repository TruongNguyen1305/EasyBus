import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import LottieView from 'lottie-react-native';
import { Colors } from "@/Theme/Variables";
import { Button } from "native-base";
import { Icon } from "@/Theme/Icon/Icon";
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { Slider } from "@/Components";
const data = [
    {
        title: "EasyBus - Đi xe buýt chưa bao giờ dễ dàng đến thế!",
        desc: "Chào mừng bạn đến với EasyBus! Giải pháp giúp bạn tìm kiếm và lựa chọn tuyến xe buýt phù hợp với nhu cầu di chuyển một cách đơn giản nhất.",
        lottie: require("@/../assets/Lottie/easybus.json"),
        lw: 250,
        lh: 250,
    },
    {
        title: "Tra cứu thông tin bản đồ",
        desc: "Tra cứu thông minh thông tin các tuyến xe buýt, trạm dừng, nhà chờ. Đánh dấu theo dõi các tuyến, các trạm để thuẩn tiện theo dõi.",
        lottie: require("@/../assets/Lottie/location.json"),
        lw: 300,
        lh: 300,
    },
    {
        title: "Thanh toán vé xe buýt tiện lợi",
        desc: "Thanh toán nhanh chóng chỉ với 3 bước đơn giản. Mở ứng dụng, chọn thanh toán và quét mã QR code",
        lottie: require("@/../assets/Lottie/payment.json"),
        lw: 300,
        lh: 300,
    },
    {
        title: "Nâng cao trải nghiệm",
        desc: " Để lại đánh giá sau khi sử dụng dịch vụ. Mỗi đóng góp ý kiến của bạn sẽ là động lực để chúng tôi cải thiện dịch vụ và mang lại trải nghiệm tốt hơn.",
        lottie: require("@/../assets/Lottie/rating.json"),
        lw: 270,
        lh: 270,
    }
]


type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

export const Onboarding = ({navigation} : OnboardingScreenNavigatorProps) => {
    const [obIndex, setObIndex] = useState(0)
    const [intro, setIntro] = useState()


    const animation = useRef(null);

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'flex-end', height: 30}}>
                {
                    obIndex < data.length - 1 ?
                    <Pressable onPress={() => setObIndex(data.length - 1)}>
                        <Text style = {styles.title}>Skip</Text>
                    </Pressable>
                    : null    
                }
            </View>
            
            <View style={{
                backgroundColor: Colors.SECONDARY20, width: 250, height: 250,
                borderRadius: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
                marginBottom: 20,
            }}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: data[obIndex].lw,
                        height: data[obIndex].lh,
                    }}
                    source={data[obIndex].lottie}
                />
            </View>
            <View style = {{height: 190, justifyContent:'space-between',alignItems:'center', marginBottom: 60}}>
                <View>
                    <Text style={[styles.title, { marginBottom: 4 }]}>{data[obIndex].title}</Text>
                    <Text style={styles.desc}>{data[obIndex].desc}</Text>
                </View>
                <Slider curIndex={obIndex} value={data.length} />
            </View>
            
            <View style={{flexDirection:'row-reverse', justifyContent:'space-between', width:'100%'}}>
                {
                    obIndex < 3 ?
                        <Button endIcon={<Icon name="right" size={25} color={Colors.WHITE} />}
                            size="lg" style={{ width: 58, height: 48, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => setObIndex(obIndex + 1)}
                            borderWidth={1}
                            bg={Colors.PRIMARY40}
                            borderColor={Colors.BLACK30}
                        >
                        </Button>
                    :
                        <View style={{ width: '100%'}}>
                        
                            
                        <Button 
                        size="lg" style={{ width: '100%', height: 48, alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => navigation.navigate(RootScreens.MAIN)}
                        _text={{        fontSize: 18,
                            fontWeight: '800',
                            textAlign: 'center',
                            marginTop: -1
                        }}
                        borderWidth={1}
                        bg={Colors.PRIMARY40}
                        borderColor={Colors.BLACK30}
                        > Bắt đầu
                        </Button>
                            
                        <Button 
                        size="lg" style={{ width: '100%', height: 48, alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => navigation.navigate(RootScreens.AUTH)}
                        _text={{        fontSize: 18,
                            fontWeight: '800',
                            textAlign: 'center',
                            marginTop: -1
                        }}
                        borderWidth={1}
                        bg={Colors.PRIMARY40}
                        borderColor={Colors.BLACK30}
                        > Đăng nhập
                        </Button>

                        </View>
                }

                {
                    obIndex > 0 && obIndex < 3 ?
                        <Button endIcon={<Icon name="left" size={25} color={Colors.BLACK60} />}
                            size="lg" style={{ width: 58, height: 48, alignItems: 'center', justifyContent: 'center' }}
                            borderWidth={1}
                            bg={Colors.SECONDARY20}
                            borderColor={Colors.BLACK30}
                            // colorScheme={"info"}
                            onPress = {() => setObIndex(obIndex - 1)}
                        >
                        </Button>
                        :
                        null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginTop: 60,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        textAlign:'center'
    },
    desc: {
        fontSize: 16,
        fontWeight: '400',
        textAlign:'center',
        color: Colors.BLACK60
    }
})
