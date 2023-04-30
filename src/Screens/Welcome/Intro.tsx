import React, {useState, useRef} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';


export const Intro = () => {
    const animation = useRef(null);
    return (
        <View>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 300,
                    height: 300,
                }}
                source= {require("@/../assets/Lottie/easybus.json")}
            />
        </View>
    )
}