import { View, Text } from "react-native"
import { Icon } from "@/Theme/Icon/Icon"
import { FontSize, FontWeight, Colors } from "@/Theme/Variables"
import BusIconContainer from "./BusIconContainer"
import { Divider } from "native-base"

interface IBusProps {
    busnum: string;
}

export default function Bus(props: IBusProps) {
    return (
        <>
        <View style={{flexDirection:'row'}}>
            <View style={{width:'20%'}}>
                <BusIconContainer busnum={props.busnum} />
            </View>

            <View style={{width: '70%'}}>
                <Text style={{
                    fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_SMALL
                }}>Đại học Bách Khoa - Cơ sở 2</Text>
                    

                <Text style={{
                    fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL
                }}>
                    Thời gian hoạt động: 
                    <Text style = {{fontWeight: FontWeight.BODY_SMALL1}}> 04:00 - 19:00</Text>
                </Text>
                    
                <Text style={{
                    fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL
                }}>
                    Thời gian hành trình: 
                    <Text style = {{fontWeight: FontWeight.BODY_SMALL1}}> 50 phút</Text>
                </Text>
                
                    
                <View style = {{flexDirection:'row', justifyContent:'space-between', marginTop: 4}}>
                        <View>
                            <Text>Vé lượt</Text>
                            <Text>3.000đ</Text>
                        </View>   
                        <Divider orientation="vertical"/>
                        <View>
                            <Text>Vé lượt</Text>
                            <Text>3.000đ</Text>
                        </View>   
                        <Divider orientation="vertical"/>
                        <View>
                            <Text>Vé lượt</Text>
                            <Text>3.000đ</Text>
                        </View>   
                </View>
            </View>
            <View style={{width:'10%'}}>
                <Icon name='heart' size = {22} color = {Colors.PRIMARY40} />
            </View>         
        </View>
            <Divider bg={Colors.BLACK30} thickness="1" mx="1"
                orientation="horizontal" marginY={3}
                marginX={10}
            />
        </>
    )
}