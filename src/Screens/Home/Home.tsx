import { i18n, LocalizationKey } from "@/Localization";
import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { User } from "@/Services";
import { Icon } from "@/Theme/Icon/Icon";
import { HomeStackParamList } from "./HomeContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView, {Callout, Marker, Polyline} from 'react-native-maps';
import { Colors, FontSize, FontWeight } from "@/Theme/Variables";
import { Divider, Pressable, ScrollView, StatusBar } from 'native-base';
import Header from "@/Components/Header";
import Busstop from "@/Components/Home/Busstop";
import { Status } from "@/Components/Header";


import axios from 'axios'

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
  const [nearbusOpen, setNearbusOpen] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 10.880035901459214,
    longitude: 106.80625226368548,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [dataBusStop, setDataBusStop]  = useState<any[]>([])

  useEffect(() => {
    axios.get(`http://apicms.ebms.vn/businfo/getstopsinbounds/${mapRegion.longitude}/${mapRegion.latitude}/${mapRegion.longitude + mapRegion.longitudeDelta}/${mapRegion.latitude + mapRegion.latitudeDelta}`)
      .then(res => {
        const newBusStop : any[] = []
        res.data.map((item: any) => {
          if (!dataBusStop.includes(item)) {
            newBusStop.push(item)
          }
        })
        const prevlengt = dataBusStop.length
        if (newBusStop.length > 0)
          setDataBusStop([...dataBusStop, ...newBusStop])
        console.log(prevlengt, [...dataBusStop, ...newBusStop].length)
        
      })
      .catch(err => console.log(err)) 
  }, [mapRegion])

  console.log(mapRegion)
  return (
    <View style={styles.container}>
      <Header cover={Status.COVER1} leftTitle="TP. Hồ Chí Minh" leftIconName="location" logoShow={true} />
      <View style={styles.options}>
        <TouchableOpacity style = {{width: '45%', alignItems:'center', justifyContent: 'center'}} onPress={() => navigation.navigate('FindRoute', {status: 'FindRoute'})}>
            <Icon name='findroute' size={24} color={Colors.PRIMARY40} />
            <Text style={[styles.tbuttonsm, {marginTop: 6}]}>Tìm đường</Text>
        </TouchableOpacity>
        
        <View style = {{height:'100%', alignItems:'center', justifyContent:'center'}}>
          <Divider bg={Colors.BLACK30} thickness="2" mx="2" orientation="vertical" height={'80%'} />
        </View>

        <TouchableOpacity style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.navigate('FindRoute', { status: 'LookUp' })}>
          <Icon name = 'magnifying' size={24} color={Colors.PRIMARY40} />
          <Text style={[styles.tbuttonsm, {marginTop: 6}]}>Tra cứu</Text>
        </TouchableOpacity>
      </View>
      
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChangeComplete={(region, details) => setMapRegion(region)}
        showsUserLocation={true}
        mapType="standard"
        // showsBuildings={false}
      >
        {
          dataBusStop.map((item, index) => 
            <Marker
              key={index}
              coordinate={          {
                latitude: item.Lat,
                longitude: item.Lng,
              }}
            >
              <Callout>
                <View style={{minWidth:200}}>
                  <Text>{item.Code} - {item.Name}</Text>  
                  <Text>{item.AddressNo}</Text> 
                  <Text>{item.Routes}</Text>
                </View>
              </Callout>
            </Marker>
          )
        
        
        /* <Marker
          key={1}
          coordinate={          {
            latitude: 37.8025259,
            longitude: -122.4351431,
          }}
          title="Marker Title"
          description="Marker Description"
        /> */}
      </MapView>
  {/* <Polyline
    coordinates={[
      {latitude: 37.8025259, longitude: -122.4351431},
      {latitude: 37.7896386, longitude: -122.421646},
      {latitude: 37.7665248, longitude: -122.4161628},
      {latitude: 37.7734153, longitude: -122.4577787},
      {latitude: 37.7948605, longitude: -122.4596065},
      {latitude: 37.8025259, longitude: -122.4351431},
    ]}
    strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
    strokeColors={[
      '#7F0000',
      '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
      '#B24112',
      '#E5845C',
      '#238C23',
      '#7F0000',
    ]}
    strokeWidth={6}
  /> */}
      {
        nearbusOpen ?
          <View style={styles.listbusnear}>
            <Divider bg={Colors.BLACK30} thickness="3" width={'20%'} orientation="horizontal" marginY={3} marginX={10} />
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between',
              alignItems: 'flex-end', width: '100%',
              borderBottomColor: Colors.BLACK30, borderBottomWidth: 1,
              paddingHorizontal: '10%',
              paddingBottom: 10,
              marginTop: -12
            }}>
              <Icon name='map' size={20} color='#334155' />
              <Text style={{
                fontSize: FontSize.BODY_LARGE,
                fontWeight: FontWeight.BUTTON_NORMAL,
                top: 1
              }}>Trạm dừng gần đây 
              </Text>
              <Text> haha
              {mapRegion.latitude + ' ' + mapRegion.longitude}
              </Text>
              <Pressable onPress={() => setNearbusOpen(!nearbusOpen)}>
                <Icon name='close' size={20} color='#334155' />
              </Pressable>
            </View>
            
            <View style={{width:'80%', marginBottom: 40 }}>
              <ScrollView   showsVerticalScrollIndicator={false}>
                <Busstop buslist={[50, 99, 19]}/>
                <Busstop buslist={[50,99,19]}/>
                <Busstop buslist={[50,99,19]} />
                <Busstop buslist={[50,99,19]} />
                <Busstop buslist={[50,99,19]} />
              </ScrollView>

            </View>
          </View>  
          :
          <>
            <TouchableOpacity style={styles.nearbusBTN} onPress={() => setNearbusOpen(!nearbusOpen)}>
              <Icon name='map' size={24} color='black' />
              <Text style={[styles.tbuttonsm, { marginLeft: 8 }]}>Trạm dừng gần đây</Text> 
            </TouchableOpacity>
          </>
      }

    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.SECONDARY20
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
    position: 'relative',
  },
  tbuttonsm: {
    fontSize: FontSize.BUTTON_NORMAL,
    fontWeight: FontWeight.BUTTON_NORMAL,
  },
  options: {
    zIndex: 10, flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute', top: 110,
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
  },
  nearbusBTN: {
    zIndex: 5, bottom: 20, position: 'absolute', flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 8, borderWidth: 1, borderColor: '#ccc',
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listbusnear: {
    zIndex: 5, maxHeight: 300, bottom: 0, position: 'absolute',
    width: Dimensions.get('window').width,
    flexDirection: 'column', alignItems: 'center', alignSelf: 'center',

    backgroundColor: 'white',
    borderTopLeftRadius: 15, borderTopRightRadius: 15,
    borderWidth: 1, borderColor: Colors.BLACK30
  }

});
