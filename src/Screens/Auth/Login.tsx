import { Text, View } from "native-base";
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";


type AuthScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.ONBOARDING
>;
export const Login({ navigation }: AuthScreenNavigatorProps) => {
    const [data, setData] = useState({
        username: '',
        password: '',
    })


    
}