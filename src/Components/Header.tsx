import { Icon } from "@/Theme/Icon/Icon"
import { Colors, FontSize, FontWeight } from "@/Theme/Variables"
import { View, Image, Dimensions, Text, TouchableOpacity } from "react-native"


export enum Status {
    COVER1 = "1",
    COVER2 = "2",
}
  
interface IHeaderProps {
    cover: Status,
    leftTitle: string,
    leftIconName: string,
    logoShow: boolean,
    navigation?: any,
    isProfileScreen?: boolean
    rightIconName?: string,
    onPressRightIcon?: () => void,
}

export default function Header(props: IHeaderProps) {
    return (
        <View style={{width:Dimensions.get('window').width, height: Dimensions.get('window').width / 3.5 + 36}}>
            <View style={{ backgroundColor: Colors.SECONDARY20, height: 36, position:'relative', top:0}}>

            </View>
            {
                props.cover == '1' ?
                    <Image
                        source={require('@/../assets/image/cover1.png')}
                        style={{
                            position: 'relative',
                            zIndex: 5,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').width / 3.5,
                        }}
                    />
                    :
                    <Image
                        source={require('@/../assets/image/cover2.png')}
                        style={{
                            position: 'relative',
                            zIndex: 5,
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').width / 3.5,
                        }}
                    />
            }
            {
                props.logoShow &&
                    <Image
                        source={require('@/../assets/logo.png')}
                        style={{
                            position: 'absolute', zIndex: 5,
                            width: 80,
                            height: 62,
                            bottom: 35,
                            right: Dimensions.get('window').width / 2 - 40,
                        }}
                    />

            }
            
            {props.isProfileScreen ? (
                <></>
            ) : (
                <TouchableOpacity style={{
                    zIndex: 6, alignItems: 'center', position: 'absolute',
                    justifyContent: 'center', width: 40, height: 40,
                    borderRadius: 40, backgroundColor: Colors.PRIMARY40,
                    top: 36, right: 0,
                    margin: 10
                }}
                        onPress={() => {
                            if (props.onPressRightIcon) props.onPressRightIcon()
                        }}
                    >
                    {
                        props.rightIconName ? (
                            <View style={{top: -2}}>
                                <Icon name={props.rightIconName || 'person'} size={20} color='black' />
                            </View>
                        ) : (
                            <Icon name='person' size={20} color='black' />
                        )    
                    }     
                </TouchableOpacity>
            )}
            <TouchableOpacity style={{
                zIndex: 6, alignItems: 'center', position: 'absolute', flexDirection: 'row',
                backgroundColor: Colors.PRIMARY40, padding: 4,
                top: 36, margin: 10, borderRadius: 7,
                
            }} 
                onPress={() => {
                    if (props.navigation)
                        props.navigation.goBack()
                }}
            >
                <Icon name={props.leftIconName} size={props.navigation ? 18 : 14} color = 'black' />
                <Text style={{
                    fontSize: props.navigation ? FontSize.BUTTON_NORMAL : FontSize.BODY_SMALL2,
                    fontWeight: props.navigation ? FontWeight.BUTTON_SMALL : FontWeight.BODY_SMALL2,
                    marginLeft: 4
                }}>{props.leftTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}