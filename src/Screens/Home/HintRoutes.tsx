import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header, { Status } from "@/Components/Header";
import { Icon } from "@/Theme/Icon/Icon";
import { FontSize, FontWeight, Colors } from "@/Theme/Variables";
import { Divider, Input, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import { Hint } from "@/Components/Home/Hint";
import { Spinner } from "native-base";
import axios from "axios";
import { getStatusBarHeight } from "react-native-status-bar-height";

type HintRoutesNavigationProps = NativeStackScreenProps<
    HomeStackParamList,
    'HintRoutes'
>

export const getBusses = (title: string) => {
    if (title.includes('Đi các tuyến'))
        return title.slice(14).split(", ")
    return title.slice(10).split(", ")
}

const getDistances = (desc: string) => {
    return [
        desc.slice(desc.indexOf('bộ') + 4, desc.indexOf('km') - 1),
        desc.slice(desc.indexOf('buýt') + 6, desc.lastIndexOf('km') - 1)
    ]
}

const getMinutes = (data: any[])=> {
    return (data.reduce((acc, cur) => {
        return acc + (cur.Length - 0)
    }, 0) / 60).toFixed(1)
}

export function HintRoutes({route, navigation}: HintRoutesNavigationProps) {
    const [hintData, setHintData] = useState<any[]>([])
    const {startData, targetData} = route.params
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchHintData = async () => {
            setLoading(true)
            try {
                const {data} = await axios.get(`http://apicms.ebms.vn/pathfinding/getpathbystop/${startData.latitude},${startData.longitude}/${targetData.latitude},${targetData.longitude}/2`)
                setHintData(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                alert('Connection error')
            }
        }
        fetchHintData()
    }, [])

    //console.log(hintData.length)

    return (
        <View style={styles.container}>
            <Header cover={Status.COVER1} leftTitle="Back" leftIconName="back" logoShow navigation={navigation} />

            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Icon name='findroute' size={24} color={Colors.PRIMARY40} />
                    <Text style={styles.title}>Tìm đường</Text>
                </View>

                <View style={{ marginVertical: 5, width: '100%' }}>
                    <Divider thickness={2} width='100%' bg={Colors.BLACK30} orientation="horizontal" />
                </View>

                
                <View style={styles.form}>
                        <Input marginTop={2} size='sm' placeholder="Chọn nơi xuất phát" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                            InputLeftElement={
                                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                    <Text style={styles.inputTitle}>Đi từ</Text>
                                    <Icon name='target' size={22} color={Colors.PRIMARY40} />
                                </View>
                            }
                            value={route.params.startData.name}
                            onPressIn={() => navigation.goBack()}
                        />

                        <Input marginTop={2} size='sm' placeholder="Chọn điểm đến" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                            InputLeftElement={
                                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                    <Text style={styles.inputTitle}>Đến</Text>
                                    <Icon name='location' size={22} color={Colors.PRIMARY40} />
                                </View>
                            }
                            value={route.params.targetData.name}
                            onPressIn={() => navigation.goBack()}
                        />
                </View>
            </View>
            <View style={styles.hintsContainer}>
                 <Text
                    style={{
                        fontSize: FontSize.HEADLINE4,
                        fontWeight: FontWeight.HEADLINE4,
                        color: Colors.BLACK100,
                        width: Dimensions.get('window').width - 40,
                        alignSelf: 'center'
                    }}
                 >
                    Gợi ý các cách di chuyển
                 </Text>

                {loading ? (
                    <Spinner size='lg' color="emerald.500" accessibilityLabel="Loading"/>
                 ) : (
                    hintData.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.hints} >
                            {hintData.map((item, idx) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Guide', {data: item, startData: route.params.startData, targetData: route.params.targetData})} key={idx}>
                                    <Hint buses={getBusses(item.Title)} distances={getDistances(item.Desc)} minutes={getMinutes(item.detail)}/>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ) : (
                        <Text
                            style={{
                                fontSize: FontSize.BODY_LARGE, 
                                fontWeight: FontWeight.BODY_LARGE, 
                                color: Colors.BLACK60,
                                alignSelf: 'center',
                                marginTop: 20
                            }}
                        >
                            Không tìm thấy cách di chuyển
                        </Text>
                    )  
                 )}

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        position: 'relative',
    },
    modalContainer: {
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 40,
        position: 'absolute',
        top: Dimensions.get('window').width / 3.5 - 30 + getStatusBarHeight(),
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.BUTTON_NORMAL,
        fontWeight: FontWeight.BUTTON_SMALL,
        marginLeft: 5
    },
    form: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    inputTitle: {
        fontSize: FontSize.BUTTON_NORMAL,
        fontWeight: FontWeight.BUTTON_NORMAL,
        color: Colors.BLACK60,
        width: 40
    },
    hintsContainer: {
        marginTop: 5,
        paddingVertical: 148,
        width: Dimensions.get('window').width,
        alignSelf: 'center',
    },

    hints: {
        paddingHorizontal: 20,
    }
})