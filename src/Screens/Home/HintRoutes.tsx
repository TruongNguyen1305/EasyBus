import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header, { Status } from "@/Components/Header";
import { Icon } from "@/Theme/Icon/Icon";
import { FontSize, FontWeight, Colors } from "@/Theme/Variables";
import { Divider, Input, ScrollView } from "native-base";
import { useState } from "react";
import { Hint } from "@/Components/Home/Hint";

type HintRoutesNavigationProps = NativeStackScreenProps<
    HomeStackParamList,
    'HintRoutes'
>

export function HintRoutes({route, navigation}: HintRoutesNavigationProps) {
    return (
        <View style={styles.container}>
            <Header cover={Status.COVER1} leftTitle="Back" leftIconName="back" logoShow navigation={navigation} />

            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Icon name='findroute' size={24} color={Colors.PRIMARY40} />
                    <Text style={styles.title}>Tìm đường</Text>
                </View>

                <View style={{ marginVertical: 5, width: '100%' }}>
                    <Divider thickness={2} width='100%' bg={Colors.BLACK30} orientation="horizontal" />
                </View>

                
                <View style={styles.form}>
                        <Input marginTop={2} size='sm' placeholder="Chọn nơi xuất phát" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                            InputLeftElement={
                                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                    <Text style={styles.inputTitle}>Đi từ</Text>
                                    <Icon name='target' size={22} color={Colors.PRIMARY40} />
                                </View>
                            }
                            onPressIn={() => navigation.goBack()}
                        />

                        <Input marginTop={2} size='sm' placeholder="Chọn điểm đến" w='100%' bg={Colors.PRIMARY20} borderRadius={5}
                            InputLeftElement={
                                <View style={{ flexDirection: 'row', marginLeft: 8 }}>
                                    <Text style={styles.inputTitle}>Đến</Text>
                                    <Icon name='location' size={22} color={Colors.PRIMARY40} />
                                </View>
                            }
                            onPressIn={() => navigation.goBack()}
                        />
                </View>
            </View>
            <View style={styles.hintsContainer}>
                 <Text
                    style={{
                        fontSize: FontSize.HEADLINE4,
                        fontWeight: FontWeight.HEADLINE4,
                        color: Colors.BLACK100,
                        width: Dimensions.get('window').width - 40,
                        alignSelf: 'center'
                    }}
                 >
                    Gợi ý các cách di chuyển
                 </Text>

                 <ScrollView showsVerticalScrollIndicator={false} style={styles.hints} >
                    <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
                        <Hint buses={[33, 99]}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
                        <Hint buses={[33, 99]} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
                        <Hint buses={[33, 99]} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
                        <Hint buses={[33, 99]} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
                        <Hint buses={[33, 99]} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
                        <Hint buses={[33, 99]} />
                    </TouchableOpacity>
                    
                 </ScrollView>

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    form: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15
    },
    inputTitle: {
        fontSize: FontSize.BUTTON_NORMAL,
        fontWeight: FontWeight.BUTTON_NORMAL,
        color: Colors.BLACK60,
        width: 40
    },
    hintsContainer: {
        marginTop: 150,
        width: Dimensions.get('window').width,
        alignSelf: 'center',
        marginBottom: 180
    },

    hints: {
        paddingHorizontal: 20,
    }
})