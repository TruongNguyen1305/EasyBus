import {View, Text} from 'react-native'
import BusIconContainer from './BusIconContainer';
interface IBusSearch {
    busNo: string;
    busName: string
}

export default function BusSearchItem(props: IBusSearch) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <BusIconContainer busnum={props.busNo} />
            <Text style={{
                marginLeft: 10,
                fontSize: 14,
                fontWeight: '600',
                maxWidth: 250,
            }}>{props.busName}</Text>
        </View>
    )
}

