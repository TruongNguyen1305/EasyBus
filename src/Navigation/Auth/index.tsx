import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'


import { Login } from '@/Screens/Auth/Login'
import  Signup  from '@/Screens/Auth/Signup'

export type AuthStackParamList = {
    ['Login']: undefined,
    ['Signup']: undefined,
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

export const AuthContainer = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen
                name = 'Login'
                component={Login}
            />

            <AuthStack.Screen
                name='Signup'
                component = {Signup}
            />
        </AuthStack.Navigator>
    )
}