import { View, Text, StyleSheet, Dimensions } from "react-native";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header, { Status } from "@/Components/Header";
import MapView from "react-native-maps";
import { Icon } from "@/Theme/Icon/Icon";
import { FontSize, FontWeight, Colors } from "@/Theme/Variables";
import { Button, Divider, Input, ScrollView } from "native-base";
import Busstop from "@/Components/Home/Busstop";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

type FindRouteNavigationProps = NativeStackScreenProps<
    HomeStackParamList,
    'FindRoute'
>



export function FindRoute({ route, navigation }: FindRouteNavigationProps) {
    const [status, setStatus] = useState(route.params.status)
    const [busData, setBusData] = useState<any[]>([])
    const [resultData, setResultData] = useState<any[]>([])
    const [input, setInput] = useState('')


    useEffect(() => {
        const fetchBusData = async () => {
            axios.get('http://apicms.ebms.vn/businfo/getallroute')
                .then(res => setBusData(res.data))
                .catch(err => console.log(err))
        }
        fetchBusData()
    }, [])

    const handleChangeSearchText = (text: string) => { 
        setInput(text)
        const newResult: any[] = []
        
        busData && busData.map((item, index) => {
            if (item.RouteNo.includes(text)) {
                newResult.unshift(item)
            }
            else {
                const curStr = item.RouteName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (curStr.includes(text) || item.RouteName.includes(text)) {
                    newResult.push(item)
                }
            }

        })

        setResultData(newResult)
    }

    console.log(input, resultData)
    
    return ( 
        <View style={styles.container}> 
            <Header cover={Status.COVER1} leftTitle="Back" leftIconName="back" logoShow navigation={navigation}/>
            
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Icon name={status === 'FindRoute' ? 'findroute' : 'magnifying' } size={24} color={Colors.PRIMARY40} />
                    <Text style={styles.title}>{status === 'FindRoute' ? 'Tìm đường' : 'Tra cứu'  }</Text>
                </View>

                <View style={{marginVertical: 5, width: '100%'}}>
                    <Divider thickness={2}  width='100%' bg={Colors.BLACK30} orientation="horizontal" />
                </View>

                {status !== 'FindRoute' ? (
                    <>
                        <View style={styles.search}>
                            <Input placeholder="Nhập thông tin tuyến, trạm dừng" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                                InputLeftElement={<View style={{ marginLeft: 8 }}><Icon name='magnifying' size={22} color="white" /></View>}
                                onChangeText={debounce(handleChangeSearchText, 500)}
                            />

                            <Text style={{
                                marginTop: 10,
                                fontSize: FontSize.BODY_SMALL2,
                                fontWeight: FontWeight.BODY_SMALL2,
                                color: Colors.BLACK60,
                                textAlign: 'center'
                            }}>
                                Lịch sử tìm kiếm
                            </Text>
                        </View>

                        <ScrollView
                            style={styles.routesContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {resultData.map((item, index) => (
                                <Text>{item.RouteNo} {item.RouteName}</Text>
                            ))}
                        </ScrollView>
                    </>
                ) : (
                    <View style={styles.form}>
                        <Input marginTop={2} size='sm' placeholder="Chọn nơi xuất phát" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                            InputLeftElement={
                                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                    <Text style={styles.inputTitle}>Đi từ</Text>
                                    <Icon name='target' size={22} color={Colors.PRIMARY40} />
                                </View>
                            }
                        />

                        <Input marginTop={2} size='sm' placeholder="Chọn điểm đến" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                            InputLeftElement={
                                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                    <Text style={styles.inputTitle}>Đến</Text>
                                    <Icon name='location' size={22} color={Colors.PRIMARY40} />
                                </View>
                            }
                        />

                        <Button style={styles.submitBtn}
                            onPress={() => navigation.navigate('HintRoutes')}
                        >
                            <Text 
                                style={{color: "white", 
                                    fontSize: FontSize.BUTTON_NORMAL, 
                                    fontWeight: FontWeight.BUTTON_NORMAL}}
                            >
                                Tìm đường
                            </Text>
                        </Button>
                    </View>
                )}
            </View>

            <MapView 
                style={styles.map}
                region={{
                    latitude: 10.880035901459214,
                    longitude: 106.80625226368548,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SECONDARY20,
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
        top: 110,
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
    search: {
        width: '100%',
        paddingHorizontal: 20
    },
    routesContainer: {
        marginTop: 10,
        height: 300,
        paddingHorizontal: 15,
        paddingTop: 10
    },
    form: {
        alignItems: 'center',
        paddingHorizontal: 20
    },
    inputTitle: {
        fontSize: FontSize.BUTTON_NORMAL, 
        fontWeight: FontWeight.BUTTON_NORMAL, 
        color: Colors.BLACK60,
        width: 40
    },
    submitBtn: {
        backgroundColor: Colors.PRIMARY40,
        marginVertical: 10,
        width: 150
    },
    map: {
        width: '100%',
        height: '100%'
    }
})
