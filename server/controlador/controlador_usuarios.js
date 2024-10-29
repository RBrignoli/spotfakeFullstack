// criar controladro para listar todos os usuarios
import { User } from '../db.js'


const pegar_usuarios = async (req, res) => {

    const todos_users = await User.findAll()
    res.send(todos_users)
}

export {pegar_usuarios}