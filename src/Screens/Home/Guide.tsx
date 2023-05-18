import { View, Text, StyleSheet, Dimensions, FlatList, Animated, TouchableOpacity, Pressable } from "react-native";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header, { Status } from "@/Components/Header";
import MapView, { Callout, Marker, Polyline, UserLocationChangeEvent } from "react-native-maps";
import { useRef, useState } from "react";
import { Button } from "native-base";
import { Icon } from "@/Theme/Icon/Icon";
import { FontSize, FontWeight, Colors } from "@/Theme/Variables";
import { StartMarker, TargetMarker } from "@/Theme/Marker/Marker";
import { debounce } from "lodash";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { Platform } from "react-native";


type GuideNavigationProps = NativeStackScreenProps<
    HomeStackParamList,
    'Guide'
>

type Coordinate = {
    latitude: Float,
    longitude: Float
}
const {width, height} = Dimensions.get('window')

const SIZE = Platform.OS === 'ios' ? width*0.72 : width*0.74

const EMPTY_ITEM_SIZE = (width - SIZE) / 2

const calculateDistance = (coordinate1: Coordinate, coordinate2: Coordinate) => {
    const R = 6371; // Đường kính Trái Đất (đơn vị: km)

    const degToRad = (deg: Float) => deg * (Math.PI / 180);

    const dLat = degToRad(coordinate2.latitude - coordinate1.latitude);
    const dLon = degToRad(coordinate2.longitude - coordinate1.longitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(coordinate1.latitude)) * Math.cos(degToRad(coordinate2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c * 1000; // Đổi sang mét

    return distance;
}

export function Guide({ route, navigation }: GuideNavigationProps) {
    const scrollX = useRef(new Animated.Value(0)).current
    const [isFinding, setIsFinding] = useState(false)
    const [mapRegion, setMapRegion] = useState({
        latitude: route.params.startData.latitude,
        longitude: route.params.startData.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    })

    const allInstructions = [{ key: 'leftSpacer' }, ...route.params.data.detail, {key: 'rightSparcer'}]

    const allCoordinates: any[] = []

    for (let coordinates of Object.values<any>(route.params.data.coordRoute)){
        for(let coordinate of coordinates){
            allCoordinates.push({
                latitude: coordinate.Latitude,
                longitude: coordinate.Longitude
            })
        }
    }


    const handleUserMove = (e: UserLocationChangeEvent) => {
        //console.log(e.nativeEvent.coordinate)
        // if (!e.nativeEvent.coordinate){
        //     return
        // }
        // const currentPostion = {
        //     latitude: e.nativeEvent.coordinate.latitude,
        //     longitude: e.nativeEvent.coordinate.longitude,
        // }
        // let newInstruction = currentInstruction
        // const lengthToGetIn = calculateDistance(currentPostion, {
        //     latitude: newInstruction.GetInLat,
        //     longitude: newInstruction.GetInLng
        // })
        // console.log(lengthToGetIn)
    }
        

    return (
        <View style={styles.container}>
            <Header cover={Status.COVER1} leftTitle="Back" leftIconName="back" logoShow navigation={navigation} />

            <Button
                backgroundColor={isFinding ? Colors.RED60 : Colors.PRIMARY60}
                style={styles.btn}
                leftIcon={
                    isFinding ? <Icon name="pause" size={20} color="white" /> : <Icon name="location-arrow" size={20} color="white" />
                }
                onPress={() => setIsFinding(prev => !prev)}
            >
                <Text style={{fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL, color: 'white'}}>
                    {isFinding ? "Dừng dẫn đường" : "Bắt đầu dẫn đường"}
                </Text>
            </Button>

            <MapView
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={mapRegion}
                onRegionChange={
                    debounce(
                        (region, details) => {
                            if ((region.latitude.toFixed(6) == mapRegion.latitude.toFixed(6)
                                && region.longitude.toFixed(6) == mapRegion.longitude.toFixed(6))) {
                                return;
                            }
                            setMapRegion(region)
                        }, 1000, { trailing: true, leading: false })
                }
                showsUserLocation={true}
                onUserLocationChange={handleUserMove}
                customMapStyle={[
                    {
                        "featureType": "poi.business",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dfd2ae"
                            }
                        ]
                    }
                ]}
            >
                {route.params.data.stops.map((stop: any, index: number) => {
                    if(index === 0){
                        return (
                            <StartMarker
                                key={index}
                                latitude={stop.Lat}
                                longitude={stop.Lng}
                            />
                        )
                    }
                    else if (index === route.params.data.stops.length - 1){
                        return (
                            <TargetMarker
                                key={index}
                                latitude={stop.Lat}
                                longitude={stop.Lng}
                            />
                        )
                    }
                    else 
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: stop.Lat,
                                    longitude: stop.Lng,
                                }}
                                tracksViewChanges={false}
                                image={require('@/../assets/image/markicon-bus_liked.png')}
                            >
                                <Callout
                                    style={{justifyContent: 'center', alignItems: 'center'}}
                                >
                                    <Text style={{fontSize: FontSize.BUTTON_SMALL, fontWeight: FontWeight.BUTTON_SMALL}}>{stop.Name}</Text>
                                </Callout>
                            </Marker>
                        )
                })}
                {isFinding && (
                    <Polyline
                        coordinates={allCoordinates}
                        strokeColor={Colors.SECONDARY100}
                        //strokeColors={['#7F0000']}
                        strokeWidth={6}
                    />
                )}
            </MapView>


            {isFinding && (
                <View style={{
                    zIndex: 10,
                    position: 'absolute',
                    alignSelf: 'center',
                    bottom: 10,
                    height: 250
                }}>
                    <Animated.FlatList 
                        data={allInstructions}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: 'center',
                        }}
                        horizontal
                        snapToInterval={SIZE + 20}
                        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                        bounces={false}
                        keyExtractor={(item: any, index: number) => index.toString()}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {useNativeDriver: true}
                        )}
                        scrollEventThrottle={16}
                        renderItem={({item, index}) => {
                            if (item.key){
                                return <View style={{ width: EMPTY_ITEM_SIZE }} />;
                            }

                            const inputRange = [
                                (index - 2) * (SIZE + 20),
                                (index - 1) * (SIZE + 20),
                                index * (SIZE + 20),
                            ]
                            console.log(inputRange)

                            const translateY = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, -50, 0],
                                extrapolate: 'clamp',
                            })
                            return (
                                <Pressable
                                    onPress={() => {
                                        setMapRegion({
                                            latitude: item.GetInLat,
                                            longitude: item.GetInLng,
                                            latitudeDelta: 0.005,
                                            longitudeDelta: 0.005,
                                        })
                                    }}
                                >
                                    <Animated.View style={[styles.modal, {
                                        transform: [{ translateY }],
                                        marginRight: index < allInstructions.length - 2 ? 20 : 0
                                    }]}>
                                        <Text style={{ fontSize: FontSize.BODY_LARGE, fontWeight: FontWeight.BODY_LARGE }}>Hướng dẫn cách đi</Text>
                                        <View
                                            style={{ marginTop: 10 , width: '90%'}}
                                        >
                                            {item.RouteNo ? (
                                                <Text>Đi xe: {item.RouteNo}</Text>
                                            ) : (
                                                <Text>Đi bộ</Text>
                                            )}
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Text>Từ: </Text>
                                                <Text style={{ color: Colors.SECONDARY100, fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>{item.GetIn}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                <Text>Đến: </Text>
                                                <Text style={{ color: Colors.SECONDARY100, fontSize: FontSize.BUTTON_NORMAL, fontWeight: FontWeight.BUTTON_NORMAL }}>{item.GetOff}</Text>
                                            </View>
                                        </View>
                                    </Animated.View>
                                </Pressable>
                            )
                        }}
                    />
                </View>
            )}
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
    map: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    btn: {
        zIndex: 10,
        position: 'absolute',
        left: 15,
        top: Dimensions.get('window').width / 3.5 + 80,
        borderRadius: 20,
    },
    modal: {
        backgroundColor: 'white', 
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 150,
        width: SIZE,
    }
})