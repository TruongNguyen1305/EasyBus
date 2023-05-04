import { View, Text } from "react-native"
import { Icon } from "@/Theme/Icon/Icon"
import { FontSize, FontWeight, Colors } from "@/Theme/Variables"
import BusIconContainer from "./BusIconContainer"
import { Divider } from "native-base"

interface IBusstopProps {
    buslist: number[];
}

export default function Busstop(props: IBusstopProps) {
    return (
        <>
        <View style={{flexDirection:'row'}}>
            <View style={{width:'10%'}}>
                <Icon name='busstop' size = {24} color = 'black' />
            </View>

            <View style={{
                width: '80%'
            }}>
                <Text style={{
                    fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_SMALL
                }}>Đại học Bách Khoa - Cơ sở 2</Text>
                <Text style={{
                    fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL,
                    color: Colors.BLACK60
                }}
                >Khu đô thị Đại học Quốc Gia TP. HCM,  Thủ Đức, TP. HCM</Text>
                <View style={{ flexDirection: 'row', marginTop: 4, flexWrap:'wrap'}}>
                    {
                        props.buslist.map((busnum, index) => (
                            <BusIconContainer key={index} busnum={busnum} />
                        ))       
                    }
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