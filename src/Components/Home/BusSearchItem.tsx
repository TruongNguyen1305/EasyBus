import {View, Text, TouchableOpacity} from 'react-native'
import BusIconContainer from './BusIconContainer';
import { useAppSelector } from '@/Hooks/redux';
import { Icon } from '@/Theme/Icon/Icon';
import { Colors } from '@/Theme/Variables';
interface IBusSearch {
    busNo: string;
    busName: string;
    onClickHeart?: () => void
}

export default function BusSearchItem(props: IBusSearch) {
    const user = useAppSelector(state => state.user.user)
    console.log(user)
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 10,
        }}>
            <View style = {{flexDirection:'row', alignItems:'center'}}>
                <BusIconContainer busnum={props.busNo} />
                <Text style={{
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 14,
                    fontWeight: '600',
                    maxWidth: 220,
                }}>{props.busName}
                </Text>
            </View>
            
            {
                user.favouriteBus.includes(props.busNo) ?
                    (
                        props.onClickHeart ?
                        <TouchableOpacity
                            onPress = {() => props.onClickHeart && props.onClickHeart()}
                        >
                            <View style={{position:'relative', top: 12}}>
                            <Icon name='heart' size={22} color={Colors.PRIMARY40} />
                            </View>
                            <View style={{top:-12}}>
                            <Icon name='heart-o' size={24} color={'#262626'} />
                            </View>
                        </TouchableOpacity>
                        :
                        <View>
                            <View style={{position:'relative', top: 12}}>
                            <Icon name='heart' size={22} color={Colors.PRIMARY40} />
                            </View>
                            <View style={{top:-12}}>
                            <Icon name='heart-o' size={24} color={'#262626'} />
                            </View>
                        </View>
                    )
                    : (
                        props.onClickHeart ? 
                        <TouchableOpacity
                            onPress = {() => props.onClickHeart && props.onClickHeart()}
                        >
                            <Icon name='heart-o' size={23} color='black' />
                        </TouchableOpacity>
                            :
                        <View>
                            <Icon name='heart-o' size={23} color='black' />
                        </View>    
                    )
            }




        </View>
    )
}

