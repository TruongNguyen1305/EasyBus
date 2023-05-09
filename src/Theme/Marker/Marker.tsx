import { Marker } from 'react-native-maps';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface IMarkerProps {
    latitude: Float,
    longitude: Float,
}

export const StartMarker = (props: IMarkerProps) =>{
    return <Marker
        coordinate={{ latitude: props.latitude, longitude: props.longitude }}
        image={require('../../../assets/image/pin-location-icon.png')}
    />
}

export const TargetMarker = (props: IMarkerProps) => {
    return <Marker
        coordinate={{ latitude: props.latitude, longitude: props.longitude }}
        image={require('../../../assets/image/location-pin-2965.png')}
    />
}



