import Header, { Status } from "@/Components/Header"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { View, Image, Text} from "react-native"
import { SettingStackParamList } from "./SettingContainer"
import { FontSize } from "@/Theme/Variables"


type InfoAppNavigationProps = NativeStackScreenProps<
    SettingStackParamList,
    'InfoApp'
>


export default function InfoApp({route, navigation}: InfoAppNavigationProps) {
    return (
        <View>
            <Header cover={Status.COVER2} leftTitle="Back" leftIconName="back" logoShow={false} navigation={navigation} isProfileScreen />
        
            <View style={{
                backgroundColor: '#f0f0f0',
                margin: 20,
                borderRadius: 10,
                padding: 10,
            }}>
                <View style = {{flexDirection:"row", alignItems:'flex-end'}}>
                    <Image
                        source={require('@/../assets/logo.png')}
                        style={{
                            width: 100,
                            height: 100,
                            marginRight: 10
                        }}
                        resizeMode="contain"
                    />
                    <View style = {{marginBottom: 20}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ fontSize: 16, fontWeight: '700' }}>
                                EasyBus

                            </Text>
                            <Text style={{ fontSize: 12, fontWeight:'400', marginLeft: 3}}>
                                    v1.0623
                            </Text>

                        </View>
                        
                        <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        Ứng dụng xe buýt thông minh
                        </Text>
                    </View>
                    
                </View>
                <View style = {{margin: 6}}>
                    <Text style = {{fontSize: 11, color:'#4d4d4d', marginBottom: 5}}>
                        Ứng dụng được phát triển bởi @2013827 @2014914
                    </Text>
                    <Text style = {{fontSize: 11, color:'#4d4d4d'}}>
                        Phát triển ứng dụng trên thiết bị di động.
                    </Text>
                    <Text style = {{fontSize: 11, color:'#4d4d4d', marginBottom: 5}}>
                        Khoa Khoa học và Kĩ thuật máy tính - ĐH Bách Khoa TP.HCM
                    </Text>

                </View>
            </View>
        </View>
    )
}