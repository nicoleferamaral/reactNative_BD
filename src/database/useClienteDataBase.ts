import {useSQLiteContext} from 'expo-sqlite';

export type ClienteDataBase = {
    id: number
    nome: string
    telefone: string
    endereco: string
} // criando local de variaveis do banco

export function useClienteDataBase(){
    const database = useSQLiteContext()  //acessar todos os métodos do bd

    async function create(data: Omit<ClienteDataBase, "id">) {
        const statement  = await database.prepareAsync(
            "insert into pessoa(nome, telefone, endereco) values($nome, $telefone, $endereco)"
        ) // interpolação

        try{
            const result = await statement.executeAsync({
                $nome: data.nome,
                $telefone: data.telefone,
                $endereco: data.endereco
            })


            //coletando o ultio id cadastrado e mostrando
            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return{ insertedRowId}

        }catch(error){
            throw error //evita que o programa pare de funcionar, o mesmo que console.log
        } finally{
                await statement.finalizeAsync()
        }// para encerrar o programa
        
    } //fim do create

    async function consultar(name:string) {
        try{
            const query = "select * from pessoa where nome like ?" //? substituir por qualquer item de busca
            const response = await database.getAllAsync<ClienteDataBase>(query,`%${name}%`)
            return response
        }catch(error){
            throw error
        }
        
    }

    async function remove(id:number) {
        try {
            await database.execAsync("Delete from pessoa where id = " + id)
        } catch (error) {
            throw error
        }
    }

    async function atualizar(data: ClienteDataBase) {
        const statement = await database.prepareAsync(
            "update pessoa set nome = $nome, telefone = $telefone, endereco = $endereco where id = $id"
        )
        try {
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome,
                $telefone: data.telefone,
                $endereco: data.endereco

            })
        } catch (error) {
            throw error
        }finally{
            await statement.finalizeAsync()
        }

    }

    return {create, consultar, remove, atualizar}
}// fim da function