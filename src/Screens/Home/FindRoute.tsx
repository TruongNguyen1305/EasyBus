import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header, { Status } from "@/Components/Header";
import MapView from "react-native-maps";
import { Icon } from "@/Theme/Icon/Icon";
import { FontSize, FontWeight, Colors } from "@/Theme/Variables";
import { Button, Divider, Input, Pressable, ScrollView } from "native-base";
import Busstop from "@/Components/Home/Busstop";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce, set } from "lodash";
import BusSearchItem from "@/Components/Home/BusSearchItem";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { CLEAR_HISTORY, UPDATE_HISTORY } from "@/Store/reducers";
import * as Location from 'expo-location';


type FindRouteNavigationProps = NativeStackScreenProps<
    HomeStackParamList,
    'FindRoute'
>
export function FindRoute({ route, navigation }: FindRouteNavigationProps) {
    const { historySearch } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState(route.params.status)
    const [busData, setBusData] = useState<any[]>([])
    const [resultData, setResultData] = useState<any[]>([])
    const [input, setInput] = useState('')

    //Find route part
    const [location, setLocation] = useState<any>()

    const [startInput, setStartInput] = useState("")
    const [startData, setStartData] = useState<any>()

    const [targetInput, setTargetInput] = useState(route.params.target ? route.params.target.Name : "")
    const [targetData, setTargetData] = useState<any>()

    const [isStartInputFocused, setIsStartInputFocused] = useState(false)


    useEffect(() => {
        const fetchBusData =  async () => {
            let endpoint = route.params.status === 'LookUp' ? "getallroute" : "getstopsinbounds/106/10/107/11"
            axios.get(`http://apicms.ebms.vn/businfo/${endpoint}`)
                .then(res => setBusData(res.data))
                .catch(err => console.log(err))
        }
        const fetchLocation = async () => {
            const { status } = await Location.getForegroundPermissionsAsync()
            if (status === Location.PermissionStatus.GRANTED) {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                setStartInput('Vị trí hiện tại')
                setStartData({
                    name: "Vị trí hiện tại",
                    latitude: location.coords.latitude,
                    longtitude: location.coords.longitude
                })
            }
        }
        fetchBusData()
        fetchLocation()
    }, [])

    const handleChangeSearchText = route.params.status === "LookUp" ? (text: string) => { 
        setInput(text)
        if(text === ""){
            setResultData([])
            return
        }
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
    } : (text: string) => {
        if(isStartInputFocused){
            setStartInput(text)
        }
        else{
            setTargetInput(text)
        }
        if (text === "") {
            setResultData([])
            return
        }
        const newResult: any[] = []

        busData && busData.map((item, index) => {
            if (item.Search.includes(text)) {
                newResult.unshift(item)
            }
            else {
                const curStr = (item.Name + " " + item.Street + " " + item.Zone).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                                                                                                    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
                if (curStr.includes(text.toLowerCase())) {
                    newResult.push(item)
                }
            }

        })
        setResultData(newResult)
    }

    const handleFindRoute = async () => {
        console.log(startData)
        console.log(targetData)
        navigation.navigate('HintRoutes', {
            startData,
            targetData
        })
    }

    

    // console.log(input, resultData)
    
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

                            <View>
                                <Text style={{
                                    marginTop: 10,
                                    fontSize: FontSize.BODY_SMALL2,
                                    fontWeight: FontWeight.BODY_SMALL2,
                                    color: Colors.BLACK60,
                                    textAlign: 'center'
                                }}>
                                    {input !== "" ? 'Kết quả tìm kiếm' : 'Lịch sử tìm kiếm'}
                                </Text>
                                {input === "" && (
                                    <TouchableOpacity style={{
                                        alignSelf: 'flex-end',
                                        backgroundColor: Colors.SECONDARY20,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        borderRadius: 10
                                    }}
                                        onPress={() => {
                                            dispatch(CLEAR_HISTORY({}))
                                        }}
                                    >
                                        <Text style={{
                                            color: Colors.BLACK60,
                                            fontSize: FontSize.BUTTON_SMALL,
                                            fontWeight: FontWeight.BUTTON_SMALL,
                                        }}
                                        >
                                            Xóa lịch sử
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        
                        <ScrollView
                            style={styles.routesContainer}
                            showsVerticalScrollIndicator={false}
                            marginBottom={3}
                        >
                            {input === "" ?
                                 historySearch && historySearch.map((item, index) => (
                                    <TouchableOpacity key={index} style={{
                                        justifyContent: 'center',
                                        marginVertical: 8,
                                        marginBottom: index == historySearch.length - 1 ? 10 : 8,
                                    }}
                                        onPress={() => {
                                            dispatch(UPDATE_HISTORY({search: item}))
                                            console.log(item.RouteId)
                                        }}
                                    >
                                        <BusSearchItem busName={item.RouteName} busNo={item.RouteNo} />
                                        {
                                            index != historySearch.length - 1 && <Divider marginTop={4} />
                                        }
                                    </TouchableOpacity>
                                ))
                            : 
                                resultData.map((item, index) => (
                                    <TouchableOpacity key={index} style={{
                                        justifyContent: 'center',
                                        marginVertical: 8,
                                        marginBottom: index == resultData.length - 1 ? 10 : 8,
                                    }}
                                        onPress={() => {
                                            dispatch(UPDATE_HISTORY({ search: item }))
                                            console.log(item.RouteId)
                                        }}
                                    >
                                        <BusSearchItem busName={item.RouteName} busNo={item.RouteNo} />
                                        {
                                            index != resultData.length - 1 && <Divider marginTop={4} />
                                        }
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </>
                ) : (
                    <>
                        <View style={styles.form}>
                            <Input marginTop={2} size='sm' placeholder="Chọn điểm xuất phát" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                                InputLeftElement={
                                    <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                        <Text style={styles.inputTitle}>Đi từ</Text>
                                        <Icon name='target' size={22} color={Colors.PRIMARY40} />
                                    </View>
                                }
                                onFocus={() => {
                                    setIsStartInputFocused(true)
                                    setStartInput("")
                                    setStartData(null)
                                    setResultData([])
                                }}
                                defaultValue={startInput}
                                onChangeText={debounce(handleChangeSearchText, 500)}
                            />
                        
                            <Input marginTop={2} size='sm' placeholder="Chọn điểm đến" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                                InputLeftElement={
                                    <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                        <Text style={styles.inputTitle}>Đến</Text>
                                        <Icon name='location' size={22} color={Colors.PRIMARY40} />
                                    </View>
                                }
                                onFocus={() => {
                                    setIsStartInputFocused(false)
                                    setTargetInput("")
                                    setTargetData(null)
                                    setResultData([])
                                }}
                                defaultValue={targetInput === "" ? undefined : targetInput}
                                onChangeText={debounce(handleChangeSearchText, 500)}
                            />
                        
                            <Button style={[styles.submitBtn, { backgroundColor: (startData && targetData) ? Colors.PRIMARY40 : Colors.PRIMARY20}]}
                                disabled={!startData || !targetData}
                                onPress={handleFindRoute}
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

                        {resultData.length > 0 && (
                                <View style={{ height: 320 }} >
                                    <FlatList
                                        data={resultData}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={{ paddingHorizontal: 20 }}
                                                onPress={() => {
                                                    if (isStartInputFocused) {
                                                        setStartData({
                                                            name: item.Name,
                                                            latitude: item.Lat,
                                                            longtitude: item.Lng
                                                        })
                                                        setStartInput(item.Name)
                                                    }
                                                    else {
                                                        setTargetData({
                                                            name: item.Name,
                                                            latitude: item.Lat,
                                                            longtitude: item.Lng
                                                        })
                                                        setTargetInput(item.Name)
                                                    }
                                                    setResultData([])
                                                }}
                                            >
                                                <Busstop name={item.Name} address={item.AddressNo}
                                                    buslist={item.Routes}
                                                    street={item.Street} zone={item.Zone}
                                                    onPressHeart={() => {
                                                        console.log('cc')
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={item => item.StopId}
                                        maxToRenderPerBatch={3}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>
                        )}
                    </>
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
        maxHeight: 300,
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
        marginVertical: 10,
        width: 150
    },
    map: {
        width: '100%',
        height: '100%'
    }
})
