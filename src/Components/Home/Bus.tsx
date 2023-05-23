import { View, Text, TouchableOpacity } from "react-native"
import { Icon } from "@/Theme/Icon/Icon"
import { FontSize, FontWeight, Colors } from "@/Theme/Variables"
import BusIconContainer from "./BusIconContainer"
import { Divider,  } from "native-base"

interface IBusProps {
    RouteNo: string;
    RouteName: string;
    OperationTime: string;
    TimeOfTrip: string;
    Distance: number;
    Headway: string;
    Tickets: string[];
    onPressHeart?: () => void
}

export default function Bus(props: IBusProps) {
    console.log(props.Tickets)
    return (
        <>
        <View style={{flexDirection:'row'}}>
            <View style={{width:'20%'}}>
                <BusIconContainer busnum={props.RouteNo} />
            </View>

            <View style={{width: '70%'}}>
                <Text style={{
                    fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_SMALL
                }}>{props.RouteName}</Text>
                    

                <Text style={{
                    fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL
                }}>
                    Thời gian hoạt động: 
                    <Text style = {{fontWeight: FontWeight.BODY_SMALL1}}> {props.OperationTime}</Text>
                </Text>
                    
                <Text style={{
                    fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL
                }}>
                    Thời gian hành trình: 
                    <Text style = {{fontWeight: FontWeight.BODY_SMALL1}}> {props.TimeOfTrip}</Text>
                </Text>
                    
                <Text style={{
                    fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL
                }}>
                    Giãn cách chuyến: 
                    <Text style = {{fontWeight: FontWeight.BODY_SMALL1}}> {props.Headway}</Text>
                </Text>
                
                    
                <View style = {{flexDirection:'row', justifyContent:'space-between', marginTop: 4}}>
                        <View style={{alignItems:'center'}}>
                            <Text>Vé lượt</Text>
                            <Text style={{fontSize:12, fontWeight:'600'}}>{props.Tickets[0]}</Text>
                        </View>   
                        <Divider orientation="vertical"/>
                        <View style={{alignItems:'center'}}>
                            <Text>Vé HSSV</Text>
                            <Text style={{fontSize:12, fontWeight:'600'}}>{props.Tickets[1]}</Text>
                        </View>   
                        <Divider orientation="vertical"/>
                        <View style={{alignItems:'center'}}>
                            <Text>Vé tập</Text>
                            <Text style={{fontSize:12, fontWeight:'600'}}>{props.Tickets[2]}</Text>
                        </View>   
                </View>
            </View>
                <TouchableOpacity style={{ width: '10%' }}
                    onPress={() => props.onPressHeart && props.onPressHeart()}
                >
                <Icon name='heart' size = {22} color = {Colors.PRIMARY40} />
            </TouchableOpacity>         
        </View>
            <Divider bg={Colors.BLACK30} thickness="1" mx="1"
                orientation="horizontal" marginY={3}
                marginX={10}
            />
        </>
    )
}