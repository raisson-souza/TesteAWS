"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class Database {
    constructor(databse_config) {
        this.connection = new pg_1.Client(databse_config);
        this.Connect();
    }
    Connect() {
        this.connection.connect()
            .then(() => {
            console.log("Conectado ao Banco!");
        })
            .catch(ex => {
            console.log("Erro ao conectar ao Banco!");
        });
    }
    async ExecuteQuery(query) {
        this.connection.query(query)
            .then(result => {
            console.log("Query realizada com sucesso!");
        })
            .catch(ex => {
            console.log("Erro ao executar query", ex);
        });
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map