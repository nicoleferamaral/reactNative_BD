import { type SQLiteDatabase } from "expo-sqlite";

// assincrono, não acontece ao msm tempo acontece antes, para proteção por causa do delay
// await, espere/aguarde, metodo assinc - não acontece ao msm tempo,
//  dentro do acento agudo a esquerda `` criar a tabela

export async function initializeDataBase(dataBase: SQLiteDatabase) {
    await dataBase.execAsync(`
        CREATE TABLE IF NOT EXISTS pessoa(
            id integer primary key autoincrement,
            nome text not null,
            telefone text not null,
            endereco text not null
        );
    `)


    
}