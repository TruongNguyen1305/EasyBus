import { useAppSelector } from "@/Hooks/redux";
import { TicketType, useGetCurrentActiveTicketQuery } from "@/Services";
import { Icon } from "@/Theme/Icon/Icon";
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { View , Text, StyleSheet, Dimensions} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { Spinner, VStack } from "native-base";

const {width} = Dimensions.get('window') 

function MyQR() {
    const {user} = useAppSelector(state => state.user)

    const {data} = useGetCurrentActiveTicketQuery(user.id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })

    return ( 
        <View style={styles.container}>

            <View style={styles.info}>
                <View style={{
                    backgroundColor: Colors.PRIMARY40,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                    marginRight: 20
                }}>
                    <Icon name="person" size={24} color={Colors.BLACK100} />
                </View>
                {data ? (
                    <View style={{
                        paddingHorizontal: 20,
                        borderStyle: 'dashed',
                        borderLeftWidth: 2,
                        borderLeftColor: 'black',
                    }}>
                        <Text style={{ fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>{user.fullName}</Text>
                        {data.currentActiveTicket ? <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL }}>Vé {data.currentActiveTicket.type === TicketType.DAY ? 'thường' : 'tháng'} - Số lượt: {data.currentActiveTicket.remainTurn}</Text> : 
                        <Text style={{ fontSize: FontSize.BODY_SMALL, fontWeight: FontWeight.BODY_SMALL }}>Chưa kích hoạt vé</Text>}
                    </View>
                ) : (
                    <Spinner color="emerald.500"/>
                )}
            </View>
            {!data && (
                <Spinner color="emerald.500" size='lg' style={{marginTop: 50}}/>
            )}

            {data && data.currentActiveTicket && (
                <VStack
                    space={10}
                    style={{
                        marginTop: 20,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: FontSize.BODY_LARGE, fontWeight: FontWeight.BODY_LARGE, color: Colors.BLACK60 }}>Đưa mã này vào máy quét</Text>
                    <View style={{
                        padding: 20,
                        shadowColor: Colors.BLACK60,
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 2,
                    }}>
                        <QRCode
                            value={user.id}
                            size={250}
                            color="black"
                            backgroundColor="white"
                        />
                    </View>
                </VStack>
            )}
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        width: width
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default MyQR;