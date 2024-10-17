import { createServer } from 'node:http'

const servidor = createServer((req, res) => {
    console.log('qualquer coisa')
    res.write('ta funcionando 2')
    return res.end()
})

servidor.listen(8000)