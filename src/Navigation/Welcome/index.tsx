import React, { useEffect } from "react";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { Onboarding } from "@/Screens/Welcome/Onboarding";
import { Intro } from "@/Screens/Welcome/Intro";
import { useAppSelector } from "@/Hooks/redux";
import { RootStackParamList } from "..";
import { RootScreens } from "@/Screens";
import { StatusBar } from "native-base";


export type WelcomeStackParamList = {
    ['Intro']: undefined;
    ['Onboarding']: undefined;
}


const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();

export const WelcomeContainer = () => {
    
    return (
        <WelcomeStack.Navigator screenOptions={{ headerShown: false }}>
            <WelcomeStack.Screen
                name='Intro'
                component={Intro}  
            />
            <WelcomeStack.Screen
                name='Onboarding'
                component={Onboarding}  
            />
        </WelcomeStack.Navigator>
    )
};
