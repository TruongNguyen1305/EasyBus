import { Text, View, StyleSheet } from "react-native";
import { Colors } from "@/Theme/Variables";



export default function SignUp(){
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
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