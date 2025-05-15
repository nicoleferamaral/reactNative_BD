
import {View, StyleSheet, Button, Text, Alert} from "react-native";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native";
import { Campos } from '@/components/Campos';
import { useState, useEffect } from 'react'
import { ClienteDataBase, useClienteDataBase } from "@/database/useClienteDataBase";
import { FlatList } from "react-native";
import { Cliente } from "@/components/Cliente";

// Todos q são telas tsx, aqueles que não são telas ts


export default function Consultar(){

    const [id, setId] = useState("")
    const[nome, setNome] = useState("")
    const[telefone, setTelefone] = useState("")
    const[endereco, setEndereco] = useState("")

    const[cliente, setCliente] = useState<ClienteDataBase[]>()
    const clienteDatabase = useClienteDataBase();

    const[busca, setBusca] = useState("")

    const navigation = useNavigation()

    async function list() {
        try{
            const response = await clienteDatabase.consultar(busca)
            setCliente(response)
        }catch(error){
            console.log(error)
        }
    }

    async function detalhes(item:ClienteDataBase) {
        setId(String(item.id))
        setNome(item.nome)
        setTelefone(item.telefone)
        setEndereco(item.endereco)
    }


    useEffect(()=> {list()}, [busca])

  //Flat pq é flexivel

    return(
        <View style={styles.container}>
            <Campos placeholder="Pesquisar" onChangeText={setBusca} />
            <FlatList 
                data={cliente}
                keyExtractor={(item) => String(item.id)}
                renderItem={(item) =>  <Cliente data={item}/>}
                contentContainerStyle={{gap:16}}
            />
            <Button title="Voltar" onPress={() => navigation.navigate('Index')} /> 
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