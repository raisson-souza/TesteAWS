import { Client } from "pg";

class Database
{
    connection : Client

    constructor(databse_config : any)
    {
        this.connection = new Client(databse_config)
        this.Connect()
    }

    private Connect()
    {
        this.connection.connect()
            .then(() => {
                console.log("Conectado ao Banco!")
            })
            .catch(ex => {
                console.log("Erro ao conectar ao Banco!")
            })
    }

    async ExecuteQuery(query : string)
    {
        this.connection.query(query)
            .then(result => {
                console.log("Query realizada com sucesso!")
            })
            .catch(ex => {
                console.log("Erro ao executar query", ex)
            })
    }
}

export default Database