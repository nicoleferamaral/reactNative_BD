
import {View, StyleSheet, Button, Text, Alert} from "react-native";
import { TextInput } from "react-native";
import { Campos } from '@/components/Campos';
import { useState, useEffect } from 'react'
import { useNavigation } from "expo-router";
import { ClienteDataBase, useClienteDataBase } from "@/database/useClienteDataBase";
import { useRoute } from "@react-navigation/native";

// Todos q são telas tsx, aqueles que não são telas ts


export default function Atualizar(){

    const [id, setId] = useState("")
    const[nome, setNome] = useState("")
    const[telefone, setTelefone] = useState("")
    const[endereco, setEndereco] = useState("")

    const[cliente, setCliente] = useState<ClienteDataBase[]>()
    const clienteDatabase = useClienteDataBase();
    const route = useRoute();
    const navigation = useNavigation()

    const {item} = route.params;


    // determinar os conteúdos dos campos
    useEffect(() =>{
        if (item){
            setId(item.id.toString());
            setNome(item.nome);
            setTelefone(item.telefone);
            setEndereco(item.endereco);
        }
    }, []);

    async function atualizar() {
        try {
            await clienteDatabase.atualizar({
                id: Number(id),
                nome,
                telefone,
                endereco
            });

            Alert.alert(
                "Sucesso!",
                "Dados do Cliente atualizados com sucesso!",
                [
                    {
                        text: "OK",
                        onPress:() => navigation.navigate("Consultar"),
                    },
                ],
                {cancelable: false}
            );
        } catch (error) {
            console.log(error)
        }
    }

    async function salvar() {
        try {
            if(id){
                await atualizar()
            }
        } catch (error) {
            console.log((error))
        }
        setId("")
        setNome("")
        setTelefone("")
        setEndereco("")
    }


    return(
        <View style={styles.container}>
            <Campos placeholder="Nome" onChangeText={setNome} value={nome}/>
            <Campos placeholder="Telefone"onChangeText={setTelefone} value={telefone}/>
            <Campos placeholder="Endereço"onChangeText={setEndereco} value={endereco}/>
            <Button title="Atualizar" onPress={salvar} />
            
        </View>
    );

}



const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fad0dd",
        width:"100%",
        height: "100%",
        justifyContent: "center",
    },
   
});