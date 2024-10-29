// criar rotas para listar todos os usuarios
import express from 'express'
import {pegar_usuarios} from '../controlador/controlador_usuarios.js'

const rotas_users = express.Router()

rotas_users.get('/pegar_usuarios', pegar_usuarios)

export { rotas_users }