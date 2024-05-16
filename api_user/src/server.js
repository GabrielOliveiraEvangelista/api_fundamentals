import http from 'node:http'
import { Database } from '../data/database.js'
import { readJson } from '../middlewares/readJson.js'
const database = new Database()
let idUser = 1
const server = http.createServer(async (req, res) => {
    const {method, url} = req
    // Lendo minha req no formato JSON e armazenando na minha variavel
    const reqBody = await readJson(req, res)
    if(method === 'GET' && url === '/user') {
        const userTable = database.select('users')
        return res.end(JSON.stringify(userTable))
    }
    if(method === 'POST' && url === '/user') {
        const user = {
            id: idUser++,
            name : reqBody.name,
            age: reqBody.age
        }
        database.insert('users', user)
        res.writeHead(201).end()
    }
})
server.listen(5555, () => console.log("Server is running on port 5555"))