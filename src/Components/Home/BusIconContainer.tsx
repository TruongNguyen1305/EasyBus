import { View, Text } from 'react-native'
import { Icon } from '@/Theme/Icon/Icon'
import { Colors, FontSize, FontWeight } from '@/Theme/Variables'

interface IBusIconContainerProps {
    busnum: string;
}

const colorOfContainer = (busnum: string)  =>  { 
    if (busnum == '50') return Colors.PRIMARY100
    else if (busnum == '99') return Colors.RED60
    else return Colors.SECONDARY80
}

export default function BusIconContainer(props: IBusIconContainerProps) {
    return (
        <View style={{
            backgroundColor: colorOfContainer(props.busnum), width: 42, height: 36,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 10,
            marginLeft: 4
        }}>
            <Icon name='bus' size = {20} color = 'white' />
            <Text style={{
                fontSize: 14,
                fontWeight: FontWeight.BUTTON_SMALL1,
                color: 'white',
                // marginLeft: 2,
                top: -6
            }}>{props.busnum}</Text>
        </View>
    )
}