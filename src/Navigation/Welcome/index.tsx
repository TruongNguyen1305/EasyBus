import React from "react";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "native-base";
import { Onboarding } from "@/Screens/Welcome/Onboarding";
import { Intro } from "@/Screens/Welcome/Intro";

export type WelcomeStackParamList = {
    ['Intro']: undefined;
    ['Onboarding']: undefined;
}

const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();


export const WelcomeContainer = ({ }) => {
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
