import { Icon } from "@/Theme/Icon/Icon"
import { Colors, FontSize, FontWeight } from "@/Theme/Variables"
import { View, Image, Dimensions, Text } from "react-native"
export default function Header() {
    console.log(Dimensions.get('window').width, Dimensions.get('window').width / 3.5)
    return (
        <View style={{width:Dimensions.get('window').width, height: Dimensions.get('window').width / 3.5 + 36}}>
            <Image
                source={require('@/../assets/image/cover2.png')}
                style={{
                    position: 'relative',
                    zIndex: 5,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').width / 3.5,
                    top: 36
                }}
            />

            <View style={{
                zIndex: 6, alignItems: 'center', position: 'absolute',
                justifyContent: 'center', width: 40, height: 40,
                borderRadius: 40, backgroundColor: Colors.PRIMARY40,
                top: 36, right: 0,
                margin: 10
            }}>
                <Icon name='person' size={20} color = 'black'/>
            </View>


            <View style={{
                zIndex: 6, alignItems: 'center', position: 'absolute', flexDirection: 'row',
                backgroundColor: Colors.PRIMARY40, padding: 4,
                top: 36, margin: 10, borderRadius: 7
            }} >
                <Icon name='location' size={14} color = 'black' />
                <Text style={{
                    fontSize: FontSize.BODY_SMALL2,
                    fontWeight: FontWeight.BODY_SMALL2
                }}>TP. Hồ Chí Minh</Text>
            </View>
        </View>
    )
}