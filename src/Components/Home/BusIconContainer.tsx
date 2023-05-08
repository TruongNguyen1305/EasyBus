import { View, Text } from 'react-native'
import { Icon } from '@/Theme/Icon/Icon'
import { Colors, FontSize, FontWeight } from '@/Theme/Variables'

interface IBusIconContainerProps {
    busnum: number;
}

const colorOfContainer = (busnum: number)  =>  { 
    if (busnum == 50) return Colors.PRIMARY100
    else if (busnum == 99) return Colors.RED60
    else return Colors.SECONDARY80
}

export default function BusIconContainer(props: IBusIconContainerProps) {
    return (
        <View style={{
            backgroundColor: colorOfContainer(props.busnum), width: 52, height: 24,
            flexDirection: 'row', alignItems:'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 3,
            marginTop: 6
        }}>
            <Icon name='bus' size = {20} color = 'white' />
            <Text style={{
                fontSize: 12,
                fontWeight: FontWeight.BUTTON_SMALL1,
                color: 'white',
                marginLeft: 5,
                top: -1
            }}>{props.busnum}</Text>
        </View>
    )
}