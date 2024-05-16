export async function readJson(req, res){
    // Requisições que tao entrando ficam em formado de buffer no meu array
    // É interessante manipular esse buffer dentro do meu server (ou seja, dentro da função createServer)
    // e so gravar meu dado quando ele estiver tratado
    const bufferTratamento = []
    // Na biblioteca http eu preciso ensinar ela a ler minha 
    // requisição parte a parte (nome da parte é chunk), por conta do await a saida desse for é quando
    // todo o dado da rquisição é lido
    for await (const chunk of req) {
        bufferTratamento.push(chunk)
    }
    // Em Buffer.concat(user).toString() eu estou transformando meu Buffer em literal
    // E passo esse Buffer para o formato JSON
    const reqBody = JSON.parse(Buffer.concat(bufferTratamento).toString())
    // Aqui estou capturando a propiedade name dentro do meu JSON
    console.log(reqBody.name)
    res.setHeader('Content-type', 'application/json')
    return reqBody
}