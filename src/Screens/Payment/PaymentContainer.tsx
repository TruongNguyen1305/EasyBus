import { View, useWindowDimensions, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header, { Status } from "@/Components/Header";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import MyQR from "./MyQR";
import MyTicket from "./MyTicket";
import BuyTicket from "./BuyTicket";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { useAppSelector } from "@/Hooks/redux";
import { Button, Modal } from "native-base";
import { CompositeScreenProps, RouteProp, useFocusEffect } from "@react-navigation/native";
import { MainScreenParams } from "@/Navigation/Main";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";




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
type BottomTabNavigation = BottomTabNavigationProp<MainScreenParams>;
type BottomTabRoute = RouteProp<MainScreenParams, keyof MainScreenParams>;
interface BottomTabNavigatorProps {
    navigation: BottomTabNavigation;
    route: BottomTabRoute;
}

type PaymentScreenProps = CompositeScreenProps<
    RootScreenNavigatorProps,
    BottomTabNavigatorProps
>;


export function PaymentContainer({navigation}: PaymentScreenProps) {
    const {user} = useAppSelector(state => state.user)
    const [page, setPage] = useState(PaymentPage.QR)
    const [openModalLogin, setOpenModalLogin] = useState(user.id == '')

    const Content = {
        [PaymentPage.QR]: <MyQR />,
        [PaymentPage.MyTicket]: <MyTicket page={page} setPage={setPage}/>,
        [PaymentPage.BuyTicket]: <BuyTicket />
    }
    useFocusEffect(
        () => {
            if (user.id == '') setOpenModalLogin(true)
            else setOpenModalLogin(false)

            // Cleanup function (nếu cần)
            return () => {
                // Hàm này sẽ được gọi khi màn hình không còn được focus
                // Đây là nơi để hủy bỏ các event listener (nếu có)
            };
        }
    )
    

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
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
            
            
            <View style={{ position: 'relative' }}>
                <Header cover={Status.COVER2} leftTitle='Thanh toán' leftIconName='money' logoShow={false} />
            </View>
 
            {user.id && (
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