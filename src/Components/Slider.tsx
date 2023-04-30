import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/Theme/Variables";


interface SliderProps {
    curIndex: number,
    value: number,
}
  

export default function Slider(props: SliderProps){
    return (
        <View style={styles.container}>
            {
                Array(props.value).fill(0).map((_, index) => {
                    if (index === props.curIndex) { 
                        return <View key={index} style = {styles.active}></View>
                    }
                    else return (
                        <View key={index} style={styles.inactive}>
                        </View>
                    )
                })

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    active: {
        width: 12,
        height: 6,
        borderRadius: 4,
        backgroundColor: Colors.BLACK100,
        margin: 4
    },
    inactive: {
        width: 6,
        height: 6,
        borderRadius: 40,
        backgroundColor: Colors.BLACK30,
        margin: 4
    }
})