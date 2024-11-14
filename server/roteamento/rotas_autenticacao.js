import express from 'express'
import {registro, login, change_password} from '../controlador/controlador_autenticacao.js'


const rotas = express.Router()

rotas.post('/registro', registro)
rotas.post('/login', login)
rotas.put('/change-password/:id', change_password)

export { rotas }