import React, { useRef, useEffect, useState } from 'react';
import { i18n, LocalizationKey } from "@/Localization";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { StatusBar } from "expo-status-bar"
import { Button } from "native-base";
import LottieView from 'lottie-react-native';
import { Colors } from '@/Theme/Variables';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WelcomeStackParamList } from '@/Navigation/Welcome';
import { Icon } from '@/Theme/Icon/Icon';
import { Animated } from 'react-native';


type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  WelcomeStackParamList
>;


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


console.log(windowHeight, windowWidth)
export const Intro = ({ navigation } : WelcomeScreenNavigatorProps
) => {
  const animation = useRef(null);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const progressValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(progressValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0.9, // Giá trị phóng to, bạn có thể tùy chỉnh theo nhu cầu
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 2.8, // Giá trị phóng to, bạn có thể tùy chỉnh theo nhu cầu
        useNativeDriver: true,
      }),
    ]).start(() =>
      navigation.navigate("Onboarding")
    );
  }, []);

  const animatedStyle = { transform: [{ scale: scaleValue }] };
  const interpolatedValue = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const animatedProgressStyle = {
    transform: [{ scaleX: interpolatedValue }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[{ position: "absolute", height:Dimensions.get("window").height, width:Dimensions.get("window").width, alignItems:"center", justifyContent:'center', top: -0}, animatedStyle] }>
          <Icon name="vectorintro" size={105} color={'white'} />
      </Animated.View>  
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 148,
            height: 148,
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
        <View style = {{
          width: 300, maxWidth: 400, borderRadius: 15, borderWidth: 1, borderColor: 'black',
          justifyContent:'flex-start'
          }}
        >
            <Animated.View style={[{
                height: 7,
                margin: 1,
                paddingRight: 5,
                backgroundColor: '#FFB640',
                borderRadius: 10,
                borderColor: 'black', borderWidth: 1
            }, animatedProgressStyle]}>
            </Animated.View>
        </View>
      </View>
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
    top: -50,
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
