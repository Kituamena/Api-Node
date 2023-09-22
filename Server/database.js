import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database {
    #dataBase = {}
    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data =>{
            this.#dataBase = JSON.parse(data)
        }).catch(() =>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#dataBase))
    }
    
    select(table){
        const data = this.#dataBase[table] ?? []

        return data
    }

    insert(table, data){
        if(Array.isArray(this.#dataBase[table])){
            this.#dataBase[table].push(data)
        }else{
            this.#dataBase[table] = [data]
        }

        this.#persist()

        return data
    }

    delete(table, id){
        const rowIndex = this.#dataBase[table].findIndex(row => row.id == id)

        if(rowIndex > -1){
            this.#dataBase[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data){
        const rowIndex = this.#dataBase[table].findIndex(row => row.id == id)

        if(rowIndex > -1){
            this.#dataBase[table][rowIndex] = { id, ...data }
            this.#persist()
        }
    }
}