import { View, useWindowDimensions, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react";
import Header, { Status } from "@/Components/Header";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import MyQR from "./MyQR";
import MyTicket from "./MyTicket";
import BuyTicket from "./BuyTicket";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { useAppSelector } from "@/Hooks/redux";
import { Button } from "native-base";

const {width, height} = Dimensions.get('window')

export enum PaymentPage {
    QR,
    MyTicket,
    BuyTicket
}

type RootScreenNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.MAIN
>

export function PaymentContainer({navigation}: RootScreenNavigatorProps) {
    const {user} = useAppSelector(state => state.user)
    const [page, setPage] = useState(PaymentPage.QR)

    const Content = {
        [PaymentPage.QR]: <MyQR />,
        [PaymentPage.MyTicket]: <MyTicket page={page} setPage={setPage}/>,
        [PaymentPage.BuyTicket]: <BuyTicket />
    }

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{ position: 'relative' }}>
                <Header cover={Status.COVER2} leftTitle='Thanh toán' leftIconName='money' logoShow={false} />
            </View>
            {user.id ? (
                <>
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
                            <View style={[styles.line, { borderColor: page === PaymentPage.QR ? 'black' : 'transparent' }]}></View>
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
                </>
            ) : (
                    <Button size='lg'
                        style={{
                            backgroundColor: Colors.PRIMARY40,
                            borderRadius: 10,
                            marginTop: 200
                        }}
                        onPress={() => navigation.navigate(RootScreens.AUTH)}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.BUTTON_LARGE,
                                fontWeight: FontWeight.BUTTON_LARGE,
                                color: 'white'
                            }}
                        >
                            Đăng nhập để tiếp tục
                        </Text>

                    </Button>
            )}
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