import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header, { Status } from "@/Components/Header";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useEffect, useState } from "react";
import { Button } from "native-base";
import { Icon } from "@/Theme/Icon/Icon";
import { FontSize, FontWeight, Colors } from "@/Theme/Variables";
import { StartMarker, TargetMarker } from "@/Theme/Marker/Marker";
import * as Location from 'expo-location'


type GuideNavigationProps = NativeStackScreenProps<
    HomeStackParamList,
    'Guide'
>

export function Guide({ route, navigation }: GuideNavigationProps) {
    const [isFinding, setIsFinding] = useState(false)
    const [location, setLocation] = useState<Location.LocationObject>()
    const start = {
        latitude: 10.880035901459214,
        longitude: 106.80625226368548
    }

    const target = {
        latitude: 10.880035901459214,
        longitude: 106.807
    }
        
    useEffect(() => {
        const fetchLocation = async () => {
            const { status } = await Location.getForegroundPermissionsAsync()
            if (status === Location.PermissionStatus.GRANTED) {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            }
            else{
                Alert.alert(
                    'Alert',
                    'Permission to access location was denied',
                    [
                        {
                            text: 'Close',
                            onPress: () => navigation.goBack(),
                            style: 'cancel',
                        },
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => navigation.goBack()
                    },)
            }
        }
        fetchLocation()
    }, [])

    console.log(location)

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
                region={{
                    latitude: 10.880035901459214,
                    longitude: 106.80625226368548,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <StartMarker
                    latitude={start.latitude}
                    longitude={start.longitude}
                />

                <TargetMarker 
                    latitude={target.latitude}
                    longitude={target.longitude}
                />

                {/* <MapViewDirections
                    origin={start}
                    destination={target}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                /> */}
            </MapView>
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
        top: Dimensions.get('window').width / 3.5 + 64,
        borderRadius: 20,
    }
})