import { View, TextInput, StyleSheet, TextInputProps } from "react-native";      

export function Campos({...rest}:TextInputProps){
    return(
        <View>
            <TextInput style={styles.cmp} {...rest}/>
        </View>
    );
}

const styles = StyleSheet.create({
    cmp:{
        width:"90%",
     
        borderWidth: 3,
        margin: 5,
        borderColor: "#fff",
        textAlign: "center",
        borderRadius: 200,
        marginLeft: "5%",
        fontSize: 22,
    }
})