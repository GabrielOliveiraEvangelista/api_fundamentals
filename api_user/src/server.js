import http from 'node:http'
import { readJson } from '../middlewares/readJson.js'
const user = [] // Armazeno dados ma forma de Buffer nesse array
let id = 1
const server = http.createServer(async (req, res) => {
    const {method, url} = req
    // Lendo minha req no formato JSON e armazenando na minha variavel
    const reqBody = await readJson(req, res)
    if(method === 'GET' && url === '/user') {
        return res.end(JSON.stringify(user))
    }
    if(method === 'POST' && url === '/user') {
        user.push({
            id: id++,
            name : reqBody.name,
            age: reqBody.age
        })
        res.writeHead(201).end()
    }
})
server.listen(5555, () => console.log("Server is running on port 5555"))