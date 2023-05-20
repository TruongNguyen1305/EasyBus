import { View, useWindowDimensions, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import Header, { Status } from "@/Components/Header";
import { FontSize, FontWeight } from "@/Theme/Variables";
import MyQR from "./MyQR";
import MyTicket from "./MyTicket";
import BuyTicket from "./BuyTicket";

const {width, height} = Dimensions.get('window')

enum PaymentPage {
    QR,
    MyTicket,
    BuyTicket
}

const Content = {
    [PaymentPage.QR]: <MyQR />,
    [PaymentPage.MyTicket]: <MyTicket />,
    [PaymentPage.BuyTicket]: <BuyTicket />
}

export function PaymentContainer() {
    const [page, setPage] = useState(PaymentPage.QR)

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{ position: 'relative' }}>
                <Header cover={Status.COVER2} leftTitle='Thanh toán' leftIconName='money' logoShow={false} />
            </View>

            <View 
                style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-around', 
                    alignItems: 'center', 
                    paddingTop: 10, 
                    paddingHorizontal: 40, 
                    width: width
                }
            }>
                <TouchableOpacity
                    onPress={() => setPage(PaymentPage.QR)}
                >
                    <Text style={styles.heading}>Mã QR</Text>
                    <View style={[styles.line, {borderColor: page === PaymentPage.QR ? 'black' : 'transparent'}]}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPage(PaymentPage.MyTicket)}
                >
                    <Text style={styles.heading}>Vé của tôi</Text>
                    <View style={[styles.line, { borderColor: page === PaymentPage.MyTicket ? 'black' : 'transparent' }]}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setPage(PaymentPage.BuyTicket)}
                >
                    <Text style={styles.heading}>Mua vé</Text>
                    <View style={[styles.line, { borderColor: page === PaymentPage.BuyTicket ? 'black' : 'transparent' }]}></View>
                </TouchableOpacity>
            </View>

            
            {Content[page]}
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: FontSize.BUTTON_NORMAL,
        fontWeight: FontWeight.BUTTON_NORMAL
    },
    line: {
        marginTop: 4,
        borderWidth: 2,
        borderRadius: 10
    }
})