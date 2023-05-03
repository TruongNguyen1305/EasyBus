import React, { useRef, useEffect, useState } from 'react';
import { i18n, LocalizationKey } from "@/Localization";
import { Text, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import LottieView from 'lottie-react-native';
import { Colors } from '@/Theme/Variables';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WelcomeStackParamList } from './WelcomeContainer';
import { Icon } from '@/Theme/Icon/Icon';
import { ProgressIntro } from '@/Components';
import { Box, Progress, Center, NativeBaseProvider, View } from "native-base";

// import { Progress } from 'native-base';

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  WelcomeStackParamList
>;


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


console.log(windowHeight, windowWidth)
export const Intro = ({
  navigation,
} : WelcomeScreenNavigatorProps
) => {

  const [value, setValue] = useState(0)
  const animation = useRef(null);
  
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  setInterval(() => setValue((value) => value<100 ? value + 20 : value), 100)
  
  return (
    <View style = {styles.container}>
          
      <Icon name="vectorintro" size={100} color={Colors.SECONDARY60} style={{ position: 'absolute', top: 150, left: 100 }} />
          
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 150,
            height: 150,
            position: 'relative',
            backgroundColor: 'white',
            marginBottom: 6
          }}
          source={require('@/../assets/Lottie/test.json')}
        />
        <View style={{ flexDirection: 'row', position: 'absolute', top: 10 }}>
          <Text style={[styles.styleLogo, {color: Colors.PRIMARY40}]}>Easy</Text>
          <Text style={[styles.styleLogo, { color: Colors.SECONDARY60 }]}>Bus</Text>
        </View>
        
        <ProgressIntro value={value} />
        
      </View>

      <Text>{i18n.t(LocalizationKey.WELCOME)}</Text>
      <StatusBar style="auto" />
      <Button onPress={() => navigation.navigate('Onboarding')}>
        {i18n.t(LocalizationKey.START)}
      </Button>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY20,
    alignItems: "center",
    justifyContent: "center",
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleLogo: {
    fontSize: 28,
    fontWeight: '900',
  }
  ,
  buttonContainer: {
    paddingTop: 20,
  },
});
