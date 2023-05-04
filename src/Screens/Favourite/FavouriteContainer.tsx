import Header, { Status } from "@/Components/Header"
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import { Divider } from "native-base"
import { Colors } from "@/Theme/Variables"
import { Icon } from "@/Theme/Icon/Icon"
import { useState } from "react"
import { FontSize } from "@/Theme/Variables"
import { FontWeight } from "@/Theme/Variables"
import Busstop from "@/Components/Home/Busstop"
import Bus from "@/Components/Home/Bus"

enum Screen {
    BUSSTATION = 'BUSSTATION',
    BUS = 'BUS'
}

export default function FavouriteContainer() {
    const [screen, setScreen] = useState(Screen.BUSSTATION)

    return (
        <View>
            <View style = {{position:'relative'}}>
                <Header cover={Status.COVER2} leftTitle='Yêu thích' leftIconName='collection' logoShow={false} />
            </View>


            <View style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                height: 60,
                width:'100%',
                position: 'absolute',
                top: 130,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
                zIndex:20,
            }}>
                <TouchableOpacity style={{
                    marginLeft: 20,
                    width: Dimensions.get('window').width*0.5-20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: screen == Screen.BUSSTATION ? Colors.PRIMARY40 : 'white',
                    shadowColor: "#000",
                }}
                    onPress={() => setScreen(Screen.BUSSTATION)}
                >
                    <Icon name='busstop' size={24} color={Colors.BLACK100} />
                    <Text style = {{
                        fontSize: FontSize.BUTTON_NORMAL,
                        fontWeight: FontWeight.BUTTON_SMALL
                    }}>Trạm dừng</Text>

                </TouchableOpacity>
                <Divider orientation="vertical" />
                <TouchableOpacity style={{
                    marginRight: 20,
                    width: Dimensions.get('window').width*0.5-20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: screen == Screen.BUS ? Colors.PRIMARY40 : 'white',
                }}
                    onPress={() => setScreen(Screen.BUS)}
                >
                    <Icon name='bus' size={24} color={Colors.BLACK100} />
                    <Text style = {{
                        fontSize: FontSize.BUTTON_NORMAL,
                        fontWeight: FontWeight.BUTTON_SMALL
                    }}>Tuyến xe</Text>
                </TouchableOpacity>
            </View>

            

            {
                screen == Screen.BUSSTATION ?
                    <ScrollView style={{
                        margin: 30,
                        marginTop: 30,
                        paddingTop: 20
                    }}
                        showsVerticalScrollIndicator = {false}
                    >
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                        <Busstop buslist={[1,2,3]} />
                    </ScrollView>
                :
                    <ScrollView style={{
                        margin: 30,
                        marginTop: 30,
                        paddingTop: 20
                    }}
                        showsVerticalScrollIndicator = {false}
                    >
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                        <Bus busnum={50} />
                    </ScrollView>    
                    
            }
        

        </View>

    )
}