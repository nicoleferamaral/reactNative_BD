
import { PressableProps, Pressable, Text, StyleSheet, TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

//pressable = area pressionavel
type Props = PressableProps & {
    data:{
        id: string
        nome: string
        telefone: string
        endereco: string
    }
    onDelete: () => void
    onEdit:   () => void
}

export function Cliente({data, onDelete, onEdit, ...rest}:Props){
    return(
        <View style = {styles.container}>
            <Pressable style = {styles.fundo} {...rest}>
                <Text style = {styles.txt}>
                    {data.id} - {data.nome} - {data.telefone} - {data.endereco}
                </Text>


                <TouchableOpacity onPress={onEdit}>
                    <MaterialIcons name="edit" size={24} color="#3232aa" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete}>
                    <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    fundo:{
        backgroundColor: "#c7e6fd",
        padding: 15,
        borderRadius: 30,
        gap: 12,
        flexDirection: "row",
    },
    txt:{
        flex:1,
        fontSize: 20,
    }
});