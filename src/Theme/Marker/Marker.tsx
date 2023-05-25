import { Marker } from 'react-native-maps';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { Image } from 'react-native';
interface IMarkerProps {
    latitude: Float,
    longitude: Float,
}

export const StartMarker = (props: IMarkerProps) =>{
    return <Marker
        coordinate={{ latitude: props.latitude, longitude: props.longitude }}
    >
        <Image
            source={require('../../../assets/image/pin-location-icon.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
        />
    </Marker>

}

export const TargetMarker = (props: IMarkerProps) => {
    return <Marker
        coordinate={{ latitude: props.latitude, longitude: props.longitude }}
    >
        <Image
            source={require('../../../assets/image/location-pin-2965.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
        />
    </Marker>
}



