import { useGetPaymentUrlMutation } from "@/Services";
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { Radio } from "native-base";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import * as Linking from 'expo-linking';


const {width, height} = Dimensions.get('window')


function BuyTicket() {
    const url = Linking.useURL()
    console.log(url)
    const [payment, setPayment] = useState<string>('MoMo')
    const [countNormalTicket, setCountNormalTicket] = useState<number>(0)
    const [countMonthTicket, setCountMonthTicket] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState(false)

    const [fetch, data] = useGetPaymentUrlMutation()

    const handleAddItem = (ticketType: string) => {
        if(ticketType === 'normal'){
            setCountNormalTicket(prev => prev + 1)
            setTotal(prev => prev + 7000)
        }
        else{
            setCountMonthTicket(prev => prev + 1)
            setTotal(prev => prev + 135000)
        }
    }

    const handleRemoveItem = (ticketType: string) => {
        if (ticketType === 'normal') {
            if(countNormalTicket === 0)
                return
            setCountNormalTicket(prev => prev - 1)
            setTotal(prev => prev - 7000)
        }
        else {
            if (countMonthTicket === 0)
                return
            setCountMonthTicket(prev => prev - 1)
            setTotal(prev => prev - 135000)
        }
    }

    const handlePayment = async () => {
        if (payment != 'MoMo'){
            alert('Chưa hỗ trợ phương thức thanh toán này')
            return
        }
        try {
            setLoading(true)
            const payload = await fetch({
                normalTicketCount: countNormalTicket,
                monthTicketCount: countMonthTicket,
                totalPrice: total
            }).unwrap()

            setLoading(false)

            Linking.openURL(payload.deeplink).catch(err => {
                if (err.code === 'EUNSPECIFIED') {
                    alert('Bạn cần cài đặt ứng dụng MoMo để sử dụng dịch vụ');
                }
            })

        } catch (error) {
            setLoading(false)
            alert('Invalid credentials')
        }
    }

    return (
        <View style={styles.container}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                textStyle={{
                    fontSize: FontSize.HEADLINE2,
                    fontWeight: FontWeight.HEADLINE2,
                    color: 'white'
                }}
            />

            <View style={{ 
                width: width - 50, 
                padding: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'dashed'
            }}>
                <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>Chọn loại vé</Text>
                <View>
                    <View style={styles.ticket}>
                        <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL, color: Colors.BLACK60 }}>Vé thường</Text>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>7.000đ</Text>
                            <View style={styles.input}>
                                <TouchableOpacity style={{
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    flex: 0.5,
                                    borderRightWidth: 1,
                                    borderRightColor: 'black',
                                }}
                                    onPress={() => handleAddItem('normal')}
                                >
                                    <Icon name="plus" color="black" size={15}/>
                                </TouchableOpacity>
                                <Text style={{flex: 1, textAlign: 'center'}}>
                                    {countNormalTicket}
                                </Text>
                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 0.5,
                                    borderLeftWidth: 1,
                                    borderLeftColor: 'black',
                                }}
                                    onPress={() => handleRemoveItem('normal')}
                                >
                                    <Icon name="minus" color="black" size={15} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.ticket}>
                        <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL, color: Colors.BLACK60 }}>Vé tháng</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>135.000đ</Text>
                            <View style={styles.input}>
                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 0.5,
                                    borderRightWidth: 1,
                                    borderRightColor: 'black',
                                }}
                                    onPress={() => handleAddItem('month')}
                                >
                                    <Icon name="plus" color="black" size={15} />
                                </TouchableOpacity>
                                <Text style={{ flex: 1, textAlign: 'center' }}>
                                    {countMonthTicket}
                                </Text>
                                <TouchableOpacity style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 0.5,
                                    borderLeftWidth: 1,
                                    borderLeftColor: 'black',
                                }}
                                    onPress={() => handleRemoveItem('month')}
                                >
                                    <Icon name="minus" color="black" size={15} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
                        <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL, color: Colors.BLACK60 }}>Tổng tiền: </Text>
                        <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL, color: Colors.BLACK60 }}>{total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                    </View>
                </View>
                <View>

                </View>
            </View>
            
            <View style={{
                width: width - 50,
                marginTop: 10,
                padding: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',
                borderStyle: 'dashed'
            }}>
                <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>Phương thức thanh toán</Text>
                <View>
                    <Radio.Group name="myRadioGroup" accessibilityLabel="payment" value={payment} onChange={nextValue => {
                        setPayment(nextValue);
                    }}>
                        <Radio value="MoMo" my={1}>
                            <Image source={require('../../../assets/image/logo-momo.png')} style={{
                                width: 24,
                                height: 24
                            }} />
                            <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>MoMo</Text>
                        </Radio>
                        <Radio value="ZaloPay" my={1}>
                            <Image source={require('../../../assets/image/logo-zalopay.png')} style={{
                                width: 24,
                                height: 24
                            }} />
                            <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>ZaloPay</Text>
                        </Radio>
                        <Radio value="ViettelPay" my={1}>
                            <Image source={require('../../../assets/image/logo-viettel-pay.png')} style={{
                                width: 24,
                                height: 24
                            }} />
                            <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>Viettel Pay</Text>
                        </Radio>
                    </Radio.Group>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 50, marginTop: 20 }}>
                <TouchableOpacity style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    width: 100,
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: Colors.PRIMARY40
                }}
                    disabled={total > 0 ? false : true}
                    onPress={() => {
                        setTotal(0)
                        setCountNormalTicket(0)
                        setCountMonthTicket(0)
                    }}
                >
                    <Text style={{fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL}}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: total > 0 ? Colors.PRIMARY40 : Colors.PRIMARY20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    width: 100,
                    borderRadius: 4,
                }}
                    disabled = {total > 0 ? false : true}
                    onPress={handlePayment}
                > 
                    <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL, color: 'white' }}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
    },
    ticket: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        width: 100,
        height: 24
    },
})

export default BuyTicket;