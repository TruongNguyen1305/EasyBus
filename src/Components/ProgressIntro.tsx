import { Progress, Box, Center } from "native-base";
import { View } from "react-native";


export interface IProgressProps {
    value: number;
}

export default function ProgressIntro(props: IProgressProps) {
    return (
        <Center w="100%">
            <Box w={300} maxW="400"
                borderRadius={15}
                // height={10}
                borderWidth={1} borderColor={'black'}
            >
                <View style={{
                    height: 7,
                    margin: 1,
                    paddingRight: 5,
                    backgroundColor: '#FFB640',
                    borderRadius: 10,
                    width: `${props.value - 1}%`, borderColor:'black', borderWidth: 1
                }}>
                </View>
            </Box>
        </Center>
        
    )
}