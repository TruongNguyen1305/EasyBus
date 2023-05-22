import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { VStack } from "native-base";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable } from "react-native";
import { PaymentPage } from "./PaymentContainer";
import { LogBox } from 'react-native';
import { Ticket, TicketType, useActivateTicketMutation, useGetAllTicketQuery, useGetCurrentActiveTicketQuery } from "@/Services";
import { useAppSelector } from "@/Hooks/redux";
import {useEffect, useState} from 'react'
import Spinner from "react-native-loading-spinner-overlay/lib";

LogBox.ignoreLogs([
    'Require cycle',
]);

const {width, height} = Dimensions.get('window')


function MyTicket(props: {
    page: PaymentPage,
    setPage: React.Dispatch<React.SetStateAction<PaymentPage>>
}) {
    const {user} = useAppSelector(state => state.user)
    const [loading, setLoading] = useState(false)
    
    const payloadOffAllTicket = useGetAllTicketQuery(user.id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

    const payloadOfCurrentTicket = useGetCurrentActiveTicketQuery(user.id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

    const [fetch, data] = useActivateTicketMutation()

    const handleActivateTicket = async (type: string) => {
        try {
            setLoading(true)
            const payload: {
                currentActiveTicket: Ticket
            } = await fetch({
                id: user.id,
                type
            }).unwrap()

            
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            alert(error.data.message)
        }
    }

    return (
        <VStack space={4} alignItems="center"  style={styles.container}>

            <Spinner
                //visibility of Overlay Loading Spinner
                visible={payloadOffAllTicket.isLoading || payloadOfCurrentTicket.isLoading || loading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={{
                    fontSize: FontSize.HEADLINE2,
                    fontWeight: FontWeight.HEADLINE2,
                    color: 'white'
                }}
            />
            {payloadOfCurrentTicket.data && payloadOfCurrentTicket.data.currentActiveTicket &&  (
                <View style={[styles.ticket, { backgroundColor: Colors.PRIMARY40 }]}>
                    <View style={{ alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} >
                            <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>Vé {payloadOfCurrentTicket.data.currentActiveTicket.type === TicketType.DAY ? 'thường' : 'tháng'}</Text>
                            <View style={{
                                marginLeft: 5,
                                width: 40,
                                height: 25,
                                backgroundColor: payloadOfCurrentTicket.data.currentActiveTicket.type === TicketType.DAY ? Colors.SECONDARY60 : Colors.PRIMARY60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 50
                            }}>
                                <Icon name="bus" size={24} color='white' />
                            </View>
                        </View>
                        <Text style={{ fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL }}>Số lượt còn lại: {payloadOfCurrentTicket.data.currentActiveTicket.remainTurn}</Text>
                    </View>
                    <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL, color: Colors.BLACK60 }}>Đang kích hoạt</Text>
                </View>
            )}

            {payloadOffAllTicket.data && (
                <>
                    <TouchableOpacity style={styles.ticket}
                        onPress={() => handleActivateTicket('day')}
                    >
                        <View style={{ alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} >
                                <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>Vé thường</Text>
                                <View style={{
                                    marginLeft: 5,
                                    width: 40,
                                    height: 25,
                                    backgroundColor: Colors.SECONDARY60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}>
                                    <Icon name="bus" size={24} color='white' />
                                </View>
                            </View>
                            <Text style={{ fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL }}>Số lượng: {payloadOffAllTicket.data.normalTickets}</Text>
                        </View>
                        <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL, color: Colors.BLACK60 }}>Sử dụng ngay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ticket}
                        onPress={() => handleActivateTicket('month')}
                        disabled={payloadOffAllTicket.data.monthTickets < 1}
                    >
                        <View style={{ alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }} >
                                <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>Vé tháng</Text>
                                <View style={{
                                    marginLeft: 5,
                                    width: 40,
                                    height: 25,
                                    backgroundColor: Colors.PRIMARY60,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 50
                                }}>
                                    <Icon name="bus" size={24} color='white' />
                                </View>
                            </View>
                            <Text style={{ fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL }}>Số lượng: {payloadOffAllTicket.data.monthTickets}</Text>
                        </View>
                        <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL, color: Colors.BLACK60 }}>Sử dụng ngay</Text>
                    </TouchableOpacity>
                </>
            )}
            

            <Pressable
                style={{
                    width: width - 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                    borderStyle: 'dashed',
                    borderColor: Colors.PRIMARY60,
                    borderWidth: 2
                }}
                onPress={() => props.setPage(PaymentPage.BuyTicket)}
            >
                <Text style={{ fontSize: FontSize.BUTTON_LARGE, fontWeight: FontWeight.BUTTON_LARGE, color: Colors.BLACK100 }}>+ Mua thêm vé</Text>
            </Pressable>
        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center'
    },
    ticket: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        justifyContent: 'space-between',
        width: width - 60,
        backgroundColor: Colors.PRIMARY20,
        borderRadius: 10
    }
})

export default MyTicket;