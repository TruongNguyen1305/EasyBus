import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import BusIconContainer from "./BusIconContainer";
import { Icon } from "@/Theme/Icon/Icon";

interface IHintProps {
    buses: string[],
    distances: string[],
    minutes: string
}


export function Hint(props: IHintProps) {
    return ( 
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                }}>
                    {props.buses.map((bus, index) => {
                        if(index !== props.buses.length - 1) {
                            return (
                                <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <BusIconContainer busnum={bus} />
                                    <View style={styles.dot}></View>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <BusIconContainer busnum={bus} />
                                </View>
                            )
                        }
                    })}
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={styles.price}>
                        <Text style={{color: Colors.SECONDARY100}}>{5*props.buses.length}k đ</Text>
                    </View>
                    <View style={{marginLeft: 10}}> 
                        <Text style={{color: Colors.PRIMARY100, fontSize: FontSize.HEADLINE4, fontWeight: FontWeight.HEADLINE4}}>{props.minutes}</Text>
                        <Text style={{ color: Colors.PRIMARY80, fontSize: FontSize.SUBTITLES_SMALL, fontWeight: FontWeight.SUBTITLES_SMALL }}>phút</Text>
                    </View>
                </View>
            </View>
            <View style={styles.content}> 
                <View style={{flexDirection: "row"}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems:"center"
                    }}>
                        <Icon name="run" color={Colors.BLACK60} size={20}/>
                        <Text style={{ color: Colors.BLACK60, fontSize: FontSize.SUBTITLES_SMALL, fontWeight: FontWeight.SUBTITLES_SMALL }}>{props.distances[0]} km</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        marginLeft: 10
                    }}>
                        <Icon name="bus-sharp" color={Colors.BLACK60} size={20} />
                        <Text style={{ color: Colors.BLACK60, fontSize: FontSize.SUBTITLES_SMALL, fontWeight: FontWeight.SUBTITLES_SMALL }}>{props.distances[1]} km</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <Icon name='clock' color={Colors.BLACK60} size={24}/>
                    <Text  style={{color: Colors.PRIMARY80, fontSize: FontSize.SUBTITLES_SMALL, fontWeight: FontWeight.SUBTITLES_SMALL, marginLeft: 2}}>Xe tới trong 5 phút </Text>
                    <Text style={{ color: Colors.BLACK60, fontSize: FontSize.SUBTITLES_SMALL, fontWeight: FontWeight.SUBTITLES_SMALL }}>tại trạm Bến Xe Buýt ĐH Quốc Gia...</Text>
                </View>
            </View>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.PRIMARY40,
        // height: 120,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        marginTop: 10,
        width: '100%'
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: Colors.BLACK60,
        borderRadius: 100,
        marginLeft: 3
    },
    price: {
        borderRadius: 15,
        borderColor:Colors.SECONDARY100,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
    }
})
