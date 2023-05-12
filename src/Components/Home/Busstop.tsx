import { View, Text } from "react-native"
import { Icon } from "@/Theme/Icon/Icon"
import { FontSize, FontWeight, Colors } from "@/Theme/Variables"
import BusIconContainer from "./BusIconContainer"
import { Divider } from "native-base"

interface IBusstopProps {
    name: string;
    address: string;
    buslist: string;
    street: string;
    zone: string
}

export default function Busstop(props: IBusstopProps) {
    const buslist = props.buslist.split(', ')
    return (
        <>
        <View style={{flexDirection:'row'}}>
            <View style={{width:'10%'}}>
                <Icon name='busstop' size = {24} color = 'black' />
            </View>

            <View style={{
                width: '90%'
            }}>
                <View style={{width:'100%', flexDirection:'row'}}>
                    <View style = {{width:'90%'}}>
                        <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_SMALL }}>
                            {props.name}
                        </Text>
                        <Text style={{
                            fontSize: FontSize.BODY_SMALL1, fontWeight: FontWeight.BODY_SMALL2,
                            color: Colors.BLACK60
                        }}>
                            {props.address}, {props.street}, {props.zone}
                        </Text>
                    </View>
                        <View style={{width:'10%', margin: 4}}>
                            <Icon name='heart' size = {22} color = {Colors.PRIMARY40} />
                        </View>     
                </View>
                    

                <View style={{ flexDirection: 'row', marginTop: 4, flexWrap:'wrap'}}>
                    {
                        buslist.map((busnum, index) => (
                            <BusIconContainer key={index} busnum={busnum} />
                        ))       
                    }
                </View>
            </View>
         
        </View>
            <Divider bg={Colors.BLACK30} thickness="1" mx="1"
                orientation="horizontal" marginY={3}
                marginX={10}
            />
        </>
    )
}