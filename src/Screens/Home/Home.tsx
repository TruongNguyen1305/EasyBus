import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { Icon } from "@/Theme/Icon/Icon";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView from 'react-native-maps';
import { Colors } from "@/Theme/Variables";

type HomeScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  'Home'
>
export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = ({ route, navigation }: HomeScreenNavigationProps) => {
  const { data, isLoading } = route.params;
  return (
    <View style={styles.container}>
      <Image
        source={require('@/../assets/image/cover1.png')}
        style={{
          position: 'absolute', zIndex: 5, width: Dimensions.get('window').width,
          height: Dimensions.get('window').width / 3.5,
          // top: 100
        }}
      />
      
      <View style={{
        zIndex: 10, flexDirection: 'row', width:  Dimensions.get('window').width - 40,
        justifyContent: 'center', top: 70,
        borderWidth: 2, borderColor: Colors.BLACK30,
        borderRadius: 5,
        backgroundColor: "white", height: 70,
        alignSelf: 'center',
      }}>
        <View style = {{width: '45%', alignItems:'center', justifyContent: 'space-around'}}>
          <Icon name='findroute' size={24} color = 'black'/>
          <Text>Tìm đường</Text>
        </View> 
        
        
        <View style={{ width: '45%', alignItems: 'center', justifyContent: 'space-around' }}>
          <Icon name = 'magnifying' size={24} color='black' />
          <Text>Tra cứu</Text>
        </View>
      </View>

      <View style={{
        zIndex: 5, bottom: 30, position: 'absolute', flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
        backgroundColor:'white', paddingHorizontal: 20, paddingVertical: 10,
        borderRadius: 5, borderWidth: 1, borderColor: 'black'
      }}>
          <Icon name='map' size={24} color='black' />
        <Text style={{ marginLeft: 10, top: 2}}>Trạm dừng gần đây</Text>
      </View>


      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 10.880035901459214,
          longitude:106.80625226368548,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
      </MapView>





      <Text>Hello</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    position:'relative',
  },
});