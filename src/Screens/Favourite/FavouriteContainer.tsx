import Header, { Status } from "@/Components/Header"
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Button, Divider, Modal, Skeleton, VStack } from "native-base"
import { Colors, FontSize, FontWeight } from "@/Theme/Variables"
import { Icon } from "@/Theme/Icon/Icon"
import { useEffect, useState } from "react"
import Busstop from "@/Components/Home/Busstop"
import Bus from "@/Components/Home/Bus"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { useUpdateFavouriteMutation } from "@/Services"
import { CHANGE_FAVOURITE } from "@/Store/reducers"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootScreens } from ".."
import { RootStackParamList } from "@/Navigation"
import Spinner from "react-native-loading-spinner-overlay/lib";
import { CompositeScreenProps, RouteProp, useFocusEffect } from "@react-navigation/native"
import React from "react"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { MainScreenParams } from "@/Navigation/Main"

enum Screen {
    STATION = 'STATION',
    BUS = 'BUS'
}

type RootScreenNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.MAIN
>
type BottomTabNavigation = BottomTabNavigationProp<MainScreenParams>;
type BottomTabRoute = RouteProp<MainScreenParams, keyof MainScreenParams>;
interface BottomTabNavigatorProps {
    navigation: BottomTabNavigation;
    route: BottomTabRoute;
}
type FavScreenProps = CompositeScreenProps<
    RootScreenNavigatorProps,
    BottomTabNavigatorProps
>;
export default function FavouriteContxainer({ route, navigation } : FavScreenProps) {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const [fetch] = useUpdateFavouriteMutation()
    const [screen, setScreen] = useState(Screen.STATION)
    const [station, setStation] = useState<any[]>([])
    const [bus, setBus] = useState<any[]>([])
    const [loading, setLoading] = useState({
        bus: true,
        station: true,
        clickLike: false,
    })
    const [openModalLogin, setOpenModalLogin] = useState(user.id == '')
    

    useEffect(() => {
        if (loading.station) fetchDataStation(true)
        else fetchDataStation()
    }, [user])

    useFocusEffect(
        React.useCallback(() => {
            if (user.id == '') setOpenModalLogin(true)
            else setOpenModalLogin(false)
            // Cleanup function (nếu cần)
            return () => {
            // Hàm này sẽ được gọi khi màn hình không còn được focus
            // Đây là nơi để hủy bỏ các event listener (nếu có)
          };
        }, [])
    )

    const handleClickHeartStation = async (StopId: string) => {
        if (user.id != '') {
            if (loading.clickLike) { 
                Alert.alert(
                    'Thông báo',
                    'Bạn đã thực hiện thao tác này quá nhanh, vui lòng thử lại trong giây lát.',
                    [
                      { text: 'OK', style: 'cancel' },
                    ],
                )
                return
            }
            loading.clickLike = true
            const newState = station.filter(item => item.StopId + '' != StopId)
            setStation(newState)
            const newStation = await fetch({ route: 'station', id: StopId + '' }).unwrap()
            const payload = { station: newStation, bus: user.favouriteBus }
            dispatch(CHANGE_FAVOURITE(payload))
            loading.clickLike = false
        }
    }
    const handleClickHeartBus = async (BusID: string) => {
        if (user.id != '') {
            // const station = await fetch({ route: 'bus', id: BusID + '' }).unwrap()
            const payload = { bus, station: user.favouriteBus }
            dispatch(CHANGE_FAVOURITE(payload))
        }
        fetchDataBus()
    }        
    const fetchDataBus = async (firstTime = false) => {
        const busData : any [] = []
        for (const item of user.favouriteBus) {
            try {
                const bus = await axios.get(`http://apicms.ebms.vn/businfo/getroutebyid/${item}`)
                busData.push(bus.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        setBus(busData)
        console.log("fetch data bus")
        if (firstTime) setLoading({ ...loading, bus: false })
    }

    const fetchDataStation = (firstTime = false) => {
        axios.get('http://apicms.ebms.vn/businfo/getstopsinbounds/106/10/107/11')
        .then(res => {
            const InfoBusStation: any[] = []
            res.data.map((item: any, index: number) => {
                if (user.id != '' && user.favouriteStation.includes(item.StopId+'')) { 
                    InfoBusStation.push(item)
                }
            })
            setStation(InfoBusStation)
            if (firstTime) setLoading({ ...loading, station: false })
        })
            .catch(err => console.log(err))
    }

    return (
        <View>
            <Modal isOpen={openModalLogin} onClose={() => { setOpenModalLogin(false);  navigation.navigate("HomeContainer")}}>
                <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Thông báo</Modal.Header>
                <Modal.Body>
                    Bạn cần phải đăng nhập để sử dụng tính năng này!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="subtle" colorScheme="blueGray" onPress={() => {
                        navigation.navigate(RootScreens.AUTH)
                    }}>
                        Đăng nhập tại đây
                    </Button>
                </Modal.Footer>
                </Modal.Content>
            </Modal>

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
                    backgroundColor: screen == Screen.STATION ? Colors.PRIMARY40 : 'white',
                    shadowColor: "#000",
                }}
                    onPress={() => setScreen(Screen.STATION)}
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
                screen == Screen.STATION ?
                    <ScrollView style={{
                        margin: 30,
                        marginTop: 30,
                        paddingTop: 20,
                        marginBottom: 60,
                    }}
                    showsVerticalScrollIndicator = {false}
                    >
                        
                        {
                            loading.station ? 
                                Array(4).fill(0).map((item, index) => (
                                        <VStack w="100%" maxW="400" borderWidth="1" space={2} overflow="hidden" rounded="md" _dark={{
                                            borderColor: "coolGray.500"
                                        }} _light={{
                                            borderColor: "coolGray.200"
                                        }}
                                        mb={3}
                                        key={index}
                                        >
                                            <Skeleton h="6" />
                                            <View style={{flexDirection:'row'}}>
                                                <Skeleton.Text px="4" my={2} w={'80%'} lines={1} ml={4} marginTop={0} />
                                                <View>
                                                <Skeleton size="7" w={7} rounded="full" ml={4}  />

                                                </View>
                                            </View>
                                            
                                            <Skeleton rounded="full" w={"88%"} mt={-2} mb={2} h="8" pl={9} pr={6} startColor="primary.100" />
                                        </VStack>
                                )
                            )
                            :
                            user.id != '' &&(
                                station.length == 0 ?
                                        <View style = {{width: '100%', alignItems:"center", justifyContent:"center", marginTop: 20}}>
                                            <Text>Bạn chưa có trạm dừng yêu thích nào!</Text>
                                        </View>
                                    :
                                    station.map((item, index) => (
                                    <View key={index}>
                                        <Busstop name={item.Name} address={item.AddressNo}
                                            buslist={item.Routes} street={item.Street} zone={item.Zone}
                                            onPressHeart={() => handleClickHeartStation(item.StopId+'')}    
                                        />                           
                                    </View>
                                    )
                            ))
                        }
                         
                    </ScrollView>
                :
                    <ScrollView style={{
                        margin: 30,
                        marginTop: 30,
                        paddingTop: 20
                    }}
                        showsVerticalScrollIndicator = {false}
                    >
                        
                        {
                            bus.length == 0 ?
                                <View style={{ width: '100%', alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                    <Text>Bạn chưa có tuyến xe yêu thích nào!</Text>
                                </View>
                            : 
                            bus.map((item, index) => (
                                <Bus RouteName={item.RouteName} RouteNo={item.RouteNo}
                                    OperationTime={item.OperationTime} TimeOfTrip={item.TimeOfTrip}
                                    Distance={item.Distance} Headway={item.Headway} key={index}
                                    Tickets={getFareTickets(item.Tickets)}
                                />
                            ))
                        }                        
                    </ScrollView>    
                    
            }

        </View>

    )
}


const getFareTickets = (myString: string) => {
    const myArrString = myString.split('<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp- ');
    if (myArrString.length == 4) {
        return [myArrString[1].slice(17), myArrString[2].slice(22),  myArrString[3].slice(8)]
    }
    if (myArrString.length == 5) {
        return [myArrString[1].slice(17), myArrString[2].slice(22),  myArrString[4].slice(8)]
    }
    return []
}



