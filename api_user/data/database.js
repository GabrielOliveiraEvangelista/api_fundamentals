import fs from 'node:fs/promises'
// Classe construtora para eu construir um caminho com o nome do arquivo desejado ao final
const dataBaseCaminho = new URL('db.json', import.meta.url)
export class Database {
     database = {}
     // Função construtora que é executada automaticamente ao instanciar a classe
     // essa função esta servindo para ler meu arquivo do banco de dados
     constructor(){
        // readFile para ler, mando as infos para o parametro data da função then, transformo em JSON e mando
        // para minha variavel database para possibilitar a leitura nas minhas responses
        // O catch esta servindo para criar um arquivo vazio caso nao exista (se nao existir vai dar erro na
        // leitura e consequentemente caira no cath)
        fs.readFile(dataBaseCaminho, 'utf8')
        .then((data) => this.database = JSON.parse(data))
        .catch(()=>fs.writeFile(dataBaseCaminho, JSON.stringify(this.database)))
     }
     select (table) {
        const data = this.database[table] ?? []
        return data
     }
     insert(table, data){
        if(Array.isArray(this.database[table])){
            this.database[table].push(data)
            console.log(this.database)
        } else {
            this.database[table] = [data]
            console.log(this.database)
        }
        fs.writeFile(dataBaseCaminho, JSON.stringify(this.database))
     }
}