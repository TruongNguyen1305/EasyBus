import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Setting } from "./Setting"
import { Profile } from "./Profile"
import { EditProfile } from "./EditProfile"
import { User } from "@/Services"
import InfoApp from "./InfoApp"

export type SettingStackParamList = {
    ['Setting']: undefined,
    ['Profile']: undefined,
    ['EditProfile']: { user: User }
    ['InfoApp']: undefined
}

const SettingStack = createNativeStackNavigator<SettingStackParamList>()

export default function SettingContainer(){
    return (
        <SettingStack.Navigator
            screenOptions={{headerShown: false}}
        >
            <SettingStack.Screen name="Setting" component={Setting}/>
            <SettingStack.Screen name="Profile" component={Profile} />
            <SettingStack.Screen name="EditProfile" component={EditProfile} />
            <SettingStack.Screen name="InfoApp" component={InfoApp} />
        </SettingStack.Navigator>
    )
}