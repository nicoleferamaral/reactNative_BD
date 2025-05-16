
import {View, StyleSheet, Button, Text, Alert} from "react-native";
import { TextInput } from "react-native";
import { Campos } from '@/components/Campos';
import { useState } from 'react'
import { useNavigation } from "expo-router";
import { ClienteDataBase, useClienteDataBase } from "@/database/useClienteDataBase";

// Todos q são telas tsx, aqueles que não são telas ts


export default function Index(){

    const [id, setId] = useState("")
    const[nome, setNome] = useState("")
    const[telefone, setTelefone] = useState("")
    const[endereco, setEndereco] = useState("")

    const[cliente, setCliente] = useState<ClienteDataBase[]>()
    const clienteDatabase = useClienteDataBase();

    const navigation = useNavigation()

    async function create() {
        try{
            const response = await clienteDatabase.create({
                nome, telefone, endereco
            })
            Alert.alert("Cliente cadastrado com sucesso! ID: "+ response.insertedRowId)
           
            setNome("")
            setTelefone("")
            setEndereco("")
        } catch(error){
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <Campos placeholder="Nome" onChangeText={setNome} value={nome}/>
            <Campos placeholder="Telefone"onChangeText={setTelefone} value={telefone}/>
            <Campos placeholder="Endereço"onChangeText={setEndereco} value={endereco}/>
            <Button title="Cadastrar" onPress={create}/>
            <Button title="Consultar" onPress={() => navigation.navigate('Consultar')}/> 
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