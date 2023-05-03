import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { User } from "@/Services";
import { Icon } from "@/Theme/Icon/Icon";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView from 'react-native-maps';
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { Divider } from 'native-base';

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
      <View style={styles.statusBar}>

      </View>
      <Image
        source={require('@/../assets/image/cover1.png')}
        style={styles.coverImg}
      />
      
      <View style={styles.options}>
        <TouchableOpacity style = {{width: '45%', alignItems:'center', justifyContent: 'center'}}>
          {/* <View> */}
            <Icon name='findroute' size={24} color={Colors.PRIMARY40} />
            <Text style={[styles.tbuttonsm, {marginTop: 6}]}>Tìm đường</Text>
          {/* </View>  */}
        </TouchableOpacity>
        
        <View style = {{height:'100%', alignItems:'center', justifyContent:'center'}}>
          <Divider bg={Colors.BLACK30} thickness="2" mx="2" orientation="vertical" height={'80%'} />
        </View>

        <TouchableOpacity style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
        {/* <View style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}> */}
          <Icon name = 'magnifying' size={24} color={Colors.PRIMARY40} />
          <Text style={[styles.tbuttonsm, {marginTop: 6}]}>Tra cứu</Text>
        {/* </View> */}
        </TouchableOpacity>
        
      </View>

      <View style={{
        zIndex: 5, bottom: 20, position: 'absolute', flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
        backgroundColor:'white', paddingHorizontal: 16, paddingVertical: 8,
        borderRadius: 5, borderWidth: 1, borderColor: '#ccc',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
          <Icon name='map' size={24} color='black' />
        <Text style={[styles.tbuttonsm, { marginLeft: 8}]}>Trạm dừng gần đây</Text>
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
  statusBar: {
    width: '100%',
    backgroundColor: Colors.SECONDARY20,
    height: 36, position: 'absolute',
    zIndex: 5
  },
  coverImg: {
    position: 'absolute', zIndex: 5, width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 3.5, top: 36
  },
  map: {
    width: '100%',
    height: '100%',
    position:'relative',
  },
  tbuttonsm: {
    fontSize: FontSize.BUTTON_NORMAL,
    fontWeight: FontWeight.BUTTON_NORMAL,
  },
  options: {
    zIndex: 10, flexDirection: 'row', width:  Dimensions.get('window').width - 40,
    justifyContent: 'center', top: 100,
    // borderWidth: 2, borderColor: Colors.BLACK30,
    borderRadius: 5,
    backgroundColor: "white", height: 70,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  }

});