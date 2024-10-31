// criar controladro para listar todos os usuarios
import { User } from '../db.js'


const listar_usuarios = async (req, res) => {
    const users = await User.findAll()
    const parsed_users = users.map(item => ({id: item.id, nome: item.nome, email: item.email, status: item.status}))
    res.status(200).send(parsed_users)
}

const pegar_usuario = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne({where:{id: user_id}})
    res.send(user)
}

const deletar_usuario = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne({where:{id: user_id}})
    user.destroy()
    res.send('usuario deletado com sucesso')
}

export {pegar_usuario, listar_usuarios, deletar_usuario}