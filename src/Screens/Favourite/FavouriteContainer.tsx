import Header, { Status } from "@/Components/Header"
import { View, Text } from "react-native"

export default function FavouriteContainer() {
    return (
        <View>
            <View style = {{position:'relative'}}>
                <Header cover={Status.COVER2} leftTitle='Yêu thích' leftIconName='collection' logoShow={false} />
            </View>
        
            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 60,
                position: 'absolute',
                bottom: -20,
                borderWidth: 1, borderColor: 'black'
            }}>
                <View>
                    <Text>Trạm dừng</Text>
                </View>

                <View>
                    <Text>Tuyến xe</Text>
                </View>

            </View>
        
        </View>

    )
}