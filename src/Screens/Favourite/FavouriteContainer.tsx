import Header, { Status } from "@/Components/Header"
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import { Divider } from "native-base"
import { Colors } from "@/Theme/Variables"
import { Icon } from "@/Theme/Icon/Icon"
import { useEffect, useState } from "react"
import { FontSize } from "@/Theme/Variables"
import { FontWeight } from "@/Theme/Variables"
import Busstop from "@/Components/Home/Busstop"
import Bus from "@/Components/Home/Bus"
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import axios from "axios"
import { useUpdateFavouriteMutation } from "@/Services"
import { CHANGE_FAVOURITE } from "@/Store/reducers"

enum Screen {
    BUSSTATION = 'BUSSTATION',
    BUS = 'BUS'
}

export default function FavouriteContainer() {
    const [screen, setScreen] = useState(Screen.BUSSTATION)
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.user.user)
    const [busStation, setBusStation] = useState<any[]>([])
    const [bus, setBus] = useState<any[]>(user.favouriteBus)
    
    const [fetch] = useUpdateFavouriteMutation()

    const handleClickHeartStation = async (StopId: string) => {
        if (user.id != '') {
            const station = await fetch({ route: 'station', id: StopId + '' }).unwrap()
            const payload = { station, bus: user.favouriteBus }
            console.log(payload)
            
            dispatch(CHANGE_FAVOURITE(payload))
        }
        fetchData()
    }
        
    const handleClickHeartBus = async (BusID: string) => {
        if (user.id != '') {
            const station = await fetch({ route: 'bus', id: BusID + '' }).unwrap()
            const payload = { bus, station: user.favouriteBus }
            console.log(payload)
            dispatch(CHANGE_FAVOURITE(payload))
        }
        fetchData()
    }        

    const fetchData = () => {
        axios.get('http://apicms.ebms.vn/businfo/getstopsinbounds/106/10/107/11')
        .then(res => {
            const InfoBusStation: any[] = []
            res.data.map((item: any, index: number) => {
                if (user.id != '' && user.favouriteStation.includes(item.StopId+'')) { 
                    InfoBusStation.push(item)
                }
            })
            setBusStation(InfoBusStation)
        })
        .catch(err => console.log(err))
    
        const busData : any [] = []
        bus.map((item, index) => {
            axios.get(`http://apicms.ebms.vn/businfo/getroutebyid/${item}`)
                .then(res => busData.push(res.data))
                .catch(err => console.log(err.response.data))
        })
        setBus(busData)

    } 

    useEffect(() => {
        fetchData()
    }, [user])

    const getFareTickets = (myString: string) => {
        console.log(myString)
        const myArrString = myString.split('<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp- ');
        console.log(myArrString)
        if (myArrString.length == 4) {
            return [myArrString[1].slice(17), myArrString[2].slice(22),  myArrString[3].slice(8)]
        }
        if (myArrString.length == 5) {
            return [myArrString[1].slice(17), myArrString[2].slice(22),  myArrString[4].slice(8)]
        }
        return []
    }

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
                        paddingTop: 20,
                        marginBottom: 60,
                    }}
                    showsVerticalScrollIndicator = {false}
                    >
                        {
                            user.id != '' && busStation.map((item, index) => (
                            <View key={index}>
                                <Busstop name={item.Name} address={item.AddressNo}
                                    buslist={item.Routes} street={item.Street} zone={item.Zone}
                                    onPressHeart={() => handleClickHeartStation(item.StopId+'')}    
                                />                           
                            </View>
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