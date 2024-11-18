import Express from "express";
// import { criarTabelas } from "./db.js";
import cors from "cors"
import { rotas } from './roteamento/rotas_autenticacao.js'
import { rotas_users } from './roteamento/rotas_usuarios.js'
import { rotas_artistas } from './roteamento/rotas_artista.js'

const app = Express()
app.use(Express.json())
app.use(cors())
// criarTabelas()

app.use('/autenticacao', rotas)
app.use('/user', rotas_users)
app.use('/artista', rotas_artistas)


app.listen(8000)