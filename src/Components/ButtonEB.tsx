import { Button } from "native-base";
import { Colors } from "@/Theme/Variables";

interface IButtonProps { 
    title: string;
    onPress: () => void;
}
export default function ButtonEB(props: IButtonProps) {
    return (
        <Button 
            size="lg" style={{ width: '100%', height: 48, alignItems: 'center', justifyContent: 'center'}}
            onPress={props.onPress}
            _text={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 18,
                marginTop: 1
                // textAlign: 'center',
                // justifyContent: 'center',
            }}
            borderWidth={1}
            bg={Colors.PRIMARY40}
            borderColor={Colors.BLACK30}
        >
            {props.title}
        </Button>
    )


}
