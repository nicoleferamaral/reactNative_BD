
import { PressableProps, Pressable, Text, StyleSheet } from "react-native";

//pressable = area pressionavel
type Props = PressableProps & {
    data:{
        id: string
        nome: string
        telefone: string
        endereco: string
    }
}

export function Cliente({data, ...rest}:Props){
    return(
        <Pressable style = {styles.fundo} {...rest}>
            <Text style = {styles.txt}>
                {data.id} - {data.nome} - {data.telefone} - {data.endereco}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    fundo:{
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        
    },
    txt:{
        flex:1,
    }
});