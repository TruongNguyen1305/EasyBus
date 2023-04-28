import React, { useRef, useEffect } from 'react';
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { RootScreens } from "..";
import LottieView from 'lottie-react-native';
import { Colors } from '@/Theme/Variables';
export const Welcome = (props: {
onNavigate: (string: RootScreens) => void;
}) => {
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 45 }}>
          <Text style={[styles.styleLogo, {color: Colors.PRIMARY40}]}>Easy</Text>
          <Text style={[styles.styleLogo, { color: Colors.SECONDARY60 }]}>Bus</Text>
        </View>

        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            position: 'relative'
            // backgroundColor: '#eee',
          }}
          source={require('@/../assets/Lottie/easybus.json')}
        />
      </View>

      <Text>{i18n.t(LocalizationKey.WELCOME)}</Text>
      <StatusBar style="auto" />
      <Button onPress={() => props.onNavigate(RootScreens.MAIN)}>
        {i18n.t(LocalizationKey.START)}
      </Button>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
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
