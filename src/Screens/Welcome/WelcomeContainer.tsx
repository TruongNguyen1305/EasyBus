import React from "react";
import { Welcome } from "./Welcome";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "native-base";


import { Intro } from "./Intro";
import { Onboarding } from "./Onboarding";

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.WELCOME
>;

export type WelcomeStackParamList = {
  ['Intro']: undefined;
  ['Onboarding']: undefined;
}


const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>();



export const WelcomeContainer = ({
  navigation,
} : WelcomeScreenNavigatorProps)=> {
  
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  }; 

  return <Welcome onNavigate={onNavigate} />;
};
