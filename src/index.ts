import bodyParser from "body-parser"
import express from "express"
import { Client } from "pg"

import json from "./data/file.json"
import database_config from "./data/db.json"
import Database from "./classes/Database"

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('CuiCodeSystems ERP')
})

app.get('/hello', (req, res) => {
    res.send("Hello World!")
})

app.get('/json/:num', (req, res) => {
    switch (req.params.num)
    {
        case "0":
            res.send(`Linha extraída do JSON ${ json[0] }`)
        case "1":
            res.send(`Linha extraída do JSON ${ json[1] }`)
        case "2":
            res.send(`Linha extraída do JSON ${ json[2] }`)
        default:
            res.send(`Linhas disponíveis no JSON ${ json }`)
    }
})

app.post('/extract/query', (req, res) => {
    res.send(`Extraído QUERY: ${ req.query }`)
})

app.post('/extract/body', (req, res) => {
    res.send(`Extraído BODY: ${ req.body }`)
})

app.post('/extract/params/:param', (req, res) => {
    res.send(`Extraído PARAMS: ${ req.params.param }`)
})

// app.get('/cuicodesystems/b', (req, res, next) => {
//     console.log('the response will be sent by the next function ...')
//     next()
// }, (req, res) => {
//     res.send('Hello from B!')
// })

app.route('/book')
    .get((req, res) => {
        res.send('Get a random book')
    })
    .post((req, res) => {
        res.send('Add a book')
    })
    .put((req, res) => {
        res.send('Update the book')
    })

app.get('/wiki/:lang/:section/:id', (req, res) => {
    let langs = [["Sua sessão:", "Seu produto:"], ["Your section:", "Your product:"]]
    let langNum = null

    if (req.params.lang == "en") langNum = 1
    else if (req.params.lang == "pt") langNum = 0
    else res.send("Idioma não encontrado")

    res.send(`${ langs[langNum!][0] } ${ req.params.section } ${ langs[langNum!][1] } ${ req.params.id }`)
})

app.post('/db', async (req, res) => {
    let connection = new Database(database_config.database_config)

    await connection.ExecuteQuery(`CREATE SCHEMA IF NOT EXISTS "testing"`)
    await connection.ExecuteQuery(`CREATE TABLE IF NOT EXISTS testing.test_table (id serial PRIMARY KEY,description varchar NOT NULL)`)
    res.send("ok")
})

app.post('/db/insert/:text', async (req, res) => {
    let connection = new Database(database_config.database_config)

    await connection.ExecuteQuery(`INSERT INTO testing.test_table (description)  VALUES ('${ req.params.text }')`)
    res.send("ok")
})

app.post('/db/select', async (req, res) => {
    let connection = new Database(database_config.database_config)

    await connection.ExecuteQuery('SELECT * FROM testing.test_table')
    res.send("ok")
})

app.listen(3000, () => { 
    console.log("Servidor iniciado na porta 3000");
})
