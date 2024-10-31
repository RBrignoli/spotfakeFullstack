// criar rotas para listar todos os usuarios
import express from 'express'
import {pegar_usuario, listar_usuarios, deletar_usuario} from '../controlador/controlador_usuarios.js'

const rotas_users = express.Router()

rotas_users.get('/:id', pegar_usuario)
rotas_users.get('/', listar_usuarios)
rotas_users.delete('/:id', deletar_usuario)


export { rotas_users }