import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  ["Home"]: { data: any; isLoading: boolean },
  ['FindRoute']: undefined,
  ['FindBus']: undefined,
  ['FindBusStop']: undefined,
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

export const HomeContainer = ():JSX.Element => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        initialParams={{ data, isLoading }}
      />



      
    </HomeStack.Navigator>
  
  )



  // return <Home data={data} isLoading={isLoading} />;
};
