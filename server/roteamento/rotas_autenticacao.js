import express from 'express'
import {registro, login} from '../controlador/controlador_autenticacao.js'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const rotas = express.Router()

rotas.post('/registro', registro)
rotas.post('/login', upload.single('file'), login)

export { rotas }